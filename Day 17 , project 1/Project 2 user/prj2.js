//The best way to make your dreams come true is to wake up.
const FromUser = document.querySelector("#form-user");
const theDiv = document.querySelector(".content-user");
const p = document.querySelector(".p-user");
async function LayThongTinUser() {
  p.textContent = "Đang lấy dữ liệu user";
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      p.textContent = "Không thể lấy được dữ liệu lỗi API" + response.status;
      throw new Error("Không thể lấy dữ liệu lỗi API" + response.status);
    } else {
      const data = await response.json();
      console.table(data);
      console.log("Mày đã ở try >else");
      Render(data.results[0]);
    }
  } catch (loi) {
    p.textContent = "Lỗi đường truyền , mã lỗi:" + loi;
    console.log("mày đang ở catch");
  }
}
function Render(user) {
  console.log("Mày đã ở Render");
  const Email = user.email;
  const Country = user.location.country;
  const firstName = user.name.first;
  const lastName = user.name.last;
  const tel = user.phone;
  theDiv.innerHTML = `<span>Thông tin user</span>
  <div class="img">
  <span>Ảnh đại diện</span>
  <a href ="${user.picture.medium}" target="_blank"><img src="${user.picture.large}"></a>
  </div>
  <span>Họ tên:${firstName} ${lastName}</span>
  <span>Email:${Email}</span>
  <span>Quốc gia:${Country}</span>
  <span>Số điện thoại:${tel}</span>
  `;
}
FromUser.addEventListener("submit", (e) => {
  e.preventDefault();
  LayThongTinUser();
});
