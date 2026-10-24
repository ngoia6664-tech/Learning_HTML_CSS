"use client";
import { useState, useEffect } from "react";
type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
};
function LayAPI() {
  const [ketqua, setKetqua] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [NameFind, setNameFind] = useState("");
  const [NameFindSubmit, setNameFindSubmit] = useState("");
  useEffect(() => {
    if(NameFindSubmit.trim() === ""){
      setKetqua(null);
      return;
    } 
    let biHuy = false;
    async function Pokemon() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(NameFindSubmit.trim().toLowerCase())}`,
        );
        if (biHuy) return;
        if (res.status === 404) {
          setError("Không tìm thấy pokenmon có tên là " + NameFindSubmit);
          setKetqua(null); // Phải nhìn lại
          return;
        }
        if (!res.ok) throw new Error("Lỗi không lấy được API" + res.status);
        const data = await res.json();
        if (biHuy) return;
        setKetqua(data);
      } catch (error) {
        if (biHuy) return;
        setError("Lỗi không lấy được dữ liệu");
        console.log("[Catch đang bắt lỗi :]" + error);
      } finally {
        if (!biHuy) setLoading(false);
      }
    }
    Pokemon();
    return () => {
      biHuy = true;
    };
  }, [NameFindSubmit]);
  return (
    <div>
      {loading && <p>Đang tìm kiếm...</p>}
      {error !== "" && <span style={{ color: "red" }}>{error}</span>}
      {ketqua && (
        <div>
          {ketqua.sprites.front_default && (
            <img src={ketqua.sprites.front_default} alt={ketqua.name} />
          )}
          <h3>
            ID:{ketqua.id} Name:{ketqua.name}
          </h3>
          <p>
            Chiều cao:{ketqua.height} Cân nặng:{ketqua.weight}
          </p>
        </div>
      )}
      <br></br>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const tuKhoa = NameFind.trim().toLowerCase();
          if (tuKhoa.trim() === "") {
            setKetqua(null);
            setError("Vui lòng nhập tên pokemon");
            return;
          }
          setNameFindSubmit(NameFind.trim().toLowerCase());
        }}
      >
        <input
          type="text"
          value={NameFind}
          onChange={(e) => setNameFind(e.target.value)}
        />
        <button type="submit">Tìm kiếm</button>
      </form>
      <br></br>
    </div>
  );
}
export default function Home() {
  return <LayAPI />;
}
