"use client";
import { useEffect, useState } from "react";
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
function LayAPI() {
  const [ketqua, setKetqua] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Id, setID] = useState(1);
  useEffect(() => {
    let biHuy = false;
    async function PostAPI() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${Id}`,
        );
        if (biHuy) return;
        if (res.status === 404) {
          setError("Không lấy được dữ liệu");
          setKetqua(null);
          return;
        }
        if (!res.ok) throw new Error("Lỗi không lấy được API" + res.status);
        const data = await res.json();
        if (biHuy) return;
        setKetqua(data);
      } catch (error) {
        console.log("[Catch đang bắt lỗi :]" + error);
        setError("Lỗi không lấy được dữ liệu");
      } finally {
        if (!biHuy) setLoading(false);
      }
    }
    PostAPI();
    return () => {
      biHuy = true;
    };
  }, [Id]);
  return (
    <div>
      {loading && <p>Đang lấy dữ liệu...</p>}
      {error !== "" && <span style={{ color: "red" }}>{error}</span>}
      <select value={Id} onChange={(e) => setID(Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => (
          <option id={`${i + 1}`}
            value={i + 1}
            key={i + 1}
          >
            {i + 1}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
        }}
      >
        Lấy dữ liệu
      </button>
      <div>
        {ketqua &&
          <>
          <p>Có {ketqua.length} bài viết của người dùng có Id {Id }</p>
          {ketqua.map((item) => (
            <div key={item.id}>
              <p>UserId:{item.userId}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
          </>
        }
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <div>
      <h1>API Post</h1>
      <LayAPI />
    </div>
  );
}
