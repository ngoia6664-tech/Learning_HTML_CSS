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
    <div style={styles.bookCard}>
      <h3 style={styles.bookTitle}>{props.title}</h3>
      <p style={styles.bookAuthor}>Tác giả: {props.author}</p>
      <span style={styles.bookPrice}>Giá: {props.price}$</span>
    </div>
  );
}

export default function Home() {
  const [Book, setBook] = useState(sachGoc); // state của sách
  const [searchBook, setSeachBook] = useState(""); // State của input
  const TotalBook = Book.length;

  const TuKhoa = searchBook.toLowerCase().trim();
  const ListNow = TuKhoa === "" ? [] : sachGoc.filter((x) => x.title.toLowerCase().includes(TuKhoa));

  return (
    <div style={styles.container}>
      {/* Ô tìm kiếm kèm khung dropdown gợi ý ngay bên dưới */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          value={searchBook}
          onChange={(e) => setSeachBook(e.target.value)}
          placeholder="Nhập tiêu đề sách mà bạn tìm kiếm..."
          style={styles.input}
        />
        {/* Khối gợi ý kết quả tìm kiếm thả xuống ngay dưới input */}
        {TuKhoa !== "" && (
          <div style={styles.dropdown}>
            {ListNow.length === 0 ? (
              <div style={styles.dropdownItemEmpty}>Không tìm thấy sách phù hợp</div>
            ) : (
              ListNow.map((x) => (
                <div key={x.id} style={styles.dropdownItem}>
                  <span style={{ color: "#ffc107", fontWeight: 500 }}>{x.title}</span>
                  <span style={{ color: "#aaa", fontSize: "12px" }}>({x.author})</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Tiêu đề và tổng số sách */}
      <div style={styles.headerRow}>
        <h2 style={styles.sectionTitle}>📚 Kho Sách Tổng Hợp</h2>
        <h3 style={styles.totalHeading}>Tổng số sách: {TotalBook}</h3>
      </div>

      {/* Khối tất cả sách dàn ngang thành lưới (Grid) */}
      <div style={styles.grid}>
        {Book.map((x) => (
          <div key={x.id}>
            <ListBook title={x.title} author={x.author} price={x.price} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện Dark-Mode xịn xò
const styles = {
  container: {
     width:"100vw",
    boxSizing: "border-box" as const,
    margin: "30px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
    display: "flex",
    gap: "20px",
    flexDirection:"column",
    minWidth:0    
  } as React.CSSProperties,

  searchWrapper: {
    position: "relative" as const,
    width: "100%",
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  dropdown: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#18181b",
    border: "1px solid #333",
    borderRadius: "8px",
    marginTop: "6px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    zIndex: 10,
    maxHeight: "250px",
    overflowY: "auto" as const,
  } as React.CSSProperties,

  dropdownItem: {
    padding: "10px 14px",
    borderBottom: "1px solid #2a2a2a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  } as React.CSSProperties,

  dropdownItemEmpty: {
    padding: "12px 14px",
    color: "#ef4444",
    fontSize: "14px",
    textAlign: "center" as const,
    fontStyle: "italic",
  } as React.CSSProperties,

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #2a2a2a",
    paddingBottom: "12px",
    flexWrap: "wrap" as const, // Giúp tự động xuống dòng khi màn hình chật
    gap: "10px",
  } as React.CSSProperties,

  sectionTitle: {
    color: "#ffc107",
    fontSize: "18px",
    margin: 0,
  } as React.CSSProperties,

  totalHeading: {
    color: "#fff",
    fontSize: "15px",
    margin: 0,
  } as React.CSSProperties,

  grid: {
    display: "grid",
    // Giảm minmax xuống 220px để dễ dàn ngang hơn khi màn hình vừa phải
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    minWidth:"0"
  } as React.CSSProperties,

  bookCard: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "16px",
    height: "100%",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  bookTitle: {
    color: "#ffc107",
    fontSize: "16px",
    margin: "0",
  } as React.CSSProperties,

  bookAuthor: {
    color: "#aaa",
    fontSize: "13px",
    margin: "0",
  } as React.CSSProperties,

  bookPrice: {
    color: "#10b981",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0",
  } as React.CSSProperties,
};