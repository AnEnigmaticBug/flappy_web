import { Renderer } from './renderer.js';
import { Sandbox } from './sandbox.js';
import { getWorldBounds, resizeCanvas } from './util.js';

const worldBounds = getWorldBounds();
resizeCanvas(worldBounds);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Sandbox().run(renderer, worldBounds);

// Sandbox.run finishes only when the user loses.
window.location.href = 'fail.html';
