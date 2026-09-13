//Khai báo
//Các nút
const note = document.querySelector(".Note"); //Khối div của note
const mainContent = document.querySelector(".main-content"); //Danh sách các note
const newNote = document.querySelector(".create-note"); //Dấu cộng
//Khai báo mảng
let ListNoteNEW = JSON.parse(localStorage.getItem("ListNoteNEW")) || [].filter(Boolean);
let IDChange = null;
//Hàm truyền dữ liệu cho ListNote;
function luuVaRenderGhiChu() {
  localStorage.setItem("ListNoteNEW",JSON.stringify(ListNoteNEW));
  renderGhiChu(ListNoteNEW);
}
function renderGhiChu(Array) {
  mainContent.innerHTML="";
  if (Array.length === 0) {
    mainContent.textContent = "Bạn chưa có ghi chú nào";
  } else {
    Array.forEach((x) => {
      const noteContent = document.createElement("div");
      noteContent.classList.add("note-content");
      noteContent.dataset.id = x.id;
      noteContent.innerHTML = `
            <h3>${x.Title}</h3>
            <div class="last-note">
              <div class="note-important-main">
                <i class="fa-solid fa-star"></i>
                <span>Đánh dấu quan trọng</span>
              </div>
            </div>
            `;
      mainContent.appendChild(noteContent);
    });
  }
}
luuVaRenderGhiChu();
//Sự kiện render note khi mở các khối div
function RenderContentNote(x) {
  console.log("banjd dã chạy rendernote");
  OpenNote();
  if(x){
  note.innerHTML = `
      <button class="Dong">Đóng</button>
      <input class="Title" type="text" placeholder="Tiêu đề" value="${x.Title}" />
      <textarea name="GhiChu" id="GhiChu" width="500px" height="500px">${x.Content}
      </textarea>
      <button class="Save">Lưu</button>
    `;
  }
  else{
    note.innerHTML = `
      <button class="Dong">Đóng</button>
      <input class="Title" type="text" placeholder="Tiêu đề" />
      <textarea name="GhiChu" id="GhiChu" width="500px" height="500px">
      </textarea>
      <button class="Save">Lưu</button>
    `;
  }
  const Dong=document.querySelector(".Dong");//Nút Đóng cửa sổ
    Dong.addEventListener("click" , () =>{
        CloseNote();
    })
    const Save =document.querySelector(".Save");
    Save.addEventListener("click" , () =>{
      console.log("bạn đã ấn vào nút save");
        SaveNote();
    })
}
 const nen =document.querySelector(".nen");
    nen.addEventListener("click" , ()=>{
      CloseNote();
    })
//Tạo note mới
newNote.addEventListener("click" ,() =>{
  IDChange=null;
  console.log("bạn đã mở được newNote");
  RenderContentNote();
})
// ====== SỰ KIỆN MỞ ĐÓNG CÁC NOTE=====
//Hàm mở
function OpenNote() {
  console.log("chạy opnen note thành công");
  nen.classList.add("active");
  note.classList.add("active");
}

function CloseNote() {
  nen.classList.remove("active");
  note.classList.remove("active");
  IDChange=null;
}
//Hàm lưu các note
function SaveNote() {
  const Title = document.querySelector(".Title").value;
  const Content = document.querySelector("#GhiChu").value;
  if(Title===""){
    alert("bạn chưa nhập tiêu đề");
    return;
  }
  if (!IDChange) {
    ListNoteNEW.push({
      id: Date.now(),
      Title: Title,
      Content: Content,
      Date: new Date().toLocaleDateString("vi-VN"),
      important: null,
    });
    alert("Bạn đã thêm thành công");
  } else {
    updateNote();
    alert("Bạn đã lưu thành công");
  }
  CloseNote();
  luuVaRenderGhiChu();
  console.log(ListNoteNEW);
  console.log(IDChange);
  IDChange=null;
}
//Hàm update lại Nội dung Của Note
function updateNote() {
  const Title = document.querySelector(".Title").value;
  const Content = document.querySelector("#GhiChu").value;
  ListNoteNEW = ListNoteNEW.map((x) => {
    if(IDChange===x.id){
    x.Title = Title;
    x.Content = Content;
  }
  return x;
  });
}
//Sự kiện mở khối Div ra
mainContent.addEventListener("click" , (e) =>{
  const noteContent=e.target.closest(".note-content");
  if(!noteContent) return;
  const id = Number(noteContent.dataset.id);
  const note_click =ListNoteNEW.find((x) => x.id===id);
  console.log("đây là div bạn mở ra:"+note_click);
  IDChange=note_click.id;
  console.log(IDChange);
  RenderContentNote(note_click);
})

