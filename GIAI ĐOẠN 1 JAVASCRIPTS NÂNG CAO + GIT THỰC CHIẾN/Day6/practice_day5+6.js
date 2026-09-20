// Bộ bài tập vận dụng — this, Event Loop, Lỗi async (12 bài)
// Nhóm this (bài 1-4)
// 1.Viết object xeMay có gia: 20000000 và method giamGia(phanTram) dùng this.gia
//  để tính giá sau giảm, return kết quả. Tách hàm giamGia ra biến riêng, gọi trơn
// quan sát lỗi/kết quả sai — giải thích tại sao.
const xeMay = {
  gia: 20000000,
  giamgia(phantram) {
    if (phantram >= 0 && phantram <= 100) {
      this.gia = this.gia - (this.gia * phantram) / 100;
      console.log(`Sản phẩm sau khi giảm giá ${phantram}% là: ${this.gia}`);
      return this.gia;
    } else {
      console.log("[Bài 1] tham số không hợp lệ:" + phantram + "%");
    }
  },
};
const giamgia = xeMay.giamgia.bind(xeMay);
function chaybai1() {
  console.log("Đang chạy bài 1...");
  giamgia(10);
  giamgia(10000);
  giamgia(10); // tại sao null nó lại lấy giảm giá 10%???
  giamgia(-10);
}

// 2.Từ bài 1, dùng bind để tạo hàm mới đã khóa this = xeMay, gọi hàm đó rời khỏi object, xác nhận vẫn ra đúng kết quả.
//TÔi đã làm ở trên rồi và bây giờ dùng this nên đi kèm bind, call , và apply luôn không cần dùng this nhảy lung tung nữa
// 3.Viết hoaDon = { tongTien: 0 } và 1 mảng [100, 200, 300]. Dùng forEach với arrow function để cộng dồn từng phần tử vào hoaDon.tongTien (đúng this). Sau đó thử đổi arrow function thành function thường, quan sát lỗi.
const hoadon = {
  TongTien: 0,
  Tong() {
    MangBai2.forEach((x) => {
      this.TongTien += x;
    });
    return this.TongTien;
  },
};
const MangBai2 = [100, 200, 300];
function chaybai3() {
  console.log("Đang chạy bài 3...");
  console.log("Hóa đơn sau khi tổng là:" + hoadon.Tong());
}
// 4.Viết 1 hàm tinhThue(phanTram) độc lập (không thuộc object nào). Dùng call để gọi nó với this lần lượt là 2 object khác nhau ({ luong: 10000000 } và { luong: 20000000 }), in ra thuế tính được cho từng người.
function tinhThue(phanTram) {
  if (phanTram >= 0 && phanTram <= 100) {
    return this.luong - (this.luong * phanTram) / 100;
  } else {
    console.log("[Bài 4] tham số không hợp lệ:" + phanTram + "%");
  }
}
const user1 = {
  luong: 10000000,
};
const user2 = {
  luong: 20000000,
};
function chaybai4() {
  console.log("Đang chạy bài 4...");
  console.log(`Lương của user 1 là:${tinhThue.bind(user1)(10)}`);
  console.log(`Lương của user 2 là:${tinhThue.bind(user2)(10)}`);
}
async function RUN_BAI1_BAI4() {
  await chaybai1();
  await chaybai3();
  await chaybai4();
}
// RUN_BAI1_BAI4();

// Nhóm Event Loop (bài 5-8)
// 5.Viết code có 2 console.log đồng bộ, 1 setTimeout (500ms), 1 Promise.resolve().then() — dự đoán thứ tự TRƯỚC khi chạy, sau đó chạy kiểm chứng.
async function chaybai5() {
  console.log("1");
  setTimeout(() => {
    console.log("2");
  }, 1000);
  Promise.resolve()
    .then(() => {
      console.log("3");
      return "Đây là data ở then trước";
    })
    .then((data) => {
      //Dòng này để thử nghiệm và nhớ lại kiến thức then
      console.log(data);
    });
  console.log("4");
  // chạy sẽ là 1 4 3 "đây là data của then trước" 2 theo đúng thứ tự đồng bộ => microtask => macrotask
}
// 6.Viết 1 hàm async có 2 dòng await fetch(...) gọi 2 API khác nhau (dùng jsonplaceholder), thêm console.log mốc thời gian bằng console.time()/console.timeEnd() trước và sau, quan sát tổng thời gian chạy tuần tự (2 await nối tiếp).
async function layDuLieuBai6(id) {
  console.log(`[layDuLieuBai6] đang lấy thông tin có ID:${id}`);
  console.time("bài 6");
  try {
    if (!id || id < 0) {
      throw new Error(`[layDuLieuBai6],Lỗi ID ${id} không hợp lệ`);
    }
    const [response1, response2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
    ]);
    if (!response1.ok || !response2.ok) {
      throw new Error(
        `[layDuLieuBai6] : Lỗi [response1]: ${response1.status} , [response2]:${response2.status}`,
      );
    }
    const [user, post] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);
    console.log(user, post);
  } catch (loi) {
    console.log("layDuLieuBai6 LỖI đang được catch xử lý" + loi);
  } finally {
    console.timeEnd("bài 6");
  }
}
async function chaybai6() {
  await layDuLieuBai6(1);
}
// 7.Từ bài 6, đổi 2 lệnh gọi API sang chạy song song bằng Promise.all([fetch1, fetch2]), so sánh tổng thời gian chạy với cách tuần tự ở bài 6.
async function layDuLieuBai7(id) {
  //tuần tự
  console.log(`[Bai7] đang lấy id=${id}`);
  console.time("Bai7");
  try {
    if (!id || id < 0) throw new Error(`ID ${id} không hợp lệ`);
    const response1 = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    const response2 = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    if (!response1.ok || !response2.ok) throw new Error("Lỗi response");
    const user = await response1.json();
    const post = await response2.json();
    console.log(user, post);
  } catch (loi) {
    console.log("[Bai7] LỖI:", loi.message);
  } finally {
    console.timeEnd("Bai7");
  }
}
async function chaybai7() {
  await layDuLieuBai7(1);
}
// 8.Tự viết code chứng minh: Promise.resolve().then() luôn chạy trước setTimeout(fn, 0), dù setTimeout được viết TRƯỚC trong code.
async function chaybai8() {
  setTimeout(() => {
    console.log("Đây là timeout");
  }, 0);
  Promise.resolve().then(() => {
    console.log("Đây là promise được viết sau");
  });
}
//chạy luôn ra promise trước rồi mới đến timeout
async function RUN_BAI5_BAI8() {
  //   await chaybai5();
  await chaybai7();
  await chaybai6();
  //   await chaybai8();
}
// RUN_BAI5_BAI8();

// Nhóm Lỗi async & Debug (bài 9-12)
// 9.Viết hàm chiaSo(a, b) (không async) — nếu b === 0, throw new Error(...). Gọi hàm này không bọc try/catch, quan sát chương trình dừng hẳn. Sau đó bọc try/catch, quan sát chương trình chạy tiếp.
function chiaSo(a, b) {
  if (b === 0) {
    throw new Error("Mẫu số không thể bằng 0");
  }
  return a / b;
}
function chiaso_2(a, b) {
  try {
    if (b === 0) {
      throw new Error("Mẫu số không thể bằng 0");
    }
    return a / b;
  } catch (loi) {
    console.log("[bài 9]CATCH Đang bắt lỗi:", loi);
  }
}
async function chaybai9() {
  console.log(chiaso_2(3, 0)); // nếu throw error không bọc catch toàn bộ dòng code ở dưới sẽ dừng chạy nhưng bọc catch vào thì catch sẽ nén lỗi đó vào log được , các dòng khac vẫn chạy dù có lỗi
  console.log(chiaSo(3, 0));
}
// 10.Viết hàm async function kiemTraTuoi(tuoi) — nếu tuoi < 0 hoặc tuoi > 150,
// throw lỗi; nếu hợp lệ, return "Tuổi hợp lệ". Viết thêm catch bắt lỗi và throw lại.
//  Gọi hàm này ở tầng ngoài với try/catch riêng, xác nhận lỗi vẫn tới được tầng ngoài
//  dù tầng trong đã có catch.
async function kiemTraTuoi(tuoi) {
  try {
    if (tuoi < 0 || tuoi > 150) {
      throw new Error("LỖI");
    }
    return "Tuổi hợp lệ";
  } catch (error) {
    console.log("[Bài 10] catch đang ném lỗi:", error.message);
    throw error;
  }
}
// nếu hàm kiểm tra tuổi là 1 promise thì không truyền tham số cho reject , resovle thì sẽ báo promise {underfined}
async function chaybai10() {
  try {
    const ketqua = await (kiemTraTuoi(160));
    console.log(ketqua);
  } catch (loi) {
    console.log("[Bài 10] catch ngoài đang bắt lỗi:", loi.message);
  }
}
// 11.Viết 2 hàm async độc lập, mỗi hàm có console.log tiền tố khác nhau ([Task1], [Task2]), gọi cả 2 KHÔNG await giữa chúng, quan sát log bị xen kẽ. Sửa lại dùng Promise.allSettled để gom kết quả về log 1 lần, có tổ chức.
async function TASK1() {
  const kiemtra = false;
  if (!kiemtra) throw new Error("[Task1] Chưa hoàn thành");
  console.log("[Task1]:Hoàn thành");
}
async function TASK2() {
  const kiemtra = true;
  if (!kiemtra) throw new Error("[Task2] Chưa hoàn thành");
  console.log("[Task2]:Hoàn thành");
}
// Lúc này cả task 1 và 2 khi chạy sẽ ném lỗi
async function chaybai11() {
  // TASK1(); // nếu viết như này thì lỗi ở task1 sẽ bay ra ngoài và dừng task2 ngay lập tức
  // TASK2();
  //Sửa
  const ketqua = await Promise.allSettled([TASK1(),TASK2()]);
  ketqua.forEach((x,index) =>{
    if(x.status ==="fulfilled"){
      console.log(`TASK[${index+1}] chạy thành công` , x.value);
    }
    else{
      console.log(`TASK[${index+1}] chạy thất bại` , x.reason.message); // x.reason mới là lỗi còn x chỉ là 1 obj có status , reason (phần reason chính là phần lỗi)
    }
  })
}
//Chưa rõ yêu cầu bài 11 lắm
// 12.Viết hàm layNguoiDung(id) gọi API jsonplaceholder, cố tình gọi với 1 id không tồn tại. Trong catch, in ra cả loi.message và loi.stack, so sánh độ chi tiết giữa 2 cách in.
async function layNguoiDung(id) {
  console.log(`[layNguoiDung] với id =${id}`);
  try {
    if (!id || id < 0) {
      throw new Error(`[layNguoiDung],Lỗi ID ${id} không hợp lệ`);
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    if (!response.ok) {
      throw new Error(
        `[layNguoiDung], ID ${id} lỗi response.ok :Không có ID này tồn tại`,
      );
    }
    const data = await response.json();
    console.log(data);
  } catch (loi) {
    console.log(
      `[Bai12] ID ${id}catch báo lỗi:[message]${loi.message} , [Stack] :${loi.stack}`,
    );
  }
}
async function chaybai12() {
  // layNguoiDung(1);
  layNguoiDung(-1); //messege chỉ ném 1 dòng lỗi đã throw ở ngay tại đó , còn stack thì viết ra cả stack trace
}
async function RUN_BAI9_BAI12() {
  // chaybai9();
  chaybai10();
  chaybai11();
  chaybai12();
}
RUN_BAI9_BAI12();
