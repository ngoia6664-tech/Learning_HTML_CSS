// Bài 6: To-do app đầy đủ (mini-project Tuần 1)

// File: app/Tuan1/todo-app/page.tsx. Ước tính 1,5 đến 2 tiếng, chia hai buổi như dưới. Logic em tự viết, CSS để AI hoặc copy (nhớ commit trước và git diff sau).

// Chức năng
// Mảng ban đầu 3 việc { id, job, done }.
// Thêm việc bằng ô nhập thật: bấm nút hoặc Enter đều được, thêm xong ô trống lại. Ô rỗng hoặc toàn dấu cách thì hiện một dòng chữ đỏ, không thêm.
// Tick Xong và bỏ tick.
// Xóa từng việc.
// Sửa: nút Sửa, ô nhập có sẵn chữ cũ, nút Lưu và Hủy. Ô rỗng thì không lưu. Chỉ một việc đang sửa tại một lúc.
// Ba tab Tất cả / Đã xong / Chưa xong, tab đang chọn tô màu khác, tab trống hiện "Không có việc nào".
// Thống kê: tổng số, đã xong, chưa xong (tính ra).
// Lưu localStorage: F5 vẫn còn nguyên, kể cả xóa hết việc rồi F5 không hồi sinh việc mặc định.
// F12 Console không có chữ đỏ liên quan page.tsx.
"use client";
import { use, useEffect, useState } from "react";
const initialTodos = [
  { id: 1, job: "Học html css js cơ bản", done: true },
  { id: 2, job: "Học js nâng cao + git thực chiến", done: true },
  { id: 3, job: "React", done: false },
];
function ListToDo(props: {
  job: string;
  done: boolean;
  onTick: () => void;
  onChange: () => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <h3>{props.job}</h3>
      <span>{props.done ? "Hoàn thành" : " Chưa Hoàn thành"}</span>
      <button onClick={props.onTick}>
        {props.done ? "Hủy" : "Hoàn thành"}
      </button>
      <button onClick={props.onChange}>Sửa</button>
      <button onClick={props.onRemove}>Xóa</button>
    </div>
  );
}
export default function Home() {
  //khai báo
  const [Todo, setTodo] = useState(initialTodos); // usestate dữ liệu
  const [flag, setFlag] = useState(false); // Cờ để lấy dữ liệu
  const [TodoAdd, setTodoAdd] = useState("");
  const [dangSuaId, setDangSuaId] = useState();
  //... xử lý sửa sau
  useEffect(() => {
    const Data = localStorage.getItem("Day5_bai6");
    if (Data) setTodo(JSON.parse(Data));
    setFlag(true);
  }, []); // Đọc dữ liệu từ local
  useEffect(() => {
    if (!flag) return;
    localStorage.setItem("Day5_bai6", JSON.stringify(Todo));
  }, [Todo, flag]);
  function onClick(id: number) {
    setTodo(Todo.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }
  function Remove(id: number) {
    setTodo(Todo.filter((x) => x.id !== id));
  }
  function OnChange(id: number) {}
  function addToDo(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    if (TodoAdd.trim() === "") return;
    setTodo([...Todo, { id: Date.now(), job: TodoAdd.trim(), done: false }]);
    setTodoAdd("")
  }
  return (
    <div>
      {Todo.map((x) => (
        <div key={x.id}>
          <ListToDo
            job={x.job}
            done={x.done}
            onChange={() => OnChange(x.id)}
            onRemove={() => Remove(x.id)}
            onTick={() => onClick(x.id)}
          />
        </div>
      ))}
      <form onSubmit={addToDo}>
        <input
          type="text"
          value={TodoAdd}
          onChange={(e) => setTodoAdd(e.target.value)}
          placeholder="Nhập công việc mới"
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
