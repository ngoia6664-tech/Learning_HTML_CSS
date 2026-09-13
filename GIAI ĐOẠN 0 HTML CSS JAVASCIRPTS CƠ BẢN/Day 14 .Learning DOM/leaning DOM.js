let fruits = ["Táo", "Chuối", "Cam"];
function Hambai6() {
  const bai6 = document.querySelector(".Test");
  bai6.innerHTML = "Danh sách hoa quả";
  fruits.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = ` Quả :${x}`;
    bai6.appendChild(li);
  });
}
//Bài 7
function Hambai7() {
  const bai7 = document.querySelector(".Test");
   bai7.innerHTML = fruits.map((x)=> `<li> Quả :${x} </li>`).join("");
}
//Bài 8
let products = [
  { name: "Áo", price: 100 },
  { name: "Quần", price: 200 },
];
function Hambai8() {
  const bai8 = document.querySelector(".Test");
  bai8.innerHTML = "Danh sách áo";
  products.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = `${x.name} - ${x.price}`;
    bai8.appendChild(li);
  });
}
//Bài 9
function Hambai9() {
  const bai9 = document.querySelector(".Test");
  bai9.innerHTML = "Danh sách áo đắt";
  products.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = `${x.name} - ${x.price}`;
    if (x.price > 150) {
      li.classList.add("Expensive");
    }
    bai9.appendChild(li);
  });
}
//Bài 10
let number = [3, 4, 6, 12, 45, 14, 45, 2, 9];
function Hambai10() {
  const bai10 = document.querySelector(".Test");
  bai10.innerHTML = "Danh sách number";
  number.filter((x) => x>10).forEach((x)=>{
    const li = document.createElement("li");
      li.textContent = x;
      bai10.appendChild(li);
  });
}
//bài 11
function Hienthongbao() {
  const bai11_1 = document.querySelector("#Thongbao");
  bai11_1.textContent = "Hiện thông báo";
  const p = document.createElement("p");
  p.textContent = "Đã lưu thành công";
  bai11_1.appendChild(p);
}
function Xoathongbao() {
  const bai11_2 = document.querySelector("#Thongbao");
  bai11_2.innerHTML = "";
}
//bài 12
let student = [
  { name: "Ngô Duy Anh", subject: { Toán: 9, Lý: 9 } },
  { name: "Ngô Duy An", subject: { Toán: 7, Lý: 10 } },
];
function Hambai12() {
  const bai12 = document.querySelector(".student");
  bai12.innerHTML = "Danh sách học sinh";
  student.flatMap((x) => {
    const sbj = Object.values(x.subject);
    const avg = sbj.reduce((acc, cur) => acc + cur, 0) / sbj.length;
    const p = document.createElement("p");
    p.id="diem-tb";
    p.textContent = `Tên:${x.name} - Điểm Trung bình:${avg}`;
    bai12.appendChild(p);
  });
}
//Bài 13
const user = { name: "An", age: 20, city: "Hà Nội" };
function Hambai13() {
  const bai13 = document.querySelector(".user");
  bai13.innerHTML = "Danh sách user";
  Object.entries(user).forEach(([key,value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    bai13.appendChild(li);
  });
}
//Bài 15
let tasks = [
  { title: "Học DOM", done: true },
  { title: "Làm bài tập", done: false },
  { title: "Học Array", done: true },
];
function render15(){
    const render= document.querySelector(".tasks");
    render.innerHTML="Danh sách tasks";
    tasks.forEach((x) => {
        const li =document.createElement("li")
        li.textContent=`${x.title}`;
        render.appendChild(li);
        if(x.done===true){
            li.classList.toggle("completed");
        }
    })
    const p=document.createElement("p");
    const completed =tasks.filter((x) => x.done ===true)
    p.textContent=`completed : ${completed.length} / ${tasks.length} `
    render.appendChild(p)
}
function check15(){
}
