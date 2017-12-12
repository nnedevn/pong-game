let PADDLE_HEIGHT = 100;
let paddleWidth = 10;

let canvas;
let context;

let ballX = 50;
let ballSpeedX = 5;
let ballY = 50;
let ballSpeedY = 5;

let paddle1Y = 250;
let paddle2Y = 250;

let playerOneScore = 0;
let playerTwoScore = 0;

window.onload = function() {
  var framesPerSecond = 50;
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', (evt) => {
    var mousePos = calculateMousePosition(evt);
    paddle1Y = mousePos.y;

  });

  function drawEverything() {
    drawColorRect(0, 0, canvas.width, canvas.height, 'black');
    // left player paddle
    drawColorRect(0, paddle1Y - PADDLE_HEIGHT, paddleWidth, PADDLE_HEIGHT, 'white');
    // right player paddle
    drawColorRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, PADDLE_HEIGHT, 'white');
    // ball
    drawColorCircle(ballX, ballY, 10, 'red');
    context.fillText(playerOneScore, 100, 100);
    context.fillText(playerOneScore, canvas.width - 100, 100);
  }
  /*
  
   */
  function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
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

  function computerMovement() {
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
    if (paddle2YCenter < ballY - 35) {
      paddle2Y += 6;
    } else {
      paddle2Y -= 6;
    }
  }

  function moveEverything() {
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // console.log('position y:', ballY);

    // ball passes the right side. 
    if (ballX > canvas.width) {

      if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
      } else {
        ballReset();
        playerOneScore += 1;
      }
    }

  }
  // ball gets past the left side 
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
     
      ballReset();
       playerTwoScore += 1;
    }
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY < 0) {
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