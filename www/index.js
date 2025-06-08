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
    let updateInterval = 100; // 100ms for 10 updates per second
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

    // Initialize biotron controls
    const enzymeSlider = document.getElementById('enzymeSlider');
    const enzymeDisplay = document.getElementById('enzymeDisplay');
    const autoclaveButton = document.getElementById('autoclaveButton');
    const repopulateButton = document.getElementById('repopulateButton');
    const autoclaveLed = document.getElementById('autoclaveLed');
    const repopulateLed = document.getElementById('repopulateLed');
    const themeSwitch = document.getElementById('themeSwitch');
    const amberLabel = document.querySelector('.amber-label');
    const greenLabel = document.querySelector('.green-label');

    // Function to blink LED for 3 seconds
    function blinkLed(led) {
        led.classList.remove('off');
        led.classList.add('blinking');
        
        setTimeout(() => {
            led.classList.remove('blinking');
            led.classList.add('off');
        }, 3000);
    }

    // Function to update game speed based on enzyme level
    function updateGameSpeed(enzymeLevel) {
        if (enzymeLevel === 0) {
            // Stop the game
            game.stop();
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else {
            // Calculate update interval: 1-99 maps to 999-10ms
            updateInterval = 999 - (enzymeLevel - 1) * (989 / 98);
            
            if (!game.is_running()) {
                game.start();
                lastUpdate = performance.now();
                gameLoop();
            }
        }
    }

    // Function to update slider mark lighting
    function updateSliderMarks(value) {
        const marks = document.querySelectorAll('.slider-marks span');
        const currentTheme = game.get_theme();
        const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        
        // Map slider value (0-99) to mark positions (0, 25, 50, 75, 99)
        const markPositions = [0, 24.75, 49.5, 74.25, 99];
        
        marks.forEach((mark, index) => {
            const markPosition = markPositions[index];
            const distance = Math.abs(value - markPosition);
            
            // Calculate brightness: closer = brighter, with falloff
            let brightness = 0;
            if (distance <= 12.375) { // Half the distance between marks
                if (distance === 0) {
                    brightness = 1.0; // 100% when exactly on mark
                } else if (distance <= 6.1875) { // Quarter distance
                    brightness = 0.75; // 75% when very close
                } else {
                    brightness = 0.5 - (distance - 6.1875) / 12.375 * 0.5; // Fade from 50% to 0%
                }
            }
            
            if (brightness > 0) {
                mark.style.color = themeColor;
                mark.style.textShadow = `0 0 ${2 + brightness * 2}px ${themeColor}`;
                mark.style.opacity = Math.max(0.3, brightness);
            } else {
                mark.style.color = '#665542';
                mark.style.textShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
                mark.style.opacity = '1';
            }
        });
    }

    // Enzyme slider functionality
    enzymeSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        enzymeDisplay.textContent = value;
        updateGameSpeed(value);
        updateSliderMarks(value);
    });

    // Autoclave button (clear) functionality
    autoclaveButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    autoclaveButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('click', function() {
        game.clear();
        game.render('gameCanvas');
        blinkLed(autoclaveLed);
    });

    // Repopulate button (randomize) functionality
    repopulateButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    repopulateButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('click', function() {
        game.randomize();
        game.render('gameCanvas');
        blinkLed(repopulateLed);
    });

    // Theme switching functionality
    function updateTheme(theme) {
        console.log('Switching to theme:', theme);
        const root = document.documentElement;
        game.set_theme(theme);
        
        if (theme === 'amber') {
            root.style.setProperty('--current-cell-color', '#FFB000');
            root.style.setProperty('--current-canvas-bg', '#0D0A05');
            canvas.style.backgroundColor = '#0D0A05';
            themeSwitch.className = 'rotary-switch amber';
            amberLabel.classList.add('active');
            greenLabel.classList.remove('active');
            enzymeDisplay.classList.remove('green');
            enzymeDisplay.style.color = '#FFB000';
            enzymeDisplay.style.textShadow = '0 0 4px #FFB000';
        } else {
            root.style.setProperty('--current-cell-color', '#AAFFBB');
            root.style.setProperty('--current-canvas-bg', '#000000');
            canvas.style.backgroundColor = '#000000';
            themeSwitch.className = 'rotary-switch green';
            greenLabel.classList.add('active');
            amberLabel.classList.remove('active');
            enzymeDisplay.classList.add('green');
            enzymeDisplay.style.color = '';
            enzymeDisplay.style.textShadow = '';
        }
        
        game.render('gameCanvas');
        
        // Update slider marks with new theme colors
        updateSliderMarks(parseInt(enzymeSlider.value));
    }

    // Theme switch functionality
    themeSwitch.addEventListener('click', function() {
        console.log('Theme switch clicked');
        const currentTheme = game.get_theme();
        console.log('Current theme:', currentTheme);
        const newTheme = currentTheme === 'amber' ? 'green' : 'amber';
        console.log('Switching to:', newTheme);
        updateTheme(newTheme);
    });

    // Initialize with default enzyme level (10 = ~100ms) and amber theme
    updateGameSpeed(10);
    updateTheme('amber');
    updateSliderMarks(10);
}

run();
