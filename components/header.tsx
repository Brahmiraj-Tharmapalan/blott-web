import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-center items-center pt-5">
      <Image src={"/header/Logo.png"} alt={"Logo"} width={120} height={30} className="cursor-pointer"/>
    </div>
  );
}
