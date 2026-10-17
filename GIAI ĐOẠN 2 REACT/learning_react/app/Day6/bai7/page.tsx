"use client";
import { useEffect, useState } from "react";

const initialTasks = [
  { id: 1, job: "Học lập trình ReactJS", done: false },
  { id: 2, job: "Đi chợ mua nguyên liệu nấu ăn", done: true },
  { id: 3, job: "Chạy bộ 30 phút buổi tối", done: false },
];

//Bắt đầu từ 9h20
function ListJob(props: {
  job: string;
  done: boolean;
  onClickDone: () => void;
  onClickChange: () => void;
  onclickRemove: () => void;
}) {
  return (
    <div style={styles.jobCard}>
      <div style={styles.jobInfo}>
        <span style={{ ...styles.jobText, textDecoration: props.done ? "line-through" : "none", color: props.done ? "#71717a" : "#fff" }}>
          {props.job}
        </span>
        <span style={props.done ? styles.badgeDone : styles.badgeNotDone}>
          {props.done ? "✅ Hoàn thành" : "⏳ Chưa hoàn thành"}
        </span>
      </div>
      <div style={styles.actionGroup}>
        <button onClick={props.onClickDone} style={props.done ? styles.btnUnmark : styles.btnMark}>
          Đổi
        </button>
        <button onClick={props.onClickChange} style={styles.btnWarning}>
          Sửa
        </button>
        <button onClick={props.onclickRemove} style={styles.btnDanger}>
          Xóa
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [Job, setJob] = useState(initialTasks);
  const [IdDangSua, setIdDangSua] = useState<number | null>(null);
  const [chuDangGo, setChuDangGo] = useState("");
  const [flag, setFlag] = useState(false);
  const [Tab, setTab] = useState("all");
  const [viecMoi, setViecMoi] = useState("");
  const [loi, setLoi] = useState("");

  function BatDauSua(id: number, job: string) {
    setIdDangSua(id);
    setChuDangGo(job);
  }

  function LuuSua() {
    if (chuDangGo.trim() === "") return;
    setJob(
      Job.map((x) => (x && x.id === IdDangSua ? { ...x, job: chuDangGo.trim() } : x)),
    );
    setIdDangSua(null);
  }

  function HuySua() {
    setIdDangSua(null);
  }

  function Remove(id: number) {
    setJob(Job.filter((x) => x.id !== id));
  }

  function OnClickDone(id: number) {
    setJob(Job.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }

  function AddJob() {
    if (viecMoi.trim() === ""){
    setLoi("Nội dung không được để trống")
    return
    }
    setJob([...Job, { id: Date.now(), job: viecMoi.trim(), done: false }]);
    setViecMoi("");
    setLoi("")
  }

  useEffect(() => {
    const dataJob = localStorage.getItem("Day6_bai7");
    if (dataJob) setJob(JSON.parse(dataJob));
    setFlag(true);
  }, []);

  useEffect(() => {
    if (!flag) return;
    localStorage.setItem("Day6_bai7", JSON.stringify(Job));
  }, [Job, flag]);

  const DangHien = Job.filter((x) => {
    if (Tab === "all") return x;
    if (Tab === "complete") return x.done;
    if (Tab === "not_complete") return !x.done;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Quản Lý Công Việc & Chỉnh Sửa</h2>

      {/* Các nút Tab lọc */}
      <div style={styles.tabRow}>
        <button 
          onClick={() => setTab("all")} 
          style={Tab === "all" ? styles.tabActive : styles.tabBtn}
        >
          Tất cả ({Job.length})
        </button>
        <button 
          onClick={() => setTab("complete")} 
          style={Tab === "complete" ? styles.tabActive : styles.tabBtn}
        >
          Đã xong ({Job.filter(x => x.done).length})
        </button>
        <button 
          onClick={() => setTab("not_complete")} 
          style={Tab === "not_complete" ? styles.tabActive : styles.tabBtn}
        >
          Chưa xong ({Job.filter(x => !x.done).length})
        </button>
      </div>

      {/* Danh sách công việc */}
      <div style={styles.listContainer}>
        {DangHien.length === 0 ? (
          <p style={styles.emptyText}>Không có công việc nào trong danh mục này.</p>
        ) : (
          DangHien.map((x) => (
            <div key={x.id}>
              {IdDangSua === x.id ? (
                <div style={styles.editCard}>
                  <div style={styles.editFormRow}>
                    <input
                      type="text"
                      value={chuDangGo}
                      onChange={(e) => setChuDangGo(e.target.value)}
                      style={styles.input}
                      autoFocus
                    />
                    <span style={x.done ? styles.badgeDone : styles.badgeNotDone}>
                      {x.done ? "Hoàn thành" : "Chưa hoàn thành"}
                    </span>
                  </div>
                  <div style={styles.actionGroup}>
                    <button onClick={() => OnClickDone(x.id)} style={x.done ? styles.btnUnmark : styles.btnMark}>
                      Đổi trạng thái
                    </button>
                    <button onClick={LuuSua} style={styles.btnSuccess}>Lưu</button>
                    <button onClick={HuySua} style={styles.btnSecondary}>Hủy</button>
                    <button onClick={() => Remove(x.id)} style={styles.btnDanger}>Xóa</button>
                  </div>
                </div>
              ) : (
                <ListJob
                  job={x.job}
                  done={x.done}
                  onClickChange={() => BatDauSua(x.id, x.job)}
                  onClickDone={() => OnClickDone(x.id)}
                  onclickRemove={() => Remove(x.id)}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Khối thêm công việc mới (Ô input + Nút thêm) */}
      <div style={styles.addSection}>
        <input 
          type="text" 
          value={viecMoi} 
          onChange={(e) => setViecMoi(e.target.value)} 
          placeholder="Nhập tên công việc mới..."
          style={styles.input} 
        />
        {loi.trim()!=="" ? (
            <span style={{color:"red"}}>{loi}</span>
        ) :<></>}
        <button onClick={() => AddJob()} style={styles.btnAdd}>
          ➕ Thêm công việc mới
        </button>
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện Dark-Mode xịn xò (Giữ nguyên 100% logic của sếp)
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
    boxSizing: "border-box" as const,
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

  jobCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "14px 18px",
    gap: "12px",
  } as React.CSSProperties,

  editCard: {
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#18181b",
    border: "1px solid #2563eb",
    borderRadius: "10px",
    padding: "14px 18px",
    gap: "12px",
  } as React.CSSProperties,

  editFormRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  } as React.CSSProperties,

  jobInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    flex: 1,
  } as React.CSSProperties,

  jobText: {
    fontSize: "16px",
    fontWeight: 500,
  } as React.CSSProperties,

  badgeDone: {
    fontSize: "12px",
    color: "#10b981",
    fontWeight: 500,
  } as React.CSSProperties,

  badgeNotDone: {
    fontSize: "12px",
    color: "#f59e0b",
    fontWeight: 500,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  actionGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
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

  btnWarning: {
    backgroundColor: "#eab308",
    color: "#000",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "bold",
  } as React.CSSProperties,

  btnSuccess: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "bold",
  } as React.CSSProperties,

  btnSecondary: {
    backgroundColor: "#52525b",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  btnDanger: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  addSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    backgroundColor: "#18181b",
    border: "1px solid #333",
    padding: "16px",
    borderRadius: "10px",
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
    width: "100%",
    transition: "opacity 0.2s",
  } as React.CSSProperties,
};