
async function XemThoiTiet() {
    const inputCityToaDo = document.querySelector("#input-city-toa-do");
    const giatri =inputCityToaDo.value.trim();
    const pDuLieu= document.querySelector(".p-du-lieu");
    if(giatri ===""){
        pDuLieu.textContent="mày chưa nhập thành phố";
        return;
    }
    const [lat,lon] =giatri.split(",");
    pDuLieu.textContent="Đang tải";
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        if(!response.ok){
            pDuLieu.textContent="Lỗi không thể lấy dữ liệu";
            throw new Error("lỗi không thể lấy dữ liệu" +response.status);
        }
        else{
            const data = await response.json();
            pDuLieu.textContent =`Nhiệt độ :${data.current_weather.temperature}`
            console.table(data)
        }   
    }
    catch(loi){
        pDuLieu.textContent="Lỗi đường truyền "+loi;
    }
}
const formThoiTiet= document.querySelector("#form-thoi-tiet")
formThoiTiet.addEventListener("submit" , (e)=>{
    e.preventDefault();
    XemThoiTiet();
});