const dieukien = {
  kiemtra: true,
  thaydoi: function () {
    this.kiemtra = !this.kiemtra;
  },
};
const test = dieukien.thaydoi.bind(dieukien);
function layDuLieu() {
  return new Promise((resolve, reject) => {
    console.log("Đang lấy dữ liệu...");
    setTimeout(() => {
      if (dieukien.kiemtra) {
        const data = { Tên: "Ngô Duy Anh", Tuổi: 20 };
        resolve(data);
        test();
      } else {
        reject("Bạn đã kiểm tra data rồi");
      }
    }, 2000);
  });
}
// console.log("Đang lấy dữ liệu ...");
// layDuLieu()
//   .then((data) => console.log(data))
//   .catch((data) => {
//     console.log(data);
//   }); // KHÔNG await, KHÔNG .then/.catch
// Cách đúng
async function chay() {
  try {
    const data = await layDuLieu();
    console.log(data);
  } catch (loi) {
    console.log(loi);
  }
}
async function ChayCaHai() {
  await chay();
  await chay();
}
ChayCaHai();
// const data = await response.json() giả sử báo lối ở đây
// log(data) // giả sử nó không liên quan gì đến await nó là code đồng bộ
// ====LÝ THUYẾT VỀ XỬ LÝ LỖI ĐỒNG BỘ VÀ BẤT ĐỒNG BỘ====
// LỖI ASYNC & CÁCH DEBUG

// 1. VẤN ĐỀ CỐT LÕI
// Code bất đồng bộ (Promise, async/await) dễ bị "nuốt" lỗi âm thầm hơn code
// đồng bộ — lỗi xảy ra mà không hiện rõ trên console, hoặc stack trace không
// đầy đủ để lần dấu vết.

// 2. CA 1 — Promise không await, không .then()/.catch()
// js
// function layDuLieu() {
//   return new Promise((resolve, reject) => {
//     reject("Có lỗi!");
//   });
// }
// layDuLieu(); // không ai "bắt" lỗi này
// console.log("Code vẫn chạy tiếp...");
// // → UnhandledPromiseRejection, lỗi bị nuốt, không có gì báo rõ ràng
// 3. CA 2 — await trong async function mà KHÔNG có try/catch
// js
// async function chay() {
//   const data = await layDuLieu(); // reject ở đây, không try/catch
//   console.log(data);
// }
// chay(); // Promise của chay() tự reject, nhưng không ai catch → lỗi bị nuốt tiếp

// // SỬA — luôn bọc try/catch quanh await:
// async function chayDung() {
//   try {
//     const data = await layDuLieu();
//     console.log(data);
//   } catch (loi) {
//     console.log("Bắt được lỗi:", loi);
//   }
// }
// 4. await CHỈ dùng được bên trong async function
// js
// console.log("A");
// await layDuLieu(); // SyntaxError: await is only valid in async functions
//                      // (trừ top-level await trong ES Module — hiếm dùng ở đây)

// // SỬA — bọc trong 1 async function rồi gọi nó:
// async function chay() {
//   console.log("A");
//   await layDuLieu();
// }
// chay();
// 5. TRONG CÙNG 1 HÀM — thứ tự dòng lệnh luôn cố định, không bị chen ngang
// js
// const data = await response.json(); // (1) nếu lỗi ở đây
// console.log(data);                   // (2) dòng này KHÔNG BAO GIỜ chạy nếu (1) lỗi
//                                        // await chỉ tạm dừng NHƯỜNG LƯỢT cho hàm KHÁC,
//                                        // không làm đảo lộn thứ tự các dòng TRONG CHÍNH hàm này
// 6. STACK TRACE CỦA ASYNC BỊ "ĐỨT GÃY" — kém tin cậy hơn code đồng bộ
// js
// async function layDuLieu() { throw new Error("Lỗi trong layDuLieu"); }
// async function xuLy() { await layDuLieu(); }
// xuLy();
// // Error: Lỗi trong layDuLieu
// //     at layDuLieu (file.js:2:9)
// //     at async xuLy (file.js:5:3)   ← chữ "async" là Node TỰ GẮN NHÃN cho hàm async,
// //                                      báo hiệu chuỗi này có thể THIẾU vài bước bất đồng bộ ở giữa
// 7. STACK TRACE CHỈ CHỈ ĐÚNG VỊ TRÍ throw, KHÔNG CHỈ RA NGUYÊN NHÂN GỐC
// js
// async function chia(a, b) {
//   if (b === 0) throw new Error("Không thể chia cho 0"); // stack trace chỉ tới ĐÂY
// }
// async function tinhToan(x, y) {
//   const ketQua = await chia(x, y); // NHƯNG nguyên nhân gốc là TRUYỀN y=0 từ ĐÂY
// }
// tinhToan(10, 0);
// // → phải TỰ LOG ngữ cảnh (x, y) ở tinhToan để lần ra nguồn gốc, stack trace không tự nói
// 8. KỸ THUẬT DEBUG THỰC TẾ — log có tiền tố + ngữ cảnh rõ ràng
// js
// async function layDuLieu(id) {
//   console.log(`[layDuLieu] Bắt đầu, id=${id}`);
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     console.log(`[layDuLieu] fetch xong, status=${response.status}`);
//     if (!response.ok) throw new Error(`Lỗi status ${response.status}`);
//     const data = await response.json();
//     return data;
//   } catch (loi) {
//     console.log(`[layDuLieu] LỖI id=${id}:`, loi.message);
//     throw loi; // ném lại để nơi gọi cũng biết
//   }
// }
// 9. error.message vs error.stack
// js
// catch (loi) {
//   console.log(loi);          // in cả object Error (dài, kèm stack)
//   console.log(loi.message);  // chỉ câu mô tả ngắn gọn — debug nhanh
//   console.log(loi.stack);    // stack trace rõ ràng, tách riêng
// }
// 10. NHIỀU TÁC VỤ ASYNC CHẠY SONG SONG — log bị XEN LẪN theo thời gian
//     (mỗi lỗi vẫn độc lập, KHÔNG hề trộn nội dung — chỉ thứ tự hiển thị bị rối)

// CÁCH GIẢI QUYẾT:
// js
// // Cách 1 — gắn định danh riêng cho mỗi lần gọi
// async function layDuLieu(id, taskId) {
//   console.log(`[Task ${taskId}] Bắt đầu, id=${id}`);
//   // ...
// }

// // Cách 2 — Promise.allSettled: chờ hết tất cả rồi log 1 lần, có tổ chức
// const ketQua = await Promise.allSettled([layDuLieu(1), layDuLieu(2)]);
// ketQua.forEach((r, i) => {
//   console.log(r.status === "fulfilled" ? `Task ${i} OK` : `Task ${i} lỗi: ${r.reason}`);
// });

// // Cách 3 — nếu không cần tốc độ, chạy TUẦN TỰ để tránh hoàn toàn việc log rối
// async function chayTuanTu() {
//   await layDuLieu(1);
//   await layDuLieu(2);
// }
// 11. CHECKLIST TỰ KIỂM TRA
// - [ ] Mọi Promise không dùng await đều có .catch()
// - [ ] Mọi await đều nằm trong try/catch (trừ khi cố ý để lỗi bay lên cấp cao hơn)
// - [ ] await chỉ dùng bên trong async function
// - [ ] Khi debug, tự log ngữ cảnh (tham số đầu vào) ở nơi GỌI hàm, không chỉ ở nơi throw
// - [ ] Nhiều task async chạy song song → gắn định danh vào log để không rối
// - [ ] 2 lệnh gọi async liên tiếp có phụ thuộc thứ tự/trạng thái → PHẢI await, không gọi rời rạc
// PRACTICE
// Bài tập: viết async function layNguoiDung(id):
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
    console.log(`[layNguoiDung] ID ${id}catch báo lỗi:${loi}`);
  }
}
async function chay() {
  await layNguoiDung(1);
  await layNguoiDung(-1);
  await layNguoiDung(9999);
}
chay();
// Gọi GET https://jsonplaceholder.typicode.com/users/${id}
// Nếu id không hợp lệ (chuỗi rỗng hoặc số âm), tự throw new Error(...) trước khi gọi fetch.
// Thêm console.log tiền tố [layNguoiDung] ở: lúc bắt đầu (kèm id),
//  sau khi fetch xong (kèm status), và trong catch (kèm lý do lỗi).
// Gọi thử 3 lần: layNguoiDung(1) (hợp lệ), layNguoiDung(-5) (bị chặn trước khi fetch),
//  layNguoiDung(9999) (hợp lệ về số nhưng không tồn tại, để fetch tự báo lỗi 404).
//  So sánh log giữa 3 trường hợp.
// ===== NOTE BỔ SUNG DAY6======
// THROW vs CONSOLE.LOG — khi nào dùng cái nào

// - console.log: chỉ THÔNG BÁO/ghi lại trạng thái, KHÔNG làm gián đoạn chương
//   trình — code vẫn chạy tiếp bình thường ngay sau đó.
// - throw: DỪNG NGAY hàm hiện tại, "ném" lỗi cho try/catch gần nhất bắt.
//   Nếu không có try/catch nào bắt (ở bất kỳ tầng nào) → crash cả chương trình.

// QUY TẮC: log tiến trình bình thường → console.log.
//          phát hiện lỗi thật sự, cần dừng & bắt buộc xử lý → throw.

// CATCH = nơi xử lý lỗi TẬP TRUNG
// Gom nhiều điểm có thể lỗi (id sai, response.ok=false...) về ĐÚNG 1 chỗ xử lý
// bằng throw + try/catch, thay vì mỗi nhánh tự console.log + return riêng lẻ.
// js
// try {
//   if (!id || id < 0) throw new Error(`ID ${id} không hợp lệ`);
//   const response = await fetch(url);
//   if (!response.ok) throw new Error(`Status ${response.status}`);
// } catch (loi) {
//   console.log("LỖI:", loi.message); // XỬ LÝ TẬP TRUNG tại đây, dù lỗi từ nhánh nào
// }
// QUY TẮC TRẠNG THÁI PROMISE CỦA HÀM ASYNC — quan trọng nhất buổi học

// Hàm async LUÔN fulfilled khi chạy xong, TRỪ 2 trường hợp duy nhất khiến nó
// rejected:
//   1. Lỗi throw ra mà KHÔNG có try/catch nào bắt (bay thẳng ra khỏi hàm)
//   2. catch CÓ bắt lỗi, nhưng chủ động throw LẠI lỗi đó (ném tiếp ra ngoài)

// → catch bắt lỗi và xử lý xong, KHÔNG throw lại → Promise vẫn FULFILLED,
//   dù bên trong "có lỗi xảy ra" — vì lỗi đã được xử lý gọn trong chính hàm đó.
// js
// async function ham() {
//   try {
//     throw new Error("Lỗi");
//   } catch (loi) {
//     console.log("Đã thấy:", loi.message);
//     throw loi; // NÉM LẠI — chỉ khi có dòng này, Promise của ham() mới rejected
//   }
// }