"use client";
import { useEffect, useState } from "react";

function DoRong() {
  const [rong, setRong] = useState(0);

  useEffect(() => {
    function capNhat() {
      setRong(window.innerWidth);
    }
    capNhat();
    window.addEventListener("resize", capNhat);
    console.log("Đăng ký lắng nghe");

    return () => {
      window.removeEventListener("resize", capNhat);
      console.log("Gỡ lắng nghe");
    };
  }, []);

  return <p>Chiều rộng cửa sổ: {rong}px</p>;
}

export default function Home() {
  const [hien, setHien] = useState(true);
  return (
    <div>
      <button onClick={() => setHien(!hien)}>{hien ? "Ẩn" : "Hiện"}</button>
      {hien && <DoRong />}
    </div>
  );
}