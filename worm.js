// 색상
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const RED = "#FF0000";

// 캔버스 크기
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

// 지렁이 클래스
class Worm {
    // 생성자
    constructor() {
        this.size = 10;
        this.color = WHITE;
        this.positions = [{ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 }];
        this.direction = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
    }
    
    // 그리기 함수
    draw(ctx) {
        for (let i = 0; i < this.positions.length; i++) {
            let position = this.positions[i];
            ctx.fillStyle = this.color;
            ctx.fillRect(position.x, position.y, this.size, this.size);
        }
    }
    
    // 움직이기 함수
    move() {
        let new_position;
        
        if (this.direction == "up") {
            new_position = { x: this.positions[0].x, y: this.positions[0].y - this.size };
        } else if (this.direction == "down") {
            new_position = { x: this.positions[0].x, y: this.positions[0].y + this.size };
        } else if (this.direction == "left") {
            new_position = { x: this.positions[0].x - this.size, y: this.positions[0].y };
        } else if (this.direction == "right") {
            new_position = { x: this.positions[0].x + this.size, y: this.positions[0].y };
        }
        
        this.positions.unshift(new_position);
        this.positions.pop();
    }
    
    // 방향 바꾸기 함수
    changeDirection(new_direction) {
        if (new_direction == "up" && this.direction != "down") {
            this.direction = "up";
        } else if (new_direction == "down" && this.direction != "up") {
            this.direction = "down";
        } else if (new_direction == "left" && this.direction != "right") {
            this.direction = "left";
        } else if (new_direction == "right" && this.direction != "left") {
            this.direction = "right";
        }
    }
}

// 먹이 클래스
class Food {
    // 생성자
    constructor() {
        this.size = 10;
        this.color = RED;
        this.position = { x: Math.floor(Math.random() * (SCREEN_WIDTH - this.size)), y: Math.floor(Math.random() * (SCREEN_HEIGHT - this.size)) };
    }
    
    // 그리기 함수
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }
}

// 게임 시작
let canvas = document.createElement("canvas");
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

let worm = new Worm();
let food = new Food();

// 게임 루프
function gameLoop() {
    // 이벤트 처리
    document.addEventListener("keydown", (event) => {
        if (event.key == "ArrowUp") {
            worm.changeDirection("up");
        } else if (event.key == "
ArrowDown") {
            worm.changeDirection("down");
        } else if (event.key == "ArrowLeft") {
            worm.changeDirection("left");
        } else if (event.key == "ArrowRight") {
            worm.changeDirection("right");
        }
    });
    
    // 게임 논리 처리
    worm.move();
    
    if (worm.positions[0].x < 0 || worm.positions[0].x >= SCREEN_WIDTH || worm.positions[0].y < 0 || worm.positions[0].y >= SCREEN_HEIGHT) {
        alert("Game over!");
        clearInterval(interval);
    }
    
    if (worm.positions[0].x == food.position.x && worm.positions[0].y == food.position.y) {
        worm.positions.push({ x: worm.positions[worm.positions.length - 1].x, y: worm.positions[worm.positions.length - 1].y });
        food = new Food();
    }
    
    for (let i = 1; i < worm.positions.length; i++) {
        if (worm.positions[0].x == worm.positions[i].x && worm.positions[0].y == worm.positions[i].y) {
            alert("Game over!");
            clearInterval(interval);
            break;
        }
    }
    
    // 그리기
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    
    worm.draw(ctx);
    food.draw(ctx);
}

let interval = setInterval(gameLoop, 100);
