// // // // // // //
// // // // // // // Bài 1
// // // // // // console.log("5"+3*2);
// // // // // // // Bài2,bài 3
// // // // // // let ketqua="5";
// // // // // // if(ketqua>=5){
// // // // // //     console.log("Bạn đã qua môn với số điểm là:"+ketqua);
// // // // // // }
// // // // // // else{
// // // // // //     console.log("Bạn đã trượt");
// // // // // // }
// // // // // // let x="10";
// // // // // // let y="5";
// // // // // // console.log(x+y);
// // // // // // console.log(x-y);
// // // // // // console.log(x*y);
// // // // // // let diem="8";
// // // // // // // Bài 4
// // // // // // ketqua= diem>=8 ? "giỏi": diem>=6.5? "Khá":"Trung bình";
// // // // // // // Bài 5
// // // // // // let tuoi=15;
// // // // // // if(tuoi>19){
// // // // // //     console.log("người lớn");
// // // // // // }
// // // // // // else if(tuoi<13){
// // // // // //     console.log("trẻ em");
// // // // // // }
// // // // // // else{
// // // // // //     console.log("Vị thành niên");
// // // // // // }
// // // // // // // bài 6
// // // // // // let a=0;
// // // // // // let b="";
// // // // // // let c=null;
// // // // // // console.log(a || b || c || "mặc định");
// // // // // // // Bài 7
// // // // // // let ten="";
// // // // // // tuoi=0;
// // // // // // if(tuoi===undefined||tuoi===null){
// // // // // //     tuoi=false;
// // // // // // }
// // // // // // else{
// // // // // //     tuoi=true;
// // // // // // }
// // // // // // if(ten){
// // // // // //     ten= true;
// // // // // // }
// // // // // // else{
// // // // // //     ten= false;
// // // // // // }
// // // // // // if(tuoi==true&&ten==true){
// // // // // //     console.log("tên và tuổi hợp lệ");
// // // // // // }
// // // // // // else{
// // // // // //     console.log("Không hợp lệ")
// // // // // // }
// // // // // // let pass="123456";
// // // // // // let checkpass="123452";
// // // // // // if(!pass){
// // // // // //     console.log("bạn chưa nhập mật khẩu ");
// // // // // // }
// // // // // // else if(pass.length<6&&pass===checkpass){
// // // // // //     console.log("Mật khẩu quả ngắn");
// // // // // // }
// // // // // // else if(pass!==checkpass){
// // // // // //     console.log("Xác nhận thất bại");
// // // // // // }
// // // // // // else{
// // // // // //     console.log("Đăng nhập thành công")
// // // // // // }
// // // // // // // Bài10
// // // // // // let email="1234";
// // // // // // if(!email){
// // // // // //     console.log("email không được để trống");
// // // // // // }
// // // // // // else if(email.includes("@")!=true){
// // // // // //     console.log("Nhập email sai định dạng");
// // // // // // }
// // // // // // else if(email.length){
// // // // // //     console.log("email quá ngắn");
// // // // // // }
// // // // // // else{
// // // // // //     console.log("email hợp lệ");
// // // // // // }
// // // // // console.log("5">10);
// // // // let thu = 3;
// // // // switch (thu) {
// // // //   case 1:
// // // //     console.log("thứ 2");
// // // //     break;
// // // //   case 2:
// // // //     console.log("thứ 3");
// // // //     break;
// // // //   case 3:
// // // //     console.log("thứ 4");
// // // //     break;
// // // //   case 4:
// // // //     console.log("thứ 5");
// // // //     break;
// // // // }
// // // // // hàm
// // // // function tinhtong(a, b) {
// // // //   return a + b;
// // // // }
// // // // console.log(tinhtong(5, 6));
// // // // let thang = 1;
// // // // switch (thang) {
// // // //   case 1:
// // // //   case 2:
// // // //   case 3:
// // // //     console.log("Mùa xuân");
// // // //     break;
// // // //   case 4:
// // // //   case 5:
// // // //   case 6:
// // // //     console.log("mùa hè");
// // // //     break;
// // // //   case 7:
// // // //   case 8:
// // // //   case 9:
// // // //     console.log("Mùa Thu");
// // // //     break;
// // // //   case 10:
// // // //   case 11:
// // // //   case 12:
// // // //     console.log("mùa đông");
// // // //     break;
// // // // }
// // // // // function TinhBMI(CanNang,ChieuCao){
// // // // //     return CanNang/ChieuCao**2;
// // // // // }
// // // // const TinhBMI = (CanNang, ChieuCao) => CanNang / (ChieuCao ** 2);
// // // // console.log(TinhBMI(81.5, 1.7));
// // // // function Kiemtraso(n) {
// // // //   if (n > 0) {
// // // //     return "Là số dương";
// // // //   } else if (n < 0) {
// // // //     return "Là số âm";
// // // //   } else {
// // // //     return "Là số 0";
// // // //   }
// // // // }
// // // // console.log(Kiemtraso(0));
// // // // function xephang(diem) {
// // // //   switch (true) {
// // // //     case diem >= 9:
// // // //       return "A";
// // // //     case diem >= 7:
// // // //       return "B";
// // // //     case diem >= 5:
// // // //       return "C";
// // // //     default:
// // // //       return "D";
// // // //   }
// // // // }
// // // // console.log(xephang(6));
// // // // Bài 1
// // // function Xeploaingay(thu) {
// // //   switch (thu) {
// // //     case 1:
// // //     case 2:
// // //     case 3:
// // //     case 4:
// // //     case 5:
// // //       return "Ngày làm việc";
// // //     default:
// // //       return "Ngày nghỉ";
// // //   }
// // // }
// // // console.log(Xeploaingay(2));
// // // function solon(a, b) {
// // //   if (a > b) {
// // //     return a;
// // //   } else if (a < b) {
// // //     return b;
// // //   } else {
// // //     return "Bằng nhau";
// // //   }
// // // }
// // // console.log(solon(2, 1));
// // // function Phanloaitamgian(a, b, c) {
// // //   if (a === b && b == c) {
// // //     return "Tam giác đều";
// // //   } else if (a == b || b == c || c == a) {
// // //     return "Tam giác cân";
// // //   } else {
// // //     return "Tam giác thường";
// // //   }
// // // }
// // // console.log(Phanloaitamgian(2, 2, 2));
// // // function Kiemtranhaplieu(gia) {
// // //   if (gia > 0) {
// // //     return "Sản phẩm có giá là :" + gia;
// // //   } else if (gia == 0) {
// // //     return "Sản phẩm miễn phí";
// // //   } else if (!gia) {
// // //     return "Bạn chưa nhập giá";
// // //   } else {
// // //     return "Giá tiền không thể âm";
// // //   }
// // // }
// // // console.log(Kiemtranhaplieu(0));
// // // console.log(Kiemtranhaplieu(10000));
// // // console.log(Kiemtranhaplieu());
// // // console.log(Kiemtranhaplieu(-50));
// // // function Tinhtiendien(soKW) {
// // //   if (soKW >= 0) {
// // //     if (soKW <= 50) {
// // //       return soKW * 1500;
// // //     } else if (soKW <= 100) {
// // //       return 50 * 1500 + (soKW - 50) * 2000;
// // //     } else {
// // //       return 50 * (1500 + 2000) + (soKW - 100) * 2500;
// // //     }
// // //   } else {
// // //     return "Số điện không thể âm";
// // //   }
// // // }
// // // console.log(Tinhtiendien(20), Tinhtiendien(90), Tinhtiendien(150));
// // // function phanloaiBMI(BMI) {
// // //   switch (true) {
// // //     case BMI < 18.5:
// // //       return "thiếu cân";
// // //     case BMI < 25:
// // //       return "Bình thường";
// // //     default: {
// // //       return "Thừa cân";
// // //     }
// // //   }
// // // }
// // // console.log(phanloaiBMI(15), phanloaiBMI(20), phanloaiBMI(25));
// // // function BinhPhuong(x) {
// // //   return x * x;
// // // }
// // // function TinhTongBinhPhuong(a, b) {
// // //   return BinhPhuong(a) + BinhPhuong(b);
// // // }
// // // console.log(TinhTongBinhPhuong(3, 4));
// // // function Tinhgiamgia(giagoc, phantramgiam = 10) {
// // //   if (phantramgiam >= 0) {
// // //     if (phantramgiam >= 100) {
// // //       return 0;
// // //     } else {
// // //       return giagoc - (phantramgiam / 100) * giagoc;
// // //     }
// // //   } else {
// // //     return "Số % không thể âm";
// // //   }
// // // }
// // // console.log(Tinhgiamgia(100000, -10));
// // // function Xephangthidau(diem) {
// // //   if (diem >= 0 && diem <= 100) {
// // //     switch (true) {
// // //       case diem >= 90:
// // //         return "Vàng";
// // //       case diem >= 70:
// // //         return "bạc";
// // //       case diem >= 50:
// // //         return "Đồng";
// // //       default:
// // //         return "Không có";
// // //     }
// // //   } else {
// // //     return "Lỗi";
// // //   }
// // // }
// // // console.log(
// // //   Xephangthidau(120) +
// // //     Xephangthidau(100) +
// // //     Xephangthidau("80") +
// // //     Xephangthidau(50) +
// // //     Xephangthidau(-2),
// // // );
// // // function Kiemtratuoi(n) {
// // //   if (typeof n === "number" && n >= 0) {
// // //     n = n < 18 ? false : true;
// // //     return n;
// // //   } else {
// // //     return "Tuổi không hợp lệ";
// // //   }
// // // }
// // // function Kiemtrasodu(n) {
// // //   if (typeof n === "number" && n >= 0) {
// // //     n = n < 1000000 ? false : true;
// // //     return n;
// // //   } else {
// // //     return "Số dư không hợp lệ";
// // //   }
// // // }
// // // function xephangtaikhaont(tuoi, sodu) {
// // //   if (Kiemtratuoi(tuoi) == false) {
// // //     return "Không đủ tuổi";
// // //   } else if (Kiemtratuoi(tuoi) == true) {
// // //     if (Kiemtrasodu(sodu) == true) {
// // //       return "tài khoản vip";
// // //     } else if (Kiemtrasodu(sodu) == false) {
// // //       return "Tài khoàn thường";
// // //     } else {
// // //       return "Số dư không hợp lệ";
// // //     }
// // //   } else {
// // //     return "tuổi không hợp lệ";
// // //   }
// // // }
// // // console.log(xephangtaikhaont(-2, -2));
// // // console.log(xephangtaikhaont(10, -2));
// // // console.log(xephangtaikhaont(10, 1000));
// // // console.log(xephangtaikhaont(18, 100000));
// // // console.log(xephangtaikhaont(18, 1000000));
// // // console.log(xephangtaikhaont(19, ""));

// // // Bài 1
// // // for (let i = 1; i <= 10; i++) {
// // //   console.log(i);
// // // }
// // // // Bài 2
// // // let i=1;
// // // let Tong=0;
// // // while (i<=100){
// // //   Tong+=i;
// // //   i++;
// // // }
// // // console.log(Tong);
// // // Bài 3
// // // let number=1;
// // // for(let i=0;i<=9;i++){
// // //   for(let y=0;y<=9;y++){
// // //     let Ketqua=number*(y+1);
// // //     console.log(number+"*"+(y+1)+"="+Ketqua);
// // //   }
// // //   console.log("\n");
// // //   number++;
// // // }
// // //bài4
// // // let ten=["An","Bình","Cường"];
// // // for(const chao of ten){
// // //   console.log("Xin chào "+chao);
// // // }
// // //Bài 5
// // // for(let i=0;i<=19;i++){
// // //   if((i+1)==15) break;
// // //   if((i+1)%3==0) continue;
// // //   console.log(i+1);
// // // }
// // //bài 6
// // // let pass=["123","abc","xyz789"];
// // // let checkpass="xyz789";
// // // let i=-1;
// // // do{
// // //   i++;
// // //   console.log("Mật khẩu đã thử là:"+pass[i]);
// // //   if(checkpass===pass[i]){
// // //     console.log("Đăng nhập thành công");
// // //   }
// // //   else{
// // //     console.log("Đăng nhập thất bại");
// // //   }
// // // }
// // // while(checkpass!=pass[i]);
// // //Bài 7
// // // let sanpham={ten:"Lenovo LQQ", sanpham:"LapTop",gia:"20"};
// // // for(const key in sanpham){
// // //   console.log(key+":"+sanpham[key]);
// // // }
// // // // Bài 8
// // // for(let i=0;i<5;i++){
// // //   let dong="";
// // //   for(let y=0;y<=i;y++){
// // //     dong+="*";
// // //   }
// // //   console.log(dong);
// // // }
// // for(let i=0;i<5;i++){
// //   console.log("*".repeat(i+1));
// // }
// // Bài 9

// // function Demsochan(a=[]){
// //   let dem=0;
// //   for(let i=0;i<a.length;i++){
// //     if(a[i]%2==0){
// //     dem++;
// //     }
// //   }
// //   return dem;
// // }
// // console.log(Demsochan([0,1,2,3,4,5,6,7,8,9]));
// // Bài 10
// function Kiemtrasonguyento(a){
//   let dem=0;
//   for(let i=1; i<=(Math.sqrt(a));i++){
//     if(a%(i)==0){
//       dem++;
//     }
//   }
//   if(dem==1&&(a!=1)){
//     return true;
//   }
//   else{
//     return false;
//   }
// }
// console.log(Math.sqrt(2));
// for(let i=1;i<=20;i++){
// console.log(Kiemtrasonguyento(i)+"+"+i);
// }
function doiChu() {
      const el = document.querySelector("#tieu-de");
      el.textContent = "Đã đổi chữ rồi!";              // SỬA chữ bên trong thẻ đó
    }
    function doia(){
      const el = document.querySelector("a");
      el.textContent ="Đổi thành công";
    }
