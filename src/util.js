export function resizeCanvas(size) {
    const canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
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
