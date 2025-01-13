let Score = 0;
let ObstacleSpeed = 20;
let IsJumping = false;
let HighScore = localStorage.getItem("highscore") || 0;

const Robot = document.getElementById("robot");
const RobotObstacles = document.getElementById("obstacles");
const ScoreDisplay = document.getElementById("score");
const GameOver = document.getElementById("game-over-sound");
const HighScoreDisplay = document.getElementById("highscore-value");
const PointSound = document.getElementById("point");

HighScoreDisplay.innerHTML = HighScore;

function CheckCollision() {
    const RobotRect = Robot.getBoundingClientRect();
    const ObstacleRect = RobotObstacles.getBoundingClientRect();

    return (
        RobotRect.top < ObstacleRect.bottom &&
        RobotRect.bottom > ObstacleRect.top &&
        RobotRect.left < ObstacleRect.right &&
        RobotRect.right > ObstacleRect.left
    );
}

function GetRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function Obstacles() {
    let ObstaclePosition = 600;
    const ObstacleInterval = setInterval(() => {
        if (ObstaclePosition <= 0) {
            ObstaclePosition = 600;


            const ObstacleHeight = 10 + Math.random() * 20;
            RobotObstacles.style.height = `${ObstacleHeight}px`;


            RobotObstacles.style.backgroundColor = GetRandomColor();


            Score++;
            PointSound.play()
            ScoreDisplay.innerText = `Score: ${Score}`;
            if (Score % 10 === 0) {
                ObstacleSpeed -= 2;
            }
        }


        ObstaclePosition -= 5;
        RobotObstacles.style.left = `${ObstaclePosition}px`;

        if (CheckCollision()) {
            clearInterval(ObstacleInterval);
            if (Score > HighScore) {
                HighScore = Score;
                HighScoreDisplay.innerText = HighScore;
                localStorage.setItem('highscore', HighScore);
            }
            alert('Game Over. Your Score Is: ' + Score);
            location.reload();
        }
    }, ObstacleSpeed);
}

function Jump() {
    if (IsJumping) return;
    IsJumping = true;
    let JumpHeight = 0;
    const JumpInterval = setInterval(() => {
        if (JumpHeight >= 120) {
            clearInterval(JumpInterval);
            const FallInterval = setInterval(() => {
                if (JumpHeight <= 20) {
                    clearInterval(FallInterval);
                    Robot.style.left = '20px';
                    IsJumping = false;
                }
                JumpHeight -= 5;
                Robot.style.bottom = JumpHeight + 'px';
            }, 20);
            Robot.style.left = '60px';
        }
        JumpHeight += 5;
        Robot.style.bottom = JumpHeight + 'px';
    }, 20);
}

document.addEventListener('keydown', Jump);

Obstacles();