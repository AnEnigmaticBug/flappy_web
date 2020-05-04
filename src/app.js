import { worldBounds } from './conf.js';
import { Renderer } from './renderer.js';
import { resizeCanvas } from './util.js';
import { Evolver } from './evolver.js';

resizeCanvas(worldBounds);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
new Evolver(200).run(renderer, 32);
