import { worldBounds } from './conf.js';
import { Evolver } from './evolver.js';
import { Renderer } from './renderer.js';
import { resizeCanvas } from './util.js';

resizeCanvas(worldBounds);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Evolver(200).run(renderer, 32);

// Evolver.run finishes only when all generations are simulated.
window.location.href = 'fail.html';
