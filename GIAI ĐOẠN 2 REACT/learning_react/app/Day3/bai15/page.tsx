// // Bắt đầu 7:28 ,Dừng lại và kiểm tra score rất lâu:8h03 , tiếp tuc8:30
// //Kết thúc:
// Mảng ban đầu 3 học sinh { id, name, className, score }.
// Form 3 ô: họ tên, lớp, điểm. Bấm nút hoặc nhấn Enter đều thêm được; thêm xong cả 3 ô trống lại.
// Kiểm tra dữ liệu: tên và lớp không được rỗng (kể cả toàn dấu cách); điểm phải là số từ 0 đến 10.
// Sai thì hiện một dòng chữ đỏ nói rõ lý do, không thêm gì.
// Mỗi học sinh có nút Xóa.
// Phía trên hiện Tổng số học sinh và Điểm trung bình, đều tính ra từ mảng, không tạo state thứ hai.
// Khi chưa có học sinh nào thì điểm trung bình hiện "Chưa có", không hiện NaN.
"use client";
import { useState } from "react";
const initialStudents = [
  { id: 1, name: "Nguyễn Văn An", className: "12A1", score: 8.5 },
  { id: 2, name: "Trần Thị Bình", className: "12A2", score: 9.0 },
  { id: 3, name: "Lê Hoàng Cường", className: "12A1", score: 7.2 },
  { id: 4, name: "Phạm Minh Đức", className: "12A3", score: 6.5 },
  { id: 5, name: "Hoàng Thị Hoa", className: "12A2", score: 9.5 },
  { id: 6, name: "Vũ Đình Hùng", className: "12A3", score: 8.0 },
  { id: 7, name: "Ngô Duy Anh", className: "12A1", score: 10.0 },
];
function ListStudent(props: {
  name: string;
  className: string;
  score: number;
  onRemove: () => void;
}) {
  return (
    <div>
      <h3>{props.name}</h3>
      <span>{props.className}</span>
      <span>{props.score}</span>
      <button onClick={props.onRemove}>Xóa</button>
    </div>
  );
}
export default function Home() {
  const [Student, setStudent] = useState(initialStudents);
  const [newStd, setNewStd] = useState({
    name: "",
    className: "",
    score: "",
  });
  const [Loi, setLoi] = useState("");
  function AddStudent(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    if (newStd.name.trim() === "") {
      setLoi("Tên không được bỏ trống");
      return;
    }
    if (newStd.className.trim() === "") {
      setLoi("Lớp không được bỏ trống");
      return;
    }
    if (newStd.score.trim() === "") {
      setLoi("Điểm nhập không hợp lệ");
      return;
    }
    if (!(Number(newStd.score) >=0) || !(Number(newStd.score) <=10)) {
      setLoi("Điểm nhập không hợp lệ");
      return;
    }
    setStudent([
      {
        id: Date.now(),
        name: newStd.name.trim(),
        className: newStd.className.trim(),
        score: Number(newStd.score),
      },
      ...Student,
    ]);
    setLoi("");
    setNewStd({
    name: "",
    className: "",
    score: "",
  })
  }
  function RemoveStd(id: number) {
    setStudent(Student.filter((x) => x.id !== id));
  }
  const TotalStudent = Student.length;
  const AvgScore =
    Student.reduce((acc, cur) => acc + cur.score, 0) / Student.length;
  return (
    <div>
      {/* //Khổi hiện điểm và tổng số hs */}
      <div>
        <h3>tổng số hs:{TotalStudent}</h3>
        {Student.length > 0 ? (
          <h3>điểm trung bình{AvgScore.toFixed(2)}</h3>
        ) : (
          <h3>Chưa có học sinh</h3>
        )}
      </div>
      {/* Khối hiển thị học sinh ban đã có */}
      <div>
        {Student.map((x) => (
          <div key={x.id}>
            <ListStudent
              name={x.name}
              className={x.className}
              score={x.score}
              onRemove={() => RemoveStd(x.id)}
            />
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={AddStudent}>
          <input
            type="text"
            value={newStd.name}
            onChange={(e) => setNewStd({ ...newStd, name: e.target.value })}
            placeholder="Nhập tên học sinh"
          />
          <input
            type="text"
            value={newStd.className}
            onChange={(e) =>
              setNewStd({ ...newStd, className: e.target.value })
            }
            placeholder="Nhập tên lớp học sinh"
          />
          <input
            type="text"
            value={newStd.score}
            onChange={(e) => setNewStd({ ...newStd, score: e.target.value })}
            placeholder="Nhập điểm học sinh"
          />
          <span style={{ color: "red" }}>{Loi}</span>
          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  );
}
