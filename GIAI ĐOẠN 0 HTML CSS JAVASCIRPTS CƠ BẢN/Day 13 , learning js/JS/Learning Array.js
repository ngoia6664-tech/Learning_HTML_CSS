// // // // // const array=["Táo","Lê","Cam","Xoài","Chuối"];
// // slice(start, end) — cắt lấy 1 đoạn mảng, không làm thay đổi mảng gốc.

// // js
// // const arr = [1, 2, 3, 4, 5];
// // const part = arr.slice(1, 3); // [2, 3]
// // console.log(arr); // vẫn [1,2,3,4,5] — không đổi

// // splice(start, deleteCount, ...items) — thêm/xóa/thay phần tử ngay trên mảng gốc (có làm thay đổi mảng gốc). Đây là điểm khác biệt lớn nhất với slice, hay bị nhầm.

// // js
// // const arr = [1, 2, 3, 4, 5];
// // arr.splice(1, 2); // xóa 2 phần tử từ vị trí 1
// // console.log(arr); // [1, 4, 5] — mảng gốc đã đổi

// // const arr2 = [1, 2, 3];
// // arr2.splice(1, 0, 'a', 'b'); // chèn thêm, không xóa gì
// // console.log(arr2); // [1, 'a', 'b', 2, 3]

// // some(callback) — trả về true nếu có ít nhất 1 phần tử thỏa điều kiện.

// // js
// // const nums = [1, 3, 5, 8];
// // nums.some(n => n % 2 === 0); // true (vì có số 8)

// // every(callback) — trả về true chỉ khi tất cả phần tử đều thỏa điều kiện.

// // js
// // nums.every(n => n % 2 === 0); // false (vì 1, 3, 5 lẻ)

// // reduce(callback, initialValue) — "gộp" cả mảng lại thành 1 giá trị duy nhất (tổng, trung bình, object mới...). Đây là method khó hiểu nhất lúc đầu, dùng nhiều nhất về sau.

// // js
// // const prices = [10, 20, 30];
// // const total = prices.reduce((acc, cur) => acc + cur, 0);
// // // acc = "giá trị tích lũy", cur = phần tử hiện tại, 0 = giá trị bắt đầu
// // console.log(total); // 60

// // Mẹo nhớ nhanh:

// // slice = cắt (không đổi gốc) / splice = sửa (đổi gốc luôn) — nhớ theo cặp để phân biệt
// // some = "có cái nào không?" / every = "tất cả có đúng không?"
// // reduce = gom nhiều thành 1

// // Bạn muốn mình ra vài bài tập nhỏ để luyện riêng 5 cái này không (kiểu: cho mảng object rồi tính tổng bằng reduce, lọc + kiểm tra bằng some/every)?
// // // // // array.pop();
// // // // // array.push("Chuối");
// // // // // array.unshift("Đu đủ");
// // // // // console.log(array);
// // // // // array.shift();
// // // // // console.log(array);
// // // // // const arr=[1,2,3,4,5];
// // // // // arr.forEach((x)=>{console.log(x*2);});
// // // // // let sogap=arr.map((x)=>x*2);
// // // // // console.log(sogap);
// // // // // let sochan=arr.filter((x)=> x%2===0);
// // // // // console.log(sochan);
// // // // // let ketqua=arr.find((x) => x>6);
// // // // // console.log(ketqua);
// // // // // console.log(arr.indexOf(5));
// // // // 1. Cho let so = [3, 7, 1, 9, 4];. Dùng push thêm số 10 vào cuối, dùng unshift thêm số 0 vào đầu. In mảng ra sau mỗi bước.
// // // let so = [3, 7, 1, 9, 4];
// // // so.push(10);
// // // console.log(so);
// // // so.unshift(0);
// // // console.log(so);
// // // so.shift();
// // // so.pop();
// // // console.log(so);

// // // // 2. Dùng map tạo mảng mới từ [1,2,3,4,5], mỗi phần tử là bình phương của số gốc.
// // // let Bai2 = [1, 2, 3, 4, 5];
// // // let newarr = Bai2.map((x) => x * x);
// // // console.log(newarr);
// // // // 3. Dùng filter lọc ra các số > 5 từ mảng [2, 8, 3, 11, 5, 7, 1].
// // // console.log("Bài 3");
// // // let bai3 = [2, 8, 3, 11, 5, 7, 1];
// // // let loc = bai3.filter((x) => x > 5);
// // // console.log(loc);
// // // // 4. Dùng find tìm số đầu tiên chia hết cho 3 trong mảng [7, 4, 9, 2, 6].
// // // console.log("Bài 4");
// // // let bai4 = [7, 4, 9, 2, 6];
// // // let timkiem = bai4.find((x) => x % 3 === 0);
// // // console.log(timkiem);
// // // // 5. (Kết hợp map + filter) Cho mảng điểm [3, 8, 5, 9, 4, 6]. Dùng filter lọc ra các điểm >= 5 (đậu), sau đó dùng map cộng thêm 0.5 điểm thưởng vào mỗi điểm đã lọc. In kết quả cuối cùng.
// // // console.log("Bài 5");
// // // let Bai5 = [3, 8, 5, 9, 4, 6];
// // // let bai5_loc = Bai5.filter((x) => x > 5).map((x) => x + 0.5);
// // // console.log(bai5_loc);
// // // // 6. Viết lại Bài 5 của Buổi 4 (đếm số bạn đậu trong [8, 3, 5, 9, 4, 7, 2]) bằng filter thay vì for...of — so sánh độ ngắn gọn giữa 2 cách.
// // // console.log("bài 6");
// // // //Cách 1
// // // let bai6 = [8, 3, 5, 9, 4, 7, 2];
// // // let bai6_quamon = bai6.filter((x) => x > 5);
// // // console.log(bai6_quamon.length);
// // // //Cách 2
// // // let sum = 0;
// // // for (const x of bai6) {
// // //   if (x > 5) sum++;
// // // }
// // // console.log(sum);
// // // // 7. (includes + logic) Cho let tuVung = ["apple", "banana", "cherry"];. Viết function console.log(kiemTraTu(tu) dùng includes trả về "Đã có trong danh sách" hoặc "Chưa có".
// // // console.log("Bài 7");
// // // let tuVung = ["apple", "banana", "cherry"];
// // // function kiemtratu(tu) {
// // //   if (tuVung.includes(tu) == true) return "Đã có";
// // //   else return "Chưa có";
// // // }
// // // console.log(kiemtratu("apple"));
// // // console.log(kiemtratu("banana"));
// // // console.log(kiemtratu("cherry"));
// // // console.log(kiemtratu("anh rất buồn"));
// // // // 8. (map trả về object) Cho mảng tên ["An", "Bình", "Chi"]. Dùng map tạo ra mảng mới, mỗi phần tử là 1 object dạng {ten: "An", doDaiTen: 2} (đếm số ký tự trong tên bằng .length).
// // // console.log("bài 8");
// // // let bai8 = ["An", "Bình", "Chi"];
// // // let bai8_new = bai8.map((x) => ({Tên:x , Độ_Dài_Tên:x.length}));
// // // console.log(bai8_new);
// // // // 9. (Tổng hợp find + filter + map) Cho mảng sản phẩm dạng number: [15000, 250000, 89000, 500000, 12000] (đơn vị: đồng).
// // //     console.log("bài 9");
// // //     let bai9 = [15500,  255600, 89000, 500000, 12000];
// // //     let bai9_filter= bai9.filter((x) => x<100000);
// // //     let bai9_Find = bai9.find((x) => x>200000);;
// // //     let bai9_map = bai9.map((x) => x.toLocaleString('vi-VN')+"đ");
// // //     console.log(bai9_Find);
// // //     console.log(bai9_filter);
// // //     console.log(bai9_map);
// // //     // Dùng filter lọc ra sản phẩm giá < 100000
// // // // Dùng find tìm sản phẩm đầu tiên giá > 200000
// // // // Dùng map tạo mảng mới format giá theo dạng chuỗi "15.000đ" (gợi ý: ghép chuỗi thủ công, chưa cần dùng hàm format có sẵn)

// // // // 10. (Khó — viết lại bài cũ bằng cách JS hiện đại) Viết lại timSoLonNhat (Bài 8 buổi trước, dùng vòng lặp for thủ công) bằng cách dùng Math.max() kết hợp spread operator ...:
// // //     let mang=[3,7,2,9,4,1];
// // //     console.log(Math.max(...mang));
// // //         console.log(Math.max(...[5]));
// // //     console.log(Math.log10(1000000));
// // // // javascript
// // // // let mang = [3, 7, 2, 9, 4, 1];
// // // // console.log(Math.max(...mang));   // spread "trải" mảng ra thành các tham số riêng lẻ cho Math.max

// // // // Test với [3, 7, 2, 9, 4, 1] và [5], so sánh cách này với cách viết vòng lặp thủ công bạn từng làm — cách nào bạn thấy dễ hiểu hơn?
// let arr = [1, 3, 5, 4, 2];
// arr.splice(0, 1);
// console.log(arr);
// // console.log(arr.some((x) => x % 3 === 0));
// // console.log(arr.every((x) => x % 2 === 0));
// // let a = [10, 20, 30];
// // let Tong = a.reduce((acc, cur) => acc + cur ,0);
// // console.log(Tong);
// let orders = [
//   { id: 1, total: 150, status: "paid" },
//   { id: 2, total: 200, status: "pending" },
//   { id: 3, total: 80, status: "paid" },
// ];
// //Bài 1
// console.log("Bài1");
// let alltotal = orders.reduce((arr, cur) => {
//   if (cur.status==="paid") {
//     return arr + cur.total;
//   }
//   return arr;
// }, 0);
// console.log(alltotal);
// //BÀi2
// console.log("Bài 2");
// let Bai2 = ["1", "3", "3", "4", "5", "3", "2", "7", "9", "10"];
// function Demsolan(n) {
//   let dem = Bai2.reduce((arr, cur) => {
//     if (cur === n) {
//       arr++;
//     }
//     return arr;
//   }, 0);
//   return dem;
// }
// console.log(Demsolan("10"));
// //Bài 3
// console.log("bài 3");
// let students = [
//   { name: "An", grade: "A" },
//   { name: "Bình", grade: "B" },
//   { name: "Chi", grade: "A" },
// ];
// let group = students.reduce((arr, cur) => {
//   if (!arr[cur.grade]) {
//     arr[cur.grade] = [];
//   }
//   arr[cur.grade].push(cur.name);
//   return arr;
// }, {});
// console.log(group);
// //Bài 4
// console.log("bài4");
// let products = [
//   { name: "A", stock: 5 },
//   { name: "B", stock: 0 },
//   { name: "C", stock: 5 },
//   { name: "D", stock: 3 },
// ];
// console.log(products.every((a) => a > 0));
// console.log(
//   products.reduce((acc, cur) => {
//     if (cur.stock == 0) {
//       acc++;
//     }
//     return acc;
//   }, 0),
// );
// //BÀi 5
// console.log("Bài 5");
// let Bai5 = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25,
// ];
// function getPage(arr, pageNumber, pageSize) {
//   const start=pageNumber - 1 *pageSize;
//   const end =start+pageSize;
//   return arr.slice(start,end)
// }
// console.log(getPage(Bai5, 1, 10));
// //Bài 6
// console.log("bài 6");
// let Bai6 = [
//   { id: 2, text: "A", done: "done" },
//   { id: 1, text: "B", done: "done" },
//   { id: 3, text: "C", done: "done" },
//   { id: 4, text: "D", done: "done" },
// ];
// function removeID(id) {
//   const vitri = Bai6.findIndex((y) => y.id === id);
//   Bai6.splice(vitri, 1);
//   return Bai6;
// }
// console.log(removeID(1));
// //Bài 7
// console.log("Bài 7");
// let bai7 = [
//   { id: 1, text: "A", done: "done" },
//   { id: 2, text: "B", done: "done" },
//   { id: 3, text: "C", done: "done" },
//   { id: 4, text: "D", done: "done" },
// ];
// function updatetodo(x, newtext) {
//   const vitri = bai7.findIndex((y) => y.id === x);
//   bai7.splice(vitri, (bai7[vitri].text = newtext));
//   return bai7;
// }
// console.log(updatetodo(1, "Dep gai"));
// //BÀi 8
// console.log("Bài 8");
// let bai8 = [
//   { name: "Laptop Gaming", price: 1500, category: "electronics" },
//   { name: "Áo thun nam", price: 20, category: "fashion" },
//   { name: "Tai nghe Bluetooth", price: 50, category: "electronics" },
//   { name: "Sách Lập trình JS", price: 15, category: "books" },
//   { name: "Điện thoại thông minh", price: 800, category: "electronics" },
//   { name: "Giày thể thao", price: 60, category: "fashion" },
//   { name: "Bàn phím cơ", price: 70, category: "electronics" },
// ];
// let loc_category = bai8.filter((x) => x.category == "electronics");
// console.log(loc_category);
// let finish = loc_category.map((x) => ({
//   ...x , price:x.price * 0.9})
// );
// console.log(finish);
// console.log(finish.reduce((acc, cur) => acc + cur.price, 0));
// //Bài 9
// console.log("Bài 9");
// const users = [
//   { name: "An", email: "an@gmail.com" },
//   { name: "Bình", email: "" }, // Lỗi: email rỗng
//   { name: "Chi", email: "chi-@gmail.com" }, // Lỗi: thiếu dấu @
//   { name: "Dũng", email: "dung@gmail.com" },
//   { name: "Hạnh", email: "hanh@yahoo.com" },
// ];
// console.log(users[0].email.includes("@"));
// let kiemtra = users.every(
//   (x) => x.email.includes("@") == true && x.email != "",
// );
// if (kiemtra == false) {
//   let loc_false =users.filter((x) => {
//     if (x.email.includes("@") != true || x.email === "") return x;
//   });
//   console.log(loc_false);
// } else {
//   console.log("Tất cả email hợp lệ");
// }
// //Bài 10
// console.log("Bài 10");
// const cart = [
//   { name: "Áo thun", price: 150, qty: 12 },    // qty > 10 (dùng để test some)
//   { name: "Quần jean", price: 300, qty: 2 },   // Sản phẩm bình thường
//   { name: "Giày thể thao", price: 800, qty: 1 },// Sản phẩm bình thường
//   { name: "Tất (vớ)", price: 25, qty: 0 }      // qty === 0 (dùng để test splice xóa)
// ];
// console.log(cart.some((x) => x.qty>10));
// let slice10=cart.slice(0,3);
// console.log(slice10);
// const vitri=cart.findIndex((x)=>x.qty==0);
// cart.splice(vitri,1);
// console.log(cart);
// console.log(cart.reduce((acc , cur) => acc +cur.price*cur.qty,0));
let arr=[1,2,3];
arr["A"]=1;
console.log(arr);
