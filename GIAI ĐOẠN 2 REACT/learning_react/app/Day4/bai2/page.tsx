// Bài tập 2: ô ghi chú

// Một ô nhập, gõ tới đâu thì lưu tới đó. Chuỗi thì không cần JSON.stringify, ghi thẳng setItem(key, text).
// Xong khi:

// Gõ chữ rồi F5 vẫn còn.
// Xóa hết chữ rồi F5 vẫn trống.
//Giờ bắt đầu : 8:05
"use client";
import { useEffect, useState } from "react";
export default function Home() {
  const [key, setKey] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const Savekey = localStorage.getItem("Day4_bai2"); // Ghi từ local ra
    if (Savekey) setKey(JSON.parse(Savekey)); // nếu có dữ liệu thì parse SaveKey vào key
    setFlag(true); //Đổi cờ thành true
  },[]); // truyên [] để chạy 1 lần duy nhất vì những lần sau chạy không có gì để so sánh
  useEffect(() => {
    if (!flag) return; // Nếu flag = flase thì dừng luôn
    localStorage.setItem("Day4_bai2", JSON.stringify(key)); // Ghi key vào local
  }, [key, flag]); // nếu key hoặc flag thay đổi thì ghi vào // kể cả key thay đổi mà flag chưa đổi thì vẫn chạy nhưng vì đã có dòng kiểm tra đều kiện flag để chặn
  return (
    <div>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      />
    </div>
  );
}
