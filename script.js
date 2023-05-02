console.log("working")

let canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");

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

let skier = {
    x: 400,
    y: 0,
    w:50,
    h:75,
    speed: 5,
    color:"black",
  };


  class Coin {
    constructor() {
      this.color = 'yellow';
      this.x = 200 + Math.random() * 50 - 100;
      this.y = 200 + Math.random() * 400 - 200;
      this.w = 15;
      this.h = 15;
      stage.push(this);
    }
  }

//   let mario = {
//     x: 50,
//     y: 175,
//     w: 50,
//     h: 75,
//     color: 'red',
//     speed: 3
//   }


  document.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){
      skier.x -= skier.speed
      ///?????
    } else if (e.key === 'ArrowRight'){
      skier.x += skier.speed
    }
  })

  // draw all game objects 30 times per second
const FPS = 30;
function draw() {
  clearScreen();
  if(Math.random() > .9) new Coin;
  stage.forEach(obj => drawRect(obj));
  drawRect(skier);
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