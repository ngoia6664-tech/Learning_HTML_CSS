// //Bài tập nhỏ để chắc tay trước khi qua Module + JSON/REST API:

// Viết hàm layDiemCaoNhat(...diem) nhận số lượng điểm bất kỳ (dùng rest), trả về điểm cao nhất.
function layDiemCaoNhat(...diem){
    const diemMax =Math.max(...diem);//Kiến thức bị quên Math.max(bên trong này phải là các
    //dải số không được truyền vào mảng) từ đó phải trải mảng này ra bằng ...
    console.log(diemMax);
}
layDiemCaoNhat(1,3,0,-2,35,99,-100);
// Cho const nguoiDung = { ten: "An", tuoi: 20, email: "an@gmail.com" }, dùng destructuring để lấy ten và email ra 2 biến riêng, bỏ qua tuoi.
const nguoiDung={ ten: "An", tuoi: 20, email: "an@gmail.com" }
// const [ten,,email]=[...Object.values(nguoiDung)];//Dùng khá cồng kềnh , bạn có cách hay hơn không
const {ten,email}=nguoiDung;// lấy("ten")("email") vừa là tên của key đồng thời value của nó tự động gắn cho biến mới mà không cần tự khai báo biến tương ứng
console.log(ten);
console.log(email);
// Giải thích bằng lời (không cần code) tại sao dòng này sai cú pháp: function f(...a, b) {} — gợi ý: liên quan tới quy tắc "rest luôn đứng cuối".
// rest luôn gom tất cả tham số truyền vào 1 mảng? theo quy tăc thì rest luôn phải là tham số cuối
// nhưng tôi cũng chưa rõ vì sao có quy tắc đó
//VD
function f(b,...a){
    console.log(a);
    console.log(b);
}
f(1,2,3,4,5);