# Từ điển thuật ngữ tiếng Anh trong React + Next.js

> File tra cứu song song với `ghi-chu-react.md` (và nối tiếp `tu-dien-thuat-ngu-javascript.md`). Mỗi thuật ngữ có: nghĩa đen tiếng Anh, giải nghĩa trong ngữ cảnh lập trình, và ví dụ code. Cập nhật liên tục mỗi khi gặp từ mới.

---

## MỤC LỤC
1. [Khái niệm cốt lõi của React](#1)
2. [Cú pháp & quy ước](#2)
3. [Next.js & công cụ](#3)

---

## 1. KHÁI NIỆM CỐT LÕI CỦA REACT

### Library vs Framework
- **Library** (nghĩa đen: "thư viện") = bộ công cụ **em gọi** khi cần, em tự quyết định cấu trúc dự án. **React** là library, chỉ lo phần giao diện.
- **Framework** (nghĩa đen: "khung sườn") = bộ khung **có sẵn quy định** cách tổ chức dự án; em viết code theo khung đó. **Next.js** là framework xây trên React (thêm routing, server, tối ưu...).

### Component
- **Nghĩa đen:** "thành phần, bộ phận cấu thành"
- **Trong React:** 1 function viết hoa chữ đầu, `return` ra 1 mẩu giao diện. Giao diện cả trang được ghép từ nhiều component nhỏ, dùng lại được nhiều lần.
```tsx
function PostCard() {
  return <div>Một bài viết</div>;
}
// dùng: <PostCard /> <PostCard />
```

### JSX
- **Nghĩa đen:** viết tắt của "JavaScript XML"
- **Trong React:** cú pháp viết giao diện giống HTML ngay trong code JS. **Không phải HTML thật** — được biên dịch thành lệnh JS. Chỉ phần trong `{ }` mới là JavaScript; luật bắt buộc: chỉ 1 thẻ bao ngoài cùng.

### Props
- **Nghĩa đen:** viết tắt của "properties" — "thuộc tính"
- **Trong React:** dữ liệu **truyền từ component cha xuống component con**, viết như thuộc tính thẻ HTML, bên trong con nhận thành **1 object**. Về bản chất là *tham số của component*. Con chỉ **đọc**, không tự sửa props.
```tsx
<PostCard author="An" />            // truyền
function PostCard(props: { author: string }) { return <h3>{props.author}</h3>; }  // nhận
```

### State
- **Nghĩa đen:** "trạng thái"
- **Trong React:** dữ liệu **thuộc về 1 component** mà khi nó đổi (qua hàm set) thì React **vẽ lại** giao diện. Khác biến thường ở chỗ được React cất giữ và theo dõi.
```tsx
const [people, setPeople] = useState(duLieuBanDau);
```

### Hook
- **Nghĩa đen:** "cái móc, cái lưỡi câu"
- **Trong React:** function đặc biệt tên bắt đầu bằng `use` (`useState`, `useEffect`...), cho component "móc vào" các tính năng của React (như lưu state). Chỉ gọi ở **đầu** component, không gọi trong `if` hay vòng lặp.

### Render
- **Nghĩa đen:** "kết xuất, trình bày, vẽ ra"
- **Trong React:** việc React gọi hàm component để lấy ra mô tả giao diện rồi cập nhật lên màn hình. "Render danh sách" = biến 1 mảng dữ liệu thành nhiều thẻ.

### Re-render
- **Nghĩa đen:** "vẽ lại"
- **Trong React:** React **gọi lại hàm component** với state mới. Xảy ra khi hàm set nhận được giá trị **khác địa chỉ** với state hiện tại. Mọi biến bên trong hàm được tạo mới mỗi lần re-render; state thì được React giữ lại ở chỗ khác.

### Key
- **Nghĩa đen:** "chìa khóa"; ở đây là **nhãn nhận dạng**
- **Trong React:** thuộc tính đặc biệt khi render danh sách, giúp React biết thẻ nào ứng với dữ liệu nào. Phải duy nhất và ổn định (dùng `id`). **Không** được chuyển vào props.
```tsx
{people.map((p) => <PostCard key={p.id} ... />)}
```

### Immutable / Immutability
- **Nghĩa đen:** "bất biến, không thể thay đổi" (im- = không, mutable = có thể biến đổi)
- **Trong React:** nguyên tắc **không sửa thẳng state cũ** mà tạo bản mới (mảng/object mới) rồi đưa vào hàm set. Đối lập với **mutate** (xem từ điển JS). Lý do: React chỉ nhận ra thay đổi khi **địa chỉ** khác.

### Virtual DOM / Reconciliation
- **Nghĩa đen:** "DOM ảo" / "sự đối chiếu, điều hòa"
- **Trong React:** bản mô tả giao diện nằm trong bộ nhớ. Mỗi lần re-render React **so** bản mới với bản cũ rồi chỉ sửa đúng phần khác biệt trên DOM thật — thay cho cách vanilla JS xóa `innerHTML` rồi vẽ lại toàn bộ.

---

## 2. CÚ PHÁP & QUY ƯỚC

### Fragment
- **Nghĩa đen:** "mảnh, mẩu"
- **Trong React:** thẻ rỗng `<> ... </>` dùng để bọc nhiều thẻ thành 1 (thỏa luật "1 thẻ bao ngoài") **mà không sinh thêm thẻ thừa** trên trang.
```tsx
return (
  <>
    <h3>Tiêu đề</h3>
    <p>Nội dung</p>
  </>
);
```

### Self-closing tag
- **Nghĩa đen:** "thẻ tự đóng"
- **Trong React:** thẻ không có nội dung bên trong, đóng ngay bằng `/>`: `<PostCard />`. Component bắt buộc viết hoa để React phân biệt với thẻ HTML thường.

### Event handler
- **Nghĩa đen:** "bộ xử lý sự kiện"
- **Trong React:** hàm gắn vào sự kiện qua thuộc tính `onClick`, `onChange`... Phải truyền **một hàm**, không phải kết quả gọi hàm.
```tsx
<button onClick={() => xoa(p.id)}>Xóa</button>   // đúng — hàm chờ
<button onClick={xoa(p.id)}>Xóa</button>           // sai — chạy ngay lúc vẽ
```

### Type annotation (TypeScript)
- **Nghĩa đen:** "chú thích kiểu"
- **Trong TypeScript:** phần sau dấu `:` khai báo **kiểu dữ liệu** của biến/tham số. Truyền sai kiểu → VS Code báo lỗi **trước khi chạy**.
```tsx
function PostCard(props: { author: string; like: boolean }) { ... }
```

### Shorthand property
- **Nghĩa đen:** "thuộc tính viết tắt"
- **Trong JS:** khi tên key trùng tên biến thì viết gọn: `{ id, username }` thay cho `{ id: id, username: username }`.

---

## 3. NEXT.JS & CÔNG CỤ

### Node.js
- **Nghĩa đen:** "Node" = nút, "js" = JavaScript
- **Trong thực tế:** môi trường **chạy JavaScript ngoài trình duyệt** (trên máy/server). Cần cho công cụ build của React/Next.js; ở Giai đoạn 3 dùng để viết backend.

### npm / npx
- **npm** = *Node Package Manager* ("trình quản lý gói của Node"): cài/chạy thư viện (`npm run dev`).
- **npx** = *execute package* ("chạy gói"): chạy 1 công cụ **không cần cài sẵn vĩnh viễn**, VD `npx create-next-app@latest`.

### localhost
- **Nghĩa đen:** "máy chủ cục bộ" — chính máy của em
- **Trong thực tế:** địa chỉ để mở app đang chạy trên máy mình. `http://localhost:3000` = app ở **cổng (port) 3000**. Chỉ em thấy, chưa lên mạng.

### App Router
- **Nghĩa đen:** "bộ định tuyến kiểu App"
- **Trong Next.js:** cách chia trang theo **cấu trúc thư mục trong `app/`** — file `app/page.tsx` là trang chủ. (Sẽ học kỹ phần routing sau.)

### Server component vs Client component
- **Server** = "máy chủ", **Client** = "máy khách" (trình duyệt của người dùng).
- **Trong Next.js:** component **mặc định chạy trên server** (không tương tác được). Component dùng `useState` hoặc sự kiện (`onClick`) phải chạy **trên trình duyệt** → đánh dấu bằng dòng `"use client";` ở đầu file. (Bản chất sâu hơn sẽ học sau.)

### Dev server
- **Nghĩa đen:** "máy chủ phát triển"
- **Trong thực tế:** thứ chạy khi gõ `npm run dev`. Tự **tải lại trang mỗi khi lưu file** để thấy kết quả ngay. Khác với bản production (deploy thật).
