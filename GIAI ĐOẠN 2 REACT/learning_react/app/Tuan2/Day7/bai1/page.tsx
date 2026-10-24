"use client";
import { useEffect, useState } from "react";

function ChieuRong() {
  const [rong, setRong] = useState(0);

  useEffect(() => {
    function khiDoiKichThuoc() {
      console.log("rộng =", window.innerWidth);
      setRong(window.innerWidth);
    }

    khiDoiKichThuoc();
    window.addEventListener("resize", khiDoiKichThuoc);

    return () => window.removeEventListener("resize", khiDoiKichThuoc);
  }, []);

  return <p>Cửa sổ rộng: {rong}px</p>;
}

export default function Home() {
  const [hien, setHien] = useState(true);
  return (
    <div>
      <button onClick={() => setHien(!hien)}>{hien ? "Ẩn" : "Hiện"}</button>
      {hien && <ChieuRong />}
    </div>
  );
}