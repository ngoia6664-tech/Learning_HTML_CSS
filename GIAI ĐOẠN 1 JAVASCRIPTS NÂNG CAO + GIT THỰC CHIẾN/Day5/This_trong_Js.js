"use strict";
// this trong JavaScript — bản chất trước, không học vẹt quy tắc

// this là thứ gây nhầm lẫn nhiều nhất khi mới học JS, vì nó không
//  giống bất kỳ ngôn ngữ nào bạn quen (kể cả nếu bạn từng nghĩ nó 
// giống biến self hay con trỏ đối tượng) — giá trị của this không
// cố định theo nơi hàm được viết ra (khác hẳn closure — nhớ lại:
//  closure phụ thuộc vị trí viết code). this phụ thuộc vào cách hàm
//  được gọi, tại đúng thời điểm gọi.
// const user ={
//     ten:"An",
//     chao(){
//         console.log("Bào bạn tôi tên là:"+this.ten);
//     }
// }
// user.chao();
// function kiemtra(){
//     console.log(this);
// }
// kiemtra(); //this trong model và strict mode mặc định là underfine
// const a ={
//     ten:"An",
//     test(){
//         function GanTrong(){
//             console.log(this);
//         }
//         a.GanTrong = GanTrong;
//         a.GanTrong();
//          console.log("Tao là a");
//     }
// }
// a.test();
// Bài 1
try {
  const xe = {
    loai: "Ô tô",
    hienThi: function() {
      console.log(this.loai);
    }
  };
  const ham = xe.hienThi;
  ham();
} catch (e) {
  console.log("Bài 1 lỗi:", e.message);
}

// Bài 2
try {
  const xe = {
    loai: "Ô tô",
    hienThi: function() {
      console.log(this.loai);
    }
  };
  const xe2 = { loai: "Xe máy", hienThi: xe.hienThi };
  xe2.hienThi();
} catch (e) {
  console.log("Bài 2 lỗi:", e.message);
}

// Bài 3 (đổi setInterval -> setTimeout để chỉ chạy 1 lần, không lặp vô hạn)
try {
  const dongHo = {
    gio: 10,
    batDau: function() {
      setTimeout(function() {
        console.log("Bài 3:", this.gio);
      }, 500);
    }
  };
  dongHo.batDau();
} catch (e) {
  console.log("Bài 3 lỗi:", e.message);
}

// Bài 4 (đổi setInterval -> setTimeout để chỉ chạy 1 lần)
try {
  const dongHo2 = {
    gio: 10,
    batDau: function() {
      setTimeout(() => {
        console.log("Bài 4:", this.gio);
      }, 700);
    }
  };
  dongHo2.batDau();
} catch (e) {
  console.log("Bài 4 lỗi:", e.message);
}

// Bài 5
try {
  const obj = {
    ten: "Obj chính",
    con: {
      ten: "Obj con",
      hienThi: function() {
        console.log(this.ten);
      }
    }
  };
  obj.con.hienThi();
} catch (e) {
  console.log("Bài 5 lỗi:", e.message);
}

// Bài 6
try {
  const nguoiDung = {
    ten: "Cường",
    chaoHoi: function() {
      return function() {
        console.log(this.ten);
      };
    }
  };
  const hamChao = nguoiDung.chaoHoi();
  hamChao();
} catch (e) {
  console.log("Bài 6 lỗi:", e.message);
}

// Bài 7
try {
  const nguoiDung2 = {
    ten: "Dũng",
    chaoHoi: function() {
      return () => {
        console.log(this.ten);
      };
    }
  };
  const hamChao2 = nguoiDung2.chaoHoi();
  hamChao2();
} catch (e) {
  console.log("Bài 7 lỗi:", e.message);
}

// Bài 8
try {
  const bo = {
    ten: "Bố",
    con: {
      ten: "Con",
      goi: function() {
        console.log(this.ten);
        [1, 2].forEach(function(item) {
          console.log(this.ten, item);
        });
      }
    }
  };
  bo.con.goi();
} catch (e) {
  console.log("Bài 8 lỗi:", e.message);
}
// Bài	Kết quả thật	Dự đoán ban đầu	Khớp?
// 1	Lỗi (undefined.loai)	undefined	Gần đúng — thực ra còn nặng hơn dự đoán (lỗi, không chỉ log ra chữ undefined)
// 2	"Xe máy"	"Xe máy"	✅
// 3	undefined (không lỗi, do this = {} trong Node)	Có đề cập, đúng hướng	✅ (giờ đã rõ tại sao)
// 4	10	10	✅
// 5	"Obj con"	"Obj con"	✅
// 6	Lỗi (undefined.ten)	Đúng hướng, đã sửa đúng sau	✅
// 7	"Dũng"	"Dũng"	✅
// 8	"Con" rồi lỗi ở dòng forEach	Đúng hướng, đã sửa đúng sau	✅