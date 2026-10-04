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
    <div style={styles.studentCard}>
      <div style={styles.studentInfo}>
        <h3 style={styles.studentName}>{props.name}</h3>
        <span style={styles.studentClass}>Lớp: {props.className}</span>
      </div>
      <div style={styles.studentRight}>
        <span style={styles.studentScore}>Điểm: {props.score}</span>
        <button onClick={props.onRemove} style={styles.btnRemove}>Xóa</button>
      </div>
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
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Quản Lý Học Sinh</h2>
      {/* //Khổi hiện điểm và tổng số hs */}
      <div style={styles.statsBox}>
        <div style={styles.statItem}>Tổng số hs: <strong>{TotalStudent}</strong></div>
        <div style={styles.statItem}>
          {Student.length > 0 ? (
            <span>Điểm trung bình: <strong style={{ color: "#10b981" }}>{AvgScore.toFixed(2)}</strong></span>
          ) : (
            <span>Chưa có học sinh</span>
          )}
        </div>
      </div>
      {/* Khối hiển thị học sinh ban đã có */}
      <div style={styles.listContainer}>
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
      <div style={{ marginTop: "24px" }}>
        <form onSubmit={AddStudent} style={styles.form}>
          <h3 style={styles.formTitle}>Thêm học sinh mới</h3>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newStd.name}
              onChange={(e) => setNewStd({ ...newStd, name: e.target.value })}
              placeholder="Nhập tên học sinh"
              style={styles.input}
            />
            <input
              type="text"
              value={newStd.className}
              onChange={(e) =>
                setNewStd({ ...newStd, className: e.target.value })
              }
              placeholder="Nhập tên lớp học sinh"
              style={styles.input}
            />
            <input
              type="text"
              value={newStd.score}
              onChange={(e) => setNewStd({ ...newStd, score: e.target.value })}
              placeholder="Nhập điểm học sinh"
              style={styles.input}
            />
          </div>
          <span style={{ color: "#ef4444", fontSize: "13px", fontWeight: 500 }}>{Loi}</span>
          <button type="submit" style={styles.btnSubmit}>Thêm</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 Cục CSS giao diện viết trực tiếp bằng JS Object (Logic giữ nguyên 100%)
const styles = {
  container: {
    maxWidth: "700px",
    margin: "30px auto",
    backgroundColor: "#121212",
    border: "1px solid #2a2a2a",
    borderRadius: "14px",
    padding: "24px",
    color: "#ffffff",
    fontFamily: "sans-serif",
    width:"100%"
  } as React.CSSProperties,

  heading: {
    color: "#ffc107",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  statsBox: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    padding: "14px 18px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
  } as React.CSSProperties,

  statItem: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,

  listContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  } as React.CSSProperties,

  studentCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "14px 18px",
  } as React.CSSProperties,

  studentInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  } as React.CSSProperties,

  studentName: {
    color: "#ffc107",
    fontSize: "16px",
    margin: "0",
  } as React.CSSProperties,

  studentClass: {
    color: "#aaa",
    fontSize: "13px",
  } as React.CSSProperties,

  studentRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  } as React.CSSProperties,

  studentScore: {
    color: "#10b981",
    fontSize: "15px",
    fontWeight: "bold",
  } as React.CSSProperties,

  btnRemove: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  } as React.CSSProperties,

  form: {
    backgroundColor: "#18181b",
    border: "1px solid #333",
    padding: "18px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  } as React.CSSProperties,

  formTitle: {
    color: "#ffc107",
    fontSize: "16px",
    margin: "0 0 4px 0",
  } as React.CSSProperties,

  inputGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  } as React.CSSProperties,

  input: {
    padding: "10px 14px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  btnSubmit: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  } as React.CSSProperties,
};