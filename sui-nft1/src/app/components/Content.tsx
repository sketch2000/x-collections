"use client";
import React from "react";
import Image from "next/image";
import { useFeeData } from "wagmi";
import Sign from "./contractEle/Sign";
import SendTrx from "./contractEle/SendTrx";
import ContractRead from "./contractEle/ContractRead";
import Mint from "./contractEle/Mint";
function Content() {
  const { data } = useFeeData();
  console.log("🚀 ~ file: Content.tsx:7 ~ Content ~ data:", data);
  const arr1 = [1, 2, 3, 4];
  return (
    <div>
      <Sign></Sign>
      <br />
      <br />
      <SendTrx></SendTrx>
      <br />
      <br />
      <ContractRead></ContractRead>

      <Mint></Mint>
      <div className="flex  flex-wrap w-1/2 mx-auto mt-40 gap-10">
        {arr1.map((val) => {
          return (
            <div key={val} className="w-60 h-60 overflow-hidden relative ">
              <Image
                src="/next.svg"
                fill={true}
                alt="未加载"
                className="hover:w-full"
              ></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Content;
