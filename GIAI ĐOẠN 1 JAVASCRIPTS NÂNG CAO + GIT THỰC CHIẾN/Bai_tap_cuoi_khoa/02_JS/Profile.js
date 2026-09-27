//Khai báo
let MyPosts = JSON.parse(localStorage.getItem("MyPosts"))||[]; //Khai báo bài viết cục bộ
//Các hàm render
function LuuVaRenderMyPost(){
    localStorage.setItem("myPost",JSON.parse(myPost));
    renderMyPost();
}
function renderMyPost(){
}