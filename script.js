let PADDLE_HEIGHT = 100;

let canvas;
let context;

let ballX = 50;
let ballSpeedX = 5;
let ballY = 50;
let ballSpeedY = 5;

let paddle1Y = 250;

window.onload = function() {
  var framesPerSecond = 30;
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', (evt)=>{
    var mousePos = calculateMousePosition(evt);
    paddle1Y = mousePos.y;
  });




  function drawEverything() {
    drawColorRect(0, 0, canvas.width, canvas.height, 'black');
    // left player paddle
    drawColorRect(0, paddle1Y, 10, 100, 'white');
    //drawColorRect(ballX, 100, 10, 10, 'red');
    // ball
    drawColorCircle(ballX, ballY, 10, 'white');

  }

  function calculateMousePosition(evt) {
    //get the canvas area
    let rect = canvas.getBoundingClientRect();
    //get a handle on the document
    let root = document.documentElement;
    //take the position from the event (evt give the whole page coordinates) we need to account for where on the page the mouse is in regard to the canvas
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
      x: mouseX,
      y: mouseY
    }
  }

  function moveEverything() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    if (ballX < 0) {
      ballSpeedY = -ballSpeedY;
    }

  }


  function drawColorCircle(centerX, centerY, radius, drawColor) {
    context.fillStyle = drawColor;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    context.fill();

  }

  function drawColorRect(leftX, topY, width, height, drawColor) {
    context.fillStyle = drawColor;
    context.fillRect(leftX, topY, width, height);

  }



}