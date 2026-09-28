//====khai báo====
//Bắt đầu chạy code kiểm tra có dữ liệu từ local chưa thì lấy hàm rỗng , có rồi thì chuyển định dạng json vào mảng
let MyPosts = JSON.parse(localStorage.getItem("MyPosts")) || []; //Khai báo bài viết cục bộ
let infoPostAndUserName =
  JSON.parse(localStorage.getItem("infoPostAndUserName")) || [];
//Tìm kiếm
const listAuthor = document.querySelector("#search-author"); //Dánh sách tác giả
const findAuthor = document.querySelector(".find-author");
const inputFindAuthor = document.querySelector("#input-find-author");
//Khối hiện ra chính
const mainPost = document.querySelector(".main__posts");

//Khối tạo bài viết
const createPost = document.querySelector(".main__create-post");
const contentCreatePost = document.querySelector("#content-create-post").value;

//====Các hàm render====
//render post API
//Hàm để lấy dữ liệu từ API Gắn cho 1 obj tổng là infoPostAndUSerNname
async function GanDuLieuApiChoPost() {
  try {
    const responsePosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
    );
    const responseUsers = await fetch(
      `https://jsonplaceholder.typicode.com/users`,
    );
    if (!responseUsers.ok || !responsePosts.ok)
      throw new Error(
        `[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status}`,
      );
    const dataPosts = await responsePosts.json();
    const dataUsers = await responseUsers.json();

    const infoPostAndUserName = {
      posts: dataPosts,
      users: dataUsers,
    };
    console.log(infoPostAndUserName);
    localStorage.setItem(
      "infoPostAndUserName",
      JSON.stringify(infoPostAndUserName),
    );
    // Sau khi lấy dữ liệu xong thì đưa vào localStorage
  } catch (error) {
    console.log("[Catch] Lỗi:" + error);
  }
}
GanDuLieuApiChoPost(); // Hàm này chỉ cần chạy 1 lần duy nhất trong cả dự án để lấy dữ liệu cho storage , sau đó bỏ đi cũng được
function ArrayPostAddUserName() {
  return infoPostAndUserName.posts.map((post) => {
    const find = infoPostAndUserName.users.find(
      (user) => user.id === post.userId,
    );
    if (find) {
      return {
        ...post,
        username: find.username,
      };
    } else {
      return null;
    } //Lấy ID tác giả theo UserId của bài viết
  });
}
function GlobalRender(array) {
  mainPost.innerHTML = "";
  if (!array || array.length === 0) {
    mainPost.innerHTML = `<p style ="padding:20px ;text-align:center;color:var(--text-light);">Không có bài viết nào</p>`;
  }
  array.forEach((x) => {
    const post = document.createElement("article");
    post.classList.add("posts");
    post.innerHTML = `
            <div class="posts__head">
            <a href="/00_pages/Profile.html"><img src="../03_Assets/anh-dai-dien.jpg" alt="Ảnh tác giả" class="posts__avatar" /></a>
            <h3 class="posts__author-name">${x.username}</h3>
          </div>
          
          <div class="posts__between">
            <h3>${x.title}</h3>
            <p class="posts__text">
              ${x.body}
            </p>
            <span class="posts__more">Xem thêm</span>
          </div>

          <div class="posts__last">
            <div class="post__last-choose">
              <i class="ri-heart-line"></i>
              <span>Thả tim</span>
            </div>
            <div class="post__last-choose">
              <i class="ri-chat-3-line"></i>
              <span>Bình luận</span>
            </div>
            <div class="post__last-choose">
              <i class="ri-bookmark-line"></i>
              <span>Lưu bài viết</span>
            </div>
          </div>
            `;
    mainPost.appendChild(post);
  });
}
async function RenderDefault() {
  //Tạo 1 hàm mới lấy dữ liệu từ hàm đã lấy API Để render
  const infoPostAndUserNameRender = ArrayPostAddUserName();
  GlobalRender(infoPostAndUserNameRender);
  XuLyXemThem();
  RenderAuthor();
}
RenderDefault(); //hàm render lúc ngay vào
function XuLyXemThem() {
  const postMore = document.querySelectorAll(".posts__more");
  postMore.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const postText = e.target.previousElementSibling;
      postText.classList.toggle("active");
      if (postText.classList.contains("active")) {
        btn.textContent = "Thu gọn";
      } else {
        btn.textContent = "Xem thêm";
      }
    });
  });
}
//hàm render tác giả
async function RenderAuthor() {
  listAuthor.innerHTML = "";
  infoPostAndUserName.users.forEach((x) => {
    const author = document.createElement("option");
    author.textContent = x.username;
    author.value = x.username;
    listAuthor.appendChild(author);
  });
}
//Hàm lọc theo tác giả
function FilterAuthor() {
  const arrayFilerAthor = ArrayPostAddUserName().filter((filter_author) => {
    return (
      filter_author !== null &&
      filter_author.username.toLowerCase() === listAuthor.value.toLowerCase()
    );
  });
  console.log("Đây là mảng đã lọc:", arrayFilerAthor);
  GlobalRender(arrayFilerAthor);
  XuLyXemThem();
  RenderAuthor();
}
//Nút bấm lọc
const btnFilterAuthor = document.querySelector(".btn-filter");
btnFilterAuthor.addEventListener("click", (e) => {
  FilterAuthor();
});
//Hàm tìm kiếm
function searchTitleOrContext() {
  return ArrayPostAddUserName().filter((search) => {
    if (inputFindAuthor.value === "") {
      const notice = document.createElement("span");
      notice.textContent = "Vui lòng nhập nội dung tìm kiếm";
      notice.classList.add("notice");
      document.body.appendChild(notice);
      return search;
    } else if (
      search.title.toLowerCase() === inputFindAuthor.value.toLowerCase() ||
      search.body.toLowerCase() === inputFindAuthor.value.toLowerCase()
    ) {
      console.log(inputFindAuthor.value.toLowerCase());
      return search;
    } else return null;
  });
}
findAuthor.addEventListener("click", () => {
  console.log("Đang ở nút tìm kiếm");
  GlobalRender(searchTitleOrContext());
});
