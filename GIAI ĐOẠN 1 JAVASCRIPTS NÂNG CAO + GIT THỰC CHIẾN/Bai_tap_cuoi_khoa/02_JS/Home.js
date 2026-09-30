//====khai báo====
//Bắt đầu chạy code kiểm tra có dữ liệu từ local chưa thì lấy hàm rỗng , có rồi thì chuyển định dạng json vào mảng
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
//Khối tạo bài viết Chưa dùng
const createPost = document.querySelector(".main__create-post");
const contentCreatePost = document.querySelector("#content-create-post");
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
    const responseComment = await fetch(
      `https://jsonplaceholder.typicode.com/comments`,
    );
    if (!responseUsers.ok || !responsePosts.ok || !responseComment.ok)
      throw new Error(
        `[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status} , comment:${responseComment.status}`,
      );
    const dataPosts = await responsePosts.json();
    const dataUsers = await responseUsers.json();
    const dataComments = await responseComment.json();
    infoPostAndUserName = {
      posts: dataPosts.map((post) => {
        return {
          ...post,
          save: false,
          comment: dataComments.filter((comment) => comment.postId === post.id),
          love: false,
        };
      }),
      users: dataUsers,
    };
    SaveToLocalStorage();
    // Sau khi lấy dữ liệu xong thì đưa vào localStorage
  } catch (error) {
    console.log("[Catch] Lỗi:" + error);
  }
}
function SaveToLocalStorage() {
  localStorage.setItem(
    "infoPostAndUserName",
    JSON.stringify(infoPostAndUserName),
  );
}
function SaveToLocalStorageAndRender() {
  SaveToLocalStorage();
  GlobalRender(ArrayPostAddUserName());
}
function DuLieuHopLe(data) {
  return (
    data &&
    Array.isArray(data.posts) &&
    Array.isArray(data.users) &&
    !data.posts.some((p) => p === null) // không được lẫn null
  );
}
function ArrayPostAddUserName() {
  return infoPostAndUserName.posts.filter(Boolean).map((post) => {
    const find = infoPostAndUserName.users.find(
      (user) => user.id === post.userId,
    );
    return {
      ...post,
      username: find ? find.username : "Ẩn danh",
    };
  });
}
function GlobalRender(array, element) {
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
              <i class="ri-bookmark-${x.save ? "fill active" : "line"} icon"></i>
              <span>Lưu bài viết</span>
            </div>
          </div>
            `;
    element.appendChild(post);
  });
}
function RenderDefault() {
  //Tạo 1 hàm mới lấy dữ liệu từ hàm đã lấy API Để render
  const infoPostAndUserNameRender = ArrayPostAddUserName();
  GlobalRender(infoPostAndUserNameRender, mainPost);
  RenderAuthor(listAuthor, infoPostAndUserName.users);
}
//hàm render tác giả
function RenderAuthor(element, array) {
  element.innerHTML = `<option value="all">Tất cả tác giả</option>`;
  array.forEach((x) => {
    const author = document.createElement("option");
    author.textContent = x.username;
    author.value = x.username;
    element.appendChild(author);
  });
}
//Hàm lọc theo tác giả
function FilterAuthor(array, element) {
  // element ở đây là listAthor
  if (element.value === "all") return array;
  return array.filter((p) => p && p.username.toLowerCase() === element.value.toLowerCase());
}
//Nút bấm lọc

//Hàm tìm kiếm
function searchTitleOrContext(element, array) {
  //element là  inputFindAuthor
  const text = element.value.toLowerCase().trim();
  if (text === "") {
    const notice = document.createElement("span");
    notice.textContent = "Vui lòng nhập nội dung tìm kiếm";
    notice.classList.add("notice");
    document.querySelector(".search-box").appendChild(notice);
    setTimeout(() => {
      notice.classList.add("fade-out");
      setTimeout(() => {
        notice.remove();
      }, 2000);
    }, 100);
  }
  return array.filter((search) => {
    return (
      search.title.toLowerCase().trim().includes(text) ||
      search.body.toLowerCase().trim().includes(text)
    );
  });
}
function activeIcon(element, nameIcon) {
  // Element chính là các nút trực tiếp của class "post-choose last"
  element.classList.toggle(`ri-${nameIcon}-line`);
  element.classList.toggle(`ri-${nameIcon}-fill`);
  element.classList.toggle("active");
}
function toggleTruong(IDPost, field) {
  // Xử lý logic trong mảng gốc và lưu vào local storage
  infoPostAndUserName.posts = infoPostAndUserName.posts.map((x) =>
    x && x.id === IDPost ? { ...x, [field]: !x[field] } : x,
  );
  SaveToLocalStorage();
}
async function ChayLanDau() {
  if (!DuLieuHopLe(infoPostAndUserName)) {
    await GanDuLieuApiChoPost();
  }
  RenderDefault();
}
ChayLanDau();
function OpenComment(IDPost,box,background) { //box là khối boxComment
  currentPostId = IDPost;
  const post = ArrayPostAddUserName().find((x) => x && x.id === IDPost);
  if (!post) return;
  // Duyệt khối comment
  box.innerHTML = `
      <article class="posts">
        <div class="posts__author">
          <img
            src="../03_Assets/anh-dai-dien.jpg"
            alt="Ảnh tác giả"
            class="posts__avatar"
          />
          <h3 class="posts__author-name">${post.username}</h3>
        </div>
        <div class="posts__content">
         <h3>${post.title}</h3>
          <p class="text-body posts__text">
            ${post.body}
          </p>
          <span class="event-more posts__more">Xem thêm</span>
        </div>
      </article>
      <div class="posts__comments">
        <h3>Comment</h3>
            <div class="comment-list"></div>
            <!-- Ô input và nút gửi nằm ở cuối khối comment -->
      </div>
      <div class="comment-box-input">
          <input 
            type="text" 
            placeholder="Viết bình luận của bạn..." 
            class="comment__input-field" 
            id="input-new-comment" 
          />
          <button class="btn btn-comment-send"><i class ="ri-send-plane-fill" style="font-size:24px"></i></button>
      </div>
        `;
  const listComment = document.querySelector(".comment-list");
  post.comment.forEach((x) => {
    const comment = document.createElement("article");
    comment.classList.add("comment");
    comment.innerHTML = `
      <a href="mailto:${x.email}" target="_blank">${x.email}</a>
            <div class="comment-context">
              <p class ="text-body comment__text">${x.body}</p>
              <span class ="event-more comment__more">xem thêm </span>
            </div>
    `;
    listComment.appendChild(comment);
  });
  //Active
  box.classList.add("active");
  background.classList.add("active");
}
function CloseComment(element,background) {
  element.classList.remove("active");
  background.classList.remove("active");
}
// ===Sự kiện click===
// Sự kiện tìm kiếm
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
  const post = infoPostAndUserName.posts.find(
    (x) => x && x.id === currentPostId,
  );
  post.comment.push({
    postId: post.id,
    id: post.comment.length + 1,
    name: "Duy Anh",
    email: "DuyAnh@123",
    body: input.value.trim(),
  });
  SaveToLocalStorage();
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
