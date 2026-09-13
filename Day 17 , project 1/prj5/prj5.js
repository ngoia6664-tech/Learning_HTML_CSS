let ListNote = JSON.parse(localStorage.getItem("ListNote")) || [];

const mainContent = document.querySelector(".main-content");
const Note = document.querySelector(".Note");
const nen = document.querySelector(".nen");
const searchInput = document.querySelector(".search-note input");
const btnImportant = document.querySelector(".note-important");
const createNote = document.querySelector(".create-note");

let idChange = null;       // null = đang thêm mới; có giá trị = đang sửa đúng ghi chú đó
let dangLocQuanTrong = false; // trạng thái: có đang chỉ hiện ghi chú quan trọng không

// ===== RENDER =====
// Nhận vào 1 mảng để hiển thị — không tự đọc ListNote bên trong, để dùng lại được cho search/lọc
function renderGhiChu(danhSach) {
  if (danhSach.length === 0) {
    mainContent.innerHTML = `<p>Bạn chưa có ghi chú nào</p>`;
    return;
  }
  mainContent.innerHTML = "";
  danhSach.forEach((x) => {
    const noteContent = document.createElement("div");
    noteContent.classList.add("note-content");
    noteContent.dataset.id = x.id;
    noteContent.innerHTML = `
      <h3>${x.Title}</h3>
      <div class="last-note">
        <div class="note-important-main">
          <i class="fa-solid ${x.Important ? "fas" : "far"} fa-star"></i>
          <span class="important">Đánh dấu quan trọng</span>
        </div>
        <button class="xoa">Xóa ghi chú</button>
      </div>`;
    mainContent.appendChild(noteContent);
  });
}

// Lưu localStorage + vẽ lại đúng danh sách đang được xem (toàn bộ, hoặc đã lọc quan trọng, hoặc đã search)
function luuVaRenderGhiChu() {
  localStorage.setItem("ListNote", JSON.stringify(ListNote));
  apDungBoLocHienTai();
}

// Tính lại danh sách cần hiển thị dựa theo trạng thái lọc + ô tìm kiếm hiện tại, rồi render
function apDungBoLocHienTai() {
  let ketQua = dangLocQuanTrong ? ListNote.filter((x) => x.Important) : ListNote;

  const tuKhoa = searchInput.value.trim().toLowerCase();
  if (tuKhoa !== "") {
    ketQua = ketQua.filter((x) => x.Title.toLowerCase().includes(tuKhoa));
  }
  renderGhiChu(ketQua);
}

renderGhiChu(ListNote);

// ===== SỰ KIỆN TRÊN DANH SÁCH GHI CHÚ =====
// Thứ tự kiểm tra: nút cụ thể nhất trước (xóa, sao), rồi mới đến "mở ghi chú" (tổng quát nhất)
mainContent.addEventListener("click", (e) => {
  const noteContent = e.target.closest(".note-content");
  if (!noteContent) return; // click ra ngoài mọi khối ghi chú thì bỏ qua
  const id = Number(noteContent.dataset.id);

  // 1. Bấm nút Xóa
  if (e.target.closest(".xoa")) {
    ListNote = ListNote.filter((x) => x.id !== id);
    luuVaRenderGhiChu();
    return;
  }

  // 2. Bấm ngôi sao — đánh dấu/bỏ đánh dấu quan trọng
  if (e.target.closest(".note-important-main")) {
    ListNote = ListNote.map((x) => {
      if (x.id === id) x.Important = !x.Important;
      return x;
    });
    luuVaRenderGhiChu();
    return;
  }

  // 3. Click vào phần còn lại của khối — mở ghi chú để sửa
  const note = ListNote.find((x) => x.id === id);
  if (!note) return;

  idChange = note.id;
  moModalGhiChu(note.Title, note.Content);
});

// ===== MODAL: MỞ ĐỂ THÊM MỚI hoặc SỬA =====
function moModalGhiChu(title = "", content = "") {
  Note.innerHTML = `
    <button class="Dong">Đóng</button>
    <input class="Title" type="text" placeholder="Tiêu đề" value="${title}">
    <textarea name="GhiChu" id="GhiChu" rows="8">${content}</textarea>
    <button class="Save">Lưu</button>`;
  ganSuKienModal();
  OpenNote();
}

function ganSuKienModal() {
  document.querySelector(".Save").addEventListener("click", () => {
    if (idChange === null) {
      themGhiChuMoi();
    } else {
      capNhatGhiChu();
    }
  });
  document.querySelector(".Dong").addEventListener("click", CloseNote);
}

function themGhiChuMoi() {
  const Title = document.querySelector(".Title").value.trim();
  const Content = document.querySelector("#GhiChu").value;
  if (Title === "") return;

  ListNote.push({
    id: Date.now(),
    Title: Title,
    Content: Content,
    Important: false,
    ngayTao: new Date().toLocaleDateString("vi-VN"),
  });
  luuVaRenderGhiChu();
  alert("Bạn đã thêm ghi chú thành công");
  idChange = null;
  CloseNote();
}

function capNhatGhiChu() {
  const Title = document.querySelector(".Title").value.trim();
  const Content = document.querySelector("#GhiChu").value;
  if (Title === "") return;

  ListNote = ListNote.map((x) => {
    if (x.id === idChange) {
      x.Title = Title;
      x.Content = Content;
    }
    return x;
  });
  luuVaRenderGhiChu();
  alert("Bạn đã lưu thành công");
  idChange = null;
  CloseNote();
}

function OpenNote() {
  Note.classList.add("active");
  nen.classList.add("active");
}
function CloseNote() {
  Note.classList.remove("active");
  nen.classList.remove("active");
}

// ===== NÚT "+" — THÊM GHI CHÚ MỚI =====
createNote.addEventListener("click", () => {
  idChange = null; // đảm bảo đây là chế độ THÊM MỚI, không dính chế độ sửa trước đó
  moModalGhiChu(); // mở modal trống
});

// ===== ĐÓNG MODAL KHI BẤM RA NGOÀI (NỀN MỜ) =====
nen.addEventListener("click", CloseNote);

// ===== TÌM KIẾM THEO TIÊU ĐỀ =====
searchInput.addEventListener("input", apDungBoLocHienTai);

// ===== LỌC "CHỈ HIỆN GHI CHÚ QUAN TRỌNG" =====
btnImportant.addEventListener("click", () => {
  dangLocQuanTrong = !dangLocQuanTrong; // bật/tắt
  btnImportant.classList.toggle("active", dangLocQuanTrong); // đổi giao diện nút cho biết đang bật/tắt (cần thêm CSS cho .note-important.active nếu muốn)
  apDungBoLocHienTai();
});
//