//Spread chính là trải các phần tử của 1 mảng để tạo ra 1 mảng mới
//  mà không ảnh hướng đến mảng gốc
//Ví dụ
const mangCu=[1,2,3,4,5];
const mangMoi=[...mangCu];
mangMoi.pop();
console.log(mangCu) //mảng cũ không hề đổi
console.log(mangMoi);;
const GopMang =[...mangCu,...mangMoi];//Ta cũng có thể làm như này để gộp mảng
console.log(GopMang);
function TongSo(a,b,c,d){
    return a+b+c+d;
}
console.log((TongSo(...mangMoi)));

//======Rest======
function TinhTong(...mangCu){//gộp các giá trị của mangCu truyền hết vào mảng mangCu
    const Sum=mangCu.reduce((acc,cur) => acc+cur,0);
    console.log(Sum);
}
TinhTong(1,2,3,4);//gộp hết tham số vào mảng
TinhTong(5);
// Res+destrututring Lấy phần tử mình muốn , sau đó gộp lại hết thành mảng
const [mot,hai ,...phanconlai] =[1,2,3,4,5,6];
console.log(mot);
console.log(hai);
console.log(phanconlai);