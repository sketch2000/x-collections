import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { petABI } from "../../contract/index";
import { parseEther } from "viem";
export default function ContractWrite() {
  const { config } = usePrepareContractWrite({
    address: "0xE6fEBe4Dd78272Fc33470bF4df9C5B16333F6619",
    abi: petABI,
    functionName: "createPet",
    args: ["小白", 5, "Frank"],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log("🚀 ~ file: ContractRead.tsx:9 ~ ContractRead ~ data:", data);

  return (
    <div>
      <button onClick={() => write?.()}>创建宠物</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
