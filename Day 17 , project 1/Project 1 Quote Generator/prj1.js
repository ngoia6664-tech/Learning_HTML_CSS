const formQuote = document.querySelector("#form-quote");
const pContentQuote = document.querySelector(".p-content-quote");
const spanQuote = document.querySelector(".span-quote");

async function CreateQuoteNew() {
  pContentQuote.textContent = "Đang Tải...";
  spanQuote.textContent = "";
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) {
      console.log("Lỗi không thể lấy dữ liệu" + response.status);
      throw new Error("lỗi không thể lấy dữ liệu" + response.status);
    } else {
      const data = await response.json();
      console.table(data);
      pContentQuote.textContent = `${data.quote}`;
      spanQuote.textContent = `author:${data.author}`;
    }
  } catch (loi) {
    pContentQuote.textContent = "Không thể tải câu nói, thử lại sau.";
    spanQuote.textContent = "";

    console.log("Lỗi về vấn đề đường truyền , Mã lỗi:" + loi);
  }
}
formQuote.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Mày đã ở đây chưa");
  CreateQuoteNew();
});
