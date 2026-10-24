import { useState } from "react";

export default function TodoItem(props: {
  job: string;
  done: boolean;
  onClickDone: () => void;
  onClickRemove: () => void;
  onLuu: (chuMoi: string , hanMoi:string) => void;
  han?: string;
}) {
  const [Dangsua, setIdDangSua] = useState(false);
  const [chuDangGo, setChuDangGo] = useState(props.job);
  const [error, setError] = useState("");
   const [han,sethan] = useState("");
  return (
    <>
      {!Dangsua ? (
        <>
          <h3>{props.job}</h3>
          {props.han && <span>Hạn : ({props.han})</span>}
        </>
      ) : (
        <>
          <input
            type="text"
            value={chuDangGo}
            onChange={(e) => setChuDangGo(e.target.value)}
            placeholder="Nhập tên công việc"
          />
           <input
            type="text"
            value={han}
            onChange={(e) => sethan(e.target.value)}
            placeholder="Nhập hạn , VD:24-10-2026"
          />
          
          {error.trim() !== "" ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : (
            ""
          )}
          <br />
        </>
      )}
      <span>{props.done ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
      <button onClick={props.onClickDone}>Sửa trạng thái</button>
      <button
        onClick={() => {
          setIdDangSua(true);
          setChuDangGo(props.job);
          if(props.han) sethan(props.han)
        }}
      >
        Sửa công việc
      </button>
      {Dangsua && (
        <button
          onClick={() => {
            if (chuDangGo.trim() === "") {
              setError("Không được để trống");
              return;
            }
            props.onLuu(chuDangGo.trim(), han.trim());
            setIdDangSua(false);
            setError("");
          }}
        >
          Lưu
        </button>
      )}
      {Dangsua && <button onClick={() => setIdDangSua(false)}>Hủy</button>}
      <button onClick={props.onClickRemove}>Xóa</button>
    </>
  );
}
