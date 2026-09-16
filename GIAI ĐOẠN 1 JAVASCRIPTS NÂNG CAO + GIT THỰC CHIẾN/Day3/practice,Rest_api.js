// Bài tập tổng hợp REST API — 1 file, đủ cả 4 method

// Mục tiêu: viết 1 chương trình nhỏ mô phỏng quản lý "bài viết" 
// (post) — làm đủ cả chu trình CRUD (Create - Read - Update - Delete)
// , dùng chung jsonplaceholder.typicode.com/posts.

// Yêu cầu cụ thể:

// GET — viết hàm layBaiViet(id): lấy 1 bài viết theo id
// , in ra title và body. Xử lý lỗi bằng response.ok như đã học.
async function LayBaiViet(id) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if(!response.ok){
            throw new Error("Mã lỗi :" +response.status);
        }
        else{
            const data = await response.json();
                console.log("đã lấy bài viết:",data);
                return data;
        }
    }
    catch(loi){
        console.log("Mã lỗi:"+loi);
    }
    
}
// POST — viết hàm taoBaiViet(title, body): nhận title/body làm 
// tham số (không hardcode cứng như bài trước), gửi lên server,
//  in ra bài viết vừa tạo (kèm id server trả về).
async function  TaobaiViet(title,body) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                title:title,
                body:body,
                userID:11,
                id:101
            }),
        });
        if(!response.ok){
            throw new Error("Mã lỗi ở đây:"+response.status)
        }
        else{
            const data = await response.json();
            console.log("Đã tạo bài viết ",data);
            return data;
        }
    } catch (error) {
        console.log("Lỗi tạo bài viết:" +error);
    }
    
}
// PATCH — viết hàm suaBaiViet(id, truongCanSua): nhận id và 1
//  object chứa field muốn sửa (VD: { title: "Tiêu đề mới" }),
//   gửi PATCH, in ra kết quả server trả về.
async function suaBaiViet(id, truongCanSua) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method : "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(truongCanSua),
        });
        if(!response.ok){
            throw new Error("mã lỗi response :"+response.status);
        }
        else{
            const data = await response.json();
            console.log("Đã sửa bài viết:",data);
            return data; 
        }
    }
    catch(error){
        console.log(error);
    }
}
async function xoaBaiViet(id) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method : "DELETE",
        });
        if(!response.ok){
            throw new Error("mã lỗi response :"+response.status);
        }
        else{
            console.log("xóa thành công"+response.status);
            return response.status
        }
    }
    catch(error){
        console.log(error);
    }
}
// DELETE — viết hàm xoaBaiViet(id): gửi DELETE theo id, in ra 
// response.status để xác nhận đã xóa (không cần .json()
//  vì DELETE thường không trả body).
// Gọi thử cả 4 hàm nối tiếp nhau trong 1 hàm async khác, 
// theo đúng thứ tự: tạo bài viết mới → lấy lại bài viết đó 
// bằng id server trả về (dù server giả lập không lưu thật, 
// cứ thử gọi để quen luồng) → sửa → xóa. Dùng await nối tiếp, không dùng .then().
async function CRUD() {
    await TaobaiViet("tiêu đề 1" ,"Nội dung 1");
    await LayBaiViet(1)
    await suaBaiViet(1, {body:"Body đã sửa "});
    await xoaBaiViet(1)
}
CRUD();