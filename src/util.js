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

export async function simulateGame(game, renderer) {
    while (!game.isOver()) {
        game.update();
        renderer.render(game);
        await new Promise(requestAnimationFrame);
    }
}
