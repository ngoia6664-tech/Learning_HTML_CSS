"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState([{ id: 1, ten: "Học React" }]);
  console.log("VẼ, list có", list.length, "việc");
  const[DaDoc,setDaDoc] =useState(false)
  // Effect 1: ĐỌC, chạy một lần sau lần vẽ đầu
  useEffect(() => {
    const luu = localStorage.getItem("bai19-todos");
    console.log("EFFECT 1 ĐỌC, luu =", luu);
    if (luu) setList(JSON.parse(luu));
    setDaDoc(true)
    console.log("Đã chạy lần :" +list.length);
    
  }, []);

  // Effect 2: GHI, chạy mỗi khi list đổi
  
  useEffect(() => {
    if(!DaDoc) return
    console.log("EFFECT 2 GHI, list có", list.length, "việc");
    localStorage.setItem("bai19-todos", JSON.stringify(list));
  }, [list,DaDoc]);
  return (
    <div>
      {list.map((x) => (
        <p key={x.id}>{x.ten}</p>
      ))}
      <button
        onClick={() =>
          setList([...list, { id: Date.now(), ten: "Việc " + (list.length + 1) }])
        }
      >
        Thêm
      </button>
    </div>
  );
}