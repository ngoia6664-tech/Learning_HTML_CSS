"use client";
import { useState, useEffect } from "react";
import HienThiNasaItem from "./components/hienthi";
import "./global.css";
type NasaResponse = { collection: { items: NasaItem[] } };
type NasaItem = {
  data: {
    title: string;
    description?: string;
    date_created: string;
    nasa_id: string;
  }[];
  links?: { href: string; rel?: string }[];
};
type Photo = {
  id: string;
  title: string;
  description?: string;
  dateCreated: string;
  img?: string;
};
type TrangThai = {
  likes: string[];
  saves: Photo[];
};
function toPhoto(item: NasaItem): Photo {
  const d = item.data[0];
  return {
    id: d.nasa_id,
    title: d.title,
    description: d.description,
    dateCreated: d.date_created,
    img: item.links?.[0]?.href,
  };
}
type TabName = "all" | "saved";
export default function Home() {
  const [ketqua, setketqua] = useState<Photo[]>([]);
  const [loi, setLoi] = useState("");
  const [loading, setloading] = useState(true);
  const [reset, setReset] = useState(false);
  const [Tab, setTab] = useState<TabName>("all");
  const [likeIds, setLikeIds] = useState<string[]>([]);
  const [saveIDs, setSaveIds] = useState<Photo[]>([]);
  const [flaglocalstorage, setflaglocalstorage] = useState(false);
  useEffect(() => {
    setloading(true);
    setLoi("");
    let biHuy = false;
    async function layAPI() {
      try {
        const res = await fetch(
          `https://images-api.nasa.gov/search?q=galaxy&media_type=image`,
        );
        if (biHuy) return;
        if (res.status === 404) {
          setLoi("Lỗi mạng không thể lấy dữ liệu");
          return;
        }
        if (!res.ok) {
          throw new Error("Lỗi:" + res.status);
        }
        const data: NasaResponse = await res.json();
        if (biHuy) return;
        setketqua(data.collection.items.map(toPhoto));
      } catch (error) {
        if (biHuy) return;
        setketqua([]);
        setLoi("Lỗi không thể tải dữ liệu");
        console.log("[Catch bắt lỗi] :", error);
      } finally {
        if (!biHuy) setloading(false);
      }
    }
    layAPI();
    return () => {
      biHuy = true;
    };
  }, [reset]);
  //Lưu bài đã lưu vào local storage
  useEffect(() => {
    const dulieu= localStorage.getItem("bai6-endweek");
    if (dulieu ) {
      const DuLieuDaParse : TrangThai = JSON.parse(dulieu);
      setSaveIds(DuLieuDaParse.saves);
      setLikeIds(DuLieuDaParse.likes);
    }
    setflaglocalstorage(true);
  }, []);
  useEffect(() => {
    if (!flaglocalstorage) return;
    const TrangThai = { likes: [...likeIds], saves: [...saveIDs] };
    localStorage.setItem("bai6-endweek", JSON.stringify(TrangThai));
  }, [flaglocalstorage, saveIDs, likeIds]);
  // Hàm bấm like và save;
  function toggleLike(id: string) {
    setLikeIds(
      likeIds.includes(id) ? likeIds.filter((x) => x !== id) : [...likeIds, id],
    );
  }
  function toggleSave(item: Photo) {
    const daLuu = saveIDs.some((x) => x.id === item.id);
    if (daLuu) {
      setSaveIds(saveIDs.filter((x) => x.id !== item.id));
    } else {
      setSaveIds([...saveIDs, item]);
    }
  }
  let Danghien = ketqua;
  if (Tab === "all") Danghien = ketqua;
  if (Tab === "saved") Danghien = saveIDs;
  return (
    <div>
      <div className="Tab">
        <button onClick={() => setTab("all")}>Tất cả({ketqua.length})</button>
        <button onClick={() => setTab("saved")}>
          Đã luu({saveIDs.length})
        </button>
      </div>
      <button onClick={() => setReset(!reset)} className="btn btn-reset">
        Reset trang
      </button>
      {loading && <h3>Đang lấy dữ liệu...</h3>}
      {loi.trim() !== "" ? <p style={{ color: "red" }}>{loi}</p> : null}
      {Danghien.length !== 0 && (
        <div className="main-content">
          {Danghien.map((x) => {
            return (
              <HienThiNasaItem
                key={x.id}
                description={x.description}
                title={x.title}
                date_created={x.dateCreated}
                mediaImg={x.img}
                nasa_id={x.id}
                like={likeIds.includes(x.id)}
                save={saveIDs.some((s) => s.id === x.id)}
                onLike={() => toggleLike(x.id)}
                onSave={() => toggleSave(x)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
