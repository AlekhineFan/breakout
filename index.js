const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector("#close-btn");
const rules = document.querySelector("#rules");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let score = 0;

const brickRowCount = 9;
const brickColCount = 5;
const bricks = [];

const brickProprs = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 65,
  visible: true,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dirX: 4,
  dirY: -4,
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dirX: 0,
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

const drawScore = () => {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

const drawBallPaddleScore = () => {
  drawBall();
  drawPaddle();
  drawScore();
};

drawBallPaddleScore();

const createBricks = () => {
  for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColCount; j++) {
      const x = i * (brickProprs.w + brickProprs.padding) + brickProprs.offsetX;
      const y = j * (brickProprs.h + brickProprs.padding) + brickProprs.offsetY;
      bricks[i][j] = { x, y, ...brickProprs };
    }
  }
};

const drawBricks = () => {
  bricks.forEach((col) => {
    col.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
};

createBricks();
drawBricks();

rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
