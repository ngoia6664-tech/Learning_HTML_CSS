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
    <div>
      <h3>{props.job}</h3>
      <span>{props.done ? "hoàn thành" : "Chưa hoàn thành"}</span>
      <button onClick={props.onClick}>
        {props.done ? " bỏ Tick" : "Tick"}
      </button>
      <button onClick={props.onRemove}>Xóa</button>
    </div>
  );
}
export default function Home() {
  const [List, SetList] = useState(Todo);
  const [tab,setTab] = useState("all");
  function StateTodo(id: number) {
    SetList(List.map((x) => (x && x.id === id ? { ...x, done: !x.done } : x)));
  }
  function RemoveTodo(id: number) {
    SetList(List.filter((x) => x.id !== id));
  }
  function AddTodo(){
    SetList([{id: Date.now(), job: "Công việc mới thêm", done: false } ,...List])
  }

  const PageNow = List.filter((x) =>{
    if(tab==="complete") return x.done
    if(tab==="not_complete") return !x.done
    return true
  })
  // Biến hiện tổng số bài 
  const TotalTodo = List.length;
  const TotalToDoComplete = List.filter((x) => x.done).length
  
  return (
    <div>
        <div style={{display:"flex" , gap:"12px"}}>
            <button onClick={() =>setTab("all")} style={{backgroundColor:"gray"}}>Tất cả công việc</button>
            <button onClick={() => setTab("complete")} style={{backgroundColor:"gray"}}>Công việc đã hoàn thành</button>
            <button onClick={() => setTab("not_complete")} style={{backgroundColor:"gray"}}>Công việc chưa hoàn thành</button>
        </div>
        {PageNow.length===0 ? (<p>Không có công việc</p>) :(
            PageNow.map((x) =>(
                <div key={x.id}>
                    <ListTodo job={x.job} done={x.done} onClick={() => StateTodo(x.id)} onRemove={() => RemoveTodo(x.id)}/>
                </div>
            ))
        )}
        <h3>Tổng số công việc:{TotalTodo}</h3>
        <h3>Tổng số công việc hoàn thành :{TotalToDoComplete}</h3>
        <h3>Tổng số công việc chưa hoàn thành :{TotalTodo-TotalToDoComplete}</h3>
        <button onClick={() => AddTodo()}>Thêm việc</button>
    </div>
  )
}
