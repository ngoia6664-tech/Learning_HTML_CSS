// Nghĩa đen: JavaScript Object Notation — "cách viết theo kiểu object của JavaScript".

// Vấn đề nó giải quyết: máy chủ (server) và trình duyệt (client)
// là 2 chương trình khác nhau, muốn gửi dữ liệu qua lại giữa chúng
//  thì không thể gửi thẳng 1 object JS (object chỉ tồn tại trong bộ
//      nhớ của 1 chương trình JS đang chạy) — phải gửi dưới dạng chuỗi
//       văn bản thuần túy đi qua mạng. JSON là 1 định dạng chuỗi văn bản
//        được thiết kế để trông giống hệt cú pháp object/array JS,
//        giúp người đọc dễ hiểu và máy dễ chuyển đổi qua lại.
//VD 
const Obj ={ten:"Duy Anh" , age:20};
const JsonObj = JSON.stringify(Obj) // Chuyển Obj ở trên thành định dạng Json cho biết JsonObj
console.log(JsonObj);
console.log(Obj);
const Obj2 = JSON.parse(JsonObj);// Chuyển ngược lại từ định dạng Json cho 1 obj khác;
console.log(Obj2.ten);
