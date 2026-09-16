// //
// Bài 1 Destructuring array: cho const toa_do = [10.5, 20.3, "Hà Nội"],
//  dùng destructuring lấy ra lat, lng, ten (đặt tên biến khác tên gốc
// , không dùng index truy cập thường).
    console.log("bài 1");
    const toa_do =[10.5, 20.3,"Hà Nội"];
    const [lat, lng , ten]=toa_do;
    console.log(lat,lng,ten);
    
// Bài 2 Destructuring object + rest: 
// cho const sanPham = { ten: "Bút", gia: 5000, soLuong: 100, moTa: "..." }, 
// lấy riêng ten, gia, gom 2 field còn lại vào 1 object bằng rest (...conLai).
    console.log("bài 2");
    const sanPham ={ten: "Bút",gia: 5000, soluong:100, moTa:"Viết đẹp"};
    const {ten:TenSP,gia:giaSP,...KeyConLai}=sanPham;
    console.log(TenSP,giaSP,KeyConLai);
// Bài 3 Spread: viết hàm ganCoDinh(mang) nhận 1 mảng, trả về mảng mới = mảng gốc + thêm phần tử 0 
// vào đầu và 100 vào cuối, không dùng unshift/push (chỉ dùng spread).
    console.log("bài3");
    function ganCoDinh(array){// ở trên dùng để gom vào mảng
        return [0,...array,100];// ở dưới dùng để trải mảng ra
    }
    console.log(ganCoDinh([1,2,3,4,5]));
// Bài 4Rest + reduce: viết hàm trungBinh(...soDiem) nhận số lượng điểm bất kỳ
// , trả về điểm trung bình (dùng reduce, tự chia cho soDiem.length).
    console.log("bài4");
    function trungBinh(...soDiem){
        const avg = soDiem.reduce((acc,cur) => acc+cur)/soDiem.length;
        return avg;
    }
    console.log(trungBinh(5,2,2,3,5,7,56,34));
// Bài 5 Closure: viết hàm taoBoGioiHan(gioiHan) — trả về 1 hàm, mỗi lần gọi tăng
//  biến đếm nội bộ lên 1, nếu vượt quá gioiHan thì in "Đã đạt giới hạn" thay vì tăng tiếp.
    console.log("bài5");
    function taoBoGioiHan(gioiHan){//Tạo 1 ô nhớ mới gắn giá trị từ tham số truyền vào
        let dem=0;
        return function tang(){
            if(dem<gioiHan){ //Đang so sánh biến đếm với giá trị của giới hạn đã 
                // được gắn , không phụ thuộc vào biến bên ngoài
                dem=dem+1;
                return dem;
            }
            else{
                console.log("đã tới giới hạn");
            }
        }
    }
    let i =5
    let testBai5 =taoBoGioiHan(i)// truyền 5 vào tham số giới hạn , tạo ra 1 ô nhớ mới lấy giá trị là 5
    //vì taoBogioihan đã return 1 hàm nên lúc này test bai5 chính là hàm tang đó , chỉ việc gọi hàm
    i=10;//Bản thân lúc này i=10; là 1 giá trị kiểu dữ liệu nguyên thùy tuy nhiên ô nhớ tạo ra không tham chiếu đến mà đang lấy giá trị đã truyền vào trước đó
    console.log(testBai5());
    console.log(testBai5());
    console.log(testBai5());
    console.log(testBai5());
    console.log(testBai5());
    testBai5();
//  Bài 6 Closure + object: viết hàm taoGioHang() — trả về object có 2 method themSanPham(ten, gia) và xemTongTien(), dữ liệu giỏ hàng lưu trong biến private nhờ closure (không cho truy cập trực tiếp từ ngoài).
    console.log("bài 6");
    function taoGioHang(){
        let danhsash=[];
        return {
            themSanPham(ten,gia){
                danhsash.push({ten,gia})
                //push vào 1 obj lấy key là ten, gia , value bằng đúng giá trị truyền vào
            },
            xemTongTien(){
                return danhsash.reduce((tong,sp)=> tong+sp.gia,0);
                //tính tổng bằng reduce của mảng danh sách đã thêm
            }
        }
    }
    const giohang = taoGioHang();
    giohang.themSanPham("Giày",500);
    giohang.themSanPham("Quần",300);
    console.log(giohang.xemTongTien());
// Bài 7 JSON: cho 1 object lồng nhau
//  (VD: { ten: "An", diaChi: { thanhPho: "Hà Nội", quan: "Cầu Giấy" } }), 
// stringify rồi parse lại, kiểm tra console.log giá trị diaChi.thanhPho 
// sau khi parse có đúng không.
    console.log("BÀi 7");
    let info = { ten: "An", diaChi: { thanhPho: "Hà Nội", quan: "Cầu Giấy" } }
    const JsonInfo = JSON.stringify(info);
    console.log(JsonInfo);
    info = JSON.parse(JsonInfo);
    console.log(info.diaChi.thanhPho);
// Bài 8 Git Bash: tạo cấu trúc thư mục bằng lệnh (không dùng chuột): 
// bai-tap-20/ngay1/, bai-tap-20/ngay2/, tạo sẵn 10 file rỗng tên bai1.js đến bai10.js 
// trong ngay1/ (gợi ý: có thể gõ từng lệnh touch, hoặc tìm hiểu cách gộp nhiều touch 
// trong 1 dòng).
    console.log("bài 8");
// Bài 9 REST GET + query parameter: viết hàm layBinhLuanTheoBaiViet(postId), dùng URL ?postId= để lấy toàn bộ comment của 1 bài viết, 
// in ra số lượng comment tìm được (data.length).
    console.log("bài 9");
    async function layBinhLuanTheoBaiViet(postId) {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            if(!response.ok){
                throw new Error("mã lỗi:"+response.status);
            }
            const data = await response.json();
            console.log("số coment tìm được:"+data.length);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
    layBinhLuanTheoBaiViet(1)
    //Không thể tìm ra số lượng bài viết , vi lấy theo post ID là chỉ lấy 1 obj, không phải mảng
    //luồng vào comment trong các obj lấy theo postID, nó sẽ chỉ lấy 1 bài duy nhất đầu tiên trùng với POST ID truyền vào
    //  không thể lấy data.length 
    // để biết số comemt được vì bản thân obj lấy về đã là 1 comment
// bài 10 REST GET + nested resource: viết hàm layComment(postId) 
// dùng URL dạng /posts/${postId}/comments (khác cách bài 9, cùng kết quả) 
// — so sánh 2 cách, note lại bạn thấy cách nào rõ nghĩa hơn.
    console.log("bài 10");
    async function layComment(postId) {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if(!response.ok){
                throw new Error("mã lỗi:"+response.status);
            }
            const data = await response.json();
            console.log(data);
            console.log("số coment:"+data.length);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
layComment(1);
//Cách này luồng sẽ là vào các bài posts, lấy posts id đã truyền vào rồi mới đến comment của các postid đó
//Trả về 1 mảng không phải obj