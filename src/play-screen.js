import { worldBounds } from './conf.js';
import { Renderer } from './renderer.js';
import { Sandbox } from './sandbox.js';
import { resizeCanvas } from './util.js';

resizeCanvas(worldBounds);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Sandbox().run(renderer);

// Sandbox.run finishes only when the user loses.
window.location.href = 'fail.html';
