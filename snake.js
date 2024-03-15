window.onload = function () {
  const CANVAS = document.getElementById('canvas');
  const CTX = CANVAS.getContext('2d');

  const SCORE = document.getElementById('score');
  const HIGHT_SCORE = document.getElementById('hight-score');
  const GAME_OVER = document.getElementById('game-over');

  document.addEventListener('keydown', keyPush);
  setInterval(game, 100);

  const VEL = 1;
  const BLOCK_SIZE = 32;
  const QTDE = CANVAS.width / BLOCK_SIZE - 1; //Qtd de blocos na tela

  var velX = VEL;
  var velY = 0;
  var posX = 0;
  var posY = 12;

  var foodX = Math.floor(Math.random() * QTDE);
  var foodY = Math.floor(Math.random() * QTDE);

  var trail = [];
  var tail = 3;
  var hightScore = 0;

  function game() {
    posX += velX;
    posY += velY;

    if (posX < 0) {
      posX = QTDE;
    }
    if (posX > QTDE) {
      posX = 0;
    }
    if (posY < 0) {
      posY = QTDE;
    }
    if (posY > QTDE) {
      posY = 0;
    }

    CTX.fillStyle = 'black';
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    CTX.fillStyle = 'red';
    CTX.fillRect(foodX * BLOCK_SIZE, foodY * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    CTX.fillStyle = 'gray';
    for (let i = 0; i < trail.length; i++) {
      CTX.fillRect(trail[i].x * BLOCK_SIZE, trail[i].y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);

      if (trail[i].x == posX && trail[i].y == posY) {
        velX = velY = 0;
        gameOver = true;
        tail = 3;
        SCORE.innerHTML = 0;
        GAME_OVER.innerHTML = `Game Over`;
      }
    }

    trail.push({ x: posX, y: posY });

    while (trail.length > tail) {
      trail.shift();
    }

    if (foodX == posX && foodY == posY) {
      tail++;

      if (tail > hightScore) hightScore = tail;

      SCORE.innerHTML = tail;
      HIGHT_SCORE.innerHTML = hightScore;

      foodX = Math.floor(Math.random() * QTDE);
      foodY = Math.floor(Math.random() * QTDE);
    }
  }

  function keyPush(event) {
    GAME_OVER.innerHTML = ``;

    switch (event.keyCode) {
      case 37: // Left
      case 65: // Left
        if (velX < 1) {
          velX = -VEL;
          velY = 0;
        }
        break;
      case 38: // up
      case 87: // up
        if (velY < 1) {
          velX = 0;
          velY = -VEL;
        }
        break;
      case 39: // right
      case 68: // right
        if (velX > -1) {
          velX = VEL;
          velY = 0;
        }
        break;
      case 40: // down
      case 83: // down
        if (velY > -1) {
          velX = 0;
          velY = VEL;
        }
        break;
      default:
        break;
    }
  }
};
