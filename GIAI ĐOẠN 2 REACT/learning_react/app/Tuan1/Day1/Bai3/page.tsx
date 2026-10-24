"use client";
import { useState } from "react";
// Nhóm B: useState
// 3. Bộ đếm: hiện 1 con số, 3 nút +1, −1, Reset.
const sobandau = [
  { id: 1, number: 1 },
  { id: 2, number: 5 },
  { id: 3, number: 10 },
]; // nếu có nhiều phần từ phải thêm id để nút reset duyệt theo id
function HienThi(props: { number: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        backgroundColor: "gray",
        borderRadius: "12px",
        padding: "6px 12px",
      }}
    >
      <h3>{props.number}</h3>
    </div>
  );
}
export default function Home() {
  const [value, setvalue] = useState(sobandau);
  function Tang(id: number) {
    setvalue(
      value.map((x) => (x.id === id ? { ...x, number: x.number + 1 } : x)),
    );
  }
  function Giam(id: number) {
    setvalue(
      value.map((x) =>
        x.id === id && x.number > 0 ? { ...x, number: x.number - 1 } : x,
      ),
    );
  }
  function Reset(id: number) {
    const goc = sobandau.find((o) => o.id === id);
    if (!goc) return;
    setvalue(
      value.map((x) => (x.id === id ? { ...x, number: goc.number } : x)),
    ); // ở đây nếu nhiều phần từ trong mảng thì phải duyệt theo id để đổi
    //Vấn đề chưa biết lấy id của mảng ban đầu để duyệt kiểu gì
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
        gap: "12px",
      }}
    >
      {value.map((x) => (
        <div
          key={x.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <HienThi number={x.number} />
          <button
            onClick={() => Tang(x.id)}
            style={{
              backgroundColor: "gray",
              padding: "6px",
            }}
          >
            +
          </button>
          <button
            onClick={() => Giam(x.id)}
            style={{
              backgroundColor: "gray",
              padding: "6px",
            }}
          >
            -
          </button>
          <button
            onClick={() => Reset(x.id)}
            style={{
              backgroundColor: "gray",
              padding: "6px",
            }}
          >
            Reset
          </button>
        </div>
      ))}
    </div>
  );
}
// 4. Mỗi PostCard tự có state liked riêng (bấm đổi ❤️/🤍), render 3 thẻ. Đoán trước khi chạy: bấm tim bài 1 thì bài 2, 3 có đổi không, vì sao? Chạy xong so với dự đoán.
// 5. Danh sách việc cần làm: nút Thêm (việc cố định, id là Date.now()), nút Xóa, nút Xong đổi ✅/⬜. Phần sửa 1 phần tử xem mục 6 trong ghi chú.
// 6. Đề hôm qua: sản phẩm + Thêm/Xóa + "Tổng số" và "Tổng tiền" tự cập nhật.
