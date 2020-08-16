import { worldBounds } from './conf.js';
import { Renderer } from './renderer.js';
import { resizeCanvas } from './util.js';
import { Evolver } from './evolver.js';

resizeCanvas(worldBounds);

const menuScreen = document.getElementById('menu-screen');
const playScreen = document.getElementById('play-screen');
const exitScreen = document.getElementById('exit-screen');

playScreen.style.display = 'none';
exitScreen.style.display = 'none';

document.getElementById('play-button').addEventListener('click', async (ev) => {
    menuScreen.style.display = 'none';
    playScreen.style.display = 'flex';

    const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
    await new Evolver(200).run(renderer, 32);

    playScreen.style.display = 'none';
    exitScreen.style.display = 'flex';
});

document.getElementById('okay-button').addEventListener('click', (ev) => {
    exitScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
});
