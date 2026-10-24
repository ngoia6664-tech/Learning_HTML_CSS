"use client";
import HienThi from "./components/HienThi";
import NutBam from "./components/NutBam";
import { useState } from "react";
export default function Home() {
  const [dem, setDem] = useState(0);
  return (
    <div>
      <HienThi Solan={dem} />
      <NutBam tenNut="+1" khiBam={() => setDem(dem + 1)} />
      <br/>
      <NutBam
        tenNut="-1"
        khiBam={() => {
          if (dem <= 0) return;
          setDem(dem - 1);
        }}
      />
      <br/>
      <NutBam tenNut="Đặt lại" khiBam={() => setDem(0)}/>
    </div>
  );
}
