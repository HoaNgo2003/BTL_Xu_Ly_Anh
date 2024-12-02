const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("header");
const button = dropArea.querySelector("button");
const dragContent = document.querySelector(".drag-content");
const input = dropArea.querySelector("input");
const resetBtn = document.querySelector(".btn-predict.reset");
const predictBtn = document.querySelector(".btn-predict");
const content = document.querySelector(".section-left");
console.log(content);
let fileData;
console.log(resetBtn);
resetBtn.onclick = function click() {
  location.reload();
};
button.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", function () {
  const file = this.files[0];
  fileData = file;
  showFile(file);
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragText.textContent = "Thả để Tải Ảnh lên";
});

dropArea.addEventListener("dragleave", (event) => {
  event.preventDefault();
  dragText.textContent = "Kéo và Thả để Tải Ảnh lên";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  fileData = file;
  showFile(file);
});

function showFile(file) {
  const fileType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileUrl = fileReader.result;
      const imgTag = `<img style="width:250px; height:250px" src="${fileUrl}">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("Đây không phải là file ảnh");
    dragText.textContent = "Kéo và Thả để Tải Ảnh lên";
  }
}
predictBtn.onclick = function () {
  console.log("hi");

  console.log(fileData);
  const data = new FormData();
  data.append("file", fileData);
  fetch("http://localhost:8003/predict", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      content.innerHTML += `
    <div class="result">
        <p>Result:${data.predicted_value}</p>
        
        <div class="score">
          <p>Score: 100% </p>
          <div class="score-icon"></div>
        </div>
      </div>
    `;
    });
};
//
// predicted_value
