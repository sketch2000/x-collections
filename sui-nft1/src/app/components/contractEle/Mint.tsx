"use client";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { nft721Abi } from "../../contract/index";
import { Button } from "@nextui-org/react";
export default function Mint() {
  const { config } = usePrepareContractWrite({
    address: "0xbdA5b5f59B4773Db072b04CF46324bC9385440Da",
    abi: nft721Abi,
    functionName: "safeMint",
    args: ["0xe2981d0c1c979670c4c7b86b68518d5fd64a47ea"],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <Button color="primary" size="lg" onClick={() => write?.()}>
        铸币
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
