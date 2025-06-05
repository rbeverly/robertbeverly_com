import init, { Game } from './pkg/conway_wasm.js';

async function run() {
    await init();
    const game = new Game();
    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    game.randomize();
    game.render('gameCanvas');

    let animationFrameId = null;
    let lastUpdate = performance.now();
    const updateInterval = 100; // 100ms for 10 updates per second
    let isMouseDown = false;

    function getGridCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((event.clientX - rect.left) * scaleX / 3); // 3x3 cell size
        const y = Math.floor((event.clientY - rect.top) * scaleY / 3);
        return { x, y };
    }

    function paintCell(event) {
        const { x, y } = getGridCoordinates(event);
        game.set_cell(x, y, true); // Set cell to live
        game.render('gameCanvas'); // Immediate re-render
    }

    canvas.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        paintCell(event);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            paintCell(event);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    function gameLoop() {
        if (game.is_running()) {
            const currentTime = performance.now();
            if (currentTime - lastUpdate >= updateInterval) {
                game.update(); // Model update every 100ms
                lastUpdate = currentTime;
            }
            game.render('gameCanvas'); // Render every frame
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    // Start the game automatically
    game.start();
    gameLoop();

    window.startGame = () => {
        if (!game.is_running()) {
            game.start();
            lastUpdate = performance.now(); // Reset timing
            gameLoop();
        }
    };
    window.stopGame = () => {
        game.stop();
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    };
    window.randomizeGame = () => {
        game.randomize();
        game.render('gameCanvas');
    };
    window.clearGame = () => {
        game.clear();
        game.render('gameCanvas');
    };
}

run();