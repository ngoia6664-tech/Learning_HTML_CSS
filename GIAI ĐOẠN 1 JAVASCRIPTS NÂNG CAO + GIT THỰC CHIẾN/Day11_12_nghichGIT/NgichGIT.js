// // Bài 1. Cho const diem = [5, 8, 3, 9, 6, 2, 10]. Dùng filter lấy ra các điểm ≥ 5,
// // sau đó dùng map nhân đôi từng điểm trong kết quả đó (viết nối tiếp filter rồi map, không cần biến trung gian).
console.log("bài 1");
let diem = [5, 8, 3, 9, 6, 2, 10];
diem = diem.filter((x) => x > 5).map((x) => x * 2);
console.log(diem);
// //Test các hàm
// let test=[4,2,3,1,0];
// test.splice(1,2,"A","B");// Đã xóa phần từ 2 3 ở gốc nhưng nếu log dòng này ra thì ra 2 3 vì sẽ trả về phần từ bị xóa
// console.log(test);
// // test.reverse();//Đảo ngược
// // test.fill("A",0,3)// Thay thế các phần từ từ vị trí x đến y(không tính y) bằng giá trị truyền vào fill(Giá trị ,x,y)
// console.log(test);
// let test1 =[1,5,3,6,7,2,4];
// test1.sort((x,y) => x-y);//Với so sánh number phải truyền vào 1 hàm so sánh x-y <0 thì cho x bé hơn xếp x đứng trước => tăng dần
// console.log(test1);
// test1.sort((x,y) => y-x) //Cái này ngược lại thì sẽ giảm dần;
// console.log(test1);
// //Sắp xếp chuỗi string không cần truyền vào hàm
// let Chuoi=["Bình" , "An" ,"Duy Anh" ,"Hoàng Anh"];//So sánh chữ đầu tiên của tên
// Chuoi.sort();
// console.log(Chuoi);
// Bài 2. Cho const gia = [100000, 250000, 75000, 500000]. Dùng reduce tính tổng, sau đó tính giá trung bình.
console.log("bài 2");
const gia = [100000, 250000, 75000, 500000];
const avg = gia.reduce((acc, cur) => acc + cur, 0) / gia.length;
console.log(avg);
// Bài 3. Cho const nguoiDung = [{ten:"An",tuoi:22},{ten:"Binh",tuoi:17},{ten:"Chi",tuoi:30}]. Dùng find lấy người đầu tiên có tuoi < 18. Dùng some kiểm tra có ai dưới 18 không. Dùng every kiểm tra tất cả có trên 16 không.
const nguoiDung = [
  { ten: "An", tuoi: 22 },
  { ten: "Binh", tuoi: 17 },
  { ten: "Chi", tuoi: 30 },
];
console.log(nguoiDung.find((x) => x.tuoi < 18));
console.log(nguoiDung.some((x) => x.tuoi < 18));
console.log(nguoiDung.every((x) => x.tuoi > 17)); //Tự test
// Bài 4. Cho let mangSo = [1,2,3,4,5,6,7,8,9,10]. Dùng splice xóa đúng 3 phần tử bắt đầu từ vị trí index 4 (không dùng filter). In ra mảng sau khi xóa.
let mangSo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
mangSo.splice(4, 3); // splice(x,y) => x là index , y là số lượng
console.log(mangSo);
// Bài 5. Từ mảng ở Bài 4 (sau khi đã splice), dùng splice chèn thêm "a", "b" vào đúng vị trí index 2, không xóa gì cả (deleteCount = 0).
mangSo.splice(2, 0, "a", "b"); //Thêm 0 vào để biết rằng không xóa phần tử nào
console.log(mangSo);
// Bài 6. Cho const matrix = [[1,2],[3,4],[5,[6,7]]]. Dùng flat với độ sâu phù hợp để ra đúng mảng phẳng hoàn toàn [1,2,3,4,5,6,7].
const matrix = [
  [1, 2],
  [3, 4],
  [5, [6, 7]],
];
console.log(matrix.flat().flat());
// Bài 7. Cho const tuKhoa = ["html","css","js","css","html","react"]. Dùng filter kết hợp indexOf (không dùng Set) để loại bỏ từ trùng lặp, chỉ giữ lần xuất hiện đầu tiên.
console.log("bài 7");
const tuKhoa = ["html", "css", "js", "css", "html", "react"];
const loc = tuKhoa.filter((x, index) => {
  return tuKhoa.indexOf(x) === index; // thêm vào để commit đượcĐây là commit test  So sanh trong mảng tukhoa xem có x đang duyệt ở vị trí thứ mấy , duyệt lần đầu 
});
console.log(loc);
//Thêm text ở bài 7 ở nhánh D
//Thêm text ở bài 7 ở nhánh D
//Thêm text ở bài 7 ở nhánh D
//Thêm text ở bài 7 ở nhánh D
//Thêm text ở bài 7 ở nhánh D
// Bài 8. Cho const sanPham = [{ten:"Áo",gia:200000},{ten:"Quần",gia:350000},{ten:"Giày",gia:800000}]. Dùng map tạo ra 1 mảng mới chỉ chứa tên sản phẩm (mảng string). Dùng reduce tính tổng tiền của cả giỏ hàng.
const sanPham = [
  { ten: "Áo", gia: 200000 },
  { ten: "Quần", gia: 350000 },
  { ten: "Giày", gia: 800000 },
];
const gioHang = [
  ...sanPham.map((x) => x.ten),
  sanPham.reduce((acc, cur) => acc + cur.gia, 0),
];
console.log(gioHang);
// Bài 9. Cho const hocSinh = [{ten:"An",diem:[8,7,9]},{ten:"Binh",diem:[5,6,4]}]. Dùng map tạo ra mảng mới, mỗi phần tử là {ten, diemTB} với diemTB tính bằng reduce trên mảng diem của từng học sinh (kết hợp map lồng reduce).
const hocSinh = [
  { ten: "An", diem: [8, 7, 9] },
  { ten: "Binh", diem: [5, 6, 4] },
];
const avgBai9 = hocSinh.map((x) => ({
  Ten: x.ten,
  diemTB: x.diem.reduce((acc, cur) => acc + cur, 0) / x.diem.length,
}));
console.log(avgBai9);
// Bài 10. Cho const arr = [5,12,8,130,44,3,20]. Dùng sort sắp xếp tăng dần đúng cách (nhớ hàm so sánh, không để mặc định vì sẽ sai với số). Sau đó dùng sort sắp xếp giảm dần. Giải thích bằng lời: nếu không truyền hàm so sánh, sort([5,12,8,130]) sẽ ra thứ tự gì, tại sao.
const arr = [5, 12, 8, 130, 44, 3, 20];
arr.sort((x, y) => y - x); //Sửa y-x  ở nhánh main bài 10// x-y < 0 thì sẽ xếp x trước y nếu không dùng hàm so sánh thì sẽ tự dộng nhận các giá trị theo string , tôi không nhớ thứ tự string của các số
console.log(arr);
arr.sort((x,y) => x-y); //Thay đổi ở bài 10 ở nhánh main
console.log(arr); // comment vào nhánh A để test  // Sửa file nghịch ở nhánh D

