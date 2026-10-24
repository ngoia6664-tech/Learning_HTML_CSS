import { useState } from "react";

export default function TodoItem(props: {
  job: string;
  done: boolean;
  onClickDone: () => void;
  onClickRemove: () => void;
  onLuu: (chuMoi: string) => void;
}) {
  const [Dangsua, setIdDangSua] = useState(false);
  const [chuDangGo, setChuDangGo] = useState(props.job);
  const [error, setError] = useState("");
  return (
    <>
      {!Dangsua ? (
        <h3>{props.job}</h3>
      ) : (
        <>
          <input
            type="text"
            value={chuDangGo}
            onChange={(e) => setChuDangGo(e.target.value)}
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
      <button onClick={() => {
        setIdDangSua(true);
        setChuDangGo(props.job);
      }}>Sửa công việc</button>
      {Dangsua && (
        <button
          onClick={() => {
            if(chuDangGo.trim() === ""){
              setError("Không được để trống");
              return;
            }
            props.onLuu(chuDangGo.trim());
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
