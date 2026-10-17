// Bài tập 3: To-do có lưu

// Dùng lại To-do (thêm, xóa, tick Xong), có lưu.
// Xong khi:

// Thêm 2 việc, tick 1 việc, F5: còn nguyên trạng.
// Xóa 1 việc, F5: vẫn đúng.
// Xóa hết việc rồi F5 thì không được hiện lại việc mặc định.
//em copy bài lần trước rồi thêm lưu dữ liệu cho nhanh
"use client";
import { useEffect, useState } from "react";

const Todo = [
  { id: 1, job: "Học html css js cơ bản", done: true },
  { id: 2, job: "Học js nâng cao + git thực chiến", done: true },
  { id: 3, job: "React", done: false },
];

function ListTodo(props: {
  job: string;
  done: boolean;
  onClick: () => void;
  onRemove: () => void;
  m: any; // Nhận thêm object màu để dynamic theo theme
}) {
  return (
    <div
      style={{
        ...styles.todoCard,
        backgroundColor: props.m.cardBg,
        borderColor: props.m.border,
      }}
    >
      <div style={styles.todoInfo}>
        <h3 style={{ ...styles.jobTitle, color: props.m.text }}>{props.job}</h3>
        <span style={props.done ? styles.badgeDone : styles.badgeNotDone}>
          {props.done ? "✅ Hoàn thành" : "⏳ Chưa hoàn thành"}
        </span>
      </div>
      <div style={styles.actionGroup}>
        <button
          onClick={props.onClick}
          style={props.done ? styles.btnUnmark : styles.btnMark}
        >
          {props.done ? "Bỏ Tick" : "Tick Xong"}
        </button>
        <button onClick={props.onRemove} style={styles.btnRemove}>
          Xóa
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [List, SetList] = useState(Todo);
  const [tab, setTab] = useState("all");
  const [flag, setFlag] = useState(false); // cờ cho cả 2 key
  const [background, setbackground] = useState("sang");
  const PageNow = List.filter((x) => {
    if (tab === "complete") return x.done;
    if (tab === "not_complete") return !x.done;
    return true;
  });

  // Biến hiện tổng số bài
  const TotalTodo = List.length;
  const TotalToDoComplete = List.filter((x) => x.done).length;

  function StateTodo(id: number) {
    SetList(List.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }

  function RemoveTodo(id: number) {
    SetList(List.filter((x) => x.id !== id));
  }

  function AddTodo() {
    SetList([
      { id: Date.now(), job: "Công việc mới thêm", done: false },
      ...List,
    ]);
  }

  // Lưu và đọc
  useEffect(() => {
    const saveListToDo = localStorage.getItem("Day4_bai3");
    const luuBgr = localStorage.getItem("bgr");
    if (saveListToDo) SetList(JSON.parse(saveListToDo)); // lấy data ra
    if (luuBgr) setbackground(JSON.parse(luuBgr)); // Lấy màu nền cũ đã lưu
    setFlag(true);
    console.log("Giờ cờ mới là true");
    
  }, []);
  useEffect(() => {
    if (!flag) {
      console.log("[data]Cờ vẫn là false chưa được chạy");
      return;
    }
    console.log("Đã lưu vào localStorage");
    console.log("Cờ đã là true được chạy rồi");
    localStorage.setItem("Day4_bai3", JSON.stringify(List)); // Lưu data vào
  }, [List, flag]);
  useEffect(() => {
    if (!flag) {
      console.log("[background]Cờ vẫn là false chưa được chạy");
     return;
    }
    console.log("Cờ đã là true được chạy rồi");
    console.log("Đã lưu vào localStorage");
    localStorage.setItem("bgr", JSON.stringify(background)); // Lưu lại vào localStorage
  }, [background, flag]);
  console.log("Test xem dòng này chạy trước hay sau useEffect")
  console.log(flag);
  
  const m = background === "toi" ? mau.toi : mau.sang;

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: m.bg,
        color: m.text,
        borderColor: m.border,
      }}
    >
      <div style={styles.headerTop}>
        <h2 style={{ ...styles.heading, color: m.heading }}>
          📋 Quản Lý Công Việc (To-do Tabs)
        </h2>
        <button
          onClick={() => setbackground(background === "toi" ? "sang" : "toi")}
          style={{
            ...styles.btnToggleTheme,
            backgroundColor: m.cardBg,
            color: m.text,
            borderColor: m.border,
          }}
        >
          {background === "toi" ? "☀️ Sáng" : "🌙 Tối"} Đổi màu nền
        </button>
      </div>

      {/* Các nút Tab chuyển đổi */}
      <div style={styles.tabRow}>
        <button
          onClick={() => setTab("all")}
          style={
            tab === "all"
              ? styles.tabActive
              : {
                  ...styles.tabBtn,
                  backgroundColor: m.cardBg,
                  color: m.text,
                  borderColor: m.border,
                }
          }
        >
          Tất cả công việc
        </button>
        <button
          onClick={() => setTab("complete")}
          style={
            tab === "complete"
              ? styles.tabActive
              : {
                  ...styles.tabBtn,
                  backgroundColor: m.cardBg,
                  color: m.text,
                  borderColor: m.border,
                }
          } // 👉 Đã sửa lỗi check tab === "all"
        >
          Đã hoàn thành
        </button>
        <button
          onClick={() => setTab("not_complete")}
          style={
            tab === "not_complete"
              ? styles.tabActive
              : {
                  ...styles.tabBtn,
                  backgroundColor: m.cardBg,
                  color: m.text,
                  borderColor: m.border,
                }
          } // 👉 Đã sửa lỗi check tab === "all"
        >
          Chưa hoàn thành
        </button>
      </div>

      {/* Danh sách công việc theo tab */}
      <div style={styles.listContainer}>
        {PageNow.length === 0 ? (
          <p
            style={{
              ...styles.emptyText,
              backgroundColor: m.cardBg,
              borderColor: m.border,
              color: m.subText,
            }}
          >
            Không có việc nào
          </p>
        ) : (
          PageNow.map((x) => (
            <div key={x.id}>
              <ListTodo
                job={x.job}
                done={x.done}
                onClick={() => StateTodo(x.id)}
                onRemove={() => RemoveTodo(x.id)}
                m={m}
              />
            </div>
          ))
        )}
      </div>

      {/* Thống kê và nút thêm */}
      <div style={{ ...styles.footerBox, borderColor: m.border }}>
        <div
          style={{
            ...styles.statsGroup,
            backgroundColor: m.cardBg,
            borderColor: m.border,
          }}
        >
          <span style={{ ...styles.statItem, color: m.text }}>
            Tổng số công việc: <strong>{TotalTodo}</strong>
          </span>
          <span style={{ ...styles.statItem, color: m.text }}>
            Hoàn thành:{" "}
            <strong style={{ color: "#10b981" }}>{TotalToDoComplete}</strong>
          </span>
          <span style={{ ...styles.statItem, color: m.text }}>
            Chưa xong:{" "}
            <strong style={{ color: "#f59e0b" }}>
              {TotalTodo - TotalToDoComplete}
            </strong>
          </span>
        </div>
        <button onClick={() => AddTodo()} style={styles.btnAdd}>
          ➕ Thêm việc mới
        </button>
      </div>
    </div>
  );
}

// 🎨 Cục object định nghĩa màu sắc cho 2 chế độ Sáng / Tối
const mau = {
  sang: {
    bg: "#f8fafc", // Màu nền tổng thể sáng
    cardBg: "#ffffff", // Màu nền card / form
    text: "#0f172a", // Màu chữ chính
    subText: "#64748b", // Màu chữ phụ / xám
    border: "#cbd5e1", // Màu đường viền
    inputBg: "#ffffff", // Màu nền ô input
    heading: "#b45309", // Màu tiêu đề
  },
  toi: {
    bg: "#121212", // Màu nền tổng thể tối
    cardBg: "#1e1e1e", // Màu nền card / form
    text: "#ffffff", // Màu chữ chính
    subText: "#aaa", // Màu chữ phụ / xám
    border: "#333333", // Màu đường viền
    inputBg: "#1e1e1e", // Màu nền ô input
    heading: "#ffc107", // Màu tiêu đề vàng gold
  },
};

const styles = {
  container: {
    maxWidth: "750px",
    margin: "30px auto",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "24px",
    fontFamily: "sans-serif",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
    gap: "10px",
  } as React.CSSProperties,

  heading: {
    fontSize: "22px",
    margin: 0,
  } as React.CSSProperties,

  btnToggleTheme: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  } as React.CSSProperties,

  tabRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  tabBtn: {
    border: "1px solid",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s",
  } as React.CSSProperties,

  tabActive: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "1px solid #2563eb",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
  } as React.CSSProperties,

  listContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    marginBottom: "20px",
    minHeight: "120px",
  } as React.CSSProperties,

  emptyText: {
    textAlign: "center" as const,
    fontStyle: "italic",
    padding: "30px 0",
    borderRadius: "10px",
    border: "1px dashed",
  } as React.CSSProperties,

  todoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid",
    borderRadius: "10px",
    padding: "14px 18px",
  } as React.CSSProperties,

  todoInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  } as React.CSSProperties,

  jobTitle: {
    fontSize: "16px",
    margin: 0,
  } as React.CSSProperties,

  badgeDone: {
    fontSize: "12px",
    color: "#10b981",
  } as React.CSSProperties,

  badgeNotDone: {
    fontSize: "12px",
    color: "#f59e0b",
  } as React.CSSProperties,

  actionGroup: {
    display: "flex",
    gap: "8px",
  } as React.CSSProperties,

  btnMark: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  btnUnmark: {
    backgroundColor: "#d97706",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  btnRemove: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  footerBox: {
    borderTop: "1px solid",
    paddingTop: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  } as React.CSSProperties,

  statsGroup: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    flexWrap: "wrap" as const,
    gap: "8px",
  } as React.CSSProperties,

  statItem: {},

  btnAdd: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "opacity 0.2s",
  } as React.CSSProperties,
};
