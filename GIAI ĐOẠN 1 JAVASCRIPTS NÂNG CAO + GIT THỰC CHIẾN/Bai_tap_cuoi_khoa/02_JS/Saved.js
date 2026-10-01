//Import
import {
  GlobalRender,
  ArrayPostAddUserName,
  SaveToLocalStorage,
  FilterAuthor,
  searchTitleOrContext,
  activeIcon,
  OpenComment,
  CloseComment,
  toggleTruong,
  ThemComment,
  KhoiTaoDuLieu,
  TaoBaiViet
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
const createPost = document.querySelector(".main__create-post"); //Khối chính
const contentCreatePost = document.querySelector("#content-create-post"); //Body post textarea
const titleCreatePost =document.querySelector("#title-create-post") // Title post input
//Các hàm
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
  
  const postBox = e.target.closest(".posts");
  if (!postBox) return;
  const IDPost = Number(postBox.dataset.id);
  const btnHeart = e.target.closest(".heart");
  const btnComment = e.target.closest(".chat-3");
  const btnSave = e.target.closest(".bookmark");
  const btnAuthor = e.target.closest("[data-user-id]")
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
    currentPostId = IDPost;
    OpenComment(IDPost, boxComments,backgroundComment);
  }
  if(btnAuthor){
    window.location.href =`/00_pages/Profile.html?userId=${btnAuthor.dataset.userId}`;
    return;
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
createPost.addEventListener("click",(e) =>{
  const btn = e.target.closest(".btn-create-post")
  const body = contentCreatePost.value;
  const title = titleCreatePost.value;
  if(!btn)return
  if(title==="" && body ===""){
      alert("vui lòng nhập tiêu đề và nội dung")
      return
   }
  TaoBaiViet(title,body);
})
