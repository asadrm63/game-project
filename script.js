let canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
let score = 0;
const scoreElement = document.querySelector('#score');
const roundClockDisplay = document.querySelector(".game-timer");
const stage = [];
const skierImg = document.createElement('img');
skierImg.src = "newskier.png"

const coinImg = document.createElement('img');
coinImg.src = 'https://mario.wiki.gallery/images/thumb/1/17/CoinMK8.png/1200px-CoinMK8.png'

const treeImg = document.createElement('img');
treeImg.src = "tree.png"
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// function drawRect(obj) {
//     ctx.fillStyle = obj.color;
//     ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
//   }

  // function clearScreen() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  // }+96

let skier = {
    x: 400,
    y: 200,
    w:20,
    h:25,
    img:skierImg,
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
      // keep skier restricted to screen
      if (skier.x  > 750 ) {
        skier.x = 750
      }
      if (skier.x  < 50 ) {
        skier.x = 50
      }

    }
  };

 
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
    this.img =treeImg;
    stage.push(this);
  }
  onEnterFrame(){
        // can use this for moving left or right
    // this.x -= 3;

    // changed to - ,now its moving upward
    if (this.y < -10) return this.destroy()
    this.y -=3;

    if(isColliding(skier, this)){
      // console.log(stage)
      // pauses screen when colliding
      stage.forEach((item) => (item.y += 3));
      //  clearInterval(gameLoop)
      // --score 
      }
  }
  destroy() {
    stage.splice(stage.indexOf(this), 1);
 }
}

class Enemy {
  constructor() {
    this.color = 'red';
    // this.x = randomInteger(7.5, 792.5)
    this.x = skier.x
    this.y =0
    this.w = 10;
    this.h = 15;
    stage.push(this);
  }
  onEnterFrame(){
    // changed to - ,now its moving upward
    this.y +=.05;

    if(isColliding(skier, this)){
      console.log(stage)
      // pauses objects when colliding
      stage.forEach((item) => (item.y += 3));
      }
  }
}
  class Coin {
    constructor() {
      this.color = 'yellow';
      this.x = randomInteger(0, 800)
      this.y =400
      this.img = coinImg;

      //  200 + Math.random() * 400 - 200;
      this.w = 20;
      this.h = 20;
      stage.push(this);
    }
    onEnterFrame(){
      // changed to - ,now its moving upward
      if (this.y < -10) return this.destroy()
      this.y -= 3;
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

  function drawObj(obj) {
    if(obj.img){
      ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
      return
    }
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
    // gameplay = setInterval(draw, 1000)
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
    console.log(stage)
  })


  function isColliding(a, b) {
    return a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.h + a.y > b.y 
  }

  // draw all game objects 30 times per second
  const FPS = 30;
  let numOfEnemies = 0
  function draw() {
    clearScreen();

    if(Math.random() > .4) new Coin;
    stage.forEach(obj => {
     drawObj(obj);
     obj.onEnterFrame();
    });

    drawObj(skier);
   skier.onEnterFrame();
    
    stage.forEach(item => {
      if (numOfEnemies < 5) {
        numOfEnemies++
        new Enemy
      }
    })
    // if(Math.random() < .03)  new Enemy();
    stage.forEach(obj => {
     drawObj(obj);
     obj.onEnterFrame();
    });

    if(Math.random() > .9)  new Tree;
    stage.forEach(obj => {
      drawObj(obj);
      obj.onEnterFrame();
    });
    // drawRect(skier);
    // console.log(stage)

// if y not moving no draw
//game time ;set timeout counting time when time destroy clear screen gameover
    // if stage  loop through array if .enemy  <3   have a counter  draw new enemy
    // move enemy with skier 
    // skier.onEnterFrame();  
  }
  
  // draw();
  // let gameLoop = setInterval(draw, 1000 / FPS);


  let gameLoop;
function startGame() {
  scoreElement.innerText = 'Score: 0'
  draw();
  gameLoop = setInterval(draw, 1000 / FPS);
}
startGame()
  

function roundClockUpdate() {
  let timeInSeconds = 30;
  const reduceTime = setInterval(() => {
    timeInSeconds--;
    let min = Math.floor(timeInSeconds / 60);
    let sec = Math.floor(timeInSeconds % 60);
    roundClockDisplay.innerText = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    if (timeInSeconds === 0){
      // clearScreen()
      // gameLoop = setInterval(draw, 1000 / FPS);
      window.location.href='end.html';
      // alert(`Game Over 
      // Your score is :${score}`)
     
      }
  }, 1000);
}

roundClockUpdate();


if (Enemy.y > skier.y ) {
  alert(`Game Over 
      Your score is :${score}`)
      clearInterval(gameLoop)
      }

  