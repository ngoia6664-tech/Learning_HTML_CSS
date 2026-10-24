"use client";
import { useEffect, useState } from "react";
function DongHo() {
  const [Giay, setGiay] = useState(0);
  const [DangChay, setDangChay] = useState(true);
  useEffect(() => {    
    if (!DangChay) return;
    const timer = setInterval(() => {
      console.log("tick");
      setGiay((g) => g + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [DangChay]);
  return (
    <div>
      <h1>Số giây :{Giay}</h1>
      <button onClick={() => setDangChay(false)}>Dừng lại</button>
      <button onClick={() => setDangChay(true)}>Tiếp tục</button>
    </div>
  );
}
export default function Home() {
  return <DongHo />;
}
