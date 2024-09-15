import { Renderer } from './renderer.js';
import { Sandbox } from './sandbox.js';
import { ScoreIncrementer, getWorldBounds, resizeCanvas } from './util.js';

const worldBounds = getWorldBounds();
resizeCanvas(worldBounds);

const scoreIncrementer = new ScoreIncrementer(document.getElementById('score'));

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));
await new Sandbox().run(renderer, worldBounds);

scoreIncrementer.stop();
sessionStorage.setItem('score', scoreIncrementer.maxScore);
// Sandbox.run finishes only when the user loses.
window.location.href = 'fail.html';
