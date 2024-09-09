import { Evolver } from './evolver.js';
import { Renderer } from './renderer.js';
import { ScoreIncrementer, getWorldBounds, resizeCanvas } from './util.js';

const worldBounds = getWorldBounds();
resizeCanvas(worldBounds);

const scoreIncrementer = new ScoreIncrementer(document.getElementById('score'));

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Evolver(200).run(renderer, worldBounds, 32, (generation) => {
    document.getElementById('generation').innerText = generation.toString();
    scoreIncrementer.reset();
});

scoreIncrementer.stop();
// Evolver.run finishes only when all generations are simulated.
window.location.href = 'fail.html';
