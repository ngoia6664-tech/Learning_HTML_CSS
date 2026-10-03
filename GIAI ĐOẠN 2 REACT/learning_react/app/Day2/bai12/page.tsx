// Yêu cầu
// Một ô nhập. Gõ tới đâu, danh sách lọc theo tên sách tới đó.
// Tìm không phân biệt hoa thường, và bỏ qua dấu cách thừa ở đầu và cuối.
// Phía trên danh sách hiện "Hiển thị n / m" (n là số sách đang hiện, m là tổng số sách).
// Không có sách nào khớp thì hiện "Không tìm thấy", không hiện danh sách trống trơn.
// Mỗi sách hiện tên, tác giả, giá (CSS tùy em hoặc để AI lo).
// Ràng buộc
// Chỉ một state (từ khóa đang gõ). sachGoc là hằng số nằm ngoài component, vì danh sách này không bao giờ đổi nên không cần state.
// Danh sách đang hiện là biến tính ra từ sachGoc và từ khóa, không phải state.
// Số m phải lấy từ độ dài mảng, không gõ cứng số 8.
// Bắt đầu 6h18-Dừng lần 1 6:40(vừa dạy vừa làm) , bắt dầu lần 2:10:35,
"use client";
import { useState } from "react";
const sachGoc = [
  { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", price: 100 },
  { id: 2, title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 150 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 200 },
  {
    id: 4,
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    price: 120,
  },
  { id: 5, title: "Sắt Son Một Lòng", author: "Nguyễn Nhật Ánh", price: 170 },
  {
    id: 6,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    price: 220,
  },
  {
    id: 7,
    title: "Clean Architecture",
    author: "Robert C. Martin",
    price: 210,
  },
  {
    id: 8,
    title: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
    author: "Nguyễn Nhật Ánh",
    price: 90,
  },
];
function ListBook(props: { title: string; author: string; price: number }) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.author}</p>
      <span>{props.price}</span>
    </div>
  );
}
export default function Home() {
  const [Book, setBook] = useState(sachGoc); // state của sách
  const [searchBook, setSeachBook] = useState(""); //Sate của input
  const TotalBook = Book.length;
  console.log(searchBook); // Log ra để test
  const TuKhoa = searchBook.toLowerCase().trim();
  const ListNow = TuKhoa === "" ? [] : sachGoc.filter((x) => x.title.toLowerCase().includes(TuKhoa));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        value={searchBook}
        onChange={(e) => setSeachBook(e.target.value)}
        placeholder="Nhập tiêu đề sách mà bạn tìm kiếm..."
      />
      {/* Khối hiển thị tìm kiếm */}
      {ListNow.length > 0 && (
        <div style={{ display: "flex", border: "2px solid" }}>
          {ListNow.map((x) => (
            <div key={x.id}>
              <ListBook title={x.title} author={x.author} price={x.price} />
            </div>
          ))}
        </div>
      )}
      {/* Khối tất cả sách */}
      {Book.map((x) => (
        <div key={x.id}>
          <ListBook title={x.title} author={x.author} price={x.price} />
        </div>
      ))}
      <h2>Tổng số sách:{TotalBook}</h2>
    </div>
  );
}
