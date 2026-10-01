let infoPostAndUserName = JSON.parse(localStorage.getItem("infoPostAndUserName")) || null;
const MeID =11;
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
  }
}
function DamBaoCoUserCuaToi() {
  if (infoPostAndUserName.users.some((u) => u.id === MeID)) return;
  infoPostAndUserName.users.push({
    id: MeID,
    name: "Ngô Duy Anh",
    username: "D.Anh Đẹp trai",
    email: "DuyAnh@123",
    address: { street: "Định Công Thượng", suite: "Số 10 Ngõ 18", city: "Hà Nội" },
    phone: "84******896",
    company: { name: "Physics Lab" },   // company, không phải comany
  });
  SaveToLocalStorage();
}
function DuLieuHopLe(data) {
  return (
    data &&
    Array.isArray(data.posts) &&
    Array.isArray(data.users) &&
    !data.posts.some((p) => p === null) // không được lẫn null
  );
}
export function LayDuLieu(){
    return infoPostAndUserName;
} 
//lưu vào localStorage
export function SaveToLocalStorage() {
  localStorage.setItem(
    "infoPostAndUserName",
    JSON.stringify(infoPostAndUserName),
  );
}
//hàm thêm gộp thêm username vào post 
export function ArrayPostAddUserName() {
  if(!infoPostAndUserName) return [];
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
export function ArrayUserName(){
  return infoPostAndUserName.users
}
// Render post chung cho tất cả
export function GlobalRender(array,element) {
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
            <div class="box_avatar" data-user-id="${x.userId}"><img src="../03_Assets/anh-dai-dien.jpg" class="posts__avatar" /></div>
            <h3 class="posts__author-name" data-user-id="${x.userId}">${x.username}</h3>
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
// Lọc tác giả và trả và mảng tác giả thỏa mãn
export function FilterAuthor(array, element) {
  // element ở đây là listAthor
  if (element.value === "all") return array;
  return array.filter((p) => p && p.username.toLowerCase() === element.value.toLowerCase());
}
// Lọc tìm kiếm và trả về mảng thỏa mãn điều kiện của tilte và body
export function searchTitleOrContext(element,array) { //element là  inputFindAuthor
  const text = element.value.toLowerCase().trim()
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
// Hiển thị thay đổi ra DOM khi click vào các element 
export function activeIcon(element, nameIcon) {
  element.classList.toggle(`ri-${nameIcon}-line`);
  element.classList.toggle(`ri-${nameIcon}-fill`);
  element.classList.toggle("active");
}
// Quan trọng , thay đổi data ở trong mảng gốc
export function toggleTruong(IDPost, field) {
  // Xử lý logic trong mảng gốc và lưu vào local storage
  infoPostAndUserName.posts = infoPostAndUserName.posts.map((x) =>
    x && x.id === IDPost ? { ...x, [field]: !x[field] } : x,
  );
  SaveToLocalStorage();
}
// Hàm mở comment khá dài 
export function OpenComment(IDPost,element,background) { // element là khối boxcomments
  const post = ArrayPostAddUserName().find((x) => x && x.id === IDPost);
  if (!post) return;
  // Duyệt khối comment // element ở đây là khối boxComments
  element.innerHTML = `  
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
  element.classList.add("active");
  background.classList.add("active");
  console.log(IDPost);
}
export function CloseComment(element,background) {
  element.classList.remove("active");
  background.classList.remove("active");
}
export function ThemComment(currentPostId, text){
  const post = infoPostAndUserName.posts.find(
      (x) => x && x.id === currentPostId,
    );
    post.comment.push({
      postId: post.id,
      id: post.comment.length + 1,
      name: "Duy Anh",
      email: "DuyAnh@123",
      body: text
    });
    SaveToLocalStorage();
}

export async function KhoiTaoDuLieu() {
  if (!DuLieuHopLe(infoPostAndUserName)) {
    await GanDuLieuApiChoPost();
  }
  DamBaoCoUserCuaToi(); 
}
export function TaoBaiViet(title, body) {
  infoPostAndUserName.posts.unshift({   // unshift: bài mới lên đầu danh sách
    userId: MeID,
    id: Date.now(),                     // length + 1 dễ trùng id
    title,
    body,
    love: false,
    save: false,
    comment: [],
  });
  SaveToLocalStorage();
}
