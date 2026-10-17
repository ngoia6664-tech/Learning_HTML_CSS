"use client";
import { useState } from "react";

const sachBanDau = [
  { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", price: 100 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 200 },
];

export default function Home() {
  const [danhSach, setDanhSach] = useState(sachBanDau);
  const [dangSuaId, setDangSuaId] = useState<number | null>(null);
  const [ban, setBan] = useState({ title: "", author: "", price: "" });
  const [loi, setLoi] = useState("");

  function batDauSua(x: (typeof sachBanDau)[number]) {
    setDangSuaId(x.id);
    setBan({ title: x.title, author: x.author, price: String(x.price) });
    setLoi("");
  }

  function luuSua() {
    if (ban.title.trim() === "" || ban.author.trim() === "") {
      setLoi("Tên sách và tác giả không được để trống");
      return;
    }
    if (ban.price.trim() === "" || !(Number(ban.price) > 0)) {
      setLoi("Giá phải là số lớn hơn 0");
      return;
    }
    setDanhSach(
      danhSach.map((x) =>
        x.id === dangSuaId
          ? {
              ...x,
              title: ban.title.trim(),
              author: ban.author.trim(),
              price: Number(ban.price),
            }
          : x,
      ),
    );
    setDangSuaId(null);
    setLoi("");
  }

  return (
    <div>
      {danhSach.map((x) => (
        <div key={x.id}>
          {dangSuaId === x.id ? (
            <>
              <input
                value={ban.title}
                onChange={(e) => setBan({ ...ban, title: e.target.value })}
                style={{ backgroundColor: "white", color: "black" }}
              />
              <input
                value={ban.author}
                onChange={(e) => setBan({ ...ban, author: e.target.value })}
                style={{ backgroundColor: "white", color: "black" }}
              />
              <input
                value={ban.price}
                onChange={(e) => setBan({ ...ban, price: e.target.value })}
                style={{ backgroundColor: "white", color: "black" }}
              />
              <button onClick={luuSua}>Lưu</button>
              <button onClick={() => setDangSuaId(null)}>Hủy</button>
              <span style={{ color: "red" }}>{loi}</span>
            </>
          ) : (
            <>
              <span>
                {x.title} - {x.author} - {x.price}
              </span>
              <button onClick={() => batDauSua(x)}>Sửa</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}