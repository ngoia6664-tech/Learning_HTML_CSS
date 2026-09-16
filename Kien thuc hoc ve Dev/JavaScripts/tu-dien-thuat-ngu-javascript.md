# Từ điển thuật ngữ tiếng Anh trong JavaScript

> File tra cứu song song với `ghi-chu-javascript-co-ban.md`. Mỗi thuật ngữ có: nghĩa đen tiếng Anh, giải nghĩa trong ngữ cảnh lập trình, và ví dụ code. Cập nhật liên tục mỗi khi gặp từ mới.

---

## MỤC LỤC
1. [Kiểu dữ liệu & Bộ nhớ](#1-kieu-du-lieu)
2. [Cấu trúc & Cú pháp](#2-cau-truc)
3. [Scope & Closure](#3-scope)
4. [Object & Array — thuật ngữ chung](#4-object-array)

---

## 1. KIỂU DỮ LIỆU & BỘ NHỚ

### Primitive
- **Nghĩa đen:** "nguyên thủy, cơ bản, không thể chia nhỏ hơn"
- **Trong JS:** nhóm kiểu dữ liệu đơn giản nhất, khi lưu vào biến thì **giá trị thật được lưu trực tiếp** vào biến đó (không thông qua địa chỉ trung gian). Gồm: `number`, `string`, `boolean`, `undefined`, `null`, `symbol`, `bigint`.
- **Đặc điểm:** khi gán cho biến khác hoặc truyền vào hàm → **giá trị được copy**, 2 biến hoàn toàn độc lập sau đó.
```js
let a = 5;
let b = a; // copy giá trị 5, không liên quan gì tới a nữa
b = 10;
console.log(a); // 5 — a không đổi
```

### Reference type
- **Nghĩa đen:** "kiểu tham chiếu"
- **Trong JS:** nhóm kiểu dữ liệu mà biến **không lưu giá trị thật, chỉ lưu địa chỉ (tham chiếu)** trỏ tới nơi dữ liệu thật nằm trong bộ nhớ. Gồm: `object`, `array`, `function`.
- **Đặc điểm:** khi gán cho biến khác → chỉ **copy địa chỉ**, 2 biến vẫn cùng trỏ tới 1 dữ liệu.
```js
let x = { a: 1 };
let y = x; // copy địa chỉ, không copy dữ liệu
y.a = 999;
console.log(x.a); // 999 — x cũng đổi vì cùng trỏ 1 chỗ
```

### Reference (tham chiếu)
- **Nghĩa đen:** "sự chỉ tới, sự trỏ tới"
- **Trong JS:** hành động một biến/hàm **không giữ dữ liệu thật, mà giữ đường dẫn/địa chỉ tới nơi dữ liệu thật đang nằm**. Đối lập với "value" (giá trị thật).
- Dùng cho: reference type (object/array/function), và closure (hàm giữ tham chiếu tới scope cha).

### Mutate / Mutation
- **Nghĩa đen:** "biến đổi, đột biến"
- **Trong JS:** hành động **thay đổi trực tiếp dữ liệu gốc** trong bộ nhớ, thay vì tạo ra bản dữ liệu mới. Chỉ áp dụng được cho reference type (object/array) — primitive không mutate được, chỉ gán lại (reassign).
```js
const arr = [1, 2, 3];
arr.push(4); // MUTATE — sửa thẳng mảng gốc trong bộ nhớ
console.log(arr); // [1, 2, 3, 4]
```

---

## 2. CẤU TRÚC & CÚ PHÁP

### Destructuring
- **Nghĩa đen:** "phá cấu trúc, tháo dỡ cấu trúc" (de- = tháo ra, structure = cấu trúc)
- **Trong JS:** cú pháp lấy nhanh nhiều giá trị ra khỏi 1 object/array và gán từng giá trị cho từng biến riêng, trong 1 dòng — thay vì viết `obj.ten`, `obj.tuoi` từng dòng.
```js
const nguoiDung = { ten: "An", tuoi: 20 };
const { ten, tuoi } = nguoiDung; // "tháo" object ra thành 2 biến riêng

const toaDo = [10, 20];
const [x, y] = toaDo; // "tháo" array ra thành 2 biến riêng (lấy theo vị trí)
```

### Spread (spread operator / spread syntax)
- **Nghĩa đen:** "trải ra, rải ra"
- **Trong JS:** dấu `...` dùng để **tách 1 mảng/object thành từng phần tử/property riêng lẻ**, dùng khi tạo mảng mới, gộp object, hoặc truyền tham số hàm.
```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3]; // trải arr1 ra rồi thêm 3 → [1, 2, 3]
```

### Rest (rest parameter / rest syntax)
- **Nghĩa đen:** "phần còn lại"
- **Trong JS:** cũng dùng dấu `...` nhưng **ngược hướng với spread** — gom nhiều giá trị rời rạc lại thành 1 mảng duy nhất. Dùng khi khai báo tham số hàm hoặc destructuring, luôn đứng ở vị trí cuối cùng.
```js
function tong(...cacSo) { // gom mọi đối số truyền vào thành mảng cacSo
  return cacSo.reduce((a, b) => a + b, 0);
}
tong(1, 2, 3); // 6
```

### Module (import/export)
- **Nghĩa đen:** "mô-đun, khối chức năng độc lập"
- **Trong JS:** cách chia code thành nhiều file riêng biệt, mỗi file chỉ "lộ ra" (`export`) những gì cần dùng ở nơi khác, và file khác `import` vào để dùng. (Sẽ học chi tiết ở phần tiếp theo của Giai đoạn 1.)

---

## 3. SCOPE & CLOSURE

### Scope
- **Nghĩa đen:** "phạm vi, tầm với"
- **Trong JS:** vùng code mà một biến **có thể được nhìn thấy và truy cập**. Ra khỏi vùng đó, biến không còn tồn tại theo cách truy cập được.

### Block scope
- **Nghĩa đen:** "phạm vi theo khối" (block = khối code trong cặp `{}`)
- **Trong JS:** phạm vi bị giới hạn bởi cặp dấu ngoặc nhọn `{}` gần nhất (dù là `if`, `for`, hay `{}` trơ trọi). `let`/`const` tuân theo block scope; `var` thì không (chỉ theo function scope).
```js
if (true) {
  let x = 10; // chỉ tồn tại trong block if này
}
console.log(x); // Lỗi — x không tồn tại ở ngoài
```

### Lexical scope / Lexical environment
- **Nghĩa đen:** "lexical" = liên quan đến từ vựng/vị trí viết trong văn bản → tức là **phạm vi được quyết định bởi vị trí VIẾT code**, không phải bởi lúc code chạy.
- **Trong JS:** một hàm luôn "nhớ" được biến của (các) hàm cha bao quanh nó **tại vị trí nó được viết ra**, bất kể nó được gọi từ đâu sau này. Đây là nền tảng của closure.

### Scope chain
- **Nghĩa đen:** "chuỗi phạm vi"
- **Trong JS:** cách JS tìm 1 biến — bắt đầu từ scope trong cùng, không thấy thì tìm dần ra scope cha, ra tới scope global. Giống như hỏi lần lượt từ phòng mình ra tới sảnh chung.

### Closure
- **Nghĩa đen:** "sự đóng lại, sự khép kín"
- **Trong JS:** hiện tượng một hàm con **giữ được quyền truy cập vào biến của hàm cha**, ngay cả sau khi hàm cha đã chạy xong. Hàm con "đóng gói" luôn cả môi trường (scope) nơi nó sinh ra, mang theo mình đi bất cứ đâu.
```js
function taoBoDem() {
  let dem = 0;
  return function() {
    dem++;
    return dem;
  };
}
const counter = taoBoDem(); // counter "đóng gói" luôn biến dem
counter(); // 1
counter(); // 2
```

### Execution context
- **Nghĩa đen:** "ngữ cảnh thực thi"
- **Trong JS:** "gói" mà JS tạo ra mỗi khi 1 hàm được gọi, chứa: biến local của hàm đó, giá trị `this`, và tham chiếu tới scope cha. Đây chính là cái mà closure "giữ lại" sau khi hàm cha chạy xong.

---

## 4. OBJECT & ARRAY — THUẬT NGỮ CHUNG

### Property
- **Nghĩa đen:** "thuộc tính, tài sản"
- **Trong JS:** 1 cặp key-value hoàn chỉnh bên trong object. VD: `{ ten: "An" }` → `ten: "An"` là 1 property.

### Key / Value
- **Key** (nghĩa đen: "chìa khóa") = tên dùng để truy cập vào 1 giá trị trong object, luôn là kiểu string.
- **Value** (nghĩa đen: "giá trị") = dữ liệu gắn với key đó, có thể là bất kỳ kiểu gì.

### Method
- **Nghĩa đen:** "phương pháp, cách thức"
- **Trong JS:** khi value của 1 property là 1 function, function đó được gọi là method của object.

### Nested
- **Nghĩa đen:** "làm tổ, lồng vào nhau" (nest = tổ chim)
- **Trong JS:** object/array nằm bên trong 1 object/array khác. VD: `{ address: { city: "Hà Nội" } }` — `address` là nested object.

### Computed key / Computed property name
- **Nghĩa đen:** "tên thuộc tính được tính toán"
- **Trong JS:** dùng `[bien]` để key của object là **giá trị của 1 biến**, thay vì gõ thẳng tên key cố định.
```js
const key = "ten";
const obj = { [key]: "An" }; // key của obj = giá trị biến key = "ten" → { ten: "An" }
```

### Argument vs Parameter
- **Parameter** (nghĩa đen: "tham số") = tên biến khai báo trong định nghĩa hàm, đóng vai trò "chỗ trống" chờ được điền giá trị.
- **Argument** (nghĩa đen: "đối số, giá trị thực") = giá trị thật được truyền vào khi GỌI hàm, điền vào chỗ trống đó.
```js
function chao(ten) { // "ten" là parameter
  console.log("Chào " + ten);
}
chao("An"); // "An" là argument
```

### Callback (function)
- **Nghĩa đen:** "hàm được gọi ngược lại"
- **Trong JS:** 1 hàm được truyền vào làm tham số cho hàm khác, để hàm đó "gọi lại" (invoke) vào đúng thời điểm cần thiết. VD: hàm truyền vào `forEach`, `map`, `addEventListener`.
```js
[1, 2, 3].forEach(function(item) { // hàm này là callback — forEach sẽ "gọi lại" nó cho từng phần tử
  console.log(item);
});
```
