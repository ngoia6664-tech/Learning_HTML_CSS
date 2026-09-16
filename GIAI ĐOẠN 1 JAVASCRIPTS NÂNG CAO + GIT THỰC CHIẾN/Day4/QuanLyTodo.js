//Post
async function TaobaiViet(title, body) {
  console.log("Đang tạo bài viết...");
  try {
    const taobaiViet = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 11,
          title: title,
          body: body,
        }),
      },
    );
    if (!taobaiViet.ok) {
      throw new Error(`Lỗi: ${taobaiViet.status}`);
    }
    const BaiViet = await taobaiViet.json();
    console.log("Bài viết đã tạo", BaiViet);
  } catch (error) {
    console.log(error);
  }
}
//Lấy
async function LayBaiViet(PostId) {
  console.log("Đang lấy bài viết...");
  try {
    const layBaiViet = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${PostId}`,
    );
    if (!layBaiViet.ok) {
      throw new Error(`Lỗi :${layBaiViet.status}`);
    }
    const data = await layBaiViet.json();
    console.log("Bài viết đã lấy là:", data);
  } catch (error) {
    console.log(error);
  }
}
//Sửa
async function SuaBaiViet(postID, KeyCanSua) {
  console.log(`Đang sửa bài viết có ID là:${postID}...`);
  try {
    const suaBaiViet = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(KeyCanSua),
      },
    );
    if (!suaBaiViet.ok) {
      throw new Error(`Lỗi:${suaBaiViet.status}`);
    }
    const BaiViet = await suaBaiViet.json();
    console.log("Bài viết đã được sửa", BaiViet);
  } catch (error) {
    console.log(error);
  }
}
//Xóa
async function XoaBaiViet(PostId) {
  console.log(`Đang lấy bài viết có ID:${PostId}...`);
  try {
    const layBaiViet = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${PostId}`,
    );
    if (!layBaiViet.ok) {
      console.log("Không tìm thấy ID bài viết");
      return;
    }
    const xoaBaiViet = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${PostId}`,
      {
        method: "DELETE",
      },
    );
    console.log("Đã xóa bài viết thành công");
  } catch (error) {
    console.log(error);
  }
}
async function chayTatCa() {
  await TaobaiViet(
    "Đây là task cuối cùng của rest API ngày 4",
    "Quy trình tạo,lấy,sửa,xóa",
  );
  await LayBaiViet(1);
  await SuaBaiViet(1, { title: "bài viết đã sủa tiêu đề" });
  await XoaBaiViet(1);
  await XoaBaiViet(101);
}
chayTatCa();
