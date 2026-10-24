"use client";
import HienThi from "./components/HienThi";
import NutBam from "./components/NutBam";
import TheKhung from "./components/TheKhung";
import { useState } from "react";
export default function Home() {
  const [dangXem, setDangXem] = useState(true);
  return (
    <div>
      {dangXem ? (
        <TheKhung tieuDe="Thông tin của tôi">
          <HienThi
            Name="Ngô Duy Anh"
            email="ngoduyanh@gmail.com"
            age={20}
            job="Tutor"
          />
        </TheKhung>
      ) : null}
      <TheKhung tieuDe="">
        <NutBam
          tenNut={dangXem ? "Ẩn" : "Hiện"}
          khiBam={() => setDangXem(!dangXem)}
        />
      </TheKhung>
      <TheKhung tieuDe="Thông tin thêm" >
        <TheKhung tieuDe="Số điện thoại">
          <p>0123456789</p>
        </TheKhung>
      </TheKhung>
    </div>
  );
}
