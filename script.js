document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("whiteboard");
  const context = canvas.getContext("2d");
  let scale = 1; // Initial scale

  // Set canvas size
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8; // Adjusted height for better mobile viewing

  let drawing = false;
  let eraserMode = false;
  let lastX = 0;
  let lastY = 0;
  let color = "#000";
  let thickness = 5;

  function startPosition(e) {
    drawing = true;
    if (eraserMode) {
      context.strokeStyle = "#FFF"; // Use white color to simulate eraser
    } else {
      context.strokeStyle = color;
    }
    context.lineWidth = thickness / scale; // Adjust line width based on scale
    draw(e);
  }

  function endPosition() {
    drawing = false;
    context.beginPath();
  }

  function draw(e) {
    if (!drawing) return;
    context.lineCap = "round";

    context.lineTo(
      e.clientX / scale - canvas.offsetLeft / scale,
      e.clientY / scale - canvas.offsetTop / scale
    );
    context.stroke();
    context.beginPath();
    context.moveTo(
      e.clientX / scale - canvas.offsetLeft / scale,
      e.clientY / scale - canvas.offsetTop / scale
    );
  }

  function toggleEraser() {
    eraserMode = !eraserMode;
    if (eraserMode) {
      document.getElementById("eraser").textContent = "Draw";
    } else {
      document.getElementById("eraser").textContent = "Eraser";
    }
  }

  function changeColor(e) {
    color = e.target.value;
  }

  function changeThickness(e) {
    thickness = parseInt(e.target.value); // Convert string value to integer
  }

  function saveDrawing() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "whiteboard_drawing.png";
    link.click();
  }

  function enableTouchDraw() {
    canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
      startPosition(e.touches[0]);
    });

    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      draw(e.touches[0]);
    });

    canvas.addEventListener("touchend", endPosition);
  }

  function zoomIn() {
    scale *= 1.1;
    updateCanvasSize();
  }

  function zoomOut() {
    scale /= 1.1;
    updateCanvasSize();
  }

  function updateCanvasSize() {
    canvas.width = window.innerWidth * 0.8 * scale;
    canvas.height = window.innerHeight * 0.8 * scale;
    redraw();
  }

  function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Additional code to redraw any existing drawings if needed
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);

  document.getElementById("eraser").addEventListener("click", toggleEraser);
  document
    .getElementById("colorPicker")
    .addEventListener("change", changeColor);
  document.getElementById("save").addEventListener("click", saveDrawing);
  document
    .getElementById("onMobile")
    .addEventListener("click", enableTouchDraw);
  document
    .getElementById("thickness")
    .addEventListener("input", changeThickness);
  document.getElementById("zoomIn").addEventListener("click", zoomIn);
  document.getElementById("zoomOut").addEventListener("click", zoomOut);
  document.getElementById("clear").addEventListener("click", clearCanvas);
});
