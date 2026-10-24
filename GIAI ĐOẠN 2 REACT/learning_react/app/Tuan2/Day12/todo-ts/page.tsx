"use client";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import BtnTab from "./components/tab";
const initialTasks :Todo[] = [
  { id: 1, job: "Học lập trình ReactJS", done: false, han: "2024-06-30" },
  { id: 2, job: "Đi chợ mua nguyên liệu nấu ăn", done: true },
  { id: 3, job: "Chạy bộ 30 phút buổi tối", done: false },
];
type TabName = "all" | "complete" | "not_complete";
type Todo = {
  id: number;
  job: string;
  done: boolean;
  han?: string;
};
export default function Home() {
  const [danhsach, setDanhSach] = useState<Todo[]>(initialTasks);
  const [flag, setFlag] = useState(false); // Cờ để duyệt dữ liệu
  const [viecMoi, setViecMoi] = useState("");
  const [Tab, setTab] = useState<TabName>("all"); // Kiểm tra trạng thái các tab
  const [error, setError] = useState("");
  const [han,sethan] = useState("");
  const [flagHan, setflaghan] = useState(false)
  //Các hàm
  //Sửa done
  function onClickDone(id: number) {
    setDanhSach(danhsach.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }
  // Thêm Job
  function AddJob() {
    if (viecMoi.trim() === "") {
      setError("Việc không thể bỏ trống");
      return;
    }
    setDanhSach([...danhsach, { id: Date.now(), job: viecMoi.trim(), done: false, han: han }]);
    setError("");
    setViecMoi("");
  }
  // XÓa Job
  function RemoveJob(id: number) {
    setDanhSach(danhsach.filter((x) => x.id !== id));
  }
  // Sửa job
  // Lưu sửa
  function SaveJob(chuMoi: string, id: number , hanMoi:string) {
    setDanhSach(danhsach.map((x) => (x && x.id === id ? { ...x, job: chuMoi, han:hanMoi } : x)));
  }
  const JobDangHien = danhsach.filter((x) => {
    if (Tab === "all") return x;
    if (Tab === "complete") return x.done;
    if (Tab === "not_complete") return !x.done;
  });
  const ToTalAllJob = danhsach.length;
  const ToTalAllJobComplete = danhsach.filter((x) => x.done).length;
  // Doc du lieu tu storage
  useEffect(() => {
    const data = localStorage.getItem("Day12_todo");
    if (data) setDanhSach(JSON.parse(data) as Todo[]);
    setFlag(true);
  }, []);
  useEffect(() => {
    if (!flag) return;
    localStorage.setItem("Day12_todo", JSON.stringify(danhsach));
  }, [danhsach, flag]);
  return (
    <div>
      <div className="button_tab">
        <BtnTab
          nameTab="Tất cả công việc"
          soLuong={ToTalAllJob}
          onClick={() => setTab("all")}
        />
        <BtnTab
          nameTab="Hoàn thành"
          soLuong={ToTalAllJobComplete}
          onClick={() => setTab("complete")}
        />
        <BtnTab
          nameTab="Chưa hoàn thành"
          soLuong={ToTalAllJob - ToTalAllJobComplete}
          onClick={() => setTab("not_complete")}
        />
      </div>
      <div className="addJob">
        <input
          type="text"
          value={viecMoi}
          onChange={(e) => setViecMoi(e.target.value)}
        />
        {error.trim() !== "" ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : (
          ""
        )}
        {flagHan ? (<>
        <input type="text" value={han} onChange={(e) =>sethan(e.target.value)} placeholder="24-10-2026" />
        <button onClick={() => setflaghan(false)}>Hủy</button>
        </>) :(<button onClick={() => setflaghan(true)}>Thêm hạn</button>)}
          

        <button onClick={() => AddJob()}>+ Thêm công việc </button>
      </div>
      <div
        className="ListJob"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {JobDangHien.length === 0 ? (
          <h3>Không có công việc nào ở mục này</h3>
        ) : (
          <>
            {JobDangHien.map((x) => (
              <div
                key={x.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  padding: "8px",
                  border: "1px solid white",
                  width: "fit-content",
                }}
              >
                <TodoItem
                  job={x.job}
                  done={x.done}
                  onClickDone={() => onClickDone(x.id)}
                  onClickRemove={() => RemoveJob(x.id)}
                  onLuu={(chuMoi , hanMoi) => SaveJob(chuMoi, x.id , hanMoi)}
                  han={x.han}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
