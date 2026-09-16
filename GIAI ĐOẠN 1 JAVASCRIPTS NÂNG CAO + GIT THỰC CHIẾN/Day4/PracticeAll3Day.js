// Bài 11 Destructuring + spread kết hợp: viết hàm
// capNhatSanPham(sanPhamCu, thayDoi) — nhận object sản phẩm cũ
// và object chứa field muốn đổi, trả về sản phẩm mới (dùng spread
// {...sanPhamCu, ...thayDoi}, không mutate object gốc).
console.log("bai 11");
function capNhatSanPham(sanPhamCu, thayDoi) {
  return { ...sanPhamCu, ...thayDoi }; //nếu return thayDoi thì nó sẽ trả lại obj cũ , yêu cầu trả về 1 obj mới không liên quan đến obj gốc
}
const LastProduct = { Ten: "Áo", Gia: 500 };
const Thaydoi = { Gia: 700 };
const NewProduct = capNhatSanPham(LastProduct, Thaydoi);
console.log(NewProduct);
// Bài 12 Closure + rest: viết hàm taoLichSuGoi(...soLan) — trả
// về 1 hàm, mỗi lần gọi log ra lịch sử toàn bộ tham số đã truyền
// vào từ đầu (closure giữ mảng lịch sử).
console.log("Bài 12");
function taoLichSuGoi() {
  let LichSu = [];
  return function (...soLan) {
    LichSu.push(...soLan);
    console.log(LichSu);
  };
}
const LichSutest = taoLichSuGoi();
LichSutest("Ông A");
LichSutest("Ông đang làm gì thế");
LichSutest("Ăn cơm chưa");

//Tôi chưa rõ yêu cầu lắm
// Bài 13 REST GET nhiều tài nguyên cùng lúc: viết hàm
// layThongTinUser(userId) — gọi 2 API độc lập: lấy thông tin
// user (/users/${userId}) VÀ lấy toàn bộ bài viết của user đó
// (/posts?userId=${userId}), in ra tên user kèm số lượng bài viết.
async function layThongTinUser(userId) {
  console.log("bài 13");
  try {
    const infoUser = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    const infoPosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    if (!infoPosts.ok || !infoUser.ok) {
      throw new Error(
        `Mã Lỗi: Posts:${infoPosts.status} , USER: ${infoUser.status}`,
      ); //Error chỉ nhận 1 tham số duy nhất
    }
    const dataPosts = await infoPosts.json();
    const dataUser = await infoUser.json();
    console.log(
      `Tên User: ${dataUser.name} , Số bài viết : ${dataPosts.length}`,
    );
  } catch (error) {
    console.log("Lỗi lấy dữ liệu:", error);
  }
}

//     [TypeError: fetch failed] {
//   [cause]: Error: getaddrinfo ENOTFOUND jsonplaceholder.typicode.co
//       at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
//     errno: -3008,
//     code: 'ENOTFOUND',
//     syscall: 'getaddrinfo',
//     hostname: 'jsonplaceholder.typicode.co'
//   }
// }
// [TypeError: fetch failed] {
//   [cause]: Error: getaddrinfo ENOTFOUND jsonplaceholder.typicode.co
//       at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
//     errno: -3008,
//     code: 'ENOTFOUND',
//     syscall: 'getaddrinfo',
//     hostname: 'jsonplaceholder.typicode.co'
//   }
// } Xóa chữ m trong com đi để lấy đường truyền sai và nó trả về cái này là lỗi gì
//TÔi chưa biết thử trường hợp nào thì ném lỗi ở if
// Bài 14 REST POST + destructuring kết quả: viết hàm
// taoTodo(title, completed), POST lên /todos, dùng destructuring
// lấy riêng id và title từ kết quả trả về để log gọn
// (const { id, title } = data).
async function taoTodo(Title, completed) {
  console.log("bài 14");
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 102,
        // id:300,Không nên gắn ID vì giả lập sẽ tự sinh thêm ID sau ID đã có = ID trước +1
        title: Title,
        completed: completed,
      }),
    });
    if (!response.ok) {
      throw new Error("Mã lỗi :" + response.status);
    }
    const data = await response.json();
    console.log(data);
    const { id, title } = data;
    console.log(`ID là:${id},title là:${title}`);
  } catch (error) {
    console.log("Lỗi đường truyền :" + error);
  }
}
//     Bài 15
// Tên User: undefined , Số bài viết : 0
// Tên User: Leanne Graham , Số bài viết : 10 // 2 dòng này ở bài 13 lấy dữ liệu lâu nên tọt xuống đây đáng ra tôi nên dùng 1 hàm asyn để chạy lần lượt các bài
// {
//   userId: 102,
//   id: 201,
//   title: 'Học REST API Ngày 4',
//   completed: false
// }
// ID là:201,title là:Học REST API Ngày 4 , trả về ID 201????

// Bài 15 REST PATCH có điều kiện: viết hàm
// danhDauHoanThanh(todoId) — GET todo đó trước để kiểm tra
// completed hiện tại, nếu đang false mới PATCH đổi thành true,
// nếu đã true rồi thì log "Đã hoàn thành từ trước" không gọi
// PATCH nữa.
async function danhDauHoanThanh(todoId) {
  console.log("Bài 15");
  try {
    const tests = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );
    if (!tests.ok) {
      throw new Error("Mã lỗi:" + tests.status);
    }
    const data = await tests.json();
    console.log(data);
    if (data.completed === false) {
      const change = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: true,
          }),
        },
      );
      const changed = await change.json();
      console.log(changed);
    } else {
      console.log("Nhiệm vụ đã hoàn thành");
    }
  } catch (error) {
    console.log("lỗi đường truyền:" + error);
  }
}

ChayCacbai();
// Bài 16 REST DELETE + xử lý lỗi có chủ đích: viết hàm
// xoaComment(commentId), thử gọi với 1 id không tồn tại
// (VD: 99999), quan sát và giải thích response.status trả về
// là gì (dự đoán trước khi chạy).
async function xoaComment(comemtId) {
  try {
    console.log("bài 16");
    //Phải kiếm tra trước khi xóa
    const testGET = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${comemtId}`,
    );
    if (!testGET.ok) {
      throw new Error("ID không hợp lệ"); //Vì lúc này lỗi đường truyền
    }
    const data = await testGET.json();
    if (Object.keys(data).length === 0) {
      console.log("ID không hợp lê");
      return;
    }
    const actionDelete = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${comemtId}`,
      {
        method: "DELETE",
      },
    );
    // const data = await response.json(); log đều ra thành công vì method delete đã xóa obj đó rồi
    // console.log(data);
    // if(!response.ok){
    //     throw new Error("MÃ lỗi:"+response.status);//Trả về 200 nếu id khoog có thật chăng?
    // }
    //Kết quả là vẫn xóa thành công dù id không có thật ????, có phải vì đây là đang giả lập nên vậy
    // TÔi đã thử chạy curl id 501 và nó trả về 1 obj rỗng
    // phải sửa
    // if(data.length===0){
    //     console.log("Không tìm thấy ID phù hợp");
    // }
    console.log("Đã xóa thành công");
  } catch (error) {
    console.log("Lỗi đường truyền" + error);
  }
}
// Bài 17 JSON + REST kết hợp: viết hàm async
// layVaChuyenThanhChuoi(postId) — GET 1 bài viết, sau đó
// JSON.stringify cả object đó thành chuỗi có thụt lề đẹp
// (tìm hiểu tham số thứ 2 và 3 của JSON.stringify(obj, null, 2)),
// log ra chuỗi đó.
async function layVaChuyenThanhChuoi(postId) {
  console.log("bài 17");
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    if (!response.ok) {
      console.log("Lỗi:", response.status);
    }
    const data = await response.json();
    const ChuyenChuoi = JSON.stringify(data, null, 2); // Tham số thứ 3 là số lần nút space để thụt đầu dòng,còn tham só thứ 2 tôi thử cho số nguyên vào thì vẫn không ra gì khác
    console.log(ChuyenChuoi);
  } catch (Loi) {
    console.log(Loi);
  }
}
// Bài 18 Git Bash — xóa nhiều file: trong thư mục ngay2/, tạo
// 3 file a.js, b.js, c.js (cách nhau bằng khoảng trắng, không
// dùng dấu phẩy), dùng đúng 1 lệnh rm a.js b.js c.js để xóa
// cả 3 cùng lúc, xác nhận lại bằng ls.

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN (main)
// $ pwd
// /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN (main)
// $ cd Day2

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN/Day2 (main)
// $ touch js1.js js2.js js3.js

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN/Day2 (main)
// $ ls
// import,export/  js1.js  js2.js  js3.js  JSON_REST_API/

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN/Day2 (main)
// $ rm js1.js js2.js js3.js

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN/Day2 (main)
// $ ls
// import,export/  JSON_REST_API/

// admin@LAPTOP-5S9TJ0HH MINGW64 /d/WebLearning/GIAI ĐOẠN 1 JAVASCRIPTS NÂNG CAO + GIT THỰC CHIẾN/Day2 (main)
// $
// Bài 19 Tổng hợp closure + REST: viết hàm taoBoDemGoiAPI() —
function taoBoDemGoiAPI() {
  let dem = 0;
  return async function layPosts() {
    //Tận dụng bài hôm trước copy cho nhanh
    let postId = Math.floor(Math.random() * 100); //Math.floor làm tròn số nguyên gần nhất , nhỏ hơn hoặc bằng chính nó vd 36.77 thì sẽ thành 36
    console.log(postId);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      if (!response.ok) {
        throw new Error("mã lỗi:" + response.status);
      }
      const data = await response.json();
      console.log(data);
      dem++;
      console.log("số bài viết đã lấy:" + dem);
      return dem;
    } catch (error) {
      console.log(error);
    }
  };
}
// trả về 1 hàm async mà mỗi lần gọi sẽ GET 1 bài viết ngẫu
// nhiên (id từ 1-100, dùng Math.random()), đồng thời closure
// đếm và log số lần hàm đã được gọi tính đến hiện tại.

// Bài 20 Bài tổng lớn nhất: viết 1 file quanLyTodo.js có đủ
// 4 hàm CRUD cho /todos (giống bài CRUD /posts cũ nhưng đổi
// resource), sau khi chạy đúng, dùng Git Bash: git init (nếu
// thư mục project chưa có), git add quanLyTodo.js,
// git commit -m "...".
async function ChayCacbai() {
  //   await layThongTinUser(1);
  //   await taoTodo("Học REST API Ngày 4", false);
  //   await danhDauHoanThanh(1);
  //   await xoaComment(500);
  //   await xoaComment(501);
  //   await layVaChuyenThanhChuoi(1);
  const bai19 = await taoBoDemGoiAPI();
  bai19();
  bai19();
  bai19();
  bai19();
  bai19();
  bai19();
}
