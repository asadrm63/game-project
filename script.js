let canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
let score = 0;
const scoreElement = document.querySelector('#score');

const stage = [];


// ctx.beginPath();
// ctx.rect(20, 40, 12, 40);x
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  }

  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  // need to keep skier restricted to screen
let skier = {
    x: 90,
    y: 200,
    w:10,
    h:15,
    speed: 5,
    color:"black",
    onEnterFrame() {
      if(skier.left) {
        skier.x -= skier.speed
        stage.forEach((item) => (item.x += 3));
        
      }
      if(skier.right) {
        skier.x += skier.speed
        stage.forEach((item) => (item.x -= 3));
      }

      // keeps skier in frame
      if (skier.x  > 750 ) {
        skier.x = 750
      }

      if (skier.x  <50 ) {
        skier.x = 50
      }

    }
  };


  // ? How do u win this game ?
  // have timer must get 100 points in 2 mins || must travel cetain distance in time 
  // ?how to increase score coins, lose score
// ? how to make the x cordinate of coin spread out more
//  have enemies, hwo would approch 


class Tree {
  constructor() {
    this.color = 'green';
    this.x = randomInteger(7.5, 792.5)
    this.y =400
    this.w = randomInteger(10, 30);
    this.h = randomInteger(10, 60);
    stage.push(this);
  }
  onEnterFrame(){
        // can use this for moving left or right
    // this.x -= 3;

    // changed to - ,now its moving upward
    this.y -=3;

    if(isColliding(skier, this)){
      console.log(stage)
      // pauses screen when colliding
      stage.forEach((item) => (item.y += 3));
      --score 
      }
  }
}




class Enemy {
  constructor() {
    this.color = 'red';
    this.x = randomInteger(7.5, 792.5)
    this.y =0
    this.w = 10;
    this.h = 15;
    stage.push(this);
  }
  onEnterFrame(){
        // can use this for moving left or right
    // this.x -= 3;

    // changed to - ,now its moving upward
    this.y +=.05;

    if(isColliding(skier, this)){
      console.log(stage)
      // pauses screen when colliding
      stage.forEach((item) => (item.y += 3));
      }
  }
}


// let enemy = {
//   x: 100,  // starting x position
//   y: 100,  // starting y position
//   speed: 2,  // movement speed
//   follow: function(target) {
//     // calculate direction vector towards target
//     let dx = target.x - this.x;
//     let dy = target.y - this.y;
//     let len = Math.sqrt(dx*dx + dy*dy);
//     dx /= len;
//     dy /= len;
    
//     // move towards target
//     this.x += dx * this.speed;
//     this.y += dy * this.speed;
//   }
// };

// function animate() {
//   requestAnimationFrame(animate);

//   // update character position

//   // draw character on canvas

//   // update enemy position
//   enemy.follow(skier);

//   // draw enemy on canvas
//   context.fillStyle = 'red';
//   context.fillRect(enemy.x, enemy.y, 20, 20);
// }

// animate();

  class Coin {
    constructor() {
      this.color = 'yellow';
      this.x = randomInteger(0, 800)
      this.y =400
      //  200 + Math.random() * 400 - 200;
      this.w = 15;
      this.h = 5;
      stage.push(this);
    }
    onEnterFrame(){
          // can use this for moving left or right
      // this.x -= 3;

      // changed to - ,now its moving upward
      this.y -= 3;
      // if(this.x < -50 || this.y > 300) {
      //   this.destroy();
      // }
      if(isColliding(skier, this)){
        this.destroy();
        score++
        scoreElement.innerText = `Score: ${score}`;
      }
    }
    destroy() {
       stage.splice(stage.indexOf(this), 1);
    }
  }

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


  window.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){
      // skier.x -= skier.speed
      skier.left = true;
      ///?????
    } else if (e.key === 'ArrowRight'){
      // skier.x += skier.speed
      skier.right =true;x
    }
  })

  window.addEventListener('keyup', e => {
    if(e.key === 'ArrowLeft'){
      // skier.x -= skier.speed
      skier.left = false;
      ///?????
    } else if (e.key === 'ArrowRight'){
      // skier.x += skier.speed
      skier.right = false;
    }
  })


  function isColliding(a, b) {
    return a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.h + a.y > b.y 
  }

  // draw all game objects 30 times per second
  const FPS = 30;
  function draw() {
    clearScreen();


    if(Math.random() > .9) new Coin, new Enemy;
    stage.forEach(obj => {
      drawRect(obj);
      obj.onEnterFrame();
    });


    if(Math.random() > .9 && !(isColliding(skier, Tree)))  new Tree;
    stage.forEach(obj => {
      drawRect(obj);
      obj.onEnterFrame();
    });
    drawRect(skier);
    skier.onEnterFrame();
  }
  draw();
  let gameLoop = setInterval(draw, 1000 / FPS);

// function updateGame() {
//     // Move the skier down the slope
//     skier.y += skier.speed;
// }
// add levels
// 
// add enemy
