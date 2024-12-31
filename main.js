let reset = document.querySelector('.reset');
let score = document.querySelector('.score');
let scoreNum = 0;
let board = document.querySelector('.board');
let foodX;
let foodY;
let snakeBody = [];
let snakeX = 3;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let setInvervalId;

let upBtn = document.querySelector('#upBtn');
let downBtn = document.querySelector('#downBtn');
let leftBtn = document.querySelector('#leftBtn');
let rightBtn = document.querySelector('#rightBtn');

let eatFood = new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3');
let moveDirection = new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3');
let gameEnd = new Audio('gameOverSound.mp3');

function randomFoodPosition() {
    do {
        // Generate random x and y coordinates for the food
        foodX = Math.floor(Math.random() * 14) + 1;
        foodY = Math.floor(Math.random() * 14) + 1;

        // Check if the generated food position overlaps with any part of the snake body
        isOnSnake = snakeBody.some(segment => segment[0] === foodX && segment[1] === foodY);
    } while (isOnSnake);
}


function moveSnake(e) {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
        moveDirection.play();
    }
    else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
        moveDirection.play();
    }
    else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        moveDirection.play();
    }
    else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
        moveDirection.play();
    }

    main();
}
function showGameOver() {
    clearInterval(setInvervalId);
    gameEnd.play();
    document.removeEventListener('keydown', moveSnake);

}


function main() {
    if (snakeX === foodX && snakeY === foodY) {
        randomFoodPosition();
        eatFood.play();
        scoreNum++;
        score.textContent = scoreNum;
        snakeBody.push([foodX, foodY]);
    }
    let setHTML = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeX += velocityX;
    snakeY += velocityY;
    snakeBody[0] = [snakeX, snakeY];
    for (let i = 0; i < snakeBody.length; i++) {
        setHTML += `<div class="snake-head" id="div${i}" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    if (snakeX <= 0 || snakeX > 14 || snakeY <= 0 || snakeY > 14) {
        gameOver = true;
    }
    if (gameOver) {
        return showGameOver();
    }

    board.innerHTML = setHTML;
}
randomFoodPosition();
main();

reset.addEventListener('click', function () {
    score.textContent = scoreNum;
    location.reload();
});

setInvervalId = setInterval(main, 150);

document.addEventListener('keydown', moveSnake);

upBtn.addEventListener('click', function(){
    if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
        moveDirection.play();
    }
})
downBtn.addEventListener('click', function(){
    if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
        moveDirection.play();
    }
})
leftBtn.addEventListener('click', function(){
    if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        moveDirection.play();
    }
})
rightBtn.addEventListener('click', function(){
    if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
        moveDirection.play();
    }
})