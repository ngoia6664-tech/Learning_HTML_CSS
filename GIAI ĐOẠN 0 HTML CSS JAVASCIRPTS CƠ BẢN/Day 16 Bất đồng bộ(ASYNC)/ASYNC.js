// // //  function laydulieunguoidung(callback){
// // //     console.log("Đang lấy dữ lieu người dùng");
// // //     setTimeout(() => {
// // //         const user ={Name:"An" , Age:20};
// // //         callback(user);
// // //     }, 2000);
// // //     console.log("dòng này chạy trước setTimeout");
// // //  }
// // //  laydulieunguoidung((ketqua)=>{console.log("Dữ liệu người dùng là:",ketqua);})
// //  function Laydulieu(){
// //     return new Promise((resolve,reject)=>{
// //         console.log("Đang lấy dữ liệu từ người dùng");
// //         setTimeout(() => {
// //         const thanhcong=true;
// //         if(thanhcong){
// //             const data ={Name:"Duy Anh" , age:20};
// //             resolve(data);
// //         }            
// //         else{
// //             reject("lỗi mạng");
// //         }
// //         }, 2000);
// //     })
// //  }
// //  Laydulieu()
// //  .then((data)=>{
// //     console.log("thành công ",data);
// //  })
// //  .catch((loi)=>{
// //     console.log("Lỗi ở đâu đó",loi);
// //  })
//  const Monqua = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//      resolve("Cái bánh"
//      );   
//     },2000);
//  })
// //  Monqua.then((ketqua)=>{
// //     console.log("Đang chờ quà",ketqua);
// //     return ketqua; =====Bản thân then luôn trả về promise mới === lúc này ketqua chính là 1 promise
// //  })
// //  .then((ketqua2) =>{
// //     console.log("Chờ quà lần 2",ketqua2);
// //  })
//  async function chay() {
//    const data = await Monqua;
//    console.log(data);
//  }
//  chay();
    function LayDuLieuUser(){
    return  new Promise((resovle, reject) =>{
         console.log("Đang lấy dữ liệu user");
         setTimeout(() => {
            const Kiemtra=true;
            if(Kiemtra){
            const data={Name:"Duy Anh" , age:20};
            resovle(data);}
            else{
               reject("Lỗi dữ liệu");
            }
         }, 2000);
      })
    }
    function LayDulieuBanbe(){
    return  new Promise((resovle, reject)=>{
         console.log("Đang lấy dữ liệu từ bạn bề");
         setTimeout(() => {
            const kiemtra=Math.random();
            if(kiemtra>0.5){
               const data={NameFriend:"An" , Age:20 , job:"student"}
               resovle(data);
            }
            else{
               reject("Không thể lấy dữ liệu từ bạn bè");
            }
         }, 2000);
      })
    }
    async function chay() {
      try{
      const user = await LayDuLieuUser();
      console.log(user);
      const friend = await LayDulieuBanbe();
      console.log(friend);}
      catch(loi){
         console.log(loi);
      }
    }
    function demnguoc(){
      return new Promise((resovle,reject) =>{
         setTimeout(() => {
            resovle("Hết giờ")
         }, 2000);
      })
    }
    async function chaydemnguoc() {
      const ketqua = await demnguoc();
      console.log("bạn đã",ketqua);}
   async function chaytaca() {
      await chay();
      console.log("Đang chạy hàm đếm ngược");
      await demnguoc()
   }
   chaytaca()
   //("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true");