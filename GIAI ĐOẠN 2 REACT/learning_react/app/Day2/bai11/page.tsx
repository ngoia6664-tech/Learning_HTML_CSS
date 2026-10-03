// Bài tập 11: Tab lọc cho To-do (khoảng 30 phút, làm trong khối rảnh vì phải nghĩ)
// Dùng lại To-do của bài tập 5, tự viết từ đầu, không chép mẫu của thầy:

// Có 3 tab Tất cả / Đã xong / Chưa xong.
// Tab nào không có việc thì hiện "Không có việc nào".
// Vẫn có nút Thêm, Xóa, Xong.
// Chỉ có đúng hai state: danh sách gốc và tab đang chọn.

// Xong khi: đứng ở tab "Đã xong" rồi bấm Thêm, việc mới
// không hiện ở tab đó nhưng có ở tab "Tất cả" (vì chưa xong). Bấm Xóa ở tab bất kỳ cũng xóa đúng việc.
//bắt đầu 5:24 , vừa code vừa dạy hoàn thiện 5:48
"use client"; 
import { useState } from "react";

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
}) {
  return (
    <div style={styles.todoCard}>
      <div style={styles.todoInfo}>
        <h3 style={styles.jobTitle}>{props.job}</h3>
        <span style={props.done ? styles.badgeDone : styles.badgeNotDone}>
          {props.done ? "✅ Hoàn thành" : "⏳ Chưa hoàn thành"}
        </span>
      </div>
      <div style={styles.actionGroup}>
        <button onClick={props.onClick} style={props.done ? styles.btnUnmark : styles.btnMark}>
          {props.done ? "Bỏ Tick" : "Tick Xong"}
        </button>
        <button onClick={props.onRemove} style={styles.btnRemove}>Xóa</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [List, SetList] = useState(Todo);
  const [tab, setTab] = useState("all");

  function StateTodo(id: number) {
    SetList(List.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }

  function RemoveTodo(id: number) {
    SetList(List.filter((x) => x.id !== id));
  }

  function AddTodo(){
    SetList([{id: Date.now(), job: "Công việc mới thêm", done: false }, ...List]);
  }

  const PageNow = List.filter((x) =>{
    if(tab === "complete") return x.done;
    if(tab === "not_complete") return !x.done;
    return true;
  });

  // Biến hiện tổng số bài 
  const TotalTodo = List.length;
  const TotalToDoComplete = List.filter((x) => x.done).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Quản Lý Công Việc (To-do Tabs)</h2>

      {/* Các nút Tab chuyển đổi */}
      <div style={styles.tabRow}>
        <button 
          onClick={() => setTab("all")} 
          style={tab === "all" ? styles.tabActive : styles.tabBtn}
        >
          Tất cả công việc
        </button>
        <button 
          onClick={() => setTab("complete")} 
          style={tab === "complete" ? styles.tabActive : styles.tabBtn}
        >
          Đã hoàn thành
        </button>
        <button 
          onClick={() => setTab("not_complete")} 
          style={tab === "not_complete" ? styles.tabActive : styles.tabBtn}
        >
          Chưa hoàn thành
        </button>
      </div>

      {/* Danh sách công việc theo tab */}
      <div style={styles.listContainer}>
        {PageNow.length === 0 ? (
          <p style={styles.emptyText}>Không có việc nào</p>
        ) : (
          PageNow.map((x) => (
            <div key={x.id}>
              <ListTodo 
                job={x.job} 
                done={x.done} 
                onClick={() => StateTodo(x.id)} 
                onRemove={() => RemoveTodo(x.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Thống kê và nút thêm */}
      <div style={styles.footerBox}>
        <div style={styles.statsGroup}>
          <span style={styles.statItem}>Tổng số công việc: <strong>{TotalTodo}</strong></span>
          <span style={styles.statItem}>Hoàn thành: <strong style={{ color: "#10b981" }}>{TotalToDoComplete}</strong></span>
          <span style={styles.statItem}>Chưa xong: <strong style={{ color: "#f59e0b" }}>{TotalTodo - TotalToDoComplete}</strong></span>
        </div>
        <button onClick={() => AddTodo()} style={styles.btnAdd}>➕ Thêm việc mới</button>
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

  heading: {
    color: "#ffc107",
    fontSize: "22px",
    marginBottom: "20px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  tabRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  tabBtn: {
    backgroundColor: "#1e1e1e",
    color: "#aaa",
    border: "1px solid #333",
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
    color: "#71717a",
    textAlign: "center" as const,
    fontStyle: "italic",
    padding: "30px 0",
    backgroundColor: "#18181b",
    borderRadius: "10px",
    border: "1px dashed #333",
  } as React.CSSProperties,

  todoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "14px 18px",
  } as React.CSSProperties,

  todoInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  } as React.CSSProperties,

  jobTitle: {
    color: "#fff",
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
    borderTop: "1px solid #333",
    paddingTop: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  } as React.CSSProperties,

  statsGroup: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#18181b",
    border: "1px solid #333",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    flexWrap: "wrap" as const,
    gap: "8px",
  } as React.CSSProperties,

  statItem: {
    color: "#ccc",
  } as React.CSSProperties,

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