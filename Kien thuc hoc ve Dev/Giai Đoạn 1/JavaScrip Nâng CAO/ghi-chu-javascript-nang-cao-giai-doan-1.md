# Ghi chú JavaScript nâng cao — Giai đoạn 1 (Ngày 1-5)

> Tài liệu tổng hợp liên tục, dùng để tra cứu thay vì lướt lại chat. Song song với `tu-dien-thuat-ngu-javascript.md` (định nghĩa thuật ngữ tiếng Anh) và `ghi-chu-javascript-co-ban.md` (Giai đoạn 0).

---

## MỤC LỤC
1. [ES6+ — Destructuring, Spread, Rest](#1-es6)
2. [Module (import/export)](#2-module)
3. [Closure — ôn sâu](#3-closure)
4. [JSON](#4-json)
5. [REST API — GET/POST/PATCH/DELETE](#5-rest)
6. [Git Bash cơ bản](#6-gitbash)
7. [`this`](#7-this)
8. [Prototype](#8-prototype)
9. [Event Loop](#9-eventloop)
10. [Checklist lỗi hay gặp](#10-checklist)

---

## 1. ES6+ — DESTRUCTURING, SPREAD, REST

**ES6 (ECMAScript 6)** = phiên bản chuẩn hóa cú pháp JS (2015), mang tính bước ngoặt. **ES6+** = ES6 và mọi bản sau đó — cách gọi chung cho "cú pháp JS hiện đại". Không phải 1 kỹ năng riêng — là tên gọi thời kỳ của bộ công cụ (destructuring, spread/rest, template string, arrow function, `async/await`, module, `class`...).

### Destructuring array — lấy theo VỊ TRÍ

```js
const toa_do = [10.5, 20.3, "Hà Nội"];
const [lat, lng, ten] = toa_do; // đặt tên biến tùy ý, lấy theo thứ tự 0,1,2
const [a, , c] = toa_do; // bỏ qua vị trí giữa bằng dấu phẩy trống
[a, c] = [c, a]; // hoán đổi không cần biến tạm (nhớ dùng let, không dùng const)
```

### Destructuring object — lấy theo TÊN KEY, không theo vị trí

```js
const sp = { ten: "Bút", gia: 5000, moTa: "..." };
const { ten, gia } = sp; // chỉ cần ghi ĐÚNG TÊN key, không cần giữ chỗ cho field bỏ qua
const { ten: tenSP } = sp; // đổi tên biến khi lấy ra
```
**Khác biệt cốt lõi với array:** bỏ qua 1 field không cần dấu phẩy giữ chỗ — chỉ đơn giản không nhắc tên nó.

### Spread — "trải" ra thành phần tử/property riêng, tạo bản MỚI (không mutate)

```js
const arr2 = [0, ...arr1, 100]; // chèn đầu/cuối, arr1 giữ nguyên
const gop = { ...objCu, ...thayDoi }; // object đứng SAU thắng nếu trùng field
tong(...mang); // trải mảng thành nhiều đối số riêng cho hàm
```

### Rest — "gom" nhiều giá trị rời rạc thành 1 mảng, luôn đứng CUỐI

```js
function tong(...cacSo) { return cacSo.reduce((a, b) => a + b, 0); }
const [dau, ...conLai] = [1, 2, 3, 4]; // dau=1, conLai=[2,3,4]
const { ten, ...rest } = obj; // rest gom mọi field còn lại thành 1 object
```
**Vì sao rest luôn phải đứng cuối:** rest "vơ" hết mọi đối số còn thừa — nếu cho đứng giữa, không có ranh giới rõ ràng để biết đâu là phần rest, đâu là tham số cố định phía sau.

---

## 2. MODULE (import/export)

Mỗi file `.js` chạy như module mặc định là **hộp kín** — biến/hàm bên trong chỉ file đó thấy được. Muốn chia sẻ, phải `export`; muốn dùng, phải `import` đúng đường dẫn.

### Named export/import — nhiều thứ, phải khớp tên

```js
// toanHoc.js
export function cong(a, b) { return a + b; }
export const PI = 3.14;
```
```js
// main.js
import { cong, PI } from "./toanHoc.js"; // BẮT BUỘC {}, tên phải khớp chính xác
```

### Default export/import — tối đa 1/file, tên tùy đặt

```js
export default function PhepNhan(a, b) { return a * b; }
```
```js
import TenTuyChon from "./FileA.js"; // KHÔNG {}, tên tự do
```

### Gộp chung 1 dòng khi vừa có default vừa có named

```js
import TenTuyChon, { cong, tru } from "./FileA.js"; // default trước, named sau trong {}
```

### Chạy bằng Node — lưu ý bắt buộc

- Đường dẫn import **phải có đuôi `.js` đầy đủ** khi chạy bằng Node (khác framework/bundler có thể bỏ đuôi).
- Muốn Node hiểu `import`/`export`: đổi đuôi file thành `.mjs`, hoặc có `package.json` với `"type": "module"`.

---

## 3. CLOSURE — ÔN SÂU

Hàm con giữ được quyền truy cập vào biến của hàm cha, ngay cả sau khi hàm cha đã chạy xong — nhờ giữ **tham chiếu tới scope nơi nó sinh ra** (lexical scope), không phải copy giá trị.

### Cơ chế tham số — copy xảy ra lúc GỌI hàm, không phải lúc return

```js
function taoHam(giaTri) { // copy giá trị 'i' sang giaTri NGAY LÚC GỌI, không phải lúc return
  return function() { console.log(giaTri); };
}
let i = 5;
const f = taoHam(i);
i = 999; // KHÔNG ảnh hưởng giaTri bên trong, vì đã copy xong từ trước
f(); // 5
```

### Biến private thật sự — không gắn lên `this`/object trả về

```js
function taoBoDem() {
  let dem = 0; // biến PRIVATE — không nằm trên object trả về
  return {
    tang() { dem++; return dem; },
    xem() { return dem; }
  };
}
const bd = taoBoDem();
bd.tang();
console.log(bd.dem); // undefined — ĐÚNG, vì dem không lộ ra ngoài
```

### Reference type trong closure — nhiều biến cùng trỏ 1 dữ liệu

```js
function taoHam(obj) {
  return function() { console.log(obj.value); };
}
let x = { value: 10 };
const f = taoHam(x);
x.value = 999; // sửa PROPERTY (không gán lại x = {...}) → f() thấy thay đổi
f(); // 999
```

---

## 4. JSON

**JSON** = JavaScript Object Notation — định dạng CHUỖI văn bản để gửi dữ liệu qua mạng, trông giống cú pháp object/array JS.

**Khác biệt với object JS thật:** key bắt buộc có `""`, không comment, không dấu phẩy dư, giá trị không được là function.

```js
const chuoiJSON = JSON.stringify(obj); // object JS → chuỗi (để GỬI)
const objMoi = JSON.parse(chuoiJSON); // chuỗi → object JS (để NHẬN, dùng lại)
JSON.stringify(obj, null, 2); // tham số 3 = số space thụt lề, in đẹp dễ đọc
```

---

## 5. REST API — GET/POST/PATCH/DELETE

### 4 method

| Method | Công dụng | Cần `body`? |
|---|---|---|
| GET | Lấy dữ liệu | Không |
| POST | Tạo mới | Có |
| PATCH | Sửa 1 phần (giữ nguyên field khác) | Có |
| PUT | Thay thế toàn bộ | Có |
| DELETE | Xóa | Thường không |

### Cú pháp `fetch()` đầy đủ

```js
const response = await fetch(url, {
  method: "POST", // thiếu dòng này = mặc định GET
  headers: { "Content-Type": "application/json" }, // báo server đọc đúng kiểu JSON
  body: JSON.stringify({ title, body }) // BẮT BUỘC stringify, fetch chỉ gửi được string
});
if (!response.ok) throw new Error(`Lỗi: ${response.status}`); // Error() CHỈ nhận 1 tham số!
const data = await response.json();
```

### 3 kiểu URL

```
/posts/5                    → path parameter (lấy đúng 1 bản ghi theo id)
/posts?userId=1              → query parameter (lọc theo điều kiện)
/posts/1/comments            → nested resource (tài nguyên con của 1 bản ghi)
```

### Luồng Promise của `fetch`/`await` — 2 tầng bóc vỏ

```
fetch(url)         → Promise (đang chờ server)
await               → response = Response object THẬT (không phải Promise)
response.json()    → Promise MỚI (đang chờ đọc + parse body)
await               → data = object JS THẬT
```
`await` LUÔN "bóc vỏ" Promise thành giá trị thật — kết quả sau `await` không bao giờ còn là Promise.

### Lỗi hay gặp đã tự debug được

- `fetch()` chỉ tự `reject` khi lỗi mạng thật — lỗi 404/500 vẫn phải tự check `response.ok`.
- Sai hoa/thường tên field (`Content-Text` vs `Content-Type`, `postID` vs `postId`) — không báo lỗi, chỉ âm thầm không hoạt động đúng.
- `new Error("a", "b")` — chỉ nhận 1 tham số, vế 2 bị bỏ qua. Dùng template string: `` new Error(`Lỗi: ${status}`) ``.
- `{}.length` là `undefined`, không phải `0` — muốn đếm property của object rỗng dùng `Object.keys(obj).length`.
- Server giả lập (`jsonplaceholder`) không lưu thật — POST luôn trả `id` tự sinh, không theo `id` bạn gửi lên; DELETE luôn trả `200` dù `id` không tồn tại.
- Đặt tên biến trùng tên hàm đang định nghĩa → dễ gây `ReferenceError` hoặc đọc nhầm.

---

## 6. GIT BASH CƠ BẢN

| Lệnh | Công dụng |
|---|---|
| `pwd` | In đường dẫn thư mục đang đứng |
| `ls` | Liệt kê file/thư mục |
| `cd ten-thu-muc` | Vào thư mục con |
| `cd ..` | Lùi ra thư mục cha |
| `cd "/d/duong/dan"` | Đường dẫn TUYỆT ĐỐI — về thẳng 1 chỗ bất kỳ trong 1 lệnh |
| `mkdir ten` | Tạo thư mục mới |
| `touch a.js b.js c.js` | Tạo nhiều file — cách nhau bằng KHOẢNG TRẮNG, không dùng dấu phẩy |
| `rm a.js b.js` | Xóa nhiều file cùng lúc |
| `rm -rf .git` | Xóa cả thư mục `.git` (dùng khi gỡ repo lồng nhau) |
| `clear` | Xóa màn hình terminal |

**Lưu ý quan trọng:** Bash phân biệt hoa/thường tên file/thư mục (khác Windows Explorer). Đường dẫn có khoảng trắng phải bọc `"..."`.

### Sự cố "submodule lồng" — dấu hiệu và cách gỡ

Nếu `git status` báo "clean" ngay cả khi có file mới → có thể do 1 thư mục con chứa `.git` riêng (repo lồng trong repo), khiến repo chính coi thư mục đó là "gitlink" mù mờ. Cách gỡ:
```bash
rm -rf .git                    # xóa .git con (đứng TRONG thư mục con)
cd ..                          # về repo chính
git rm -r --cached ten-thu-muc # gỡ bản ghi submodule cũ khỏi index (--cached: GIỮ file thật)
git add ten-thu-muc
git commit -m "..."
git push
```

---

## 7. `this`

**Quy tắc duy nhất:** `this` không phụ thuộc **nơi hàm được viết** (khác closure) — nó phụ thuộc **cách hàm được GỌI**, xác định lại mỗi lần gọi.

### 4 cách gọi → 4 kết quả `this`

```js
// 1. Method — CÓ object đứng trước dấu "." lúc gọi → this = object đó
user.chao(); // this = user

// 2. Hàm trơn — KHÔNG có gì đứng trước
chaoRoi(); // this = undefined (strict mode) HOẶC global object (non-strict/CommonJS thường)

// 3. Callback truyền cho hàm khác (forEach, setTimeout...) — hàm đó GỌI callback theo kiểu TRƠN
arr.forEach(function(item) { console.log(this); }); // this = undefined/global, KHÔNG phải arr

// 4. Arrow function — KHÔNG có this riêng, mượn this của scope cha (theo lexical, giống closure)
setTimeout(() => { console.log(this); }, 1000); // this = this của hàm cha bao quanh
```

### Bẫy hay gặp nhất — callback mất `this`

```js
const dem = {
  soLan: 0,
  batDau() {
    setTimeout(function() { this.soLan++; }, 1000); // SAI — this không phải dem
  }
};
// SỬA: đổi function thường → arrow function
const demDung = {
  soLan: 0,
  batDau() {
    setTimeout(() => { this.soLan++; }, 1000); // ĐÚNG — this mượn từ batDau = demDung
  }
};
```

### Hàm return ra 1 hàm khác — `this` KHÔNG "truyền" qua tầng

```js
const user = {
  ten: "Cường",
  chaoHoi: function() {
    return function() { console.log(this.ten); }; // hàm ẩn danh có this RIÊNG, độc lập
  }
};
const f = user.chaoHoi(); // chaoHoi() CHẠY, this=user lúc này, nhưng chỉ return ra 1 hàm mới
f(); // this = undefined/global — vì f() gọi TRƠN, this của chaoHoi KHÔNG "truyền" xuống
```
**Phân biệt có `()` hay không:** `obj.ham` (không gọi, chỉ lấy tham chiếu) khác hẳn `obj.ham()` (gọi ngay, lấy KẾT QUẢ trả về).

### Đặc thù Node/CommonJS — không phải quy tắc chung của JS

`this` bên trong callback của `setTimeout` khi chạy bằng Node (kiểu file thường, không module/strict) = `module.exports` (1 object rỗng có thật, không phải `undefined`) — nên `this.gi` không lỗi, chỉ ra `undefined` (khác hẳn gọi trên `undefined` thật sự thì sẽ crash).

---

## 8. PROTOTYPE

**Vấn đề giải quyết:** `.map`/`.forEach`/`.push` không nằm trong từng mảng riêng lẻ — chúng nằm ĐÚNG 1 chỗ (`Array.prototype`), mọi mảng "mượn" dùng chung qua 1 liên kết ẩn.

### Prototype chain — giống cấu trúc Scope chain, nhưng tìm property/method

```
arr (không có 'map' trực tiếp)
  → Array.prototype (CÓ map, filter, push...)
    → Object.prototype (toString, hasOwnProperty...)
      → null (hết chuỗi, báo lỗi nếu không tìm thấy)
```

```js
console.log(a.map === Array.prototype.map); // true — CÙNG 1 hàm, không phải bản sao riêng
arr.hasOwnProperty('map'); // false — map không nằm TRỰC TIẾP trên arr, chỉ mượn qua prototype
```

**Gắn method trực tiếp cho 1 object** (không dùng chung) khác hẳn **gắn vào prototype** (mọi object cùng loại dùng chung) — ví dụ minh họa, KHÔNG phải kỹ thuật cần tự viết trong thực tế (hiếm dùng, dễ gây xung đột):
```js
obj1.chao = function() {...}; // CHỈ obj1 dùng được
Object.prototype.chaoChung = function() {...}; // MỌI object dùng được (hiếm khi làm vậy thật)
```

---

## 9. EVENT LOOP

**Vấn đề giải quyết:** JS chỉ có 1 luồng xử lý (Call Stack) nhưng vẫn "chờ" được nhiều việc tốn thời gian mà không bị đơ — nhờ giao việc cho môi trường bên ngoài xử lý.

### 4 thành phần

- **Call Stack** — nơi code đang chạy, chỉ làm 1 việc tại 1 thời điểm.
- **Web/Node APIs** — xử lý ngầm việc cần chờ (timer, network...), tách khỏi Call Stack.
- **Callback Queue (Macrotask)** — hàng đợi của `setTimeout`/`setInterval`.
- **Microtask Queue** — hàng đợi của `Promise.then()` và code sau `await` — **ưu tiên cao hơn** Macrotask.

### Quy tắc ưu tiên — quan trọng nhất

Mỗi khi Call Stack trống: Event Loop luôn **chạy HẾT SẠCH Microtask Queue trước**, chỉ khi Microtask Queue rỗng hoàn toàn mới lấy **đúng 1 việc** từ Macrotask Queue.

```js
console.log("A");
setTimeout(() => console.log("B"), 0); // Macrotask
Promise.resolve().then(() => console.log("C")); // Microtask
console.log("D");
// Kết quả: A, D, C, B — Promise LUÔN chạy trước setTimeout dù cùng đặt "ngay lập tức"
```

### `await` thực chất đẩy phần code sau nó vào Microtask Queue

```js
async function layDuLieu() {
  console.log("Bắt đầu");
  const data = await fetch(url); // MỌI code SAU dòng này = 1 microtask
  console.log("Đã xong");
}
layDuLieu();
console.log("Code sau khi gọi layDuLieu");
// Thứ tự: "Bắt đầu" → "Code sau khi gọi layDuLieu" → (đợi fetch) → "Đã xong"
```

### `.then()` nối chuỗi — mỗi `.then()` trả về 1 Promise MỚI

```js
Promise.resolve()
  .then(() => console.log("1")) // .then() này trả về Promise MỚI
  .then(() => console.log("2")); // nối tiếp trên Promise mới đó — "2" đẩy vào Microtask
                                   // CHỈ SAU KHI "1" đã chạy xong (có phụ thuộc tuần tự)
```
Khác với viết 2 `Promise.resolve().then()` **độc lập** — cả 2 đẩy vào Microtask Queue gần như cùng lúc (không phụ thuộc nhau), chỉ theo đúng thứ tự dòng lệnh.

`Promise.resolve(giaTri)` — lối tắt tạo Promise đã `fulfilled` ngay, dùng khi đã có sẵn giá trị, không cần `new Promise((resolve,reject) => {...})` đầy đủ.

---

## 10. CHECKLIST LỖI HAY GẶP — Giai đoạn 1

- [ ] `new Error("a", "b")` chỉ nhận 1 tham số — dùng template string để nối nhiều thông tin
- [ ] Tên field JSON/query param phân biệt hoa/thường tuyệt đối (`postId` ≠ `postID`) — sai không báo lỗi, chỉ âm thầm không hoạt động
- [ ] `{}.length` là `undefined` — đếm property object rỗng phải dùng `Object.keys(obj).length`
- [ ] Đặt tên biến trùng tên hàm đang định nghĩa — dễ gây lỗi hoặc khó đọc
- [ ] Quên `return` trong hàm `async` — biến nhận ở nơi gọi sẽ luôn là `undefined` dù hàm chạy đúng
- [ ] Gọi nhiều hàm `async` liên tiếp không `await` — chạy song song, thứ tự log không đoán trước được
- [ ] Rest parameter luôn phải đứng cuối cùng trong danh sách tham số
- [ ] `touch`/lệnh Bash dùng khoảng trắng để tách nhiều file, KHÔNG dùng dấu phẩy
- [ ] Arrow function không có `this` riêng — KHÔNG dùng làm method trực tiếp trên object, nhưng RẤT hợp để làm callback cần giữ `this` của scope cha
- [ ] Callback truyền cho `forEach`/`setTimeout`/`addEventListener` luôn bị gọi kiểu "trơn" — mất `this` mong muốn nếu dùng function thường
- [ ] `this` không "truyền" qua các tầng hàm lồng nhau như biến thường (khác closure) — mỗi hàm thường có `this` riêng, xác định lại từ đầu mỗi lần gọi
- [ ] `setTimeout(fn, 0)` không chạy "ngay lập tức" — luôn đợi hết code đồng bộ VÀ hết cả Microtask Queue mới tới lượt
- [ ] Promise/`await` được ưu tiên chạy trước `setTimeout` dù cùng đặt thời gian gần 0
