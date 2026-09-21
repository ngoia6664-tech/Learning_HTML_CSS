function Nhapgia(Gia){
    if(Gia.typeof===Number){
        return Gia;
    }
    else{
        return "Gia phải là số"
    }
}
console.log(Nhapgia(2314));
