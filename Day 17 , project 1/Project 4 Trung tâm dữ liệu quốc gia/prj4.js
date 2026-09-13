// Khai báo
const infomation = document.querySelector(".info");
const form = document.querySelector(".form-hien-thi");
const input = document.querySelector(".input");
async function LayDuLieuQuocGia() {
  infomation.innerHTML="";
  const giatri = input.value.trim().toLowerCase();
  console.log(giatri);
  const p = document.createElement("p");
    p.textContent = "Đang lấy dữ liệu";
    infomation.appendChild(p);
    if (!giatri) {
      p.textContent = "bạn chưa nhập tên quốc gia";
      return;
    }
  try {
    const response = await fetch(`https://countries.dev/alpha/${giatri}`);
    if (!response.ok) {
      throw new Error("Lỗi!mã lỗi:" + response.status);
    } else {
      const data = await response.json();
      console.table(data);
      infomation.innerHTML = `
            <a href=""><img src="${data.flags.png}"></img></a>
                <span>Dân số:${data.population} người </span>
                <span>Diện tích:${data.area}(km2)</span>`;
    }
  } catch (loi) {
    p.textContent =
      "Lỗi không thể lấy dữ liệu từ tên quốc gia bạn nhập";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  LayDuLieuQuocGia();
});
