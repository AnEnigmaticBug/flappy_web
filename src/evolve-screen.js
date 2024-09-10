import { Evolver } from './evolver.js';
import { Renderer } from './renderer.js';
import { ScoreIncrementer, getWorldBounds, resizeCanvas } from './util.js';

const worldBounds = getWorldBounds();
resizeCanvas(worldBounds);

const scoreIncrementer = new ScoreIncrementer(document.getElementById('score'));

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
const populationSize = 200;
sessionStorage.setItem('populationSize', populationSize);

const onFinish = () => {
    scoreIncrementer.stop();
    sessionStorage.setItem('maxScore', scoreIncrementer.maxScore);
    window.location.href = 'result.html';
};
document.getElementById('end-button').addEventListener('click', onFinish);

await new Evolver(populationSize).run(renderer, worldBounds, 32, (generation) => {
    document.getElementById('generation').innerText = generation.toString();
    scoreIncrementer.reset();
    sessionStorage.setItem('generationCount', generation + 1);
});

// Evolver.run finishes only when all generations are simulated.
onFinish();
