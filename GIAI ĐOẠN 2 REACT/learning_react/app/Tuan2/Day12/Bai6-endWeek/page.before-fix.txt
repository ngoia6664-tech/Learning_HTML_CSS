"use client";
import { useState, useEffect } from "react";
import HienThiNasaItem from "./components/hienthi";
import  "./global.css";
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
}
function toPhoto(item:NasaItem) : Photo{
  const d = item.data[0]
  return{
    id: d.nasa_id,
    title: d.title,
    description: d.description,
    dateCreated: d.date_created,
    img: item.links?.[0]?.href,
  }
}
type TabName = "all" |"saved"
export default function Home() {
  const [ketqua, setketqua] = useState<NasaItem[]>([]);
  const [loi, setLoi] = useState("");
  const [loading, setloading] = useState(true);
  const [reset, setReset] = useState(false)
  const [Tab,setTab] = useState<TabName>("all")
  const [likeIDs,setLikeIds] =useState<string[]>([]);
  const [saveIDs,saveLikeIds] =useState<Photo[]>([]);
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
        console.log(ketqua);
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
  //Hàm bấm like và save;
  // function onLike(id:string){
  //   const 
  // }
  return (
    <div >
      <button onClick={() => setReset(!reset)} className="btn btn-reset">Reset trang</button>
      {loading && <h3>Đang lấy dữ liệu...</h3>}
      {loi.trim() !== "" ? <p style={{ color: "red" }}>{loi}</p> : null}
      {ketqua.length !== 0 && (
        <div className="main-content">
          {ketqua.map((x) => {
            return (
              <HienThiNasaItem 
              key={x.id}
                description={x.description}
                title={x.title}
                date_created={x.dateCreated}
                mediaImg={x.img}
                nasa_id={x.id}              
              />
            );
          })}
        </div>
      )}
      
    </div>
  );
}
