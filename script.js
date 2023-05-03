let canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
let score = 0;
const scoreElement = document.querySelector('#score');

const stage = [];


// ctx.beginPath();
// ctx.rect(20, 40, 12, 40);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

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
    y: 20,
    w:10,
    h:15,
    speed: 5,
    color:"black",
    onEnterFrame() {
      if(skier.left) {
        skier.x -= skier.speed
      }
      if(skier.right) {
        skier.x += skier.speed
      }

    }
  };
// ? how to make the x cordinate of coin spread out more

  class Coin {
    constructor() {
      this.color = 'yellow';
      this.x = 40 + Math.random() * 100 - -200;
      this.y = 200 + Math.random() * 400 - 200;
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
      skier.right =true;
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
    if(Math.random() > .9) new Coin;
    stage.forEach(obj => {
      drawRect(obj);
      obj.onEnterFrame();
    });
    drawRect(skier);
    skier.onEnterFrame();
  }
  draw();
  setInterval(draw, 1000 / FPS);

// function updateGame() {
//     // Move the skier down the slope
//     skier.y += skier.speed;
// }


// ? how to make it seem like auto scroll
      //have y increase auto

// ?  need to have way of detecting if coins collected

//add score 
// add levels
// 

// add obstacles

// add enemy

// alternative to sking
    // running down a mountain/pyramid



// 