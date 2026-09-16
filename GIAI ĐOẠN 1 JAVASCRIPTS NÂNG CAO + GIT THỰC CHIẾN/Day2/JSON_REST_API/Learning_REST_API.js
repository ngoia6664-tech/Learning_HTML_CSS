// REST API — quy ước giao tiếp giữa client và server

// REST = Representational State Transfer — 1 bộ quy ước (không phải công nghệ cụ thể) về cách thiết kế API sao cho client biết chính xác cần gửi gì, tới đâu, để làm việc gì.

// 4 thành phần của 1 request:

// URL (endpoint) — địa chỉ tài nguyên muốn thao tác, VD: https://api.example.com/users/5 (user có id = 5)
// HTTP method — hành động muốn làm:
// Method	Công dụng
// GET	Lấy dữ liệu (không thay đổi gì)
// POST	Tạo mới dữ liệu
// PUT/PATCH	Cập nhật dữ liệu có sẵn
// DELETE	Xóa dữ liệu
// Headers — thông tin phụ đi kèm request (VD: báo cho server biết dữ liệu gửi lên là JSON)
// Body — dữ liệu thật sự gửi đi (chỉ có ở POST/PUT, không có ở GET)

// Status code trả về — nhóm số đầu tiên là quan trọng nhất:

// 2xx → thành công (200 OK, 201 Created)
// 4xx → lỗi do phía client (404 Not Found, 400 Bad Request)
// // 5xx → lỗi do phía server
async function TaobaiViet() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      //fetch luôn mặc định là GET , phải viết kiêu method mà mình muốn
      headers: { "Content-Type": "application/json" },
      //Báo cho server biết kiểu dữ liệu mình truyền là json
      //Để server đọc đúng kiểu dữ liệu
      body: JSON.stringify({
        title: "Test2",
        body: "hello2",
        userID: 1,
        id: 102,
      }),
    });
    if (!response.ok) {
      console.log(response.status);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (loi) {
    console.log(loi);
  }
}
TaobaiViet();
//Tương tự với sửa (methot:"PATCH") và xóa("method:DELETE")