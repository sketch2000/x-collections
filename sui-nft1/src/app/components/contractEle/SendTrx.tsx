import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Button, ButtonGroup } from "@nextui-org/react";
export default function SendTrx() {
  const { config } = usePrepareSendTransaction({
    to: "0xDc0d2B59ED6cd183Ef9a8bc12090dAe04ae73E88",
    value: parseEther("0.01"),
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);
  return (
    <div>
      <Button onClick={() => sendTransaction?.()}>Send Transaction</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      <Button onClick={() => sendTransaction?.()}></Button>
    </div>
  );
}
