import { IconHeart, IconBookmark, IconCalendar } from "./Icons";

export default function HienThiNasaItem(props: {
  description?: string;
  title: string;
  date_created: string;
  mediaImg?: string;
  nasa_id: string;
  like: boolean;
  save: boolean;
  onLike: () => void;
  onSave: () => void;
}) {
  return (
    <article className="card">
      <div className="card-media">
        <img src={props.mediaImg} alt={props.title} loading="lazy" />
        <div className="card-actions">
          <button
            type="button"
            onClick={props.onLike}
            aria-pressed={props.like}
            aria-label={props.like ? "Bỏ thích ảnh" : "Thích ảnh"}
            className={props.like ? "icon-btn icon-like is-on" : "icon-btn icon-like"}
          >
            <IconHeart filled={props.like} />
          </button>
          <button
            type="button"
            onClick={props.onSave}
            aria-pressed={props.save}
            aria-label={props.save ? "Bỏ lưu ảnh" : "Lưu ảnh"}
            className={props.save ? "icon-btn icon-save is-on" : "icon-btn icon-save"}
          >
            <IconBookmark filled={props.save} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-meta">
          <IconCalendar />
          {new Date(props.date_created).toLocaleDateString("vi-VN")}
        </p>
        <p className="card-desc">{props.description}</p>
        <p className="card-id">Mã NASA: {props.nasa_id}</p>
      </div>
    </article>
  );
}
