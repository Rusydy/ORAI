const gameCanvas = document.getElementById('gameCanvas')
const ctx = gameCanvas.getContext('2d')

const BCKGRNDCLR = '#c7d8c6'
const SNAKECLR = '#009999'
const SNACKCLR = '#f5e6d6'

gameCanvas.width = 400
gameCanvas.height = 400

let INTERVAL = 100
const SCREEN = 20
const TILE = (gameCanvas.width/SCREEN)

//initial state
let movement
let position //determined by the head's position
let snake
let snack
let score

function drawSnack(){
    snack = {
        x: Math.floor(Math.random() * TILE),
        y : Math.floor(Math.random() * TILE)
        }


    for (let body of snake){
      if (body.x == snack.x && body.y == snack.y){
           return drawSnack()
         }
    }
   } 


function init(){
    movement = { x: 0, y: 0 }
    position = { x: 10, y:10 }

    snake = [
        {x: 8, y:10}, //ekor
        {x: 9, y:10},//badan
        {x: 10, y:10}, //kepala
    ]

    score = 0
    INTERVAL= 100

    drawSnack()
}

init()

//key event attachments
document.addEventListener('keydown', event => {
    switch(event.key) {
        case 'w': case 'h': case 'ArrowUp':    {return movement = {x: 0, y: -1}}
        case 'a': case 'j': case 'ArrowLeft':  {return movement = {x: -1, y: 0}}
        case 's': case 'k': case 'ArrowDown':  {return movement = {x: 0, y: 1}}
        case 'd': case 'l': case 'ArrowRight': {return movement = {x: 1, y: 0}}
    }
})

//to add score
function drawScore(i){
  ctx.fillStyle = '#006C6C'
  ctx.fillText('SCORE: ' + i, 5, TILE-5)
}

function gameLoop(){
    //layout
    ctx.fillStyle = BCKGRNDCLR
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
    
    ctx.fillStyle = SNAKECLR
    for (let body of snake){
        ctx.fillRect(body.x*SCREEN, body.y*SCREEN, SCREEN, SCREEN)
    }

    ctx.fillStyle = SNACKCLR
    ctx.fillRect(snack.x*SCREEN, snack.y*SCREEN, SCREEN, SCREEN)

    position.x += movement.x
    position.y += movement.y

    //if snake eats the snack
    if (snack.x == position.x && snack.y == position.y) {
        snake.push({...position})
        position.x += movement.x
        position.y += movement.y
        drawSnack()
        score ++
    }

    //if head bump with body
    if (movement.x || movement.y) {
        for (let body of snake) {
            if( body.x == position.x && body.y == position.y){
                return init()
            }
        }
        //this is what makes the snake moves forward
        snake.push({...position})
        snake.shift()
        
      }

      drawScore(score)

  // if head hits the wall, still in game.

  if (position.x < 0 ){
      position.x = TILE
  }
  else if (position.y < 0){
      position.y = TILE
  }
  else if (position.x > TILE)  {
      position.x = -1
  }
  else if (position.y > TILE){
      position.y = -1
  }


}

let intervall = setInterval (function (){
    requestAnimationFrame (gameLoop)
}, INTERVAL)



//CONTROLLER

const leftkey = document.getElementById('leftkey').addEventListener('click', event =>{return movement = {x: -1, y: 0}})
const rightkey = document.getElementById('rightkey').addEventListener('click', event => {return movement = {x: 1, y: 0}})
const upkey = document.getElementById('upkey').addEventListener('click', event => {return movement = {x: 0, y: -1}})
const downkey = document.getElementById('downkey').addEventListener('click', event => {return movement = {x: 0, y: 1}})

//CUSTOMIZER

//control velocity
function reduceInterval(){
    if (INTERVAL > 0){
     intervall = setInterval (function (){
     requestAnimationFrame (gameLoop)
    }, (INTERVAL-10))
    }
}

function addInterval(){
    intervall = setInterval (function (){
        requestAnimationFrame (gameLoop)
    }, (INTERVAL+10))
}

const speedup = document.getElementById('speed-up').addEventListener('click', reduceInterval)
const speeddown = document.getElementById('speed-down').addEventListener('click', addInterval)

//restart game
const stop = document.getElementById('stop').addEventListener('click', event => {return init()})

//pause,resume button

let paused
function gamePaused(){
    clearInterval(intervall);
    paused = true;
}

function gameResumed(){
    if (paused = true){
        intervall = setInterval (function (){
            requestAnimationFrame (gameLoop)
        }, INTERVAL)
        paused = false;
    }

}
const pause = document.getElementById('pause').addEventListener('click', gamePaused)
const resume = document.getElementById('play').addEventListener('click', gameResumed)



//show-hide instructions


// Show the bar
const show = function (elem) {
	elem.classList.add('is-visible');
};

// Hide the bar
const hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle bar visibility
const toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

// click-event
let instructionBar = document.getElementById('instruction-bar').addEventListener('click', event =>{


})