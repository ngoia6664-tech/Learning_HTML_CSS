"use client";
import { useEffect, useState } from "react";

type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
};

export default function Home() {
  const [tuKhoa, setTuKhoa] = useState("");
  const [ketQua, setKetQua] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tuKhoa.trim() === "") {
      setKetQua(null);
      setError("");
      return;
    }
    let biHuy = false;
    async function timPokemon() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(tuKhoa.trim().toLowerCase())}`,
        );
        if (biHuy) return;
        if (res.status === 404) {
          setKetQua(null);
          return;
        }
        if (!res.ok) throw new Error("Lỗi " + res.status);
        const data = await res.json();
        if (biHuy) return;
        setKetQua(data);
      } catch {
        if (biHuy) return;
        setError("Không tải được dữ liệu");
      } finally {
        if (!biHuy) setLoading(false);
      }
    }
    timPokemon();
    return () => {
      biHuy = true;
    };
  }, [tuKhoa]);

  return (
    <div>
      <input
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
        placeholder="Nhập tên Pokémon (vd: pikachu)..."
      />
      {loading && <p>Đang tìm...</p>}
      {error !== "" && <p style={{ color: "red" }}>{error}</p>}
      {!loading && error === "" && tuKhoa.trim() !== "" && ketQua === null && (
        <p>Không tìm thấy Pokémon nào</p>
      )}
      {ketQua && (
        <div>
          {ketQua.sprites.front_default && (
            <img
              src={ketQua.sprites.front_default}
              alt={ketQua.name}
              width="96"
            />
          )}
          <h3>
            #{ketQua.id} {ketQua.name}
          </h3>
          <p>
            Chiều cao: {ketQua.height} · Cân nặng: {ketQua.weight}
          </p>
        </div>
      )}
    </div>
  );
}
