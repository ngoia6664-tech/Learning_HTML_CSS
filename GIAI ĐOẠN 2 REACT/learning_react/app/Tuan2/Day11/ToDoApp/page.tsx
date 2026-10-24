"use client";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import BtnTab from "./components/Tab";
const initialTasks = [
  { id: 1, job: "Học lập trình ReactJS", done: false },
  { id: 2, job: "Đi chợ mua nguyên liệu nấu ăn", done: true },
  { id: 3, job: "Chạy bộ 30 phút buổi tối", done: false },
];
export default function Home() {
  const [Job, setJob] = useState(initialTasks);
  const [flag, setFlag] = useState(false); // Cờ để duyệt dữ liệu
  const [viecMoi, setViecMoi] = useState("");
  const [Tab, setTab] = useState("all"); // Kiểm tra trạng thái các tab
  const [error, setError] = useState("");
  //Các hàm
  //Sửa done
  function onClickDone(id: number) {
    setJob(Job.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }
  // Thêm Job
  function AddJob() {
    if (viecMoi.trim() === "") {
      setError("Việc không thể bỏ trống");
      return;
    }
    setJob([...Job, { id: Date.now(), job: viecMoi.trim(), done: false }]);
    setError("");
    setViecMoi("");
  }
  // XÓa Job
  function RemoveJob(id: number) {
    setJob(Job.filter((x) => x.id !== id));
  }
  // Sửa job
  // Lưu sửa
  function SaveJob(chuMoi: string, id: number) {
    setJob(Job.map((x) => (x && x.id === id ? { ...x, job: chuMoi } : x)));
  }
  const JobDangHien = Job.filter((x) => {
    if (Tab === "all") return x;
    if (Tab === "complete") return x.done;
    if (Tab === "not_complete") return !x.done;
  });
  const ToTalAllJob = Job.length;
  const ToTalAllJobComplete = Job.filter((x) => x.done).length;
  // Doc du lieu tu storage
  useEffect(() => {
    const data = localStorage.getItem("Day7_bai1");
    if (data) setJob(JSON.parse(data));
    setFlag(true);
  }, []);
  useEffect(() => {
    if (!flag) return;
    localStorage.setItem("Day7_bai1", JSON.stringify(Job));
  }, [Job, flag]);
  return (
    <div>
      <div className="button_tab">
        <BtnTab nameTab="Tất cả công việc" soLuong={ToTalAllJob} onClick={() => setTab("all")} />
        <BtnTab nameTab="Hoàn thành" soLuong={ToTalAllJobComplete} onClick={() => setTab("complete")} />
        <BtnTab nameTab="Chưa hoàn thành" soLuong={ToTalAllJob - ToTalAllJobComplete} onClick={() => setTab("not_complete")} />
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
        <button onClick={() => AddJob()}>+ Thêm công việc </button>
      </div>
      <div className="ListJob" style={{
        display:"flex",
        flexDirection:"column",
        gap:"12px"
      }}>
        {JobDangHien.length === 0 ? (
          <h3>Không có công việc nào ở mục này</h3>
        ) : (
          <>
            {JobDangHien.map((x) => (
              <div key={x.id} style={{
                display:"flex",
                flexDirection:"column",
                gap:"2px",
                padding:"8px",
                border:"1px solid white",
                width:"fit-content"
              }}>
                <TodoItem
                  job={x.job}
                  done={x.done}
                  onClickDone={() => onClickDone(x.id)}
                  onClickRemove={() => RemoveJob(x.id)}
                  onLuu={(chuMoi) => SaveJob(chuMoi, x.id)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
