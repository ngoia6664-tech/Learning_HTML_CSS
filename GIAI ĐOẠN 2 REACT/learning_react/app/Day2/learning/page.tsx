"use client";
import { useState } from "react";

function Job(props: { ten: string }) {
  return (
    <div style={styles.jobCard}>
      <span style={styles.jobBullet}>📌</span>
      <p style={styles.jobText}>{props.ten}</p>
    </div>
  );
}

export default function Home() {
  const [danhSach, setDanhSach] = useState([
    { id: 1, ten: "Học React" },
    { id: 2, ten: "Làm bài tập" },
  ]);
  const [ten, setTen] = useState("");

  function ThemViec(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (ten === "") return;
    setDanhSach([...danhSach, { id: Date.now(), ten: ten.trim() }]);
    setTen("");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Quản Lý Công Việc (Todo)</h2>

      {/* Form nhập liệu */}
      <form onSubmit={ThemViec} style={styles.form}>
        <input
          type="text"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          placeholder="Nhập tên công việc mới..."
          style={styles.input}
        />
        <p style={ten === "" ? styles.hintEmpty : styles.hintFilled}>
          {ten === "" ? "⚠️ Hãy nhập tên công việc" : `✨ Công việc: ${ten}`}
        </p>
        <button type="submit" style={styles.btnSubmit}>Thêm công việc</button>
      </form>

      {/* Danh sách công việc */}
      <div style={styles.listContainer}>
        {danhSach.map((x) => (
          <div key={x.id}>
            <Job ten={x.ten} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện viết trực tiếp bằng JS Object
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  heading: {
    color: "#ffc107",
    fontSize: "22px",
    marginBottom: "20px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    backgroundColor: "#18181b",
    border: "1px solid #333",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "20px",
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  hintEmpty: {
    color: "#ef4444",
    fontSize: "13px",
    margin: "0",
    fontStyle: "italic",
  } as React.CSSProperties,

  hintFilled: {
    color: "#10b981",
    fontSize: "13px",
    margin: "0",
    fontWeight: 500,
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
    transition: "opacity 0.2s",
  } as React.CSSProperties,

  listContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  } as React.CSSProperties,

  jobCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "0 14px",
  } as React.CSSProperties,

  jobBullet: {
    fontSize: "14px",
  } as React.CSSProperties,

  jobText: {
    color: "#e4e4e7",
    fontSize: "15px",
    margin: "12px 0",
  } as React.CSSProperties,
};