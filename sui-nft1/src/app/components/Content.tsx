import React from "react";
import Image from "next/image";

function Content() {
  const arr1 = [1, 2, 3, 4];
  return (
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
  );
}

export default Content;
