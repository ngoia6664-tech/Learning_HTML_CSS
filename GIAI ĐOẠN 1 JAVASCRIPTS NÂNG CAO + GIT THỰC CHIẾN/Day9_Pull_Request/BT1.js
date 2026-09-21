function Nhapgia(Gia) {
  if (typeof Gia === "number") {
    return Gia;
  } else {
    return "Gia phải là số";
  }
}
console.log(Nhapgia(2314));
const SANPHAM = { Ten: "LAPTOP", Gia: 5000 }; //Đây là dòng ở nhánh BT_4
