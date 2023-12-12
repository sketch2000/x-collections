"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
function Header() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const handleConnect = () => {
    connect();
  };
  return (
    <div className="header flex justify-between h-20 bg-gray-400 p-5 text-center items-center">
      <div className="logo">logo</div>
      <div className="right flex justify-between w-1/2">
        <div>导航</div>
        <div>导航</div>
        <div>导航</div>
        <div>导航</div>
        <div className="wallet flex justify-between" onClick={handleConnect}>
          连接钱包
        </div>
        <div className="wallet flex justify-between">调用合约</div>
      </div>
    </div>
  );
}

export default Header;
