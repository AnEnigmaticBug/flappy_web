import { Evolver } from './evolver.js';
import { Renderer } from './renderer.js';
import { getWorldBounds, resizeCanvas } from './util.js';

const worldBounds = getWorldBounds();
resizeCanvas(worldBounds);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Evolver(200).run(renderer, worldBounds, 32);

// Evolver.run finishes only when all generations are simulated.
window.location.href = 'fail.html';
