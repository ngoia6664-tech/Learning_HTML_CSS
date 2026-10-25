export default function HienThiNasaItem(props: {
  description?: string;
  title: string;
  date_created: string;
  mediaImg?: string;
  nasa_id: string;
}) {
  return (
    <div className="Item-Nasa">
      <div className="box-img"><img src={props.mediaImg} alt="Ảnh" width="300px" /></div>
      <div className="box-description">
          <h1>Tiêu đề :{props.title}</h1>
          <p>
            ID của Nasa:{props.nasa_id}
            Mô tả:{props.description}
            Ngày tạo:{new Date(props.date_created).toLocaleDateString("vi-VN")};
          </p>
          
      </div>
    </div>
  );
}
