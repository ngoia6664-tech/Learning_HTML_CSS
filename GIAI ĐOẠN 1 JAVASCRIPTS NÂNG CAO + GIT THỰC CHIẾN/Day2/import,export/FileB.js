import TenTuyChon,{ TinhTong,TinhThuong } from "./FileA.js";
console.log(TinhTong(2,3));console.log(TinhThuong(5,6));
//Ở file B ta import phép nhân // Default export không gắn tên cụ thể khi export,
//  nên phía import được tự đặt tên tùy ý
//  — không phải chỉ vì nó là duy nhất, mà vì bản thân nó vốn đã không có tên để khớp."
console.log(TenTuyChon(3,4)); //Tên tùy chọn chính là tên hàm phep nhan ở bên A