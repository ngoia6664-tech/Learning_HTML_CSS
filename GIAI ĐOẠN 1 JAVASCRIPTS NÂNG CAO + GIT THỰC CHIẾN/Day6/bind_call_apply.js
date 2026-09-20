 // CALL 
 function chao(){
    console.log("Chào bạn:",this.ten);
 }
 const a ={ ten: "An"};
 const b ={ ten:"Bình"};
 chao.call(a);
 chao.call(b);
 function GioiThieu(loi,age){
    console.log( loi+" tôi là: "+this.ten +"\nTuổi của  tôi là:"+age);
 }
 GioiThieu.call(a,"Xin chào", 20) // Tham số đầu tiên của call là obj muốn this trỏ tới 
 // Tham số thứ 2 chính là tham số cần truyền vào hàm
 //APPLY
 GioiThieu.apply(a,["Xin chào",20]);// APPLY tương tự nhưng tham số muốn truyền phải là mảng
 //BIND (Đặc biệt)
 const ChaoCuaA = chao.bind(a);  // Lúc này ChaoCuaA là 1 hàm chưa chạy 
 ChaoCuaA(); // hàm này để chạy nó
 //Ở phần trước chao.call(tham số) đã tự động chạy hàm rồi
 // SO sánh 
// Gọi      ngay hay tạo hàm mới	    Tham số phụ
// call	    Gọi ngay	                Rời từng cái
// apply	Gọi ngay	                Gói 1 mảng
// bind	    Tạo hàm mới, chạy sau	    Rời từng cái
const dem={
    solan:0,
    tang: function(){
        this.solan++;
        console.log("Số lần của bạn là:", this.solan);
    }
}
dem.tang()// có obj dem đã gọi hàm tang() nên this chỏ đến dem
//NHƯNG
// const HamRoi = dem.tang // lúc này HamRoi là hàm ở trong tang CHƯA CHẠY
// HamRoi();//báo lỗi NAN vì this không có obj trở tới
// ==== Chữa ====
// Không hoàn toàn đúng trong mọi trường hợp — đây chính là điểm đã học ở
//  buổi this (strict vs non-strict): nếu file chạy strict mode (module, "use strict"),
//   this.solan++ sẽ ném lỗi TypeError (không đọc được property của undefined), 
//   không phải NaN. Chỉ khi non-strict (this = global object, có thật nhưng rỗng),
//    this.solan mới ra undefined, rồi undefined++ mới cho NaN, không lỗi. 
//    Comment này chỉ đúng với 1 trong 2 trường hợp — nên ghi rõ điều kiện thay vì 
//    khẳng định chắc chắn "báo lỗi NaN".
//Sửa
const HamRoi= dem.tang.bind(dem);// Khóa cứng dem là this bên trong hàm tang trỏ tới
HamRoi();
HamRoi()
//hoặc 
const dem2={
    solan:100
}
const HamRoi2 = dem.tang.bind(dem2);// Trỏ tới 1 obj khác cũng được
HamRoi2();
const user ={
    ten:"Duy Anh"
}
function tinhtong(a,b){
    console.log(`${this.ten} , Tồng 2 số là ${a+b}`); // Ở đây ta có thể nghĩ sâu hơn
    // Thay vì dữ liệu chỉ dừng lại ở tham số đã truyền vào hàm , ta có thể lấy ở obj ngoài
    // Ở đây ta có thể lấy property key mà tham số của hàm không có ??
}
tinhtong.call(user, 3, 5);
tinhtong.apply(user,[3,5]);
const User_sum = tinhtong.bind(user); //Lưu ý bước này là user_sum tham chiều đến hàm tính tổng như chưa chạy
User_sum(3,5);// Truyền tham số vào hàm mới được tạo ? dễ nhầm, nói kĩ cho tôi phần này
tinhtong.bind(user)(3,5)//Ta có thể viết như vậy để chạy luôn