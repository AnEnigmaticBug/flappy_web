import { Bird } from './bird.js';
import { worldBounds } from './conf.js';
import { KeyController } from './controller.js';
import { Game } from './game.js';
import { PipePairGenerator } from './pipe-pair.js';
import { Renderer } from './renderer.js';
import { resizeCanvas } from './util.js';
import { Vec2 } from './vec2.js';

resizeCanvas(worldBounds);

const game = new Game(
    [
        new Bird(new Vec2(34, 24), new KeyController(32)),
    ],
    new PipePairGenerator(worldBounds),
    worldBounds,
);

const renderer = new Renderer(document.getElementById('canvas').getContext('2d'));

const loop = () => {
    game.update();
    renderer.render(game);
    requestAnimationFrame(loop);
};

loop();
