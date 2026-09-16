// ở Destructuring Object ta đã sử dụng rất nhiều cách để đổi giá trị của key trong obj
//VD :
let obj={name:"duy anh" , age:20};
obj.age=21;// đổi key age
obj["age"]=22 //Hoặc cũng có thể là như này nếu biết tên key xác định
console.log(obj);
//Áp dụng với mảng , mảng không có key nó xác định phần tử theo vị trí
//Ví dụ
const mang=[1,2,3];
const [x,y,z] =mang;//Gắn giá trị biến x y z lần lượt theo vị trí 0 1 2;
let [a , , c] =mang;// hoặc cũng có thể là như này nếu không muốn gắn những vị trí mình muốn
console.log(x,y,z);
console.log(a,c);
[a,c] =[c,a]; //dùng để đổi chỗ vị trí phần từ; // Nhớ dùng let 
console.log(a,c);
