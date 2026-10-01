# Postify

Mạng xã hội thu nhỏ viết bằng **HTML, CSS và JavaScript thuần** (không dùng framework). Dữ liệu bài viết, tác giả và bình luận lấy từ API công khai [JSONPlaceholder](https://jsonplaceholder.typicode.com), sau đó được lưu vào `localStorage` để các thao tác của người dùng (thả tim, lưu bài, bình luận, đăng bài) không bị mất khi tải lại trang.

Đây là dự án cuối Giai đoạn 1 trong lộ trình học Full Stack của mình.

<!-- Thêm ảnh chụp màn hình: chụp trang Home, lưu vào 03_Assets/demo.png rồi bỏ dấu comment dòng dưới -->
<!-- ![Giao diện trang chủ Postify](./03_Assets/demo.png) -->

## Tính năng

- **Trang chủ:** hiển thị danh sách bài viết kèm tên tác giả
- **Tìm kiếm** theo tiêu đề hoặc nội dung, **lọc** theo tác giả
- **Thả tim** và **lưu bài viết** (trạng thái được giữ lại sau khi tải lại trang)
- **Bình luận:** xem bình luận của từng bài và thêm bình luận mới
- **Trang bài viết đã lưu:** chỉ hiển thị các bài đã lưu, có tìm kiếm và lọc riêng
- **Trang cá nhân:** bấm vào tên hoặc ảnh tác giả để xem thông tin và các bài viết của người đó (đọc `userId` từ đường dẫn, ví dụ `Profile.html?userId=3`)
- **Đăng bài viết mới** (lưu cục bộ trong trình duyệt)

## Công nghệ sử dụng

| Phần | Công nghệ |
|---|---|
| Giao diện | HTML5, CSS3 (CSS variables, Grid, Flexbox) |
| Logic | JavaScript ES Modules (`import` / `export`) |
| Gọi dữ liệu | `fetch`, `async/await`, xử lý lỗi bằng `try/catch` |
| Lưu trữ | `localStorage` (`JSON.stringify` / `JSON.parse`) |
| Icon | [Remix Icon](https://remixicon.com) qua CDN |
| Dữ liệu mẫu | API JSONPlaceholder (`/posts`, `/users`, `/comments`) |

## Cách chạy

Dự án dùng ES Modules nên **không mở trực tiếp file `.html` bằng cách nhấp đúp** được (trình duyệt sẽ chặn). Cần chạy qua một server cục bộ:

1. Mở **thư mục gốc của dự án** (thư mục chứa file `README.md` này) bằng VS Code.
2. Cài extension **Live Server** (nếu chưa có).
3. Chuột phải vào `Home.html` → chọn **Open with Live Server**.
4. Cần có kết nối mạng ở lần chạy đầu tiên để tải dữ liệu từ API. Sau đó dữ liệu được lưu trong `localStorage`.

> Muốn xóa dữ liệu đã lưu và tải lại từ đầu: mở DevTools (F12) → tab **Application** → **Local Storage** → xóa khóa `infoPostAndUserName` rồi tải lại trang.

## Cấu trúc thư mục

```
Postify/
├── README.md
├── Home.html
├── 00_pages/
│   ├── Saved.html
│   └── Profile.html
├── 01_CSS/
│   ├── Global.css
│   ├── Saved.css
│   └── Profile.css
├── 02_JS/
│   ├── Data.js        # lấy API, lưu localStorage, các hàm dùng chung
│   ├── Home.js
│   ├── Saved.js
│   └── Profile.js
└── 03_Assets/
    └── anh-dai-dien.jpg
```

## Cách dữ liệu hoạt động

1. Lần đầu mở trang, `Data.js` gọi 3 API (`posts`, `users`, `comments`) và gộp thành một object duy nhất.
2. Object này được lưu vào `localStorage` dưới khóa `infoPostAndUserName`.
3. Các lần sau, trang đọc thẳng từ `localStorage`, không gọi lại API.
4. Mỗi thao tác (thả tim, lưu bài, bình luận, đăng bài) cập nhật object rồi ghi lại vào `localStorage`.

## Giới hạn hiện tại

- Dữ liệu từ JSONPlaceholder chỉ là dữ liệu giả để thực hành; bài viết và bình luận mới chỉ tồn tại trong trình duyệt của bạn, không được gửi lên máy chủ thật.
- Chưa có đăng ký / đăng nhập; tài khoản của mình được gán cố định với `id = 11`.

## Tác giả

Ngô Duy Anh — sinh viên Công nghệ thông tin, Học viện Kỹ thuật Mật mã.