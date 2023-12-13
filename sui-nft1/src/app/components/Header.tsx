"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useBalance, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Avvvatars from "avvvatars-react";
import style from "./Header.module.css";
function Header() {
  const { address, isConnected, connector } = useAccount();
  console.log("🚀 ~ file: Header.tsx:7 ~ Header ~ isConnected:", isConnected);
  const { data, refetch } = useBalance({
    address,
    watch: true,
  });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleSign = () => {};
  return (
    <div className="header flex justify-between h-20 bg-gray-400 p-5 text-center items-center">
      <div className="logo">logo</div>
      <div className="right flex justify-between w-1/2">
        <div>导航</div>
        <div>导航</div>
        <div>导航</div>
        <div>导航</div>
        {isConnected ? (
          <div
            className="wallet flex justify-between"
            onClick={() => {
              disconnect();
            }}
          >
            <div className={style.animation}>
              <Avvvatars
                value={JSON.stringify(address)}
                style="shape"
              ></Avvvatars>
            </div>
          </div>
        ) : (
          <div
            className="wallet flex justify-between"
            onClick={() => {
              connect({ connector: connectors[0] });
            }}
          >
            连接钱包
          </div>
        )}

        <div className="wallet flex justify-between" onClick={handleSign}>
          签名测试
        </div>
      </div>
    </div>
  );
}

export default Header;
