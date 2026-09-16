// file js muốn chạy như module thì mặc định là 1 hộp kín
// Tức là các biến ở trong 1 file chỉ giới hạn ở trong file đó 
//Vì vậy muốn dùng các hàm , mảng ở file A cho file B phải làm sao?
//=> ta dùng Export (Đưa ra cho mọi người dùng chung) , import(lấy những cái dùng chung đã đưa để để dùng)
//Ví dụ
export function TinhTong(a,b){
    return a+b;
}
export function TinhThuong(a,b){
    if(b!==0){
        return a/b;
    }
    else{
        console.log("Mẫu số không thể bằng 0");
    }
}
//TUY nhiên đấy là khi ta muốn dùng chung nhiều thứ 
//vậy ta chỉ muốn lấy ra 1 thứ DUY NHẤT từ file A thì sao 
//=> dùng export default
export default function PhepNhan(a,b){
    return a*b;
}