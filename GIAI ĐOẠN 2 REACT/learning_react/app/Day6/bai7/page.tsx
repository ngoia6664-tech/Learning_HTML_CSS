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
    <div>
      <span>{props.job}</span>
      <span>{props.done ? "Hoàn thành" : "Chưa hoàn thành"}</span>
      <button onClick={props.onClickDone}>Đổi</button>
      <button onClick={props.onClickChange}>Sửa</button>
      <button onClick={props.onclickRemove}>Xóa</button>
    </div>
  );
}
export default function Home() {
  const [Job, setJob] = useState(initialTasks);
  const [IdDangSua, setIdDangSua] = useState<number | null>(null);
  const [chuDangGo, setChuDangGo] = useState("");
  const [flag, setFlag] = useState(false);
  const [Tab, setTab] = useState("all");
  function BatDauSua(id: number, job: string) {
    setIdDangSua(id);
    setChuDangGo(job);
  }
  function LuuSua() {
    if (chuDangGo.trim() === "") return;
    setJob(
      Job.map((x) => (x && x.id === IdDangSua ? { ...x, job: chuDangGo } : x)),
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
    setJob([...Job, { id: Date.now(), job: "test", done: false }]);
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
  const DangHien = Job.filter((x) =>{
  if(Tab ==="all") return x
  if (Tab === "complete") return x.done
  if (Tab === "not_complete") return !x.done
  })
  
  
  return (
    <div>
      <button onClick={() => setTab("all")}>Tất cả</button>
      <button onClick={() => setTab("complete")}>Đã xong</button>
      <button onClick={() => setTab("not_complete")}>Chưa xong</button>
      {DangHien.map((x) => (
        <div key={x.id}>
          {IdDangSua === x.id ? (
            <div>
              <input
                type="text"
                value={chuDangGo}
                onChange={(e) => setChuDangGo(e.target.value)}
              />
              <span>{x.done ? "Hoàn thành" : "Chưa hoàn thành"}</span>
              <button onClick={() => OnClickDone(x.id)}>Đổi</button>
              <button onClick={LuuSua}>Lưu</button>
              <button onClick={HuySua}>Hủy</button>
              <button onClick={() => Remove(x.id)}>Xóa</button>
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
      ))}
      <button onClick={() => AddJob()}>Thêm</button>
    </div>
  );
}
