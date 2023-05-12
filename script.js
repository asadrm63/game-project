let canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
let score = 0;
const scoreElement = document.querySelector('#score');
const finalscoreElement = document.querySelector('#finalscore');
const roundClockDisplay = document.querySelector(".game-timer");
const stage = [];


const skierImg = document.createElement('img');
skierImg.src = "newskier.png"


const coinImg = document.createElement('img');
coinImg.src = "coin.png"

const yetiImg = document.createElement('img');
yetiImg.src = "Yeti.png"

const treeImg = document.createElement('img');
treeImg.src = "tree.png"
const rockImg = document.createElement('img');
rockImg.src = "rock1.png"

const audio = document.getElementById("myAudio");
const toggleButton = document.getElementById("toggleButton");


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }





// skier object
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
    this.w = randomInteger(40, 90);
    this.h = randomInteger(30, 90);
    this.img =treeImg;
    stage.push(this);
  }
  onEnterFrame(){
    // removes objects from stage once they have left screen
    if (this.y < -10) return this.destroy()
    // changed to - ,now its moving upward
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
    this.x = skier.x;
    this.y = 0;
    this.w = 30;
    this.h = 25;
    this.img = yetiImg
    stage.push(this);
  }
  
  followSkier() {
    // Move enemy left or right based on skier's position
    if (skier.x < this.x) {
      this.x -= 2;
    } else {
      this.x += 2;
    }
  }

  onEnterFrame() {
    // Move enemy down the screen
    this.y += 0.05;
    // Call followSkier to update x position
    this.followSkier();
    // Detect collision with skier
    if (isColliding(skier, this)) {
      stage.forEach((item) => (item.y += 3));
      localStorage.setItem("finalScore", `Your score ${score}`);
      window.location.href='end.html';
      // canvas.style.backgroundImage = "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fmast3r-rainb0w%2Fart%2FSkifree-Yeti-Abominable-Snowman-909097588&psig=AOvVaw2YtwNgyE6Mvd5hg5UB1Dfa&ust=1683819991865000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIj50LaM6_4CFQAAAAAdAAAAABAJ')"
      // setTimeout(window.location.href='end.html',7000)
      console.log(score)
      finalscoreElement.innerText = `Score: ${score}`;
    }
    
  }
}

// if ( window.location.href='end.html'){
//   console.log(score)
// }



// finalscoreElement.innerText = `Score: ${score}`
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

  class Rock {
    constructor() {
      this.color = 'gray';
      this.x = randomInteger(7.5, 792.5);
      this.y = 400;
      this.w = randomInteger(30, 40);
      this.h = randomInteger(10, 60);
      this.img = rockImg;
      stage.push(this);
    }
  
    onEnterFrame() {
      // Remove objects from stage once they have left the screen
      if (this.y < -10) return this.destroy();
      // Move the rock upwards
      this.y -= 3;
      // Detect collision with skier
      if (isColliding(skier, this)) {
        // Decrement score and slow down skier's speed
        score--;
        scoreElement.innerText = `Score: ${score}`;
        skier.speed = Math.max(skier.speed - 2, 1);
        // Move skier upwards to simulate getting knocked back by the rock
        skier.y -= 50;
        setTimeout(() => skier.y += 50, 1000);
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
  // localStorage.setItem("finalScore", `${score}`);

  // draw all game objects 30 times per second
  const FPS = 30;
  let numOfEnemies = 0
  function draw() {
    clearScreen();

    if(Math.random() > .8) new Coin;
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

    if(Math.random() > .9)  new Tree, new Rock;
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
      localStorage.setItem("finalScore", `Your score :${score}`);
      // alert(`Game Over 
      // Your score is :${score}`)
     
      }
  }, 1000);
}

roundClockUpdate();
