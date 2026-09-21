function Nhapgia(Gia){
    if(typeof Gia==="number"){
        return Gia;
    }
    else{
        return "Gia phải là số";
    }
}
console.log(Nhapgia(2314));

