// 5. Danh sách việc cần làm: nút Thêm (việc cố định, id là Date.now()), nút Xóa, nút Xong đổi ✅/⬜. Phần sửa 1 phần tử xem mục 6 trong ghi chú.
"use client";
import { useState } from "react";

const Todo = [
  { id: 1, job: "Học html css js cơ bản", done: true },
  { id: 2, job: "Học js nâng cao + git thực chiến", done: true },
  { id: 3, job: "React", done: false },
];

function ListToDo(props: { job: string; done: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "16px", color: "#e4e4e7" }}>{props.job}</span>
      <span style={{ fontSize: "18px" }}>{props.done ? "✅" : "⬜"}</span>
    </div>
  );
}

export default function Home() {
  const [stateTodo, setStateTodo] = useState(Todo);

  function btnClick(id: number) {
    setStateTodo(
      stateTodo.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)),
    );
  }

  function btnRemoveToDo(id: number) {
    setStateTodo(stateTodo.filter((x) => x && x.id !== id));
  }
  function btnAddToDo(job:string){
    setStateTodo([...stateTodo ,{id:Date.now(),job:job , done:false}])
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px", color: "#ffc107" }}>Danh Sách Công Việc</h2>
      {stateTodo.map((x) => (
        <div key={x.id} style={styles.card}>
          <ListToDo job={x.job} done={x.done} />
          <div style={styles.actions}>
            <button style={styles.btnStatus} onClick={() => btnClick(x.id)}>
              {x.done ? "Đổi thành chưa xong" : "Đổi thành đã xong"}
            </button>
            <button style={styles.btnDelete} onClick={() => btnRemoveToDo(x.id)}>
              Xóa
            </button>
          </div>
        </div>
      ))}
      <input type="text" id="input-addTodo" value={""}/>
      <button style={styles.btnDelete} onClick={() => btnAddToDo("Học backEnd")}>Thêm công việc</button>
    </div>
  );
}

// 🎨 Cục CSS gom chung viết trực tiếp bằng JS Object
const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
  } as React.CSSProperties,

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    padding: "14px 18px",
    borderRadius: "8px",
    marginBottom: "12px",
  } as React.CSSProperties,

  actions: {
    display: "flex",
    gap: "8px",
  } as React.CSSProperties,

  btnStatus: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  } as React.CSSProperties,

  btnDelete: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
  } as React.CSSProperties,
};