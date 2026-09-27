//====khai báo====
let MyPosts = JSON.parse(localStorage.getItem("MyPosts"))||[]; //Khai báo bài viết cục bộ
//Tìm kiếm
const searchAuthor= document.querySelector("#search-author");//Dánh sách tác giả
const findAuthor =document.querySelector(".find-author");
const inputFindAuthor =document.querySelector("#input-find-author").value;

//Khối hiện ra chính
const mainPost = document.querySelector(".main__posts")

//Khối tạo bài viết
const createPost =document.querySelector(".main__create-post");
const contentCreatePost =document.querySelector("#content-create-post").value;

//====Các hàm render====
//render post API
async function LayPostAPI() {
    try {
        const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if(!responseUsers.ok || !responsePosts.ok) throw new Error(`[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status}`);
        const dataPosts = await responsePosts.json();
        const dataUsers = await responseUsers.json();
        const infoPostAndUserName = dataPosts.map((x) => {
            const find =dataUsers.find((y) => y.id === x.userId)
            if(find){
                return {...x ,username:find.username}
            }
            else{
                return null
            }
        })
        infoPostAndUserName.forEach((x)=>{
            const post = document.createElement("article");
            post.classList.add("posts");
            post.innerHTML=
            `
            <div class="posts__head">
            <a href="/00_pages/Profile.html"><img src="../03_Assets/anh-dai-dien.jpg" alt="Ảnh tác giả" class="posts__avatar" /></a>
            <h3 class="posts__author-name">${x.username}</h3>
          </div>
          
          <div class="posts__between">
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
            `
            mainPost.appendChild(post);
        });
        XuLyXemThem();
    } catch (error) {
        console.log("Loi da chay o error"+error);
    }
}
async function RenderPostAPI() {
    mainPost.innerHTML="";
        await LayPostAPI();
}
RenderPostAPI();
function XuLyXemThem(){
const postMore = document.querySelectorAll(".posts__more");
    postMore.forEach((btn)=>{
        btn.addEventListener("click" ,(e)=>{
            const postText = e.target.previousElementSibling;
            postText.classList.toggle("active");
            if(postText.classList.contains("active")){
                btn.textContent="Thu gọn";
            }
            else{
                btn.textContent="Xem thêm";
            }
        })
    })
}