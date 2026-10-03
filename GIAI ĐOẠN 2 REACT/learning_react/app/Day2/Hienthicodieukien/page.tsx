"use client";
import { useState } from "react";

export default function Home() {
  const [dem, setDem] = useState(0);
  const [hienChiTiet, setHienChiTiet] = useState(false);

  return (
    <div style={{
        display:"flex",
        gap:"12px"
    }}>
      <button style={{backgroundColor:"gray"}} onClick={() => setDem(dem + 1)}>+1 (đang là {dem})</button>
      <button style={{backgroundColor:"gray"}}  onClick={() => setHienChiTiet(!hienChiTiet)}>
        {hienChiTiet ? "Ẩn chi tiết" : "Xem chi tiết"}
      </button>

      {hienChiTiet && <p>Đây là phần chi tiết.</p>}
       {dem>0 && (<p>Bạn đã bấm {dem} lần</p>)}
    </div>
  );
}