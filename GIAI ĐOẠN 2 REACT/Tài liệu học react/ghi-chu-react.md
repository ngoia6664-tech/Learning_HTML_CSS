# Ghi chú React + Next.js — Giai đoạn 2

> Tài liệu tổng hợp kiến thức React theo từng buổi, dùng để tra cứu nhanh thay vì lướt lại chat. File song song với `tu-dien-thuat-ngu-react.md`. Cập nhật mỗi khi học thêm phần mới.

---

## MỤC LỤC
0. [Ba câu cần nhớ](#0)
1. [Cài đặt & cấu trúc thư mục](#1)
2. [Component & JSX](#2)
3. [Props](#3)
4. [Render danh sách: `map` + `key`](#4)
5. [`useState` — state & vẽ lại giao diện](#5)
6. [Thêm / xóa / sửa phần tử trong state](#6)
7. [Bản chất: `useState` giữ dữ liệu ở đâu](#7)
8. [Lỗi hay gặp — checklist tự kiểm tra](#8)
9. [Tiến độ](#9)

---

## 0. BA CÂU CẦN NHỚ

1. **Component là 1 function viết hoa chữ đầu, `return` ra giao diện (JSX).** React là bên gọi hàm đó, không phải mình.
2. **Dữ liệu muốn làm giao diện đổi theo thì phải nằm trong state, và chỉ đổi qua hàm set.** Sửa trực tiếp biến thường → React không biết → màn hình đứng yên.
3. **React nhận ra "dữ liệu đã đổi" bằng cách so địa chỉ trong bộ nhớ.** Vì vậy luôn đưa mảng/object **MỚI** vào hàm set, không sửa thẳng mảng/object cũ.

---

## 1. CÀI ĐẶT & CẤU TRÚC THƯ MỤC

```bash
node -v        # kiểm tra đã có Node.js chưa (nếu chưa: cài bản LTS từ nodejs.org)
npm -v
npx create-next-app@latest ten-du-an
```

Khi chạy lệnh tạo project:
- Dòng `Ok to proceed? (y)` → **chỉ gõ chữ `y` rồi Enter**. Gõ lại cả câu lệnh vào đó thì npm hủy (`npm error canceled`).
- Dòng `Would you like to use the recommended Next.js defaults?` → chọn **Yes** (gồm TypeScript, ESLint, Tailwind CSS, App Router).

```bash
cd ten-du-an
npm run dev     # chạy thử, mở http://localhost:3000
```

| Thư mục / file | Vai trò | Có sửa không? |
|---|---|---|
| `app/` | **Nơi viết code.** Trang chính là `app/page.tsx` | Có |
| `.next/`, `node_modules/` | Máy tự sinh ra | **Không bao giờ sửa** |
| `package.json` | Danh sách thư viện + các lệnh (`npm run dev`...) | Khi cài thêm thư viện |
| `tsconfig.json`, `next.config.ts` | Cấu hình TypeScript / Next.js | Chưa cần, học khi dùng tới |

---

## 2. COMPONENT & JSX

**Bản chất:** thay vì coi giao diện là 1 khối HTML liền, React chia nó thành các **function nhỏ, mỗi function trả về 1 mẩu giao diện**. Mỗi function đó là 1 component.

```tsx
function PostCard() {
  return (
    <div>
      <h3>Tên tác giả</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
```

`Home` viết `<PostCard />` 3 lần → **React** gọi hàm `PostCard` 3 lần, mỗi lần ra 1 bản giao diện độc lập. Không còn `forEach` + `createElement` + `appendChild`.

**Luật tối thiểu:**
- Tên component **viết hoa chữ đầu** (`PostCard`, không phải `postCard`). Viết thường thì React hiểu là thẻ HTML thường.
- Dùng component bằng thẻ tự đóng: `<PostCard />`.
- JSX **chỉ được có đúng 1 thẻ bao ngoài cùng** trong `return` (vì `return` chỉ trả về được 1 giá trị). Không muốn thêm thẻ thừa thì bọc bằng Fragment `<> ... </>`.
- `page.tsx` phải có **đúng 1 component `export default`** — đó là thứ Next.js hiển thị khi vào trang. Component phụ trong file không cần `export`.
- **JSX không phải HTML thật**, là JS được biên dịch lại. Chỉ phần trong `{ }` mới là JavaScript, phần còn lại là chữ thường.

---

## 3. PROPS

**Bản chất:** component là function → function nhận tham số. Tham số của component gọi là **props**, nhưng viết như thuộc tính của thẻ HTML. React gom các cặp `tên="giá trị"` thành **1 object** rồi truyền vào hàm.

```tsx
function PostCard(props: { author: string; content: string; like: boolean }) {
  return (
    <div>
      <h3>
        {props.author} {props.like ? "❤️" : "🤍"}
      </h3>
      <p>{props.content}</p>
    </div>
  );
}

<PostCard author="An" content="Hôm nay học React" like={true} />
// bên trong PostCard: props = { author: "An", content: "Hôm nay học React", like: true }
```

**Quy tắc truyền props:**
- **Chuỗi** → ngoặc kép: `author="An"`
- **Mọi thứ khác** (boolean, số, mảng, object, biến) → bọc trong `{ }`: `like={true}`, `age={20}`
- Viết `like = true` (không có `{ }`) là lỗi cú pháp.

**`{ }` trong JSX** = "chỗ này là JavaScript, hãy tính giá trị rồi hiện". Phép chọn `? :` và biến phải nằm **trọn trong** `{ }`:
```tsx
<i>{props.like ? "❤️" : "🤍"}</i>      // đúng
<i>{props.like} ? ❤️ : 🤍</i>            // SAI — phần ngoài { } bị in ra nguyên văn thành chữ
```
Lưu ý: React **không in** giá trị `true`/`false` đứng một mình.

**`props: { author: string; ... }`** là phần TypeScript: khai báo kiểu của props. Truyền thiếu prop hoặc sai kiểu → VS Code gạch đỏ **trước khi chạy**. Ví dụ `like="true"` (chuỗi) bị báo lỗi vì cần boolean.

---

## 4. RENDER DANH SÁCH: `map` + `key`

Dữ liệu là mảng → dùng `map` biến mỗi phần tử thành 1 thẻ.

```tsx
const people = [
  { id: 1, username: "An", content: "Hôm nay học React" },
  { id: 2, username: "Bình", content: "Vật lý rất vui" },
];

export default function Home() {
  return (
    <div>
      {people.map((p) => (
        <PostCard key={p.id} username={p.username} content={p.content} />
      ))}
    </div>
  );
}
```

- **Dấu `( )` sau `=>`**: arrow function dùng ngoặc tròn thì giá trị bên trong **tự được return**. Dùng `{ }` mà quên `return` → `map` cho ra `undefined`.
- Mỗi vòng `map` chỉ được trả **1 thẻ**. Hai thẻ song song (VD: `<div>` rồi `<button>`) → lỗi.
- **`key`** là thuộc tính bắt buộc khi render danh sách: nhãn nhận dạng để React biết thẻ nào ứng với dữ liệu nào, nhờ đó chỉ sửa đúng thẻ đổi.
  - Phải **duy nhất** trong danh sách và **ổn định** → dùng `id` của dữ liệu.
  - **Tránh dùng `index`** của `map` làm key khi danh sách có thể xóa/thêm (xóa phần tử giữa → các vị trí dịch đi → React nhận nhầm thẻ).
  - `key` là thuộc tính **dành riêng cho React**: nó **không** được chuyển vào `props`. `props.key` luôn là `undefined`. Muốn hiện id ra thì truyền thêm 1 prop tên khác (`id={p.id}`).
- Nút "Thêm" (chỉ cần 1 nút) phải nằm **ngoài** `map`, trước dòng `{people.map(...)}`, nhưng vẫn **bên trong** thẻ bao ngoài cùng.

---

## 5. `useState` — STATE & VẼ LẠI GIAO DIỆN

**Vấn đề:** component chỉ là function. React gọi `Home()` một lần, nhận giao diện, vẽ ra rồi thôi. Biến thường bị sửa sau đó **không báo gì cho React** → không ai gọi lại `Home()` → màn hình đứng yên. (Trong vanilla JS, đây là lý do phải tự gọi `render()` sau mỗi lần đổi dữ liệu.)

**Giải pháp:** `useState` — dữ liệu "được React theo dõi". Khi đổi nó **qua hàm set**, React gọi lại hàm component và cập nhật màn hình.

```tsx
"use client";

import { useState } from "react";

const duLieuBanDau = [
  { id: 1, username: "An", content: "Hôm nay học React" },
  { id: 2, username: "Bình", content: "Vật lý rất vui" },
];

export default function Home() {
  const [people, setPeople] = useState(duLieuBanDau);

  function xoa(id: number) {
    setPeople(people.filter((p) => p.id !== id));
  }

  return (
    <div>
      {people.map((p) => (
        <div key={p.id}>
          <PostCard username={p.username} content={p.content} />
          <button onClick={() => xoa(p.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}
```

**Đọc dòng `const [people, setPeople] = useState(duLieuBanDau);`:**
- `useState(...)` trả về **1 mảng 2 phần tử**; `[people, setPeople]` là **destructuring mảng**.
- `people` = **giá trị hiện tại** (mảng dữ liệu). `setPeople` = **hàm** để đổi giá trị. Một cái để đọc, một cái để gọi — đừng lẫn.
- Tham số `duLieuBanDau` **chỉ dùng 1 lần, ở lần vẽ đầu tiên**.

**`"use client";` ở đầu file:** trong Next.js, component mặc định chạy trên server (không có tương tác). Có `useState` hoặc sự kiện như `onClick` thì phải đánh dấu file bằng dòng này, thiếu là báo lỗi.

**`onClick={() => xoa(p.id)}`:** `onClick` cần nhận **một hàm** để React gọi khi bấm.
- `onClick={() => xoa(p.id)}` → hàm chờ sẵn, chạy khi bấm. ✔
- `onClick={xoa(p.id)}` → `xoa` bị gọi **ngay lúc vẽ giao diện**. ✘
- Hàm không có tham số thì truyền thẳng: `onClick={them}`.

---

## 6. THÊM / XÓA / SỬA PHẦN TỬ TRONG STATE

**Nguyên tắc: không mutate state — luôn tạo mảng/object MỚI rồi đưa vào hàm set.**

| Việc | Cách đúng (ra mảng mới) |
|---|---|
| Thêm cuối | `setPeople([...people, phanTuMoi])` |
| Xóa theo id | `setPeople(people.filter((p) => p.id !== id))` |
| Sửa 1 phần tử | `setPeople(people.map((p) => p.id === id ? { ...p, liked: !p.liked } : p))` *(đã gặp trong ví dụ, chưa luyện)* |

| Cách SAI (mutate) | Vì sao sai |
|---|---|
| `people.push(x)` / `people.pop()` / `people.splice(...)` | Sửa thẳng mảng cũ, địa chỉ không đổi → React không nhận ra |
| `setPeople(people.push(x))` | `push` trả về **một con số** (độ dài mới), không phải mảng → `people` thành số → `people.map` hỏng |
| `people.push(x); setPeople(people);` | Đưa vào đúng mảng cũ (cùng địa chỉ) → React coi là không đổi |

**Vì sao:** React so giá trị mới với giá trị state hiện tại **bằng địa chỉ**, không so nội dung từng phần tử.

```js
const a = [1, 2];
const b = a;        // cùng địa chỉ với a
const c = [...a];   // mảng mới, địa chỉ khác
a === b;            // true
a === c;            // false
```

`filter` và spread luôn cho mảng mới (địa chỉ khác) → React thấy khác → gọi lại component. Đây chính là lý do "tạo bản copy mới thay vì mutate" từ Giai đoạn 0 — trong React nó trở thành **điều kiện bắt buộc**.

Shorthand property: khi tên key trùng tên biến, `{ id, username }` = `{ id: id, username: username }`.

---

## 7. BẢN CHẤT: `useState` GIỮ DỮ LIỆU Ở ĐÂU

Component là function bình thường → mỗi lần React gọi lại, mọi biến bên trong **mất hết** và tạo mới. Vì vậy React phải cất state ở **một chỗ bên ngoài** hàm; `useState` là cái cửa để lấy từ chỗ đó ra. *(Bản mô phỏng đơn giản — React thật phức tạp hơn, nhưng ý tưởng cốt lõi như vậy.)*

```js
let luuTru;              // chỗ React cất state, nằm NGOÀI hàm component
let daCoChua = false;

function useStateGia(giaTriBanDau) {
  if (!daCoChua) {          // chỉ lần gọi đầu mới vào đây
    luuTru = giaTriBanDau;
    daCoChua = true;
  }
  function setGia(giaTriMoi) {
    luuTru = giaTriMoi;     // đổi giá trị trong chỗ cất
    // rồi báo React gọi lại component
  }
  return [luuTru, setGia];
}
```

(Liên quan trực tiếp tới **closure**: `luuTru` sống ngoài hàm nên vẫn còn khi hàm chạy xong và được gọi lại.)

**Vòng đời:**
1. **Lần vẽ đầu:** `people` trỏ **cùng địa chỉ** với `duLieuBanDau` (không copy). `console.log(people === duLieuBanDau)` → `true`.
2. **Bấm Xóa/Thêm:** `setPeople(mảng mới)` đặt mảng mới (địa chỉ khác) vào chỗ cất → React gọi lại `Home()`.
3. **Các lần vẽ sau:** `useState(duLieuBanDau)` chạy lại nhưng **bỏ qua tham số**, trả về giá trị đang cất (mảng mới). `duLieuBanDau` vẫn nguyên 3 phần tử, không bị sửa.

**Reload trang → mất dữ liệu:** state sống trong **bộ nhớ (RAM) của tab trình duyệt**. Reload = tải lại trang, chạy JS từ dòng đầu, bộ nhớ cũ bị dọn, `duLieuBanDau` tạo lại từ file code.
- Muốn dữ liệu sống qua reload phải cất ở nơi không bị dọn: `localStorage` (Giai đoạn 0) → dài hạn là database (Giai đoạn 3).
- Bẫy của Next.js: component chạy trên server trước, server không có `localStorage` → không đọc thẳng được trong `useState(...)`. Cần `useEffect` *(học ở bài sau)*.

---

## 8. LỖI HAY GẶP — checklist tự kiểm tra

- [ ] Tên component **viết hoa chữ đầu** và **khớp từng chữ** giữa chỗ khai báo và chỗ dùng (`Cannot find name 'PostCard'` = lệch tên; `PostCast` ≠ `PostCard`)
- [ ] JSX chỉ có **1 thẻ bao ngoài** — kể cả bên trong `map` (mỗi vòng chỉ trả 1 thẻ)
- [ ] Props: chuỗi dùng `"..."`, còn boolean/số/mảng/biến phải `{...}` (`like={true}`)
- [ ] `? :` và biến phải nằm **trọn trong `{ }`**; phần ngoài `{ }` là chữ thường, in nguyên văn
- [ ] Render danh sách phải có `key` (id ổn định, không dùng index khi có xóa/thêm); `props.key` luôn `undefined`
- [ ] **Không mutate state:** không `push/pop/splice/sort` trực tiếp; đưa mảng mới vào hàm set
- [ ] `push` trả về số, không phải mảng → `setX(arr.push(...))` làm hỏng state
- [ ] `onClick={() => ham(id)}` (hàm chờ), không phải `onClick={ham(id)}` (chạy ngay lúc vẽ)
- [ ] Có state hoặc sự kiện → thêm `"use client";` ở đầu file
- [ ] Không đặt biến ngoài component trùng tên với biến state (`people` vs `[people, setPeople]`)
- [ ] Nút "Thêm" nằm **ngoài** `map`, nhưng **trong** thẻ bao ngoài cùng
- [ ] Sửa code xong nhớ `Ctrl+S` (tab có chấm tròn = chưa lưu); giao diện cũ thì `Ctrl+F5`
- [ ] Gạch xanh `cSpell: Unknown word` **không phải lỗi code**; `GET / 500` thường là **hệ quả** — đọc lỗi gốc phía trên nó
- [ ] Dữ liệu cá nhân thật (email, số điện thoại) không để trong code đẩy lên GitHub — dùng dữ liệu giả (`an@example.com`)

---

## 9. TIẾN ĐỘ

**Day 1 (xong):** setup Next.js, component, JSX, props, `map` + `key`, `useState` (thêm/xóa), bản chất state & so sánh địa chỉ.
**Tiếp theo:** sự kiện trong React + form/input → `useEffect` + gọi API + `localStorage` → TypeScript sâu hơn + routing Next.js → Context API + Tailwind → TanStack Query nhẹ → dự án cuối giai đoạn.
