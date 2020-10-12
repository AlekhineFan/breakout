const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector("#close-btn");

rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});

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

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dirX: 0,
};

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
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

const moveBall = () => {
  ball.x += ball.dirX;
  ball.y += ball.dirY;

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dirX *= -1;
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dirY *= -1;
  }

  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dirY = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dirY *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
};

const showAllBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
};

const increaseScore = () => {
  score++;

  if (score % (brickRowCount * brickColCount) === 0) {
    showAllBricks();
  }
};

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

createBricks();

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

const movePaddle = () => {
  paddle.x += paddle.dirX;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

const update = () => {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
};

update();

const keyDown = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dirX = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dirX = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dirX = 0;
  }
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
