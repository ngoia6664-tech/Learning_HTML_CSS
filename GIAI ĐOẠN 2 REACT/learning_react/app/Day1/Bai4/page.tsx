// 4. Mỗi PostCard tự có state liked riêng (bấm đổi ❤️/🤍),
//  render 3 thẻ. Đoán trước khi chạy: bấm tim bài 1 thì bài 2, 3 có đổi không,
// vì sao? Chạy xong so với dự đoán.
"use client";
import { useState } from "react";
const listPosts = [
  {
    id: 1,
    title: "Lập trình Web với React & Next.js",
    author: "Ngô Duy Anh",
    like: true,
  },
  {
    id: 2,
    title: "Bí quyết ôn thi Vật lý điểm cao",
    author: "Physics Lab",
    like: false,
  },
  {
    id: 3,
    title: "Khám phá thế giới C++ và Game Development",
    author: "Duy Anh",
    like: true,
  },
];
function PostCard(props: { title: string; author: string ,like:boolean}) {
    const [like,setLike] =useState(props.like)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        backgroundColor: "gray",
        borderRadius: "12px",
        padding: "6px 12px",
      }}
    >
      <h3>{props.title}</h3>
      <span>{props.author}</span>
      <button onClick={() => setLike(!like)}>{like ? "❤️" : "🤍" }</button>
    </div>
  );
}
export default function Home() {
  const [state, setState] = useState(listPosts);
  function btnLike(id: number) {
    setState(
      state.map((x) =>
        x&&x.id === id
          ? {
              ...x,
              like: !x.like,
            }
          : x,
      ),
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
        gap: "12px",
      }}
    >
      {state.map((x) => (
        <div key={x.id}>
          <PostCard title={x.title} author={x.author} like={x.like}/>
        </div>
      ))}
    </div>
  );
}
