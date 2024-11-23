
let input = document.getElementById('calculatorInput');
let board, currentPlayer, isAI;

// Fonction pour effacer l'écran
function clr() {
    input.value = "";
}

// Fonction pour ajouter un caractère dans l'affichage
function dis(val) {
    input.value += val;
}

// Fonction pour supprimer le dernier caractère
function back() {
    input.value = input.value.slice(0, -1);
}

// Fonction pour résoudre l'expression
function solve() {
    let expression = input.value;

    // Vérification spéciale pour 1+1=3
    if (expression === "1+1") {
        input.value = "3";
        return;
    }

    // Activer le jeu Tic-Tac-Toe si l'utilisateur entre "2+2"
    if (expression === "2+2") {
        document.querySelector('.calc').classList.add('hidden');
        document.getElementById('game-choice').classList.remove('hidden');
        return;
    }

    // Activer le jeu Snake si l'utilisateur entre "3+3"
    if (expression === "3+3") {
        document.querySelector('.calc').classList.add('hidden');
        document.getElementById('snake-game').classList.remove('hidden');
        startSnakeGame();
        return;
    }

    // Gestion du pourcentage
    expression = expression.replace(/(\d+)%/g, '($1/100)');

    // Gestion de la racine carrée
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

    // Exécution de l'expression
    try {
        input.value = eval(expression);
    } catch {
        input.value = "Error";
    }
}

// Fonction pour démarrer le jeu Snake
function startSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction;
    let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
        else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    });

    function drawGame() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === 'UP') headY -= box;
        else if (direction === 'DOWN') headY += box;
        else if (direction === 'LEFT') headX -= box;
        else if (direction === 'RIGHT') headX += box;

        if (headX === food.x && headY === food.y) {
            food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box };
        } else {
            snake.pop();
        }

        const newHead = { x: headX, y: headY };
        snake.unshift(newHead);

        if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height ||
            snake.slice(1).some(segment => segment.x === headX && segment.y === headY)) {
            clearInterval(game);
            alert('Game Over');
        }
    }

    const game = setInterval(drawGame, 100);
}
