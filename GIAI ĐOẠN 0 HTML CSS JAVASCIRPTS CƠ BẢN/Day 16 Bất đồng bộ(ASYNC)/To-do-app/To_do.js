const fromToDoApp = document.querySelector("#from-to-do-app");
const inputTasks = document.querySelector(".input-tasks");
const ulListTasks = document.querySelector(".ul-list-tasks");
const pAddTasks = document.querySelector(".p-add-tasks");
let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [].filter(Boolean);
function LuuVaRenderLai() {
  localStorage.setItem("Tasks", JSON.stringify(Tasks));
  render();
}
function render() {
    ulListTasks.innerHTML="";
  Tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" class="trang-thai" ${task.done ? "checked" : ""}>
        <span class ="${task.done ? "Hoan-thanh" : ""}">${task.TaskName}</span>
        <button class ="xoa" type="button">Xoa</button>`;
    li.dataset.id = task.id;
    ulListTasks.appendChild(li);
  });
}
function themTask() {
  const giatri = inputTasks.value.trim();
  const p = document.querySelector(".p-add-tasks");
  if (giatri === "") {
    p.textContent = "Bạn chưa nhập gì";
    return;
  }
  p.textContent = "";
  Tasks.push({
    id: Date.now(),
    TaskName: giatri,
    done: false,
  });
  inputTasks.textContent = "";
  LuuVaRenderLai();
}
fromToDoApp.addEventListener("submit", (e) => {
  e.preventDefault();
  themTask();
});
ulListTasks.addEventListener("click", (e) => {
  const li = e.target.closest("li")
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.classList.contains("xoa")) {
    Tasks = Tasks.filter((x) => x.id !== id);
    LuuVaRenderLai();
  } else if (e.target.classList.contains("trang-thai")) {
    Tasks = Tasks.map((x) => {  
      if (x.id === id) {
        x.done = !x.done;
      }
      return x;
    });
    console.log(Tasks);
    
    LuuVaRenderLai();
  }
});
render();
const btn = document.querySelector(".Reset")
btn.addEventListener("click" ,()=>{
    localStorage.removeItem("Tasks");
    LuuVaRenderLai();
})
