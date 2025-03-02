"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";

export default function StoreButton({
  mainColor,
  onClick,
  children
}: {
  mainColor: string | undefined;
  onClick: () => void;
  children: React.ReactNode
}) {
  const isWindowMd = useMediaQuery('(min-width: 768px)');

  return (
    <div
      className="cursor-pointer flex-1 self-stretch flex items-center justify-center p-4 text-center text-white font-medium md:text-black md:bg-white md:flex-none md:py-2 md:px-8"
      onClick={onClick}
      style={{
        backgroundColor: !isWindowMd ? mainColor : undefined,
        color: isWindowMd ? mainColor : undefined,
      }}
    >
      {children}
    </div>
  );
}
