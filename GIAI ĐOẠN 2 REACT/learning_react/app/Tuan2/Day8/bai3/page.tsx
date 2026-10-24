"use client";
import { useState, useEffect } from "react";
function ToaDoChuot() {
  const [ToaDo, setToaDo] = useState({ x: 0, y: 0 });
  const [DangChay, setDangChay] = useState(true);
  function XuLy(e: MouseEvent) {
    setToaDo({ x: e.clientX, y: e.clientY });
  }
  useEffect(() => {
    if(!DangChay) return;
    window.addEventListener("mousemove", XuLy);
    return () => window.removeEventListener("mousemove",XuLy);
  },[DangChay]);
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        setDangChay(!DangChay);
    }} >
      <h1>
        Tọa độ chuột hiện tại x:{ToaDo.x} y:{ToaDo.y}
      </h1>
      <button type="submit">{DangChay===true? "Dừng hàm" :"Tiếp tục"}</button>
    </form>
  );
}
export default function Home() {
  return <ToaDoChuot />;
}
