window.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  document.addEventListener('keydown', keyPush);
  setInterval(game, 100);

  const vel = 1;

  var velX = vel;
  var velY = 0;
  var posX = 10;
  var posY = 15;

  var size = 20;
  var qtd = 30;

  var foodX = Math.floor(Math.random() * qtd);
  var foodY = Math.floor(Math.random() * qtd);

  var trail = [];
  var tail = 3;
  var hightScore = 0;

  function game() {
    posX += velX;
    posY += velY;

    if (posX < 0) {
      posX = qtd - 1;
    }
    if (posX > qtd - 1) {
      posX = 0;
    }
    if (posY < 0) {
      posY = qtd - 1;
    }
    if (posY > qtd - 1) {
      posY = 0;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * size, foodY * size, size, size);

    ctx.fillStyle = 'gray';
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * size, trail[i].y * size, size - 1, size - 1);

      if (trail[i].x == posX && trail[i].y == posY) {
        velX = velY = 0;
        gameOver = true;
        tail = 3;
        document.getElementById('score').innerHTML = `Score: ${0}`;
        document.getElementById('game-over').innerHTML = `Game Over`;
      }
    }

    trail.push({ x: posX, y: posY });

    while (trail.length > tail) {
      trail.shift();
    }

    if (foodX == posX && foodY == posY) {
      tail++;

      document.getElementById('score').innerHTML = `Score: ${tail}`;

      if (tail > hightScore) hightScore = tail;
      document.getElementById('hight-score').innerHTML = `Best: ${hightScore}`;

      foodX = Math.floor(Math.random() * qtd);
      foodY = Math.floor(Math.random() * qtd);
    }
  }

  function keyPush(event) {
    document.getElementById('game-over').innerHTML = ``;

    switch (event.keyCode) {
      case 37: // Left
      case 65: // Left
        if (velX < 1) {
          velX = -vel;
          velY = 0;
        }
        break;
      case 38: // up
      case 87: // up
        if (velY < 1) {
          velX = 0;
          velY = -vel;
        }
        break;
      case 39: // right
      case 68: // right
        if (velX > -1) {
          velX = vel;
          velY = 0;
        }
        break;
      case 40: // down
      case 83: // down
        if (velY > -1) {
          velX = 0;
          velY = vel;
        }
        break;
      default:
        break;
    }
  }
};
