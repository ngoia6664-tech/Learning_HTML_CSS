// Bài tập

// 1. Viết function phanLoaiNam(nam) nhận vào 1 năm, trả về "Năm nhuận" nếu chia hết cho 4 nhưng không chia hết cho 100, HOẶC chia hết cho 400; ngược lại trả về "Không nhuận". Test với 2024, 2023, 1900, 2000.
function PhanloaiNam(nam) {
  if (nam >= 0) {
    if (nam % 4 == 0) {
      if (nam % 400 == 0) {
        return true;
      } else if (nam % 100 == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
console.log(PhanloaiNam(-4));
console.log(PhanloaiNam(-0));
console.log(PhanloaiNam(2024));
console.log(PhanloaiNam(2023));
console.log(PhanloaiNam(1900));
console.log(PhanloaiNam(2000));
// 2. (Vòng lặp + điều kiện + tích lũy) Viết function tongSoChanTu1DenN(n) dùng for, tính tổng tất cả các số chẵn từ 1 đến n (bao gồm n nếu n chẵn). Test với n=10 (phải ra 2+4+6+8+10=30).
function tongSoChanTu1DenN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 == 0) {
      sum += i;
    }
  }
  return sum;
}
console.log(tongSoChanTu1DenN(10));
// 3. (while + break) Viết đoạn code dùng while tìm số nguyên dương nhỏ nhất mà bình phương của nó lớn hơn 500. In ra số đó và bình phương của nó. (Gợi ý: tăng dần 1 biến đếm, kiểm tra điều kiện, dùng break hoặc để điều kiện while tự dừng.)
let i = 1;
while (true) {
  i++;
  if (i * i > 500) {
    console.log(i + " Bình phương của nó là:" + i * i);
    break;
  }
}
// 4. (Function + switch + vòng lặp) Viết function soThanhChu(so) dùng switch chuyển số 0-9 thành chữ tiếng Việt (VD: 1→"Một", 2→"Hai"...). Sau đó dùng vòng lặp for gọi hàm này in ra chữ tương ứng cho các số từ 0 đến 9.
function soThanhChu(so) {
  let a = [];
  let i = 0;
  const arr = [
    "Không",
    "Một",
    "Hai",
    "Ba",
    "Bốn",
    "Năm",
    "Sáu",
    "Bảy",
    "Tám",
    "Chín",
    "Mười",
  ];
  for (const b of arr) {
    a[i] = b;
    i++;
  }
  return a[so];
}
for (let i = 0; i <= 10; i++) {
  console.log(soThanhChu(i));
}

// 5. (Mảng + for...of + đếm) Cho let diemThi = [8, 3, 5, 9, 4, 7, 2];. Dùng for...of đếm xem có bao nhiêu bạn đậu (điểm >= 5), in ra kết quả dạng: "Số bạn đậu: X/7".
let diemthi = [8, 3, 5, 9, 4, 7, 2];
let sum = 0;
for (const a of diemthi) {
  if (a >= 5) {
    sum++;
  }
}
console.log("Số bạn đậu:" + sum + "/7");
// 6. (Nested loop + điều kiện + bẫy ranh giới) In ra danh sách các cặp số (a, b) với a từ 1 đến 5, b từ 1 đến 5, chỉ in ra khi a + b == 6 (VD: in "1 + 5 = 6", "2 + 4 = 6"...). Đếm và in tổng số cặp tìm được ở cuối.
let a = [1, 2, 3, 4, 5];
let b = [1, 2, 3, 4, 5];
sum = 0;
for (let i = 0; i < a.length; i++) {
  for (let y = 0; y < b.length; y++) {
    if (a[i] + b[y] == 6) {
      sum++;
      console.log("(" + a[i] + "," + b[y] + ")");
    }
  }
}
console.log("Tổng số cặp là:" + sum);
// 7. (do-while + object + for...in) Cho object:

// javascript
let khoHang = { ao: 5, quan: 0, giay: -12, non: 3 };
    for(const key in khoHang){
        let value="";
        if(khoHang[key]>0){
            value = "Còn hàng";
        }
        else if(khoHang[key]==0){
            value= "Hết hàng"
        }
        else{
            value= "Giá trị không xác định"
        }
        console.log(key+":"+khoHang[key]+" Trạng thái:"+value);
    }
// Dùng for...in duyệt qua, in ra "Còn hàng: tên - sốLượng" nếu số lượng > 0, hoặc "Hết hàng: tên" nếu bằng 0. (Chú ý bẫy truthy/falsy đã học — không được dùng if(soLuong) để check "còn hàng" vì sao? Tự trả lời trong lúc làm bài.)

// 8. (Tổng hợp khó: function + vòng lặp + mảng + so sánh) Viết function timSoLonNhat(mang) — không dùng Math.max() — tự viết vòng lặp để tìm số lớn nhất trong 1 mảng số. Test với [3, 7, 2, 9, 4, 1] (phải ra 9) và với mảng chỉ có 1 phần tử [5] (phải ra 5).
function timSoLonNhat(a=[]){
    let max=a[0];
    for(i=0;i<a.length;i++){
        if(max<=a[i]){
            max=a[i];
        }
    }
    return max;
}
console.log(timSoLonNhat([5]));
console.log(timSoLonNhat([5,7,8,10,12,0,4,6]));
function Thuattoansapxep(a=[]){
}
// 9. (Ép kiểu + vòng lặp + function, bẫy thực tế) Cho mảng chứa cả số và chuỗi số: let duLieu = [10, "20", 5, "abc", 15];. Viết function tongHopLe(mang) dùng vòng lặp, chỉ cộng vào tổng những phần tử có typeof === "number" (bỏ qua string kể cả string số hợp lệ như "20", và bỏ qua "abc"). Test và giải thích tại sao tổng lại không bao gồm "20" dù nó "trông giống số".
    function tongHopLe(a=[]){
        sum=0;
        for(let i=0; i<a.length;i++){
            if(typeof a[i]==="number"){
                sum+=a[i];
            }
        }
        return sum;
    }
    console.log(tongHopLe([10,"20",5,"abc","15",0]));
// 10. (Khó nhất — tổng hợp toàn bộ Buổi 1-4, không gợi ý cấu trúc) Viết function phanTichMang(mang) nhận vào 1 mảng số, dùng vòng lặp duyệt 1 lần duy nhất (không được duyệt mảng nhiều lần bằng nhiều vòng lặp riêng), trả về (return) 1 object gồm 4 thông tin:
    function phanTichMang(a=[]){
        let tong=0;
        let sochan=0;
        let max=a[0];
        let soam=0;
        for(let i=0;i<a.length;i++){
            tong+=a[i];
            if(a[i]%2==0){
                sochan++;
            }
            if(max<=a[i]){
                max=a[i];
            }
            if(a[i]<0){
                soam++
            }
        }
        b={Tong:tong,sochan:sochan,Solon:max,soAm:soam};
        return b;
    }
console.log(phanTichMang([4, -2, 7, 10, -5, 3]))
// javascript
// {
//   tong: ...,        // tổng tất cả phần tử
//   soChan: ...,      // đếm số lượng phần tử chẵn
//   soLon: ...,       // số lớn nhất
//   soAm: ...         // đếm số lượn g phần tử âm
// }

// Test với [4, -2, 7, 10, -5, 3], tự tính tay đáp án trước khi chạy code để đối chiếu.
