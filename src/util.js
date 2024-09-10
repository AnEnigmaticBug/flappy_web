import { Vec2 } from './vec2.js';

export function getWorldBounds() {
    const canvas = document.getElementById('canvas');
    return new Vec2(canvas.offsetWidth, canvas.offsetHeight);
}

export function resizeCanvas(size) {
    const canvas = document.getElementById('canvas');
    canvas.width = size.x;
    canvas.height = size.y;
}

export class ScoreIncrementer {
    constructor(scoreElement) {
        this.score = 0;
        this.maxScore = 0;
        this.scoreElement = scoreElement;
        this.interval = setInterval(() => {
            this.score++;
            this.maxScore = Math.max(this.score, this.maxScore);
            this.scoreElement.innerText = this.score.toString();
        }, 1000);
    }

    reset() {
        this.score = 0;
        this.scoreElement.innerText = '0';
    }

    stop() {
        clearInterval(this.interval);
    }
}

export async function simulateGame(game, renderer) {
    while (!game.isOver()) {
        game.update();
        renderer.render(game);
        await new Promise(requestAnimationFrame);
    }
}
