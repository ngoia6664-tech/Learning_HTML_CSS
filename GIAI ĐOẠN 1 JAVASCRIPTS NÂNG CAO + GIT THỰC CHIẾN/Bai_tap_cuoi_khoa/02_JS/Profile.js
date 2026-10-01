//Import
import {
  ArrayPostAddUserName,
  KhoiTaoDuLieu,
  ArrayUserName,
  GlobalRender,
  toggleTruong,
  OpenComment,
  activeIcon,
  CloseComment,
  ThemComment,
  TaoBaiViet,
} from "./Data.js";

const userId = Number(new URLSearchParams(location.search).get("userId"));
let baiCuaTacGia = [];
async function chay() {
  await KhoiTaoDuLieu();
  baiCuaTacGia = ArrayPostAddUserName().filter((p) => p.userId === userId);
  RenderInfo();
}
chay();
let currentPostId = null; // Khởi tạo PostID
const boxComments = document.querySelector(".box-comment"); // Dùng cho openComment
//Khối nền
const backgroundComment = document.querySelector(".box-background"); //nền
const createPost = document.querySelector(".main__create-post"); //Khối chính
const contentCreatePost = document.querySelector("#content-create-post"); //Body post textarea
const titleCreatePost = document.querySelector("#title-create-post"); // Title post input
// Khai báo biến
const mainProfile = document.querySelector(".main__profile"); //Khối main bên trái chứa thông tin + bài viết cá nhân

function RenderInfo() {
  mainProfile.innerHTML = "";
  const author = ArrayUserName().find((x) => x && x.id === userId);
  const profileHeader = document.createElement("div");
  profileHeader.classList.add("profile__header");
  profileHeader.innerHTML = `
        <img
            src="../03_Assets/anh-dai-dien.jpg"
            alt="Ảnh đại diện"
            class="profile__avatar"
          />
          <div class="profile__user-meta">
            <h2 class="profile__name">${author.username}</h2>
          </div>
          <div class="profile__nav">
            <ul class="profile__nav-list">
              <li class="profile__nav-item active" data-target="item-info">
                <i class="ri-user-3-line"></i>
                <span class="profile__nav-text">Thông tin cá nhân</span>
              </li>
              <li class="profile__nav-item" data-target="item-posts">
                <i class="ri-article-line"></i>
                <span class="profile__nav-text">Bài viết cá nhân</span>
              </li>
            </ul>
          </div>
        `;
  const infoProfile = document.createElement("div");
  infoProfile.classList.add("profile__grid");
  infoProfile.classList.add("active");
  infoProfile.classList.add("tabPane");
  infoProfile.dataset.id = "item-info";
  infoProfile.innerHTML = ``;
  infoProfile.innerHTML = `
          <div class="profile__item">
            <i class="ri-id-card-line profile__icon"></i>
            <div class="profile__content">
              <span class="profile__label">ID Tác giả</span>
              <span class="profile__value">${author.id}</span>
            </div>
          </div>
          <div class="profile__item">
            <i class="ri-mail-line profile__icon"></i>
            <div class="profile__content">
              <span class="profile__label">Email</span>
              <span class="profile__value">${author.email}</span>
            </div>
          </div>

          <div class="profile__item profile__item--full">
            <i class="ri-map-pin-line profile__icon"></i>
            <div class="profile__content">
              <span class="profile__label">Địa chỉ (Address)</span>
              <span class="profile__value"
                >Tòa:${author.address.suite} Đường:${author.address.street} Thành Phố:${author.address.city}</span>
            </div>
          </div>

          <div class="profile__item">
            <i class="ri-phone-line profile__icon"></i>
            <div class="profile__content">
              <span class="profile__label">Số điện thoại</span>
              <span class="profile__value">${author.phone}</span>
            </div>
          </div>

          <div class="profile__item">
            <i class="ri-building-line profile__icon"></i>
            <div class="profile__content">
              <span class="profile__label">Công ty</span>
              <span class="profile__value">${author.company.name}</span>
            </div>
            </div>
           `;
  const postsUser = document.createElement("div");
  postsUser.classList.add("posts__users");
  postsUser.classList.add("tabPane");
  postsUser.dataset.id = "item-posts";
  baiCuaTacGia.forEach((x) => {
    const dataPostUser = document.createElement("article");
    dataPostUser.classList.add("posts");
    dataPostUser.dataset.id = x.id;
    dataPostUser.innerHTML = `
          <div class="posts__between">
            <h3>${x.title}</h3>
            <p class="text-body posts__text">
              ${x.body}
            </p>
            <span class="event-more posts__more">Xem thêm</span>
          </div>

          <div class="posts__last">
            <div class="post__last-choose heart">
              <i class="ri-heart-${x.love ? "fill active" : "line"} icon"></i>
              <span>Thả tim</span>
            </div>
            <div class="post__last-choose chat-3">
              <i class="ri-chat-3-line icon"></i>
           <span>Bình luận</span>
            </div>
            <div class="post__last-choose bookmark">
              <i class="ri-bookmark-${x.save ? "fill active" : "line"} icon"></i>
              <span>Lưu bài viết</span>
            </div>
          </div> `;
    postsUser.appendChild(dataPostUser);
  });
  mainProfile.appendChild(profileHeader);
  mainProfile.appendChild(infoProfile);
  mainProfile.appendChild(postsUser);
}
// Sự kiên
mainProfile.addEventListener("click", (e) => {
  const btn = e.target.closest(".profile__nav-item");
  //Xóa hết tất cả class active của nút và trang
  if (btn) {
    mainProfile
      .querySelectorAll(".profile__nav-item")
      .forEach((b) => b.classList.remove("active"));
    mainProfile
      .querySelectorAll(".tabPane")
      .forEach((p) => p.classList.remove("active"));
    // Thêm đúng class active vào thẻ vừa bấm
    btn.classList.add("active");
    //Lấy ra khối có ID giống với nút vừa bấm
    const targetPane = mainProfile.querySelector(
      `[data-id="${btn.dataset.target}"]`,
    );
    //Nếu khối đó tồn tại thì thêm class active vào
    if (targetPane) targetPane.classList.add("active");
  }
  const postBox = e.target.closest(".posts");
  if (!postBox) return;
  const IDPost = Number(postBox.dataset.id);
  const btnHeart = e.target.closest(".heart");
  const btnComment = e.target.closest(".chat-3");
  const btnSave = e.target.closest(".bookmark");
  if (btnHeart) {
    // click Thả tim
    toggleTruong(IDPost, "love");
    activeIcon(btnHeart.querySelector(".icon"), "heart");
    return;
  }
  if (btnSave) {
    // Click save
    toggleTruong(IDPost, "save");
    activeIcon(btnSave.querySelector(".icon"), "bookmark");
    return;
  }
  if (btnComment) {
    currentPostId = IDPost; //click comment
    OpenComment(IDPost, boxComments, backgroundComment);
  }
});
backgroundComment.addEventListener("click", () => {
  CloseComment(boxComments, backgroundComment);
});
boxComments.addEventListener("click", (e) => {
  if (!e.target.closest(".btn-comment-send")) return; //nếu không phải button thì return
  const input = document.querySelector("#input-new-comment");
  if (input.value.trim() === "") return;
  ThemComment(currentPostId, input.value.trim());
  OpenComment(currentPostId, boxComments, backgroundComment);
});
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".event-more");
  if (!btn) return;
  const postText = btn.previousElementSibling;
  postText.classList.toggle("active");
  btn.textContent = postText.classList.contains("active")
    ? "Thu gọn"
    : "Xem thêm";
});
createPost.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-create-post");
  const body = contentCreatePost.value;
  const title = titleCreatePost.value;
  if (!btn) return;
  if (title === "" && body === "") {
    alert("vui lòng nhập tiêu đề và nội dung");
    return;
  }
  TaoBaiViet(title, body);
  contentCreatePost.value = "";
  titleCreatePost.value = "";
  baiCuaTacGia = ArrayPostAddUserName().filter((p) => p.userId === userId);
  RenderInfo();
});
