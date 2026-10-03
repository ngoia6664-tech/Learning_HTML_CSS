// 5. Danh sách việc cần làm: nút Thêm (việc cố định, id là Date.now()), nút Xóa, nút Xong đổi ✅/⬜. Phần sửa 1 phần tử xem mục 6 trong ghi chú.
"use client";
import { useState } from "react";
//Giờ bắt đầu 11:38 hoàn thành:11:48
const Todo = [
  { id: 1, job: "Học html css js cơ bản", done: true },
  { id: 2, job: "Học js nâng cao + git thực chiến", done: true },
  { id: 3, job: "React", done: false },
];
function ListJob(props:{job:string,done:boolean,onRemove:() => void , onTick:() => void}){
  return(
    <div>
      <h3>Công việc:{props.job}</h3>
      <span>{props.done ? "✅" :"⬜"}</span>
      <button onClick={props.onTick} style={{
        backgroundColor:"gray"
      }}>{props.done ? "Chuyển thành chưa hoàn thành":"Hoàn Thành"}</button>
      <button onClick={props.onRemove} style={{backgroundColor:"gray"}}>Xóa</button>
    </div>
  )
}
export default function Home(){
  const [job,setJob] =useState(Todo);
  function btnTickJob(id:number){
    setJob(job.map((x) => x && x.id === id ? {...x , done:!x.done} :x))
  }
  function btnRemoveJob(id:number){
    setJob(job.filter((x) => x.id !== id))
  }
  function btnAddJob(text:string){
    setJob([...job , {id:Date.now() ,job:text,done:false}]);
  }
  const JobComplete = job.filter((x) => x.done).length
  const TotalJob = job.length
  return(
    <div>
      <h3>Tổng số viêc:{TotalJob}</h3>
      <h3>Tổng số việc đã hoàn thành:{JobComplete}</h3>
      <h3>Chưa hoàn thành:{TotalJob-JobComplete}</h3>
      {job.map((x) => (
        <div key={x.id}>
          <ListJob job={x.job} done={x.done} onRemove={() => btnRemoveJob(x.id)} onTick={() => btnTickJob(x.id)}
          />
        </div>
      ))}
      <button onClick={() => btnAddJob("việc mới")}>Thêm</button>
    </div>
  )
}
