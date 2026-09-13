// Khai báo dữ liệu gốc — mỗi sản phẩm có ID cố định, KHÔNG đổi theo vị trí hiển thị
let product = [
  {
    id: 1,
    Name: "Áo trắng",
    sales: 500,
    quantity: 1,
    image: "https://cf.shopee.vn/file/18e32978f46350820581cee0087eff52",
    price: 130,
  },
  {
    id: 2,
    Name: "Áo khoác trắng",
    sales: 3636,
    quantity: 1,
    image:
      "https://th.bing.com/th/id/OIP.lYmN_af1DDIyRgQz8ggfqgHaJQ?w=155&h=194&c=7&r=0&o=7&dpr=1.6&pid=1.7&rm=3",
    price: 250,
  },
  {
    id: 3,
    Name: "Quần đùi trắng",
    sales: 2000,
    quantity: 1,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.Q51oqJVtNbQC2dDoLycALgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 80,
  },
  {
    id: 4,
    Name: "Áo khoác đen ",
    sales: 4839,
    quantity: 1,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.eYWpOsTGRMweub4DHuE9WgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 130,
  },
  {
    id: 5,
    Name: "Áo phông đen",
    sales: 3800,
    quantity: 1,
    image:
      "https://product.hstatic.net/200000054310/product/afgjhj_9d3b164f3acc47b298f9b2b59c4c88c8.jpg",
    price: 250,
  },
];

// Giỏ hàng — đọc lại từ localStorage nếu đã từng lưu, không thì mảng rỗng
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

const MainContent = document.querySelector(".main-content");
const Search = document.querySelector(".head-content");
const btnQuayLai = document.querySelector(".btn-quay-lai");
const pageShoppingCart = document.querySelector(".page-shopping-cart");
const backdrop = document.querySelector(".backdrop");
const btnShoppingCart = document.querySelectorAll(".btn-shopping-cart");
const betweenPageShoppingCart = document.querySelector(".between-page-shopping-cart");
const lastPageShoppingCart = document.querySelector(".last-page-shopping-cart");

// ===== RENDER SẢN PHẨM (danh sách bán) =====
function renderProduct(danhSach) {
  MainContent.innerHTML = "";
  danhSach.forEach((x) => {
    const the_div = document.createElement("div");
    the_div.classList.add("product");
    the_div.dataset.id = x.id; // gắn ID vào thẻ, để tìm lại đúng sản phẩm khi có sự kiện
    the_div.innerHTML = `
      <div class="image"><img src="${x.image}" alt="Đây là ảnh ${x.Name}"></div>
      <div class="info">
        <h3>${x.Name}</h3>
        <p>Đã bán:${x.sales}</p>
        <span> Giá bán: ${x.price} </span>
        <p class="totalprice"> Tổng tiền :${x.price * x.quantity}</p>
      </div>
      <div class="buy">
        <div class="quantity-box">
          Số lượng <button class="menus-sign">-</button> <span class="quantity-value">${x.quantity}</span>
          <button class="plus-sign">+</button>
        </div>
        <div class="add-shopping-cart">
          <i class="fa-solid fas fa-shopping-cart"></i>
          <button class="add-cart-btn">Thêm vào giỏ hàng</button>
        </div>
        <div class="payment">
          <i class="fa-solid fab fa-amazon-pay"></i>
          <button class="payment-btn">Mua hàng</button>
        </div>
      </div>`;
    MainContent.appendChild(the_div);
  });
}
renderProduct(product);

// Sự kiện trên danh sách sản phẩm — luôn dựa vào ID, không dựa vào vị trí hiển thị
MainContent.addEventListener("click", (e) => {
  const the_div = e.target.closest(".product");
  if (!the_div) return;
  const id = Number(the_div.dataset.id);

  if (e.target.classList.contains("menus-sign")) {
    product = product.map((x) => {
      if (x.id === id && x.quantity > 0) x.quantity--;
      return x;
    });
    renderProduct(product);
  } else if (e.target.classList.contains("plus-sign")) {
    product = product.map((x) => {
      if (x.id === id) x.quantity++;
      return x;
    });
    renderProduct(product);
  } else if (e.target.classList.contains("payment-btn")) {
    product = product.map((x) => {
      if (x.id === id) x.quantity = 1;
      return x;
    });
    renderProduct(product);
    alert("Bạn đã thanh toán thành công");
  } else if (e.target.closest(".add-cart-btn")) {
    const sanPham = product.find((x) => x.id === id);
    if (sanPham) {
      shoppingCart.push({ ...sanPham, 
      productId: sanPham.id,  // GIỮ LẠI id sản phẩm gốc (để biết đây là mặt hàng nào)
      cartItemId: Date.now(), // id RIÊNG cho dòng này trong giỏ — luôn khác nhau mỗi lần thêm
      done: false });
      alert("Đã thêm vào giỏ hàng");
      luuVaRenderShoppingCart();
    }
  }
});

// ===== TÌM KIẾM =====
Search.addEventListener("click", (e) => {
  const btnFind = e.target.closest(".btn-find"); // closest() để bấm trúng icon bên trong cũng ăn
  if (!btnFind) return;
  const inputContent = document.querySelector(".find").value.trim();
  const product_find = product.filter((x) => x.Name.includes(inputContent));
  renderProduct(product_find);
});

// ===== MỞ / ĐÓNG GIỎ HÀNG (Cart Drawer) =====
function DongGiohang() {
  backdrop.classList.remove("active");
  pageShoppingCart.classList.remove("active");
  document.body.classList.remove("active");
}
function MoGiohang() {
  renderShoppingCart();
  document.body.classList.add("active");
  backdrop.classList.add("active");
  pageShoppingCart.classList.add("active");
}
btnShoppingCart.forEach((x) => {
  x.addEventListener("click", MoGiohang);
});
btnQuayLai.addEventListener("click", DongGiohang);
backdrop.addEventListener("click", DongGiohang);

// ===== GIỎ HÀNG =====
function luuVaRenderShoppingCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  renderShoppingCart();
}

function renderShoppingCart() {
  betweenPageShoppingCart.innerHTML = "";

  if (shoppingCart.length === 0) {
    betweenPageShoppingCart.textContent = "Giỏ hàng chưa có sản phẩm";
    lastPageShoppingCart.innerHTML = `
      <p class="info">Tổng tiền : <span>0</span></p>
      <button class="payment-btn">Thanh toán</button>`;
    return; // dừng luôn, không cần chạy phần dưới
  }

  shoppingCart.forEach((x) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.dataset.id = x.cartItemId; // gắn ID, giống hệt cách làm ở renderProduct
    productEl.innerHTML = `
      <div>
        <input type="checkbox" ${x.done ? "checked" : ""} class="checkbox">
      </div>
      <div class="image">
        <img src="${x.image}" alt="Đây là ảnh ${x.Name}">
      </div>
      <div class="info">
        <h3>${x.Name}</h3>
        <span>Giá:${x.price}</span>
        <div class="quantity-box">
          <span id="quantity">Số lượng</span>
          <button class="menus-sign">-</button>
          <span class="quantity-value">${x.quantity}</span>
          <button class="plus-sign">+</button>
        </div>
      </div>
      <button class="xoa">Xóa</button>`;
    betweenPageShoppingCart.appendChild(productEl);
  });

  // Tính tổng tiền 1 LẦN DUY NHẤT, sau khi forEach xong — không tính lặp lại trong vòng lặp
  const totalprice = shoppingCart
    .filter((x) => x.done === true)
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  lastPageShoppingCart.innerHTML = `
    <p class="info">Tổng tiền : <span>${totalprice}</span></p>
    <button class="payment-btn">Thanh toán</button>`;
}

// Sự kiện trong giỏ hàng — cũng dựa vào ID, không dựa vào vị trí
betweenPageShoppingCart.addEventListener("click", (e) => {
  const the_div = e.target.closest(".product");
  if (!the_div) return;
  const id = Number(the_div.dataset.id);

  if (e.target.classList.contains("menus-sign")) {
    shoppingCart = shoppingCart.map((x) => {
      if (x.cartItemId === id && x.quantity > 0) x.quantity--;
      return x;
    });
    luuVaRenderShoppingCart();
  } else if (e.target.classList.contains("plus-sign")) {
    shoppingCart = shoppingCart.map((x) => {
      if (x.cartItemId === id) x.quantity++;
      return x;
    });
    luuVaRenderShoppingCart();
  } else if (e.target.classList.contains("xoa")) {
    shoppingCart = shoppingCart.filter((x) => x.cartItemId !== id);
    luuVaRenderShoppingCart();
  } else if (e.target.classList.contains("checkbox")) {
    shoppingCart = shoppingCart.map((x) => {
      if (x.cartItemId === id) x.done = !x.done;
      return x;
    });
    luuVaRenderShoppingCart();
  }
});

// ===== THANH TOÁN Ở GIỎ HÀNG =====
lastPageShoppingCart.addEventListener("click", (e) => {
  if (!e.target.classList.contains("payment-btn")) return;

  if (shoppingCart.length === 0) {
    alert("Bạn chưa có sản phẩm trong giỏ hàng");
    return;
  }
  const coSanPhamDaChon = shoppingCart.some((x) => x.done === true);
  if (!coSanPhamDaChon) {
    alert("Bạn chưa chọn sản phẩm nào để thanh toán");
    return;
  }
  alert("Bạn đã thanh toán thành công");
  shoppingCart = shoppingCart.filter((x) => x.done !== true);
  luuVaRenderShoppingCart();
});