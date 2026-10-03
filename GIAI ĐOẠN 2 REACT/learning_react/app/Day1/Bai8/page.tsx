"use client";
import { useState } from "react";

const listPosts = [
  {
    id: 1,
    username: "Ngô Duy Anh",
    content:
      "Hôm nay học React vui quá, làm được tính năng quản lý tủ sách và danh sách việc cần làm rồi! 🚀",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    username: "Samantha",
    content:
      "Cuối tuần đi xem phim ở CGV Vincom Mega Mall Ocean City, chill phết mọi người ạ 🍿",
    liked: false,
    saved: false,
  },
  {
    id: 3,
    username: "Bret",
    content:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    liked: false,
    saved: false,
  },
  {
    id: 4,
    username: "Physics Lab",
    content:
      "Đang ôn tập phần điện xoay chiều và dao động cơ cho kì thi sắp tới, cố lên nào 💪",
    liked: false,
    saved: false,
  },
  {
    id: 5,
    username: "Duy Anh Dev",
    content: "Viết Clean Code giúp code sạch hơn và dễ bảo trì hơn rất nhiều.",
    liked: false,
    saved: false,
  },
];

// Thời gian làm bài 6:55 kết thúc 7:27
function Post(props: {
  username: string;
  content: string;
  like: boolean;
  save: boolean;
  onSave: () => void;
  onRemove: () => void;
}) {
  const [like, setlike] = useState(props.like);
  return (
    <div style={styles.postCard}>
      <div style={styles.postHeader}>
        <span style={styles.avatarIcon}>👤</span>
        <h3 style={styles.username}>{props.username}</h3>
      </div>
      <p style={styles.content}>{props.content}</p>
      
      {/* 3 nút Thích, Lưu, Xóa nằm gần nhau và có màu sắc đẹp mắt */}
      <div style={styles.statusRow}>
        <button style={styles.btnLike} onClick={() => setlike(!like)}>
          {like ? "❤️ Đã thích" : "🤍 Thích"}
        </button>
        <button onClick={props.onSave} style={props.save ? styles.btnUnsaveBtn : styles.btnSaveBtn}>
          {props.save ? "🔖 Đã lưu" : "📖 Lưu bài"}
        </button>
        <button onClick={props.onRemove} style={styles.btnRemoveBtn}>
          🗑️ Xóa bài
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [save, setSave] = useState(listPosts);

  function btnSave(id: number) {
    setSave(
      save.map((x) => (x && x.id === id ? { ...x, saved: !x.saved } : x)),
    );
  }

  function btnRemove(id: number) {
    setSave(save.filter((x) => x.id !== id));
  }

  const TotalPost = save.length;
  const TotalPostSave = save.filter((x) => x.saved).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>📰 Bảng Tin Cộng Đồng</h2>

      {/* Thống kê tổng quan */}
      <div style={styles.statsBox}>
        <div style={styles.statItem}>
          <span>📊 Tổng số bài viết:</span> <strong>{TotalPost}</strong>
        </div>
        <div style={styles.statItem}>
          <span>🔖 Đã lưu:</span>{" "}
          <strong style={{ color: "#10b981" }}>{TotalPostSave}</strong>
        </div>
      </div>

      {/* Danh sách bài viết */}
      <div style={styles.listContainer}>
        {save.map((x) => (
          <div key={x.id} style={styles.cardWrapper}>
            <Post
              username={x.username}
              content={x.content}
              like={x.liked}
              save={x.saved}
              onSave={() => btnSave(x.id)}
              onRemove={() => btnRemove(x.id)}
            />
            <div style={styles.actionRow}>
              {/* <button
                style={x.saved ? styles.btnUnsaveBtn : styles.btnSaveBtn}
                onClick={() => btnSave(x.id)}
              >
                {x.saved ? "❌ Hủy Lưu" : "💾 Lưu bài"}
              </button> */}
              {/* <button
                style={styles.btnRemoveBtn}
                onClick={() => btnRemove(x.id)}
              >
                🗑️ Xóa bài viết
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện viết trực tiếp bằng JS Object
const styles = {
  container: {
    width:"100vw",
    margin: "30px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  mainTitle: {
    color: "#ffc107",
    fontSize: "22px",
    marginBottom: "16px",
  } as React.CSSProperties,

  statsBox: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
  } as React.CSSProperties,

  statItem: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,

  listContainer: {
    display: "grid",
    gridTemplateColumns:"repeat(auto-fit , minmax(400px , 1fr))",
    gap: "16px",
  } as React.CSSProperties,

  cardWrapper: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "border-color 0.2s",
  } as React.CSSProperties,

  postCard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  } as React.CSSProperties,

  postHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,

  avatarIcon: {
    fontSize: "14px",
    backgroundColor: "#333",
    padding: "6px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  username: {
    color: "#ffc107",
    fontSize: "16px",
    margin: 0,
  } as React.CSSProperties,

  content: {
    color: "#e4e4e7",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "4px 0",
  } as React.CSSProperties,

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Khoảng cách gọn gàng giữa các nút
    marginTop: "4px",
  } as React.CSSProperties,

  btnLike: {
    backgroundColor: "transparent",
    border: "1px solid #555",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  } as React.CSSProperties,

  actionRow: {
    display: "flex",
    gap: "8px",
    borderTop: "1px solid #2a2a2a",
    paddingTop: "10px",
  } as React.CSSProperties,

  btnSaveBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  btnUnsaveBtn: {
    backgroundColor: "#d97706",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  btnRemoveBtn: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,
};