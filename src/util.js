export function resizeCanvas(size) {
    const canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    canvas.width = size.x;
    canvas.height = size.y;
}
