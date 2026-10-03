"use client";
import { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 100,
    saved: false,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 150,
    saved: false,
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 200,
    saved: false,
  },
];

function Book(props: {
  title: string;
  author: string;
  price: number;
  saved: boolean;
  onSave: () => void;
  onRemove: () => void;
}) {
  return (
    <div style={styles.bookCard}>
      <div style={styles.bookInfo}>
        <h3 style={styles.bookTitle}>{props.title}</h3>
        <span style={styles.bookAuthor}>Tác giả: {props.author}</span>
        <span style={styles.bookPrice}>Giá: {props.price}$</span>
      </div>
      <div style={styles.bookActions}>
        <button 
          onClick={props.onSave} 
          style={props.saved ? styles.btnUnsaveBtn : styles.btnSaveBtn}
        >
          {props.saved ? "Hủy Lưu" : "Lưu"}
        </button>
        <button onClick={props.onRemove} style={styles.btnRemove}>Xóa</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [Listbook, setListbook] = useState(initialBooks);
  const [newSach, setNewSach] = useState({ title: "", author: "", price: "" });
  const [loi, setLoi] = useState("");

  function ThemSach(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = newSach.title;
    const author = newSach.author;
    const price = newSach.price;

    if (title.trim() === "") {
      setLoi("Tên không được để trống ");
      return;
    }
    if (author.trim() === "") {
      setLoi("Tác giả không được để trống");
      return;
    } 
    if (!(Number(price) > 0)) {
      setLoi("giá tiền không hợp lệ");
      return;
    }

    setListbook([
      ...Listbook,
      {
        id: Date.now(),
        title: newSach.title.trim(),
        author: newSach.author.trim(),
        price: Number(newSach.price),
        saved: false,
      },
    ]);
    setNewSach({ title: "", author: "", price: "" });
    setLoi("");
  }

  function btnRemove(id: number) {
    setListbook(Listbook.filter((x) => x.id !== id));
  }

  function btnSave(id: number) {
    setListbook(
      Listbook.map((x) => (x && x.id === id ? { ...x, saved: !x.saved } : x)),
    );
  }

  const TotalBook = Listbook.length;
  const TotalBookSave = Listbook.filter((x) => x.saved).length;
  const TotalPriceSave = Listbook.reduce(
    (acc, cur) => acc + cur.price,
    0,
  );

  return (
    <div style={styles.container}>
      {/* Thống kê */}
      <div style={styles.statsBox}>
        <div style={styles.statItem}>Tổng sách: <strong>{TotalBook}</strong></div>
        <div style={styles.statItem}>Tổng sách đã lưu: <strong style={{ color: "#3b82f6" }}>{TotalBookSave}</strong></div>
        <div style={styles.statItem}>Tổng tiền sách: <strong style={{ color: "#10b981" }}>{TotalPriceSave}$</strong></div>
      </div>

      {/* Danh sách sách */}
      <div style={styles.listContainer}>
        {Listbook.map((x) => ( 
          <div key={x.id}>
            <Book
              title={x.title}
              author={x.author}
              price={x.price}
              saved={x.saved}
              onSave={() => btnSave(x.id)}
              onRemove={() => btnRemove(x.id)}
            />
          </div>
        ))}
      </div>

      {/* Ô nhập liệu */}
      <div style={{ marginTop: "24px" }}>
        <form onSubmit={ThemSach} style={styles.form}>
          <h3 style={styles.formTitle}>Thêm sách mới</h3>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newSach.title}
              onChange={(e) =>
                setNewSach({ title: e.target.value, author: newSach.author, price: newSach.price })
              }
              placeholder="Nhập tiêu đề"
              style={styles.input}
            />
            <input
              type="text"
              value={newSach.author}
              onChange={(e) =>
                setNewSach({ title: newSach.title, author: e.target.value, price: newSach.price })
              }
              placeholder="Nhập Tác giả"
              style={styles.input}
            />
            <input
              type="text"
              value={newSach.price}
              onChange={(e) =>
                setNewSach({ title: newSach.title, author: newSach.author, price: e.target.value })
              }
              placeholder="Nhập giá tiền"
              style={styles.input}
            />
          </div>
          {loi && <p style={{ color: "#ef4444", fontSize: "13px", margin: "0" }}>Lỗi: {loi}</p>}
          <button type="submit" style={styles.btnSubmit}>Thêm sách</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện viết trực tiếp bằng JS Object (Logic giữ nguyên 100%)
const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  statsBox: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    padding: "14px 18px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
  } as React.CSSProperties,

  statItem: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,

  listContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  } as React.CSSProperties,

  bookCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "16px",
  } as React.CSSProperties,

  bookInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
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

  bookActions: {
    display: "flex",
    gap: "8px",
  } as React.CSSProperties,

  btnSaveBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  btnUnsaveBtn: {
    backgroundColor: "#d97706",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  btnRemove: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  } as React.CSSProperties,

  form: {
    backgroundColor: "#18181b",
    border: "1px solid #333",
    padding: "18px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  } as React.CSSProperties,

  formTitle: {
    color: "#ffc107",
    fontSize: "16px",
    margin: "0 0 4px 0",
  } as React.CSSProperties,

  inputGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  } as React.CSSProperties,

  input: {
    padding: "10px 14px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  btnSubmit: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  } as React.CSSProperties,
};