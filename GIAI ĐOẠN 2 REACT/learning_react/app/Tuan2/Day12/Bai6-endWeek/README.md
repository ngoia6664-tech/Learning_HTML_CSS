# Thư viện ảnh NASA
Ứng dụng web cho phép xem ảnh thiên hà từ NASA, Thả tim và lưu ảnh để xem lại sau
!Link ảnh màn hình: (./image.png)
## Tính năng
Lấy danh sách từ Nasa image API
Hiển thị trạng thái đang tải và báo lỗi 
Thích và bỏ thích ảnh
Lưu và bỏ lưu ảnh , ảnh đã lưu có thể xem sau , ảnh đã lưu khi load trang lại không bị mất vì dữ liệu lưu vào localStorage
## Công nghệ
Next.js, React,TypeScript,Css thuần
## chạy trên máy
```bash
git clone ...
cd ...
npm install
npm run dev
```
Mở http://localhost:3000 rồi vào đường dẫn của bài.
## Điểm kỹ thuật đáng chú ý

- Tách dữ liệu từ API (`NasaItem`) và dữ liệu của app (`Photo`) bằng hàm `toPhoto`
- Lưu trạng thái thích và lưu riêng khỏi danh sách ảnh để tải lại không bị mất
- Chặn lỗi "race condition" khi fetch bằng biến `biHuy` trong useEffect
- ...