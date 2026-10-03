// Mảng ban đầu 3 sách { id, title, author, price }.
// Form có 3 ô: tên sách, tác giả, giá, và một nút Thêm. Bấm nút hoặc nhấn Enter đều thêm được. Thêm xong, cả 3 ô trống lại.
// Không cho thêm nếu tên sách trống, hoặc giá không phải số lớn hơn 0. Khi đó hiện một dòng chữ đỏ báo lý do,
// và không thêm gì vào danh sách.
// Mỗi sách có nút Xóa. Phía trên danh sách hiện Tổng số sách và Tổng tiền, tính từ mảng mỗi lần vẽ, không tạo state thứ hai (như bài 6).
// Xóa phải chạy đúng với cả sách mới thêm.
// Hai chỗ về công cụ
// price phải lưu là số, không phải chuỗi, thì Tổng tiền mới cộng đúng. Nhớ e.target.value luôn là chuỗi.
// 3 ô thì dùng 3 state, hoặc một state là một object (khi đó cần spread và computed key [key]: value em đã học ở Giai đoạn 0).
//  Cách nào cũng được, em ghi một dòng vì sao chọn.
//Thời gian bắt đầu: 9h10
"use client";
import { useState } from "react";
const initialBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 100,
    saved: false,
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 150,
    saved: false,
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 200,
    saved: false,
  },
];
function Book(props: {
  title: string;
  author: string;
  price: number;
  saved: boolean;
  onSave: () => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <h3>{props.title}</h3>
      <span>{props.author}</span>
      <span>{props.price}</span>
      <button onClick={props.onSave}>{props.saved ? "Hủy Lưu" : "Lưu"}</button>
      <button onClick={props.onRemove}>Xóa</button>
    </div>
  );
}
export default function Home() {
  const [Listbook, setListbook] = useState(initialBooks);
  const [newSach, setNewSach] = useState({ title: "", author: "", price: "" });
  const [loi,setLoi] = useState("")
  function ThemSach(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title= newSach.title;
    const author= newSach.author;
    const price = newSach.price
    if(title.trim()===""){
      setLoi("Tên không được để trống ")
      return
    }
    if(author.trim()===""){
      setLoi("Tác giả không được để trống")
      return
    } 
    if(!(Number(price) >0)){
      setLoi("giá tiền không hợp lệ")
      return
    }
    setListbook([
      ...Listbook,
      {
        id: Date.now(),
        title: newSach.title.trim(),
        author: newSach.author.trim(),
        price: Number(newSach.price),
        saved: false,
      },
    ]);
    setNewSach({ title: "", author: "", price: "" });
    setLoi("")
  }
  function btnRemove(id: number) {
    setListbook(Listbook.filter((x) => x.id !== id));
  }
  function btnSave(id: number) {
    setListbook(
      Listbook.map((x) => (x && x.id === id ? { ...x, saved: !x.saved } : x)),
    );
  }
  const TotalBook = Listbook.length;
  const TotalBookSave = Listbook.filter((x) => x.saved).length;
  const TotalPriceSave = Listbook.reduce(
    (acc, cur) => acc + cur.price,
    0,
  );
  return (
    <div>
      <h3>Tổng sách:{TotalBook}</h3>
      <h3>Tổng sách đã lưu:{TotalBookSave}</h3>
      <h3>Tổng tiền sách :{TotalPriceSave}</h3>
      {/* // Danh sách sách  */}
      <div>
        {Listbook.map((x) => (
          <div key={x.id}>
            <Book
              title={x.title}
              author={x.author}
              price={x.price}
              saved={x.saved}
              onSave={() => btnSave(x.id)}
              onRemove={() => btnRemove(x.id)}
            />
          </div>
        ))}
      </div>
      {/* // Ô nhập liệu */}
      <div>
        <form onSubmit={ThemSach}>
          <input
            type="text"
            value={newSach.title}
            onChange={(e) =>
              setNewSach({ title: e.target.value, author: newSach.author, price: newSach.price })
            }
            placeholder="Nhập tiêu đề"
          />
          <input
            type="text"
            value={newSach.author}
            onChange={(e) =>
              setNewSach({ title: newSach.title, author: e.target.value, price: newSach.price })
            }
             placeholder="Nhập Tác giả"
          />
          <input
            type="text"
            value={newSach.price}
            onChange={(e) =>
              setNewSach({ title: newSach.title, author: newSach.author, price: e.target.value })
            }
             placeholder="Nhập giá tiền"
          />
          <p style={{ color: "red" }}>{loi}</p>
          <button type="submit" style={{backgroundColor:"gray"}}>Thêm sách</button>
        </form>
      </div>
    </div>
  );
}
