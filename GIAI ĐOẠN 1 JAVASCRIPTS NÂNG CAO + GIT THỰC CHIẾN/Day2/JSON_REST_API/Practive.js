async function LayDuLieu() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("LỖi , Mã lỗi:" + response.status);
    } else {
      console.log(data);
      console.log(data.title);
    }
  } catch (loi) {
    console.log("Lỗi đường truyền", +loi);
  }
}
LayDuLieu()
