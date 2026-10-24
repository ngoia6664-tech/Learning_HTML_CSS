"use client";
import { useState, useEffect } from "react";
const initialTasks = [
  { id: 1, job: "Học lập trình ReactJS", done: false },
  { id: 2, job: "Đi chợ mua nguyên liệu nấu ăn", done: true },
  { id: 3, job: "Chạy bộ 30 phút buổi tối", done: false },
];
function ListToDo(props: {
  job: string;
  done: boolean;
  onClickDone: () => void;
  onClickRemove: () => void;
  onClickChange: () => void;
}) {
  return (
    <>
      <h3>{props.job}</h3>
      <span>{props.done ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
      <button onClick={props.onClickDone}>Sửa trạng thái</button>
      <button onClick={props.onClickChange}>Sửa công việc</button>
      <button onClick={props.onClickRemove}>Xóa</button>
    </>
  );
}
export default function Home() {
  const [Job, setJob] = useState(initialTasks);
  const [flag, setFlag] = useState(false); // Cờ để duyệt dữ liệu
  const [viecMoi, setViecMoi] = useState("");
  const [IdDangsua, setIdDangSua] = useState<number | null>(null); // Xem id có null không để quyết định là input hay span
  const [chuDangGo, setChuDangGo] = useState(""); // Kiểm tra chữ đang gõ
  const [Tab, setTab] = useState("all"); // Kiểm tra trạng thái các tab
  const [error, setError] = useState("");
  const [errorSua, setErrorSua] = useState("");
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
  // Bắt đầu sửa
  function startChangeJob(id: number, job: string) {
    setIdDangSua(id);
    setChuDangGo(job);
  }
  // Lưu sửa
  function SaveJob() {
    if (chuDangGo.trim() === "") {
      setErrorSua("Công việc không thể bỏ trống");
      return;
    }
    setJob(
      Job.map((x) =>
        x.id === IdDangsua ? { ...x, job: chuDangGo.trim() } : x,
      ),
    );
    setChuDangGo("");
    setIdDangSua(null);
    setErrorSua("");
  }
  function HuySua() {
    setIdDangSua(null);
    setErrorSua("");
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
        <button onClick={() => setTab("all")}>
          Tất cả công việc({ToTalAllJob})
        </button>
        <button onClick={() => setTab("complete")}>
          Công việc hoàn thành({ToTalAllJobComplete})
        </button>
        <button onClick={() => setTab("not_complete")}>
          Công việc chưa hoàn thành({ToTalAllJob - ToTalAllJobComplete})
        </button>
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
      <div className="ListJob">
        {JobDangHien.length === 0 ? (
          <h3>Không có công việc nào ở mục này</h3>
        ) : (
          <>
            {JobDangHien.map((x) => (
              <div key={x.id}>
                {IdDangsua === x.id ? (
                  <>
                    <input
                      type="text"
                      value={chuDangGo}
                      onChange={(e) => setChuDangGo(e.target.value)}
                    />
                    {errorSua.trim() !== "" ? (
                      <span style={{ color: "red" }}>{errorSua}</span>
                    ) : (
                      ""
                    )}
                    <span>{x.done ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
                    <button onClick={() => onClickDone(x.id)}>
                      Sửa trạng thái
                    </button>
                    <button onClick={() => SaveJob()}>Lưu</button>
                    <button onClick={() => HuySua()}>Hủy </button>
                    <button onClick={() => RemoveJob(x.id)}>Xóa</button>
                  </>
                ) : (
                  <ListToDo
                    job={x.job}
                    done={x.done}
                    onClickChange={() => startChangeJob(x.id, x.job)}
                    onClickDone={() => onClickDone(x.id)}
                    onClickRemove={() => RemoveJob(x.id)}
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
