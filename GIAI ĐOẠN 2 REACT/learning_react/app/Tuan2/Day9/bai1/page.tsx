"use client";
import { useEffect, useState } from "react";

type User = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
};
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [LamLai, setLamLai] = useState(false);
  useEffect(() => {
    async function LayDuLieu() {
      setLoading(true);
      setError("");
      try {
        console.log("mày đã chạy mấy lần");
        const res = await fetch("https://randomuser.me/api/");
        if (!res.ok) throw new Error("Lỗi đường truyền :" + res.status);
        const data = await res.json();
        setUser(data.results[0]);
      } catch (error) {
        console.log("Catch đang xử lí lỗi:" + error);
        setError("Lỗi không xử lí được dữ liệu");
      } finally {
        setLoading(false);
      }
    }
    LayDuLieu();
  }, [LamLai]);
  if (loading) return <p>Đang tải...</p>;
  if (error !== "")
    return (
      <div>
        <span style={{ color: "red" }}>{error}</span>
        <button
          onClick={() => {
            setLamLai(!LamLai);
          }}
        >
          thử lại
        </button>
      </div>
    );
  if (!user) return <p>Không có dữ liệu từ user</p>;
  return (
    <div>
      <img src={user.picture.large} alt="Avatar" width="200px" />
      <h3>
        UserName:{user.name.first} {user.name.last}
      </h3>
      <p>Email:{user.email}</p>
      <button
        onClick={() => {
          setLamLai(!LamLai);
        }}
      >
        Làm mới user
      </button>
    </div>
  );
}
