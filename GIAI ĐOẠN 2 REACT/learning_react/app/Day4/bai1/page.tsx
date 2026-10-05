// Bài tập 1: bộ đếm nhớ số

// Một state số, ba nút +1, −1, Reset. getItem trả về chuỗi, nên số đọc lên phải đổi bằng Number(...).
// Xong khi:

// Bấm +1 ba lần rồi F5 vẫn là 3.
// Reset rồi F5 về 0.
// Lần đầu mở trang (chưa lưu gì) hiện 0.
"use client"
import { useEffect, useState } from "react"
export default function Home(){
    const [So,setSo] = useState(0);
    const [Flag, setFlag] = useState(false)
    useEffect(() =>{
        const SaveSo = localStorage.getItem("Day4_bai1");// Phải nhìn lại code vì nhầm
        if(SaveSo) setSo(Number(JSON.parse(SaveSo))); // phải nhìn lại code
        setFlag(true)
    },[])
    useEffect (() => {
        if(!Flag) return
        localStorage.setItem("Day4_bai1" ,JSON.stringify(So));
    },[So,Flag])
    function btnTang(){
        setSo(So+1)
    }
    function btnGiam(){
        setSo(So-1);
    }
    function btnReset(){
        setSo(0);
    }
    return(
        <div>
            <h1>{So}</h1>
            <button onClick={() => btnTang()}>+1</button>
            <button onClick={() => btnGiam()}>-1</button>
            <button onClick={() => btnReset()}>Reset</button>
        </div>
    )
}