// // // // const info={Name:"Duy Anh" , age:20}
// // // // info.city=["HÀ Nội"];
// // // // info["tel"]="0367298896";
// // // // console.log(info);
// // // // delete info.age;
// // // // console.log(info.city);
// // // // info.city.push("Hải phòng");
// // // // console.log(info.city);
// // // //EXE:
// // // // const user = {name:"Duy Anh" , age :20 , group:"A"};
// // // // for(let key in user){
// // // //     console.log(key , user[key]);
// // // // }
// // // // console.log(Object.keys(user));
// // // // console.log(Object.values(user));
// // // // console.log(Object.entries(user));
// // // // Object.entries(user).forEach(([key,value],index) => console.log(`${key}:${value},${index}`));
// // // // Phần 1
// // // console.log("Phần 1");
// // // let scores = {Toan: 8 , Van:7, Anh:9 , Sử :10};
// // // let DiemTrungBinh = Object.values(scores).reduce((acc , cur ) =>(acc + cur),0)/Object.values(scores).length;
// // // console.log(DiemTrungBinh);
// // // let inventory = {apple: 10, banana: 0, orange: 5};
// // // console.log(Object.entries(inventory).filter(([key,value]) => value >0));
// // // //Phần 2
// // // console.log("Phần 2");
// // // function CreatUser(Name , Value){
// // //     return {[Name]:Value};
// // // }
// // // console.log(CreatUser("Email","DuyAnh@gmail.com"));
// // // function addtoCart(productsName ,quantiTy){
// // //     return {[productsName]:quantiTy};
// // // }
// // // console.log(addtoCart("Áo thun",3));
// // // //Phần 3
// // // console.log("phần 3");
// // // const student ={
// // //     name:"Ngô Duy Anh",
// // //     address:{
// // //     age:20,
// // //     city:"Hưng Yên"},
// // //     subject :["Toán","Lý","Hóa"]
// // // };
// // // student.subject[0]="Văn";
// // // student.address.city="Hà nội"
// // // console.log(student["address"]);
// // // console.log(student.subject);
// // // //Bài tập
// // // const company = {
// // //   name: "TechCorp",
// // //   employees: [
// // //     { name: "An", dept: "IT", salary: 15 },
// // //     { name: "Bình", dept: "Sales", salary: 12 }
// // //   ]
// // // };
// // // console.log(company.employees[0].dept);
// // // let TongLuong=company.employees.reduce((acc , cur) => acc +cur.salary,0);
// // // console.log(TongLuong);
// // // //Phần 4
// // // console.log("Phần 4");
// // // const user = {
// // //     name:"An",
// // //     great(x){
// // //         console.log("Xin chào tôi là "+this.name +"Tuổi của tôi là "+x);
// // //     }
// // // }
// // // user.great(20);
// // // //Bài tập
// // // const calculator ={
// // //     a:3,
// // //     b:5,
// // //     sum(){
// // //         return this.a +this.b;
// // //     }
// // // }
// // // console.log(calculator.sum());
// // // //Phần 5
// // // console.log("Phần 5");
// // // const student1={name:"Duy Anh" , age:20 , job:"Student"}
// // // const{name , age, job} =student1;
// // // console.log(name ,age,job);
// // // const {name:userName} =student1;
// // // console.log(userName);
// // // console.log(job);
// // // function printUser({name,age}){
// // //     console.log(`${name}:${age}tuổi`);
// // // }
// // // printUser({name:"ngô duy anh" , age:20});
// // // //bài tập
// // // const product_phan6 = {name:"Laptop", price:1500, brand:"Dell", warranty:12};
// // // function destructuring(Obj){
// // //     const{name, price, brand: manafacturer}=Obj;
// // //     return {name,price,manafacturer};
// // // }
// // // console.log(destructuring(product_phan6));
// // // 10 BÀI TỔNG HỢP TOÀN BỘ CHƯƠNG OBJECT

// // // Bài 1 — Thêm/sửa/xóa cơ bản
// // let book = { title: "JS Cơ Bản", author: "Ẩn danh", price: 100 }; //Thêm year:2024, sửa price tăng 20%, xóa author, in kết quả cuối.
// // book["year"] = 2024;
// // book.price = book.price * 1.2;
// // delete book.author;
// // console.log(book);

// // // Bài 2 — Duyệt + tính toán
// // console.log("Bài 2");
// // let expenses = { food: 2000, rent: 5000, transport: 800 }; //Dùng Object.values + reduce tính tổng chi tiêu. Dùng Object.entries in ra từng dòng dạng "food: 2000".
// // let Tong = Object.values(expenses).reduce((acc, cur) => acc + cur, 0);
// // console.log(Tong);
// // console.log(Object.entries(expenses));

// // // Bài 3 — Computed key động
// // // Viết hàm setConfig(key, value) trả về object {[key]: value}, sau đó gộp nhiều lần gọi lại bằng spread {...obj1, ...obj2} thành 1 config tổng.
// // console.log("Bài 3");
// // function setConfig(key, value) {
// //   return { [key]: value };
// // }
// // console.log(setConfig("Name", "Duy Anh"));
// // // Bài 4 — Nested object sâu
// // // Cho:

// // // js
// // const order = {
// //   id: 1,
// //   customer: { name: "An", address: { city: "Hà Nội" } },
// //   items: [
// //     { name: "Áo", price: 100 },
// //     { name: "Quần", price: 200 },
// //   ],
// // };
// // console.log(order.customer.address.city);
// // let totalprice = order.items.reduce((acc, cur) => acc + cur.price, 0);
// // console.log(totalprice);
// // // Lấy ra city, tính tổng price của items bằng reduce.

// // Bài 5 — Method + this
// // Tạo object bankAccount có balance và 2 method: deposit(amount) (cộng tiền), withdraw(amount) (trừ tiền, không cho âm — nếu không đủ thì in "Không đủ số dư").
// let bankAccount = {
//   balance:0,
//   deposit(x) {
//     return this.balance +=x;
//   },
//   withdraw(x) {
//     if(this.balance<x){
//       console.log("Tài khoản không đủ tiền");
//       return this.balance;
//     }
//     return this.balance -=x;

//   },
// };
//   console.log(bankAccount.deposit(100));
//   console.log(bankAccount.deposit(100));
//   console.log(bankAccount.deposit(100));
//   console.log(bankAccount.deposit(100));
// // // Bài 6 — Destructuring + default value
// // let users = [{ name: "An", age: 20 }, { name: "Bình" }]; //Dùng map + destructuring với giá trị mặc định để in ra "An - 20 tuổi", "Bình - Chưa rõ tuổi".
// // users.map((x) => {
// //   const { name, age = "Chưa có tuổi" } = x;
// //   console.log(`${name}-${age}`);
// // });
// // // Bài 7 — Group by nâng cao (kết hợp reduce đã học + object)
// // let products = [
// //   { name: "A", category: "food" },
// //   { name: "B", category: "tech" },
// //   { name: "C", category: "food" },
// // ];
// // let group = products.reduce((acc, cur) => {
// //   if (!acc[cur.category]) {
// //     acc[cur.category] = [];
// //   }
// //   acc[cur.category].push(cur.name);
// //   return acc;
// // }, {});
// // console.log(group);
// // //Group theo category, nhưng thay vì lưu cả object, chỉ lưu name (giống bài group by ở phần Array, áp dụng lại ở đây).

// // // Bài 8 — Kiểm tra tồn tại + xóa có điều kiện
// // let settings = { theme: "dark", notifications: true, autoSave: false };
// // //Viết hàm removeIfFalse(obj) — duyệt qua object, xóa hết những key có giá trị false. Trả về object đã lọc.
// // function removeIfFalse(obj){
// //         for( let key in obj){
// //           console.log(obj[key]);
// //             if(obj[key]==false){
// //                 delete obj[key];
// //             }
// //         }
// //         console.log(obj);
// //     }
// //     removeIfFalse(settings)
// // // Bài 9 — Nested + method kết hợp
// // // Tạo object shoppingCart có items (mảng object {name, price, qty}) và method getTotal() dùng this.items + reduce để tính tổng tiền (price * qty).
// // const shoppingCart = {
// //   items: [
// //     { name: "Áo thun", price: 150000, qty: 2 },
// //     { name: "Quần jean", price: 350000, qty: 1 },
// //     { name: "Giày sneaker", price: 600000, qty: 1 },
// //     { name: "Tất (vớ)", price: 25000, qty: 5 }
// //   ],
// //   getTotal(){
// //     let Total =this.items.reduce((acc,cur)=> acc+cur.price*cur.qty,0);
// //     console.log(Total);
// //   }
// // }
// // shoppingCart.getTotal();
// // // Bài 10 — Bài tổng hợp toàn diện
// // // Cho dữ liệu:

// // // js
const school = {
  name: "THPT ABC",
  classes: [
    {
      className: "12A1",
      students: [
        { name: "An", score: 7 },
        { name: "Bình", score: 5 },
      ],
    },
    {
      className: "12A2",
      students: [
        { name: "Chi", score: 9 },
        { name: "Dũng", score: 4 },
      ],
    },
  ],
};

// Yêu cầu:
// In ra tên tất cả các lớp (map)
// school.classes.map((x) => console.log(x.className));
// // Tính điểm trung bình toàn trường (gộp tất cả học sinh mọi lớp, dùng reduce)
// let list = school.classes.flatMap((x) => x.students);
// console.log(list);
// // let dtb=list.reduce((acc,cur)=> acc+cur.score,0)/list.length;
// // console.log(dtb);

const list_class = school.classes.flatMap((c)=>c.students.map(s=>({...s, className:c.className})))
console.log(list_class);
// // Lọc ra danh sách học sinh có điểm dưới 5 (kèm tên lớp) — dùng flatMap hoặc lồng map+filter
console.log(list_class.filter((x)=> x.score<5));
// // // Đếm số lớp có điểm trung bình lớp trên 6.5
const classAveragers =school.classes.map((x) => {
  const avg = x.students.reduce((acc , cur)=> acc +cur.score,0)/x.students.length;
  return { className:x.className, avg:avg};
})
console.log(classAveragers);
console.log(classAveragers.filter((x) => x.avg >=6.5));
// const store = {
//   name: "Cửa hàng ABC",
//   branches: [
//     { branchName: "Chi nhánh 1", revenue: [1000, 2000, 1500] },
//     { branchName: "Chi nhánh 2", revenue: [3000, 2500] },
//   ],
// };
// // Tính tổng doanh thu của mỗi chi nhánh (không gộp toàn hệ thống), trả về mảng [{branchName, total}].
// const DoanhThu = store.branches.map((x) => {
//   let avg = x.revenue.reduce((acc, cur) => acc + cur, 0);
//   return { branchName: x.branchName, agv: avg };
// });
// console.log(DoanhThu);

// const cinema = {
//   name: "CGV",
//   rooms: [
//     {
//       roomName: "Room 1",
//       seats: [{ type: "vip" }, { type: "standard" }, { type: "vip" }],
//     },
//     { roomName: "Room 2", seats: [{ type: "vip" }, { type: "standard" }] },
//   ],
// };
// const TongGhe = cinema.rooms.flatMap((x) => {
//   TongGheVip_theophong = x.seats.reduce((acc, cur) => {
//     if (cur.type === "vip") {
//       acc++;
//       return acc;
//     }
//     return acc;
//   }, 0);
//   return { roomName: x.roomName, TongGheVip: TongGheVip_theophong };
// });
// console.log(TongGhe);
// TongGheVip = TongGhe.reduce((acc, cur) => acc + cur.TongGheVip, 0);
// console.log(` Tổng ghế vip cả phòng :${TongGheVip}`);
// // Đếm tổng số ghế loại "vip" trên toàn rạp (gộp hết các phòng).

// const university = {
//   name: "Đại học XYZ",
//   faculties: [
//     {
//       facultyName: "CNTT",
//       courses: [
//         { courseName: "JS", students: 30 },
//         { courseName: "Python", students: 25 },
//       ],
//     },
//     {
//       facultyName: "Kinh tế",
//       courses: [{ courseName: "Kế toán", students: 40 }],
//     },
//   ],
// };
// const course_true = university.faculties.flatMap((x) =>
//   x.courses
//     .filter((s) => s.students > 28)
//     .map((s) => ({ ...s, facultyName: x.facultyName }))
// );
// console.log(course_true);
// Lọc ra các môn học (course) có students > 28, kết quả phải kèm theo tên khoa (facultyName) của môn đó.
