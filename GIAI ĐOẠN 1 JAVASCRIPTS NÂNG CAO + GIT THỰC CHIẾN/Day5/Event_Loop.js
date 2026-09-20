const boDem ={
    giatri:0,
    tang(){
        this.giatri++;
        console.log(this.giatri);
    },
    taoHamTang(){
        return ()=>{
            this.giatri++;
            console.log(this.giatri);
        }
    }
}
const giatrinew= boDem.taoHamTang();// giatrinew chính là hàm trả về của taohamtang 
// (this đã lấy obj đã gọi nó chính là bodem.taohamtang lúc này bodem đã gọi hàm taohamtang()
//  this sẽ chỏ đến bodem , lúc gọi giatri new thì sẽ tăng giatri them 1 đơn vị , dù có gọi
//  giatrinew() không obj phía trước nhưng this đã bị khóa cứng bởi bodem ở dòng khai báo
//  trước đó)
boDem.tang();
giatrinew();
giatrinew()
boDem.tang()
//Bài 2
console.log("Bắt đầu");
setTimeout(() => {
    console.log("MacroTask chạy");
}, 0);
console.log("Giữa");
Promise.resolve().then(()=>console.log("MicroTask chạy")).then(()=>console.log("Kết thúc"));