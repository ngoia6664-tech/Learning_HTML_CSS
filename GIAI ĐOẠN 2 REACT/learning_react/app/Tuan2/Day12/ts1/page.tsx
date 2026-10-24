"use client";
import { useState } from "react";

type Todo = {
  id: number;
  job: string;
  done: boolean;
  ghiChu?: string; // dấu ? = không bắt buộc phải có
  han? : string
};

function TodoRow(props: { todo: Todo; onToggle: (id: number) => void}) {
  return (
    <div>
      <b>{props.todo.job}</b> - {props.todo.done ? "Xong" : "Chưa"}
      {props.todo.ghiChu && <i> ({props.todo.ghiChu})</i>}
      {props.todo.han && <span>Hạn : ({props.todo.han})</span>}
      <button type="button" onClick={() => props.onToggle(props.todo.id)}>
        Đổi
      </button>
    </div>
  );
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, job: "Học TypeScript", done: false,ghiChu: "9h", han:"2024-06-30" },
    { id: 2, job: "Đi dạy", done: true, ghiChu: "18h", han:"2024-06-30" },
  ]);

  function toggle(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div>
      {todos.map((t) => (
        <TodoRow key={t.id} todo={t} onToggle={toggle} />
      ))}
    </div>
  );
}