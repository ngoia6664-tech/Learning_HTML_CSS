//Import
import {
  ArrayPostAddUserName,
  SaveToLocalStorage,
  FilterAuthor,
  searchTitleOrContext,
  activeIcon,
  OpenComment,
  CloseComment,
  toggleTruong,
  ThemComment
} from "./Data.js";
//Khai báo biến
let infoPostAndUserName =
  JSON.parse(localStorage.getItem("infoPostAndUserName")) || null;
//Tìm kiếm
const listAuthor = document.querySelector("#search-author"); //Dánh sách tác giả
const findAuthor = document.querySelector(".find-author");
//Khối hiện ra chính
const mainPost = document.querySelector(".main__posts");
const btnFilterAuthor = document.querySelector(".btn-filter"); //Nút lọc
const inputFindAuthor = document.querySelector("#input-find-author"); //Element input tìm kiếm
//Khối comment
const boxComments = document.querySelector(".box-comment");
//Khối nền 
const backgroundComment = document.querySelector(".box-background");
//Biến id post
let currentPostId = null;
//Các hàm
function GlobalRender(array,element) {
  element.innerHTML = ""; // element mainpost 
  if (!array || array.length === 0) {
    element.innerHTML = `<p style ="padding:20px ;text-align:center;color:var(--text-light);">Không có bài viết nào</p>`;
    return;
  }
  array.forEach((x) => {
    const post = document.createElement("article");
    // Khối bài viết
    post.classList.add("posts");
    post.dataset.id = x.id;
    post.innerHTML = `
            <div class="posts__head">
            <a href="/00_pages/Profile.html"><img src="../03_Assets/anh-dai-dien.jpg" alt="Ảnh tác giả" class="posts__avatar" /></a>
            <h3 class="posts__author-name">${x.username}</h3>
          </div>
          
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
            <i class="ri-delete-bin-line icon"></i>
              <span>Xóa bài viết</span>
            </div>
          </div>
            `;
    element.appendChild(post);
  });
}
function LayBaiDaLuu() {
  return ArrayPostAddUserName().filter((p) => p.save);
}
function RenderAuthorSave(element, array) {
  element.innerHTML = `<option value="all">Tất cả tác giả</option>`;
  const dsTen = array.map((x) => x.username) // Phải dùng map để biến đổi dữ liệu mảng
  const locAuthor = [...new Set(dsTen)]
  locAuthor.forEach((x) => {
    const author = document.createElement("option");
    author.textContent = x
    author.value = x
    element.appendChild(author);
  });
}
GlobalRender(LayBaiDaLuu(),mainPost);
RenderAuthorSave(listAuthor,LayBaiDaLuu());
// Các sự kiện
//Nút bấm lọc
btnFilterAuthor.addEventListener("click", (e) => {
  GlobalRender(FilterAuthor(LayBaiDaLuu(), listAuthor), mainPost);
});
findAuthor.addEventListener("click", () => {
  GlobalRender(
    searchTitleOrContext(inputFindAuthor, LayBaiDaLuu()),
    mainPost,
  );
});
mainPost.addEventListener("click", (e) => {
  console.log(e);
  
  const postBox = e.target.closest(".posts");
  if (!postBox) return;
  const IDPost = Number(postBox.dataset.id);
  const btnHeart = e.target.closest(".heart");
  const btnComment = e.target.closest(".chat-3");
  const btnSave = e.target.closest(".bookmark");
  if (btnHeart) { // click Thả tim
    toggleTruong(IDPost, "love");
    activeIcon(btnHeart.querySelector(".icon"), "heart");
    return;
  }
  if (btnSave) {  // Click save
    toggleTruong(IDPost, "save");
    GlobalRender(LayBaiDaLuu(),mainPost)
    RenderAuthorSave(listAuthor,LayBaiDaLuu())
    return;
  }
  if (btnComment) {  //click comment
    OpenComment(IDPost, boxComments,backgroundComment);
  }
});
//Click background để thoát
backgroundComment.addEventListener("click", () => {
  CloseComment(boxComments,backgroundComment);
});
//Sự kiện ở khối comment
boxComments.addEventListener("click", (e) => {
  if (!e.target.closest(".btn-comment-send")) return; //nếu không phải button thì return
  const input = document.querySelector("#input-new-comment");
  if (input.value.trim() === "") return;
  ThemComment(currentPostId,input.value.trim())
  OpenComment(currentPostId, boxComments ,backgroundComment);
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
