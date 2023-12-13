"use client";
import { useSignMessage } from "wagmi";

export default function Sign() {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "签名测试",
  });

  const handleSign = () => {};
  return (
    <div>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
}
