async function layThoiTiet() {
  const ketQuaDiv = document.querySelector("#ket-qua");
  ketQuaDiv.textContent = "Đang tải...";

  try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true");
    if (!response.ok) throw new Error("Yêu cầu thất bại mã lỗi:" + response.status);
    
    const data = await response.json();
    ketQuaDiv.textContent = `Nhiệt độ: ${data.current_weather.temperature}°C`;
    // đi đúng đường: data → current_weather → temperature
  } catch (loi) {
    ketQuaDiv.textContent = "Không thể tải dữ liệu, thử lại sau.";
    console.log("Có lỗi:", loi);
  }
}