// Bài tập 3: Đếm ngược 10 giây

// Màn hình hiện số giây còn lại, bắt đầu ở 10 và giảm 1 mỗi giây.
// Về 0 thì dừng và hiện chữ “Hết giờ”. Có nút “Làm lại” để đưa về 10 và đếm lại.

// Xong khi:

// Số giảm đúng 1 mỗi giây, đến 0 thì đứng, không xuống âm.
// Hiện “Hết giờ” khi về 0, ẩn đi khi bấm Làm lại.
// Bấm Làm lại giữa chừng (đang ở 6) thì về 10 và đếm lại bình thường,
//  tốc độ vẫn 1 giây một số, không nhanh gấp đôi.
// Đặt console.log("tick") trong hàm của timer.
// Khi về 0 thì không còn dòng “tick” nào được in.
// F12 Console không có chữ đỏ trỏ về page.tsx.
"use client";
import { useState, useEffect } from "react";
function DongHoDemNguoc() {
  const [Giay, SetGiay] = useState(10);
  const [DangChay, setDangChay] = useState(true);
  useEffect(() => {
    if (!DangChay || Giay === 0) return;
    const timer = setInterval(() => {
      console.log("tick");
      SetGiay((g) => g - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [DangChay,Giay]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDangChay(!DangChay);
      }}
    >
      <h1>{Giay === 0 ? <>Hết Giờ </> : <>Số giây:{Giay}</>}</h1>
      <button
        type="button"
        onClick={() => {
          SetGiay(10);
        }}
      >
        Làm lại
      </button>
      <button type="submit">
        {DangChay === true ? <>Dừng lại</> : <>Tiếp tục</>}
      </button>
    </form>
  );
}
export default function Home() {
  return <DongHoDemNguoc />;
}
