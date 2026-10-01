//Import
import{
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
//====khai báo====
//Bắt đầu chạy code kiểm tra có dữ liệu từ local chưa thì lấy hàm rỗng , có rồi thì chuyển định dạng json vào mảng
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
//Khối tạo bài viết Chưa dùng
const createPost = document.querySelector(".main__create-post"); //Khối chính
const contentCreatePost = document.querySelector("#content-create-post"); //Body post textarea
const titleCreatePost =document.querySelector("#title-create-post") // Title post input
//====Các hàm render====
//render post API
//Hàm để lấy dữ liệu từ API Gắn cho 1 obj tổng là infoPostAndUSerNname
function RenderDefault() {
  //Tạo 1 hàm mới lấy dữ liệu từ hàm đã lấy API Để render
  GlobalRender(ArrayPostAddUserName(), mainPost);
  RenderAuthor(listAuthor, ArrayPostAddUserName());
}
//hàm render tác giả
function RenderAuthor(element, array) {
  element.innerHTML = `<option value="all">Tất cả tác giả</option>`;
  const dsAuthor = array.map((x) => x.username)
  const loc = [...new Set(dsAuthor)]
  loc.forEach((x) => {
    const author = document.createElement("option");
    author.textContent = x
    author.value = x
    element.appendChild(author);
  });
}
async function chaylandau(params) {
  await KhoiTaoDuLieu()
  RenderDefault();
}
chaylandau()
// ===Sự kiện click===
// Sự kiện tìm kiêm
findAuthor.addEventListener("click", () => {
  GlobalRender(
    searchTitleOrContext(inputFindAuthor, ArrayPostAddUserName()),
    mainPost,
  );
});
//Sự kiện lọc theo tác giả
btnFilterAuthor.addEventListener("click", (e) => {
  GlobalRender(FilterAuthor(ArrayPostAddUserName(), listAuthor), mainPost);
});
  // Click các nút bấm ở post
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
    activeIcon(btnSave.querySelector(".icon"), "bookmark");
    return;
  }
  if (btnComment) { 
    currentPostId =IDPost //click comment
    OpenComment(IDPost, boxComments,backgroundComment);
  }
  if(btnAuthor){
    window.location.href =`Profile.html?userId=${btnAuthor.dataset.userId}`;
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
   contentCreatePost.value=""
   titleCreatePost.value=""
  TaoBaiViet(title,body);
  RenderDefault()
})
