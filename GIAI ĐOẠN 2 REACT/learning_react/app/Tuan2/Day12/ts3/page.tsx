"use client";
import { useEffect, useState } from "react";
import HienThiPokemon from "./components/Hienthi";
import NutBamLoading from "./components/NutBam";
type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
};
export default function Home() {
  const [chuDangGo, setChuDangGo] = useState("");
  const [loi, setLoi] = useState("");
  const [loading, setLoading] = useState(true);
  const [ketqua, setKetqua] = useState<Pokemon | null>(null);
  const [chuDangTim, setChuDangTim] = useState("pikachu");
  useEffect(() => {
    if (chuDangTim.trim() === "") {
      setKetqua(null);
      setLoading(false);
      return;
    }
    let bihuy = false;
    setLoading(true);
    setLoi("");
    async function layAPI() {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(chuDangTim.trim().toLowerCase())}`,
        );
        if (bihuy) return;
        if (res.status === 404) {
          setKetqua(null);
          setLoi("Không tìm thấy");
          return;
        }
        if (!res.ok) {
          throw new Error("Lỗi" + res.status);
        }
        const data: Pokemon = await res.json();
        if (bihuy) return;
        setKetqua(data);
      } catch (err) {
        if (bihuy) return;
        setLoi("Lỗi mạng");
        console.log(err);
      } finally {
        if (!bihuy) setLoading(false);
      }
    }
    layAPI();
    return () => {
      bihuy = true;
    };
  }, [chuDangTim]);
  return (
    <div
    >
      {loading && <h3>Loading...</h3>}
      {loi.trim() !== "" ? <span style={{ color: "red" }}>{loi}</span> : null}
      {ketqua && (
        <HienThiPokemon
          name={ketqua.name}
          weight={ketqua.weight}
          height={ketqua.height}
          img={ketqua.sprites.front_default}
        ></HienThiPokemon>
      )}
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tuKhoa = chuDangGo;
        if (tuKhoa.trim() === "") {
          setLoi("Vui lòng nhập pokemon");
          return;
        }
        setChuDangTim(tuKhoa.toLowerCase().trim());
        setLoi("");
      }}>
        <input
          type="text"
          value={chuDangGo}
          onChange={(e) => {
            setChuDangGo(e.target.value);
          }}
        />
        <NutBamLoading tenNut="Tìm kiếm" type="submit"/>
      </form>
    </div>
  );
}
