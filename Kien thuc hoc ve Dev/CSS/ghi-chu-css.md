# Ghi chú CSS — Layout, Position, Responsive, Màu sắc

> Tổng hợp từ quá trình debug thật khi làm giao diện Giỏ hàng mini (Dự án 3).

---

## MỤC LỤC
1. [Reset cơ bản](#1-reset)
2. [position: sticky vs fixed](#2-position)
3. [CSS Variables + calc()](#3-variables)
4. [Responsive mượt: vw + clamp()](#4-responsive)
5. [Bẫy min-height: auto trong Flexbox/Grid](#5-min-height)
6. [overflow-y: auto — cuộn riêng 1 khu vực](#6-overflow)
7. [margin-top: auto trong Flexbox](#7-margin-auto)
8. [Cart Drawer / Modal](#8-cart-drawer)
9. [Nguyên tắc phối màu](#9-mau-sac)

---

## 1. RESET CƠ BẢN

```css
* {
  box-sizing: border-box; /* width/height tính LUÔN cả padding+border, không bị "phình" ra ngoài */
}
body {
  margin: 0; /* trình duyệt tự thêm margin:8px mặc định cho body — LUÔN reset về 0 */
}
```
**Lỗi hay gặp:** quên `margin: 0` cho `body` khiến mọi phần tử `position: sticky/fixed` với `top: 0` bị lệch 1 khoảng nhỏ không rõ nguyên nhân — luôn reset ngay từ đầu dự án.

---

## 2. `position: sticky` VS `fixed`

| | `sticky` | `fixed` |
|---|---|---|
| Có nằm trong luồng bố cục không | Có — vẫn chiếm chỗ như bình thường | Không — bị lấy hẳn ra khỏi luồng |
| "Dính" theo gì | Cuộn tới đúng ngưỡng `top` mới dính | Luôn cố định theo viewport (màn hình), không quan tâm cuộn |
| Bị giới hạn bởi gì | Vùng chứa (phần tử cha) | Không bị giới hạn (trừ cha có `transform`/`filter`) |
| Dùng khi nào | Muốn "dính lại khi cuộn tới" (thanh tiêu đề bảng...) | Muốn đứng yên tuyệt đối (nav cố định, nút nổi...) |

```css
/* sticky — top:0 nghĩa là "dính khi cuộn tới cách đỉnh 0px" */
nav { position: sticky; top: 0; }

/* fixed — luôn đứng yên theo màn hình, cần margin-left ở phần tử bên cạnh để chừa chỗ */
nav { position: fixed; top: 0; left: 0; width: 240px; }
main { margin-left: 240px; }
```

**Lưu ý:** nếu dùng `fixed`, phần tử bị lấy ra khỏi luồng Grid/Flexbox — các phần tử khác sẽ tự chiếm lại chỗ trống, cần tự `margin`/`padding` để chừa đúng khoảng cách.

---

## 3. CSS VARIABLES + `calc()`

Khai báo 1 giá trị dùng lặp lại ở nhiều nơi — chỉ cần sửa 1 chỗ, mọi nơi khác tự động cập nhật theo.

```css
:root {
  --nav-width: 240px; /* khai báo 1 LẦN DUY NHẤT */
}
nav { width: var(--nav-width); }
main { margin-left: calc(var(--nav-width) + 24px); } /* tự tính, luôn khớp theo --nav-width */
```
Đổi `--nav-width` ở 1 chỗ (kể cả trong `@media`) → mọi nơi dùng `var(--nav-width)` tự động đổi theo, không lo quên đồng bộ.

---

## 4. RESPONSIVE MƯỢT: `vw` + `clamp()`

**`vw`** (viewport width) — `1vw` = 1% chiều rộng cửa sổ hiện tại, tự động đổi liên tục khi kéo giãn cửa sổ (không cần `@media`, không cần JS).

```css
--nav-width: 15vw; /* luôn = 15% độ rộng màn hình */
```

**Vấn đề:** `vw` thuần có thể quá nhỏ (màn hình bé) hoặc quá to (màn hình lớn) ở 2 đầu cực.

**`clamp(min, giá-trị-linh-hoạt, max)`** — co giãn mượt theo `vw`, nhưng giới hạn trong khoảng min–max:
```css
--nav-width: clamp(80px, 15vw, 280px);
/* không bao giờ nhỏ hơn 80px, không bao giờ lớn hơn 280px, ở giữa thì co giãn mượt theo 15vw */
```

---

## 5. BẪY `min-height: auto` TRONG FLEXBOX/GRID

**Vấn đề:** đặt `height: 100vh` (hoặc bất kỳ giá trị nào) cho 1 phần tử vừa là Flex/Grid item, vừa chứa nội dung dài — phần tử đó **tự phình to hơn** giá trị đã đặt, "height" như bị vô hiệu hóa.

**Nguyên nhân:** mọi Flex/Grid item mặc định có `min-height: auto` ngầm — nghĩa là "không bao giờ co nhỏ hơn kích thước cần thiết để chứa đủ nội dung bên trong", bất kể `height` khai báo là bao nhiêu.

**Cách sửa — ép về đúng kích thước đã khai:**
```css
nav {
  height: 100vh;
  min-height: 0;  /* TẮT hành vi "tự phình theo nội dung", buộc height:100vh được tôn trọng tuyệt đối */
  overflow-y: auto; /* để phần nội dung dư (nếu có) cuộn được riêng, không bị mất */
}
```

**Hệ quả nếu không sửa:** phần tử `sticky` bên trong 1 Grid track bị phình dư 1 chút so với viewport → khi cuộn hết nội dung dài bên cạnh, phần dư đó kéo theo hiện tượng lệch/giật nhẹ dù nội dung bên trong không hề bị tràn thật sự.

---

## 6. `overflow-y: auto` — CUỘN RIÊNG 1 KHU VỰC

```css
nav {
  height: 100vh;
  overflow-y: auto; /* nếu nội dung con cao hơn khung, tự hiện thanh cuộn RIÊNG cho khu vực này */
}
```
Cho phép 1 khu vực (VD: sidebar) tự cuộn độc lập, không cần cuộn cả trang — hữu ích khi khu vực đó có chiều cao cố định nhưng nội dung có thể dài hơn.

---

## 7. `margin-top: auto` TRONG FLEXBOX

Trong 1 container `flex-direction: column`, đặt `margin-top: auto` cho 1 phần tử con sẽ **đẩy nó xuống CUỐI CÙNG**, chiếm hết mọi khoảng trống thừa phía trên nó.

```css
nav { display: flex; flex-direction: column; }
.account-nav { margin-top: auto; } /* luôn dính SÁT ĐÁY nav, dù menu phía trên dài hay ngắn */
```

**Lưu ý:** chỉ ảnh hưởng đến **vị trí**, không ảnh hưởng đến **kích thước (height)** của chính phần tử đó — 2 khái niệm hoàn toàn tách biệt, dễ nhầm lẫn.

---

## 8. CART DRAWER / MODAL

Panel trượt đè lên trang hiện tại (giỏ hàng, menu mobile...) — xem chi tiết đầy đủ trong file `ghi-chu-javascript-co-ban.md`, mục "Cart Drawer / Modal" (vì cần kết hợp JS để bật/tắt bằng `classList`).

Cốt lõi CSS:
```css
.backdrop { position: fixed; inset: 0; opacity: 0; pointer-events: none; transition: opacity .3s; }
.backdrop.active { opacity: 1; pointer-events: auto; }

.drawer { position: fixed; top: 0; right: 0; transform: translateX(100%); transition: transform .3s; }
.drawer.active { transform: translateX(0); }
```
*(`inset: 0` là cách viết gọn cho `top:0; right:0; bottom:0; left:0;` cùng lúc.)*

---

## 9. NGUYÊN TẮC PHỐI MÀU (dark mode)

**Lỗi hay gặp — bảng màu "phèn":**
- Dùng màu neon/độ bão hòa quá cao (VD: `rgb(148, 219, 42)`) làm màu nhấn chính — chói, khó nhìn lâu
- Nhiều sắc thái của cùng 1 màu (2-3 tông xanh khác nhau) dùng rải rác không nhất quán
- Các lớp nền (`body`, `header`, `card`...) có độ sáng quá gần nhau — mất phân lớp thị giác (visual hierarchy)

**Nguyên tắc sửa:**
```css
:root {
  --bg-main: #14161a;     /* nền chính — xám đen ấm, KHÔNG đen tuyền #000 */
  --bg-panel: #1e2126;    /* nền các khối nổi (nav/card/header) — phải SÁNG HƠN RÕ RỆT bg-main */
  --accent: #4ade80;      /* CHỈ 1 tông màu nhấn duy nhất, độ bão hòa vừa phải — dùng cho MỌI nút/link */
  --text-main: #e5e7eb;   /* trắng ngà, không dùng trắng tinh #fff (đỡ chói) */
  --text-muted: #9ca3af;  /* xám nhạt cho text phụ, ít quan trọng */
}
```
- Chỉ nên có **1 màu nhấn (accent) duy nhất** trong toàn bộ giao diện — dùng lặp lại cho mọi nút/link/icon quan trọng, không tự sáng tạo thêm biến thể khác
- 2 lớp nền cạnh nhau (VD: card nằm trên `body`) nên **chênh độ sáng đủ rõ** để mắt phân biệt được ngay, không cần nhìn kỹ mới thấy khác
