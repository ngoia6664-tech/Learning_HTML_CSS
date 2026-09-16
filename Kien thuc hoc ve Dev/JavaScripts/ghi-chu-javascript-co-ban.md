# Ghi chú JavaScript cơ bản — Array, Object, DOM

> Tài liệu tổng hợp lại toàn bộ kiến thức đã học, dùng để tra cứu nhanh thay vì lướt lại chat.

---

## MỤC LỤC
1. [Array — các method quan trọng](#1-array)
2. [Object — nền tảng](#2-object)
3. [DOM Manipulation](#3-dom)
4. [Sự kiện (Events)](#4-events)
5. [Bất đồng bộ (Async)](#5-async)
6. [localStorage](#6-localstorage)
7. [Lịch luyện tập 1 tuần (dự án nhỏ)](#7-luyen-tap)
8. [Cart Drawer / Modal — panel đè lên trang](#8-cart-drawer)
9. [Các lỗi hay gặp — checklist tự kiểm tra](#9-loi-hay-gap)

---

## 1. ARRAY

### Method thay đổi mảng gốc (mutate) vs không thay đổi

| Method | Thay đổi mảng gốc? | Công dụng |
|---|---|---|
| `push`, `pop`, `shift`, `unshift` | Có | Thêm/xóa đầu-cuối mảng |
| `splice(start, deleteCount, ...items)` | **Có** | Thêm/xóa/sửa tại vị trí bất kỳ |
| `slice(start, end)` | Không | Cắt lấy 1 đoạn, trả về mảng mới |
| `map`, `filter` | Không | Trả về mảng mới |
| `forEach` | Không (nhưng có thể mutate phần tử bên trong nếu cố tình) | Chỉ để lặp, không trả về gì |

### `map` vs `filter` vs `reduce` — chọn đúng công cụ

- **`filter`** → kết quả vẫn là **1 mảng** (ít phần tử hơn) — dùng khi cần **giữ lại** danh sách thỏa điều kiện.
- **`map`** → kết quả là **1 mảng cùng số lượng phần tử**, nhưng đã biến đổi từng phần tử.
- **`reduce`** → kết quả là **1 giá trị duy nhất** (số, object, hoặc cấu trúc khác hẳn ban đầu) — dùng khi cần **gộp/tổng hợp**.

```js
const nums = [1, 2, 3, 4, 5];

nums.filter(n => n > 2);              // [3, 4, 5] — vẫn là mảng
nums.map(n => n * 2);                 // [2, 4, 6, 8, 10] — vẫn là mảng
nums.reduce((acc, cur) => acc + cur, 0); // 15 — chỉ 1 số
```

**Luôn truyền `initialValue` cho `reduce`** (VD: `0`, `{}`, `[]`) — tránh lỗi khi mảng rỗng.

### `some` / `every`

```js
const nums = [1, 3, 5, 8];
nums.some(n => n % 2 === 0);   // true — CÓ ít nhất 1 phần tử thỏa
nums.every(n => n % 2 === 0);  // false — KHÔNG PHẢI tất cả đều thỏa
```

### `reduce` nâng cao — group by, đếm, biến array thành object

```js
const students = [
  { name: "An", grade: "A" },
  { name: "Bình", grade: "B" },
  { name: "Chi", grade: "A" }
];

const group = students.reduce((acc, cur) => {
  if (!acc[cur.grade]) acc[cur.grade] = [];  // computed key: acc[cur.grade] = key ĐỘNG
  acc[cur.grade].push(cur.name);
  return acc;
}, {});
// { A: ["An", "Chi"], B: ["Bình"] }
```

**Computed key `arr[bien]`:** `bien` là biến chứa 1 chuỗi → `arr[bien]` = tạo/truy cập key có TÊN là GIÁ TRỊ của biến đó (không phải tên biến). Bắt buộc `arr` phải là object/array từ trước (không được `undefined`).

### `flatMap` — làm phẳng mảng lồng nhau

```js
const classes = [
  { className: "12A1", students: ["An", "Bình"] },
  { className: "12A2", students: ["Chi", "Dũng"] }
];

classes.map(c => c.students);      // [["An","Bình"], ["Chi","Dũng"]] — vẫn lồng
classes.flatMap(c => c.students);  // ["An","Bình","Chi","Dũng"] — đã phẳng
```

**Giữ thông tin tầng cha khi flatten** (kỹ thuật hay dùng nhất với nested data):
```js
classes.flatMap(c =>
  c.students.map(s => ({ ...s, className: c.className }))
);
```

### `join()` — nối mảng thành 1 chuỗi

`join(ngan_cach)` duyệt qua từng phần tử của mảng, chuyển thành chuỗi, rồi nối lại thành **1 chuỗi duy nhất** (không còn là mảng), chèn ký tự phân cách bạn chỉ định giữa các phần tử.

```js
const arr = ["Táo", "Chuối", "Cam"];

arr.join(", ");  // "Táo, Chuối, Cam"
arr.join(" - "); // "Táo - Chuối - Cam"
arr.join("");    // "TáoChuốiCam" — nối liền, không chèn gì
arr.join();      // "Táo,Chuối,Cam" — không truyền gì thì mặc định dấu phẩy
```

**Dùng nhiều nhất khi kết hợp với `map` để tạo chuỗi HTML** (thay cho cách `createElement` + `appendChild` từng phần tử):
```js
const fruits = ["Táo", "Chuối", "Cam"];
const html = fruits.map((x) => `<li>Quả: ${x}</li>`).join("");
// "<li>Quả: Táo</li><li>Quả: Chuối</li><li>Quả: Cam</li>"
document.querySelector("ul").innerHTML = html;
```
Bắt buộc `join("")` (không chèn gì) ở đây vì `innerHTML` chỉ nhận **chuỗi**, không nhận mảng — nếu để nguyên mảng (không `join`), JS tự ép thành chuỗi theo kiểu mặc định (nối bằng dấu phẩy), làm hỏng cấu trúc HTML.

---

## 2. OBJECT

### Thuật ngữ nền

- **Key** — tên thuộc tính (luôn là string)
- **Value** — giá trị gắn với key (bất kỳ kiểu gì)
- **Property** — 1 cặp key-value hoàn chỉnh
- **Method** — khi value là 1 function
- **Nested object** — object/array lồng bên trong object khác

### Truy cập: dot `.` vs bracket `[]`

- **`.`** → dùng khi bạn **gõ thẳng tên key** lúc viết code (dù đang tạo mới hay sửa)
- **`[]`** → dùng khi **tên key nằm trong biến** (computed key), hoặc tên key có ký tự đặc biệt/khoảng trắng

```js
obj.name = "An";        // OK vì gõ thẳng tên "name"
const k = "name";
obj[k] = "An";          // PHẢI dùng [] vì tên key nằm trong biến k
```

### Thêm / Sửa / Xóa property

```js
const user = { name: "An", age: 20 };

user.city = "Hà Nội";     // THÊM (key chưa có)
user.age = 21;            // SỬA (key đã có) — cú pháp y hệt thêm
delete user.city;         // XÓA hẳn key — khác với gán undefined (key vẫn còn nếu chỉ gán undefined)

"age" in user;            // true — kiểm tra key có tồn tại không
```

### Duyệt object

```js
const user = { name: "An", age: 20, city: "Hà Nội" };

for (let key in user) { console.log(key, user[key]); }

Object.keys(user);     // ["name", "age", "city"]
Object.values(user);   // ["An", 20, "Hà Nội"]
Object.entries(user);  // [["name","An"], ["age",20], ["city","Hà Nội"]]

// forEach trên entries — PHẢI destructure vì mỗi phần tử là 1 mảng con [key, value]
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

### Computed key khi TẠO object

```js
function setConfig(key, value) {
  return { [key]: value };   // key = giá trị của biến "key" lúc gọi hàm
}
setConfig("name", "An"); // { name: "An" }
```

### Nested object

```js
const student = {
  name: "An",
  address: { city: "Hà Nội" },
  subjects: ["Toán", "Lý"]
};
student.address.city;   // truy cập nối tiếp
student.subjects[0];    // object chứa array → truy cập bằng index
```

### Method và `this`

```js
const user = {
  name: "An",
  greet() {                       // dùng cú pháp method, KHÔNG dùng arrow function
    console.log("Xin chào " + this.name);
  }
};
```
`this` bên trong method = chính object gọi nó. **Arrow function làm method sẽ KHÔNG có `this` đúng** — tránh dùng.

### Mutate vs tạo bản copy mới (spread `{...obj}`)

```js
const x = { name: "A", price: 1500 };

x.price = x.price * 0.9;          // MUTATE — sửa thẳng object gốc (rủi ro nếu obj đang dùng chỗ khác)
const newObj = { ...x, price: x.price * 0.9 }; // AN TOÀN — tạo object mới, x không đổi
```
`filter`/`map` trả về **cùng tham chiếu object** bên trong — sửa trực tiếp property của phần tử sau khi filter/map vẫn làm thay đổi object gốc nếu không dùng spread.

### Destructuring

```js
const user = { name: "An", age: 20 };
const { name, age } = user;                  // lấy nhanh nhiều property
const { job = "Chưa có" } = user;            // giá trị mặc định nếu key không tồn tại (chỉ áp dụng khi undefined, KHÔNG áp dụng cho 0/false/"")
const { name: userName } = user;             // đổi tên biến khi destructure
function printUser({ name, age }) { ... }    // destructure ngay trong tham số hàm
```

---

## 3. DOM MANIPULATION

### DOM là gì
Cách trình duyệt biểu diễn HTML thành cây object mà JS đọc/sửa được. JS thay đổi DOM → giao diện thật đổi theo ngay lập tức, không cần "in ra" gì cả.

### Tìm phần tử

```js
document.querySelector("#id-name");     // theo ID — dùng khi CHỈ 1 thẻ duy nhất
document.querySelector(".class-name");  // theo class — chỉ lấy thẻ ĐẦU TIÊN khớp
document.querySelector("button");       // theo tên thẻ

document.querySelectorAll(".class-name"); // lấy TẤT CẢ thẻ khớp (NodeList, forEach được)
```

### Đổi nội dung

```js
el.textContent = "Chữ mới";       // an toàn, chỉ hiểu là CHỮ
el.innerHTML = "<b>Chữ mới</b>";  // hiểu cả thẻ HTML — cẩn thận nếu nội dung từ user nhập (rủi ro XSS)
```

### Đổi class / style

```js
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");    // có thì xóa, không có thì thêm — dùng cho nút bật/tắt

el.style.color = "red";
el.style.backgroundColor = "blue"; // CSS "background-color" → camelCase trong JS
```

### Tạo phần tử mới

```js
const li = document.createElement("li");  // tạo trong bộ nhớ — CHƯA hiện ra
li.textContent = "Mục mới";
list.appendChild(li);                      // gắn vào thẻ cha có sẵn → LÚC NÀY mới hiện ra
```

### Render 1 mảng dữ liệu ra danh sách (kỹ thuật hay dùng nhất)

```js
const students = [{ name: "An", score: 8 }, { name: "Bình", score: 5 }];
const ul = document.querySelector("#list");

ul.innerHTML = ""; // QUAN TRỌNG: xóa nội dung cũ trước khi render lại, tránh bị LẶP danh sách khi bấm nút nhiều lần

students.forEach((s) => {
  const li = document.createElement("li");
  li.textContent = `${s.name} - ${s.score} điểm`;
  ul.appendChild(li);
});
```

### Gắn sự kiện (cách cơ bản — `onclick` trong HTML)

```html
<button onclick="tenHam()">Bấm</button>
<script>
  function tenHam() { ... }
</script>
```
*(Cách chuyên nghiệp hơn — `addEventListener` — sẽ học ở phần Sự kiện tiếp theo.)*

---

## 4. SỰ KIỆN (EVENTS)

### Sự kiện (event) là gì

Mọi hành động của người dùng trên trang (click, gõ phím, di chuột, submit form...) đều được trình duyệt "ghi nhận" thành 1 sự kiện. JS cho phép "đăng ký" 1 hàm để tự động chạy khi đúng sự kiện đó xảy ra trên đúng phần tử đó — bạn không tự gọi hàm, trình duyệt tự gọi giúp.

### `addEventListener` — cách đăng ký sự kiện chuẩn

```js
element.addEventListener("ten_su_kien", ham_xu_ly);
```

Ưu điểm so với `onclick` viết trong HTML:
- Gắn được **nhiều hàm** cho cùng 1 sự kiện trên cùng 1 phần tử (không ghi đè nhau)
- Tách biệt code JS khỏi HTML — chuẩn cho dự án thật
- Dùng được cho cả phần tử tạo động bằng `createElement`

Các loại sự kiện (event type) hay dùng nhất:

| Sự kiện | Xảy ra khi nào |
|---|---|
| `click` | Click chuột vào phần tử |
| `dblclick` | Click đúp (2 lần nhanh) vào phần tử |
| `input` | Gõ chữ vào ô nhập liệu — chạy ngay mỗi lần gõ 1 ký tự |
| `submit` | Bấm nút submit trong 1 `<form>` (nghe trên chính thẻ `<form>`, không phải nút) |
| `keydown` | Nhấn 1 phím bất kỳ trên bàn phím |
| `mouseover` | Di chuột vào 1 vùng |
| `mouseleave` | Di chuột ra khỏi 1 vùng |

```js
btn.addEventListener("click", (e) => {
  console.log("Đã click!");
});
```

### Event object (`e`) — trình duyệt tự động truyền vào

Khi hàm xử lý sự kiện được gọi, trình duyệt **tự động truyền vào 1 tham số** chứa toàn bộ thông tin về sự kiện vừa xảy ra — không cần tự tạo, chỉ cần đặt tên (quy ước hay dùng `e` hoặc `event`) để nhận lấy nó.

**`e.target`** — phần tử **chính xác** bị click/thao tác. Luôn phụ thuộc vào điểm bấm chính xác, không phụ thuộc vào nơi gắn `addEventListener`.

**`e.currentTarget`** — phần tử **đang lắng nghe** sự kiện (nơi bạn viết `.addEventListener(...)`). Luôn cố định, không đổi theo cú click.

```js
ul.addEventListener("click", (e) => {
  console.log(e.target);         // <li> cụ thể vừa bị click — thay đổi tùy cú click
  console.log(e.currentTarget);  // luôn là <ul> — nơi gắn addEventListener
});
```

**`e.key`** — (dùng với sự kiện `keydown`/`keyup`) tên phím vừa nhấn, dạng chuỗi (VD: `"Enter"`, `"a"`, `"Backspace"`).

```js
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    alert("Bạn vừa nhấn Enter");
  }
});
```

**`e.target.value`** — (dùng với `<input>`) lấy nội dung hiện tại đang có trong ô input tại thời điểm sự kiện xảy ra.

### `preventDefault()` — chặn hành vi mặc định của trình duyệt

1 số thẻ có hành vi tự động sẵn (VD: nút `submit` trong `<form>` tự load lại trang). `e.preventDefault()` chặn hành vi đó lại, để code JS tự quyết định làm gì tiếp theo — gần như bắt buộc khi xử lý form bằng JS.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();   // chặn load lại trang
  // code xử lý riêng của bạn ở đây
});
```

### Event Delegation — gắn 1 lần trên cha, xử lý mọi con

**Vấn đề:** nếu gắn `addEventListener` cho từng phần tử con (VD: từng `<li>`), phần tử con nào được thêm **sau này** (bằng `createElement`) sẽ không tự có sự kiện — dễ quên, dễ rối.

**Giải pháp:** gắn `addEventListener` **1 lần duy nhất** trên phần tử cha cố định (VD: `<ul>`), rồi dùng `e.target` để biết chính xác con nào vừa bị bấm — vì sự kiện click trên con luôn "nổi bọt" (bubble) lên tới cha.

```js
ul.addEventListener("click", (e) => {
  console.log("Vừa click vào:", e.target.textContent);
});
```

**Lưu ý cấu trúc HTML bắt buộc:** phần tử con (`<li>`) phải nằm **đúng bên trong** phần tử cha (`<ul>`) thì sự kiện mới "nổi bọt" lên được. Ngoài ra, **không đặt chữ mô tả trực tiếp trong `<ul>`** (VD: `<ul>Danh sách<li>...</li></ul>`) — vì nếu người dùng click trúng đúng phần chữ đó, `e.target` sẽ trả về chính `<ul>`, dễ gây lỗi khó lường khi kết hợp xóa/sửa theo `e.target`.

### `element.remove()` — xóa 1 phần tử khỏi trang

```js
li.remove(); // xóa thẳng phần tử này khỏi giao diện, không cần biết ai là cha
```

**Quan trọng:** `remove()` chỉ xóa trên **giao diện (DOM)**, không tự động xóa phần tử đó khỏi **mảng dữ liệu gốc** trong JS. Muốn đồng bộ dữ liệu thật (bắt buộc cho app thật như To-do list), phải:
1. Xóa đúng phần tử khỏi **mảng** trước (dùng `filter`)
2. **Render lại toàn bộ** giao diện từ mảng đã cập nhật (nhớ `ul.innerHTML = ""` trước khi vẽ lại, tránh lặp)

```js
let fruits = ["Táo", "Chuối", "Cam"];
const ul = document.querySelector("ul");

function render() {
  ul.innerHTML = "";  // xóa sạch DOM cũ trước khi vẽ lại — LUÔN cần bước này
  fruits.forEach((f) => {
    const li = document.createElement("li");
    li.innerHTML = `${f} <button class="xoa">X</button>`;
    ul.appendChild(li);
  });
}
render();

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("xoa")) {
    const li = e.target.parentElement;                        // thẻ cha trực tiếp của nút X — chính là <li>
    const index = Array.from(ul.children).indexOf(li);         // vị trí của li đó trong danh sách hiện tại
    fruits = fruits.filter((_, i) => i !== index);              // xóa đúng vị trí khỏi MẢNG gốc
    render();                                                    // vẽ lại từ mảng đã cập nhật
  }
});
```

### Các method/khái niệm mới phát sinh khi làm bài Events

| Cú pháp | Công dụng |
|---|---|
| `el.parentElement` | Lấy **thẻ cha trực tiếp** của 1 phần tử (VD: nút "X" nằm trong `<li>` → `parentElement` trả về `<li>` đó) |
| `Array.from(nodeList)` | Chuyển 1 danh sách kiểu NodeList/HTMLCollection (VD: `ul.children`) thành **mảng thật**, để dùng được `indexOf`, `filter`, `map`... |
| `el.classList.contains("ten")` | Kiểm tra 1 phần tử **có đang mang class đó không** — trả về `true`/`false` |
| `value instanceof HTMLElement` | Kiểm tra 1 giá trị có phải là **1 thẻ HTML thật** không — dùng phòng thủ trước khi thao tác `classList`/`style` lên `e.target` |
| `chuoi.startsWith("X")` | Kiểm tra 1 chuỗi có **bắt đầu bằng** ký tự/chuỗi cho trước không |
| `chuoi.toLowerCase()` | Chuyển chuỗi về toàn chữ thường — hay dùng khi so sánh/tìm kiếm không phân biệt hoa-thường |
| `el.style.thuoctinh = ""` | Gán chuỗi rỗng để **xóa giá trị style đã đặt trước đó** bằng JS, trả về đúng CSS gốc (không dùng `null`) |
| Scope (phạm vi biến) | Biến khai báo **bên trong** 1 hàm chỉ "sống" và dùng được **bên trong** hàm đó — muốn dùng chung ở nhiều hàm khác nhau, phải khai báo ở **ngoài cùng** (phạm vi toàn cục) |

### Các method/khái niệm mới phát sinh khi làm dự án To-do/Weather app

| Cú pháp | Công dụng |
|---|---|
| `el.closest(selector)` | Từ phần tử này, đi ngược lên các thẻ cha, tìm thẻ **đầu tiên khớp selector** — mạnh hơn `parentElement` vì tìm được dù lồng sâu nhiều cấp |
| `el.dataset.ten` | Đọc/gắn thuộc tính `data-ten="..."` trong HTML — cách chuẩn để gắn kèm 1 giá trị (VD: id) vào thẻ HTML |
| `JSON.stringify(x)` | Chuyển mảng/object thành **chuỗi**, dùng để lưu vào `localStorage` |
| `JSON.parse(chuoi)` | Chuyển ngược chuỗi JSON thành mảng/object thật |
| `arr.filter(Boolean)` | Lọc bỏ mọi phần tử rỗng (`null`/`undefined`/`""`/`0`) trong 1 mảng |
| `Date.now()` | Trả về số mili-giây hiện tại — dùng làm id đơn giản, gần như không trùng |
| `<button>` trong `<form>` | Mặc định là `type="submit"` — nút nào không phải nút gửi form (VD: nút xóa) phải khai báo rõ `type="button"` |
| `new Error("...")` + `throw` | Chủ động tạo và "ném" ra 1 lỗi để `catch` bắt được — dùng khi `fetch` thành công nhưng `response.ok` là `false` |

---

## 5. BẤT ĐỒNG BỘ (ASYNC)

### Đồng bộ vs bất đồng bộ

JS mặc định chạy **đồng bộ** — từng dòng chạy xong mới sang dòng tiếp theo. Việc mất thời gian chờ (gọi API, đếm giờ...) cần chạy **bất đồng bộ** — "gửi đi rồi làm việc khác trước", không đứng im chờ, tránh làm đơ cả trang.

**Quy tắc quan trọng nhất:** JS luôn chạy xong **toàn bộ code đồng bộ** trước, rồi mới xử lý code bất đồng bộ — dù `setTimeout(fn, 0)` đặt thời gian là `0`, `fn` vẫn luôn chạy sau mọi dòng đồng bộ khác.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// In ra: A, C, B — không phải A, B, C
```

### Callback

1 hàm truyền vào làm tham số cho hàm khác, được "gọi lại" khi việc bất đồng bộ xong:
```js
function layDuLieu(callback) {
  setTimeout(() => {
    callback({ name: "An" }); // gọi lại callback, TRUYỀN kết quả vào
  }, 1000);
}
layDuLieu((data) => console.log(data));
```
Nhiều callback nối tiếp nhau tạo thành "Callback Hell" — code lồng sâu, khó đọc/sửa/debug. Đây là lý do Promise ra đời.

### Promise

Object đại diện cho "1 kết quả sẽ có trong tương lai", luôn ở 1 trong 3 trạng thái: `pending` (đang chờ) → `fulfilled` (thành công) hoặc `rejected` (thất bại). Chỉ đi 1 trong 2 hướng, không quay lại `pending`.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = true;
    if (ok) resolve("Xong rồi!");   // báo THÀNH CÔNG, kèm giá trị
    else reject("Có lỗi!");          // báo THẤT BẠI, kèm lý do
  }, 1000);
});

p.then((ketQua) => console.log(ketQua))   // chạy khi resolve — ketQua = giá trị trong resolve(...)
 .catch((loi) => console.log(loi));        // chạy khi reject — loi = giá trị trong reject(...)
```

**Quy tắc cốt lõi:** `resolve(x)` → giá trị `x` được truyền làm tham số cho hàm trong `.then()`. `.then()` bắt buộc phải nhận vào 1 hàm — nếu không, giá trị từ `resolve` không có nơi nào để đi tới.

**Nối nhiều `.then()`:** mỗi `.then()` chỉ nhận được giá trị từ `return` của `.then()` ngay trước nó (không phải từ `resolve` gốc) — không `return` thì mặc định là `undefined`.
```js
p.then((a) => { return a + "!"; })
 .then((b) => console.log(b)); // b = giá trị return ở trên, không phải giá trị resolve gốc
```

### `async/await`

Cách viết gọn hơn cho Promise — `async` đặt trước hàm để hàm đó luôn trả về 1 Promise; `await` (chỉ dùng trong hàm `async`) tạm dừng dòng đó, chờ Promise xong rồi lấy giá trị `resolve` gán thẳng vào biến, không cần `.then()`.

```js
async function chay() {
  try {
    const data = await layDuLieu(); // chờ xong, lấy giá trị resolve
    console.log(data);
  } catch (loi) {
    console.log(loi); // chạy khi Promise bị reject
  }
}
```

**Promise của chính hàm `async`** (khác với Promise bên trong nó): hàm `async` sẽ `fulfilled` khi chạy xong bình thường — **kể cả khi `catch` đã bắt và xử lý xong lỗi bên trong**, không throw lại. Chỉ khi lỗi "thoát ra" khỏi hàm (không có `try/catch`, hoặc `catch` chủ động `throw` lại) thì Promise của hàm `async` đó mới `rejected`.

**Chạy nhiều bước bất đồng bộ nối tiếp — đọc thẳng từ trên xuống, không lồng sâu:**
```js
async function chay() {
  const user = await layUser();
  const banBe = await layBanBe(user.id);
  console.log(banBe);
}
```

### `fetch()` — gọi API thật

Luôn trả về Promise, cần **2 lần `await`**: 1 lần chờ kết nối server (`response`), 1 lần "mở" nội dung trả về (`response.json()`).

```js
async function layDuLieu() {
  const ketQuaDiv = document.querySelector("#ket-qua");
  ketQuaDiv.textContent = "Đang tải...";
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error("Lỗi: " + response.status);
    const data = await response.json();
    ketQuaDiv.textContent = data.ten;
  } catch (loi) {
    ketQuaDiv.textContent = "Không thể tải dữ liệu.";
  }
}
```

**Lưu ý quan trọng:** `fetch()` chỉ tự `reject` khi lỗi mạng thật (mất kết nối). Nếu server phản hồi nhưng báo lỗi (404, 500...), `fetch()` vẫn coi là "thành công" — phải tự kiểm tra `response.ok`, dùng `throw new Error(...)` để báo lỗi cho `catch` bắt được.

---

## 6. LOCALSTORAGE

Bộ nhớ trình duyệt dành riêng cho từng trang, lưu dữ liệu **vĩnh viễn** (không mất khi F5/tắt trình duyệt) — chỉ lưu được **chuỗi**, phải đóng/mở gói qua `JSON.stringify`/`JSON.parse` khi lưu mảng/object.

```js
// Lưu
localStorage.setItem("tasks", JSON.stringify(tasks));

// Đọc — luôn có fallback || [] phòng trường hợp chưa từng lưu (getItem trả về null)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Xóa 1 key / xóa sạch toàn bộ
localStorage.removeItem("tasks");
localStorage.clear();
```

**Khuôn mẫu chuẩn cho app có lưu trữ (To-do, giỏ hàng...):** mỗi khi mảng dữ liệu thay đổi (thêm/sửa/xóa), luôn làm **2 việc cùng lúc**: lưu lại `localStorage` VÀ gọi lại hàm `render()` — không tách rời 2 bước này.

```js
function luuVaRenderLai() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}
```

**Lỗi hay gặp:** nếu code từng có bug làm hỏng dữ liệu (VD: `map()` không `return` đúng, lưu nhầm `null` vào mảng), dữ liệu hỏng đó **vẫn nằm nguyên trong `localStorage`** dù đã sửa code — phải chủ động `removeItem`/`clear` rồi F5 lại mới hết, sửa code không tự "dọn" dữ liệu cũ đã lưu.

---

## 7. LỊCH LUYỆN TẬP 1 TUẦN (dự án nhỏ)

Sau khi xong lý thuyết JS cơ bản (Array/Object/DOM/Events/Async) và 2 dự án lớn (To-do app, Weather app), dành 1 tuần luyện tự thiết kế cấu trúc hàm trước khi qua Giai đoạn 1 — chưa deploy vội.

**Cách làm mỗi ngày:** viết "bản kế hoạch hàm" (tên hàm + 1 câu mô tả việc nó làm) TRƯỚC khi code, gửi duyệt cấu trúc trước, rồi mới code.

| Ngày | Dự án | Trọng tâm luyện |
|---|---|---|
| 1 | Quote Generator (API `api.quotable.io/random`) | `fetch` + `async/await` cơ bản, ít hàm |
| 2 | Random User Card (API `randomuser.me/api/`) | `fetch` + dữ liệu lồng sâu, tự dò cấu trúc bằng `console.log` |
| 3 | Giỏ hàng mini (dữ liệu tự tạo, không cần API) | Array+Object+DOM+Event Delegation+`localStorage`, tự chia hàm hoàn toàn, không có khung sẵn |
| 4 | Tra cứu quốc gia (API `restcountries.com/v3.1/name/{tên}`) | `fetch` + xử lý input người dùng + lỗi 404 |
| 5 | Ghi chú cá nhân (tự thiết kế, không có đề chi tiết) | Tổng hợp cả tuần + thêm tính năng **Sửa** (chưa từng làm ở To-do app) |
| 6-7 | Ôn tập — chọn lại bài khó nhất trong tuần, xóa code, làm lại từ đầu KHÔNG nhìn bài cũ | Kiểm tra kiến thức có thật sự "ngấm" hay chỉ hiểu nhất thời |

---

## 8. CART DRAWER / MODAL — panel đè lên trang

Panel trượt ra (thường từ cạnh phải) đè lên trang hiện tại, không chuyển hẳn sang trang khác — dùng cho giỏ hàng, menu mobile, chi tiết sản phẩm nhanh...

**3 lớp cần có:**
1. **Backdrop** — `<div>` phủ mờ toàn màn hình, phía sau panel, phía trước nội dung trang
2. **Drawer/Modal** — panel chính, mặc định ẩn (đẩy ra ngoài màn hình hoặc `opacity:0`)
3. **Nút đóng** — tắt lại panel

```css
.backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  pointer-events: none;   /* khi ẩn, KHÔNG chặn click vào trang chính dù vẫn tồn tại trong DOM */
  transition: opacity 0.3s;
  z-index: 100;
}
.backdrop.active { opacity: 1; pointer-events: auto; }

.cart-drawer {
  position: fixed;
  top: 0; right: 0;
  width: 350px; height: 100%;
  transform: translateX(100%);  /* đẩy ra NGOÀI màn hình theo trục ngang */
  transition: transform 0.3s;    /* hiệu ứng trượt mượt khi transform đổi */
  z-index: 101;                  /* cao hơn backdrop, nằm TRÊN nó */
}
.cart-drawer.active { transform: translateX(0); } /* trượt về đúng vị trí */
```

```js
function moGioHang() {
  backdrop.classList.add("active");
  cartDrawer.classList.add("active");
}
function dongGioHang() {
  backdrop.classList.remove("active");
  cartDrawer.classList.remove("active");
}
btnOpen.addEventListener("click", moGioHang);
btnClose.addEventListener("click", dongGioHang);
backdrop.addEventListener("click", dongGioHang); // bấm ra ngoài panel cũng đóng lại
```

**`transform: translateX(100%)`** — di chuyển theo trục ngang đúng bằng 100% chiều rộng của chính phần tử đó — cách chuẩn để "giấu" 1 phần tử ra khỏi màn hình mà vẫn giữ được hiệu ứng trượt mượt (khác với `display: none` — không tạo được animation).

---

## 9. LỖI HAY GẶP — checklist tự kiểm tra trước khi gửi bài

- [ ] Mọi biến đều có `let`/`const` — không gán thẳng vào biến chưa khai báo (tạo biến global ẩn)
- [ ] `splice` làm thay đổi mảng gốc, `slice` thì không — không nhầm 2 cái
- [ ] Muốn **lọc ra 1 danh sách** → `filter`; muốn **gộp thành 1 giá trị** → `reduce`
- [ ] `reduce` luôn có `initialValue` (0, {}, [])
- [ ] Xóa key theo biến động phải dùng `delete obj[bien]`, không phải `delete obj.bien` (2 cái khác nhau hoàn toàn)
- [ ] Muốn sửa object mà KHÔNG ảnh hưởng bản gốc → dùng spread `{...obj, key: newValue}`, không sửa trực tiếp `obj.key = ...`
- [ ] Method trong object literal dùng cú pháp `tenMethod() {}`, KHÔNG dùng arrow function (arrow function làm mất `this`)
- [ ] Trước khi render lại danh sách trong DOM, nhớ `list.innerHTML = ""` để tránh bị lặp
- [ ] `document.createElement()` chỉ tạo trong bộ nhớ — phải có `appendChild` mới hiện ra trang
- [ ] `<li>` phải nằm ĐÚNG bên trong `<ul>` thì event delegation mới hoạt động (sự kiện chỉ "nổi bọt" theo đúng cây DOM thật)
- [ ] Không đặt chữ mô tả trực tiếp trong `<ul>`/`<ol>` — dễ khiến `e.target` trả về nhầm chính thẻ cha khi click trúng vùng chữ đó
- [ ] `element.remove()` chỉ xóa trên DOM — muốn xóa dữ liệu thật phải `filter` mảng gốc rồi render lại, không chỉ xóa trên giao diện
- [ ] Biến sẽ bị gán lại giá trị (VD: `fruits = fruits.filter(...)`) phải khai báo bằng `let`, không phải `const`
- [ ] Biến khai báo bên trong 1 hàm thì chỉ dùng được bên trong hàm đó (scope) — cần dùng chung ở nhiều nơi thì khai báo ở ngoài cùng
- [ ] `setTimeout(fn, 0)` vẫn luôn chạy SAU mọi code đồng bộ, không phải "chạy ngay" — code bất đồng bộ luôn bị đẩy xuống cuối hàng đợi
- [ ] `.then()`/`.catch()` bắt buộc nhận vào 1 hàm — truyền giá trị thường vào sẽ bị âm thầm bỏ qua, không lỗi, không chạy
- [ ] `reduce`/`map` callback dùng dấu `{}` (block body) thì bắt buộc phải có `return` tường minh — thiếu `return` sẽ cho `undefined`, làm hỏng cả mảng nếu dùng `map`
- [ ] Hàm `async` có `try/catch` mà `catch` không `throw` lại thì Promise của hàm đó luôn `fulfilled`, dù bên trong có lỗi
- [ ] `fetch()` chỉ tự reject khi lỗi mạng thật — phải tự kiểm tra `response.ok` để bắt lỗi từ phía server (404, 500...)
- [ ] Data hỏng đã lưu vào `localStorage` không tự mất khi sửa code — phải chủ động `removeItem`/`clear` rồi F5 lại
- [ ] Script đặt trong `<head>` cần thêm `defer`, nếu không nó chạy trước khi `<body>` tồn tại, mọi `querySelector` sẽ ra `null`
