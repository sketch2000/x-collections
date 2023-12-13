import { useContractRead } from "wagmi";
import { ageTestAbi } from "../../contract/index";
export default function ContractRead() {
  const { data, isError, isLoading } = useContractRead({
    address: "0xB01861ac7B7cD5751057146F2445C674ccf1d1d9",
    abi: ageTestAbi,
    functionName: "getAge",
  });
  console.log("🚀 ~ file: ContractRead.tsx:9 ~ ContractRead ~ data:", data);

  return <div>{JSON.stringify(data)}</div>;
}
