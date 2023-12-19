import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Button, ButtonGroup } from "@nextui-org/react";
export default function SendTrx() {
  const { config } = usePrepareSendTransaction({
    to: "0xE6fEBe4Dd78272Fc33470bF4df9C5B16333F6619",
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
