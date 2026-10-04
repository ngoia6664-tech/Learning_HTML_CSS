"use client";
import { useState } from "react";

export default function Home() {
  // Quản lý danh sách các ngày, kèm trạng thái isOpen (true: mở, false: thu gọn)
  const [days, setDays] = useState([
    {
      day: 1,
      title: "📅 Day 1: component , useState",
      isOpen: true, // Day 1 mặc định mở sẵn cho tiện nhìn
      items: [
        { id: 1, ten: "Bài 1: ProfileCard", href: "/Day1/Bai1" },
        { id: 2, ten: "Bài 2 + 6: BookCard, tổng tiền", href: "/Day1/Bai2" },
        { id: 3, ten: "Bài 3: Bộ đếm", href: "/Day1/Bai3" },
        { id: 4, ten: "Bài 4: Thả tim", href: "/Day1/Bai4" },
        { id: 5, ten: "Bài 5: Việc cần làm", href: "/Day1/Bai5" },
        { id: 8, ten: "Bài 8: Postify mini", href: "/Day1/Bai8" },
      ],
    },
    {
      day: 2,
      title: "📅 Day 2: Form input & Lọc dữ liệu",
      isOpen: true, // Mở sẵn để sếp dễ bấm test
      items: [
        { id: 1, ten: "Bài 1: Quản lý tủ sách & Thêm sách", href: "/Day2/bai1" },
        { id: 11, ten: "Bài 11: Tab lọc cho To-do", href: "/Day2/bai11" },
        { id: 12, ten: "Bài 12: Tra cứu sách thông minh", href: "/Day2/bai12" },
      ],
    },
    // Sau này cứ thế thêm Day 3, Day 4... vào đây thoải mái mà không sợ dài trang!
  ]);

  // Hàm bật/tắt trạng thái ẩn hiện của từng Day
  const toggleDay = (dayNumber: number) => {
    setDays(
      days.map((d) => (d.day === dayNumber ? { ...d, isOpen: !d.isOpen } : d))
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚀 Lộ Trình Bài Tập React</h2>

      <div style={styles.daysWrapper}>
        {days.map((d) => (
          <div key={d.day} style={styles.dayBox}>
            {/* Thanh tiêu đề của mỗi Day (Bấm vào để ẩn/hiện) */}
            <div style={styles.dayHeader} onClick={() => toggleDay(d.day)}>
              <span style={styles.dayTitle}>{d.title}</span>
              <span style={styles.toggleText}>
                {d.isOpen ? "▲ Thu gọn" : "▼ Mở rộng"}
              </span>
            </div>

            {/* Danh sách bài tập (Chỉ hiện khi isOpen = true) */}
            {d.isOpen && (
              <div style={styles.list}>
                {d.items.length > 0 ? (
                  d.items.map((b) => (
                    <a key={b.id} href={b.href} style={styles.card}>
                      <div style={styles.leftGroup}>
                        <span style={styles.badge}>#{b.id}</span>
                        <span style={styles.title}>{b.ten}</span>
                      </div>
                      <span style={styles.arrow}>➔</span>
                    </a>
                  ))
                ) : (
                  <p style={styles.emptyText}>Chưa có bài tập nào ở phần này.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện Dark-Mode xịn xò
const styles = {
  container: {
    maxWidth: "650px",
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
    marginBottom: "24px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  daysWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  } as React.CSSProperties,

  dayBox: {
    backgroundColor: "#18181b",
    border: "1px solid #333",
    borderRadius: "12px",
    overflow: "hidden",
  } as React.CSSProperties,

  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "#1f1f23",
    cursor: "pointer",
    userSelect: "none" as const,
    borderBottom: "1px solid #333",
  } as React.CSSProperties,

  dayTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffc107",
  } as React.CSSProperties,

  toggleText: {
    fontSize: "13px",
    color: "#888",
    fontWeight: 500,
  } as React.CSSProperties,

  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    padding: "16px",
  } as React.CSSProperties,

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,

  badge: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
  } as React.CSSProperties,

  title: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#e4e4e7",
  } as React.CSSProperties,

  arrow: {
    color: "#888",
    fontSize: "14px",
    fontWeight: "bold",
  } as React.CSSProperties,

  emptyText: {
    color: "#71717a",
    fontSize: "14px",
    textAlign: "center" as const,
    margin: "10px 0",
    fontStyle: "italic",
  } as React.CSSProperties,
};