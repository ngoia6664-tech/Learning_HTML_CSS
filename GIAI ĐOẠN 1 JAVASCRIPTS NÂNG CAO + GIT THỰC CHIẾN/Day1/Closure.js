function GiaTri(x) {//ngay tại chỗ này đã tạo địa chỉ ô nhớ mới , không phải return khi có tham số i truyền vào
  // Truyền tham số x cho hàm giá trị , kiểu dữ liệu của x phụ thuộc vào tham số truyền vào
  // ở dưới ta có let i =5 thì khi truyền i vào hàm giá trị x
//    sẽ nhận kiểu dữ liệu là Primitive(nguyên thủy)
  return function () {
    // return hàm này tạo ra 1 hàm con rồi gắn giá trị của ô nhớ mới vào 
    console.log(x); //log ra x =5 mà không phụ thuộc vào biến x bên ngoài
    //  vì ô nhớ mới được tạo ra sẽ được gắn giá trị được truyền vào
  };
}
let i = 5;
const x = GiaTri(i);
i =99 //lúc này biến i ở ngoài có giá trị là 99 nhưng ô nhớ được tạo ra ban đầu được
// gắn giá trị là biến i ban đầu nên không phụ thuộc vào biến i bên ngoài
x();
//Ta có 1 ví dụ khác
function Closuretest(obj){ // Giả sử tham số truyền vào là obj
    // ở dưới ta thấy obj ObjTest là kiểu dữ liệu Reference type , kiểu dữ liệu này chỉ lưu
    //địa chỉ ô nhớ của các giá trị mà nó tham chiếu tới 
    return function(){
        console.log(obj.key);
    }
    //Khi đó return hàm này ô nhớ mới được tạo ra sẽ
    // tham chiếu đến cùng 1 giá trị mà ô nhớ ban đầu tham chiếu vào
    // => chỉ cần thay đổi giá trị thì sẽ thay đổi kết quả mà cả 2 ô nhớ cùng tham chiếu
}
let ObjTest ={key:20};// ô nhớ tham chiếu đến key:20;
const y =Closuretest(ObjTest); //truyền tham số vào mảng
ObjTest.key =30; // Thay đổi giá trị mà 2 ô nhớ tham chiếu tới
y();// Log ra 30;
