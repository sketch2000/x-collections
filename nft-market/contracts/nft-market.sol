// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Market {
    IERC721 public erc721;
    IERC20 public erc20;

    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

    struct Order {
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Order) orderOfId; // tokenId -> order

    Order[] public orders;
    mapping(uint256 => uint256) public idToOrderIndex; // tokenId -> order index

    // events
    event Deal(address seller, address buyer, uint256 tokenId, uint256 price);
    event NewOrder(address seller, uint256 tokenId, uint256 price);
    event PriceChanged(
        address seller,
        uint256 tokenId,
        uint256 previousPrice,
        uint256 newPrice
    );
    event OrderCanceled(address seller, uint256 tokenId);

    constructor(address _erc20, address _erc721) {
        erc20 = IERC20(_erc20);
        erc721 = IERC721(_erc721);
    }

    function buy(uint256 _tokenId) external payable {
        address buyer = msg.sender;
        uint256 price = orderOfId[_tokenId].price;
        address seller = orderOfId[_tokenId].seller;

        // require return true(impl IERC20)
        require(
            erc20.transferFrom(buyer, seller, price),
            "ERC20: insufficient allowance"
        );
        erc721.transferFrom(address(this), buyer, _tokenId);

        removeOrder(_tokenId);

        emit Deal(seller, buyer, _tokenId, price);
    }

    function cancelOrder(uint256 _tokenId) external {
        address seller = orderOfId[_tokenId].seller;

        require(msg.sender == seller, "Only seller can cancel order");
        erc721.safeTransferFrom(address(this), seller, _tokenId);

        removeOrder(_tokenId);

        emit OrderCanceled(seller, _tokenId);
    }

    function setPrice(uint256 _tokenId, uint256 _price) external {
        address seller = orderOfId[_tokenId].seller;
        require(msg.sender == seller, "Only seller can set price");

        uint256 previousPrice = orderOfId[_tokenId].price;
        // change Order
        orderOfId[_tokenId].price = _price;

        Order storage order = orders[idToOrderIndex[_tokenId]];
        order.price = _price;

        emit PriceChanged(seller, _tokenId, previousPrice, _price);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        uint256 price = toUint256(data, 0);
        require(price > 0, "price must be greater than zero");

        orders.push(Order(from, tokenId, price));
        orderOfId[tokenId] = Order(from, tokenId, price);
        idToOrderIndex[tokenId] = orders.length - 1;

        emit NewOrder(from, tokenId, price);

        return MAGIC_ON_ERC721_RECEIVED;
    }

    function removeOrder(uint256 _tokenId) internal {
        address seller = orderOfId[_tokenId].seller;

        require(msg.sender == seller, "Only seller can remove order");

        uint256 orderIndex = idToOrderIndex[_tokenId];
        uint256 lastOrderIndex = orders.length - 1;
        if (orderIndex != lastOrderIndex) {
            Order storage lastOrder = orders[lastOrderIndex];
            orders[orderIndex] = lastOrder;
            idToOrderIndex[lastOrder.tokenId] = orderIndex;
        }
        orders.pop();
        delete orderOfId[_tokenId];
        delete idToOrderIndex[_tokenId];
    }

    function toUint256(
        bytes memory _bytes,
        uint256 _start
    ) internal pure returns (uint256) {
        require(_start + 32 >= _start, "Market: toUint256_overflow");
        require(
            _bytes.length >= (_start + 32),
            "Market: toUint256_outOfBounds"
        );
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }

        return tempUint;
    }

    function getOrdersLength() public view returns (uint256) {
        return orders.length;
    }

    function getMyOrders() public view returns (Order[] memory) {
        Order[] memory myOrders = new Order[](orders.length);
        uint256 count = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            Order memory order = orders[i];
            if (order.seller == msg.sender) {
                myOrders[count] = order;
                count++;
            }
        }

        return myOrders;
    }

    function isListed(uint256 _tokenId) public view returns (bool) {
        return orderOfId[_tokenId].seller != address(0);
    }
}
