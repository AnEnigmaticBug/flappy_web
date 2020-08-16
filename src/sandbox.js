import { Bird } from './bird.js';
import { worldBounds } from './conf.js';
import { KeyController } from './controller.js';
import { Game } from './game.js';
import { PipePairGenerator } from './pipe-pair.js';
import { simulateGame } from './util.js';
import { Vec2 } from './vec2.js';

export class Sandbox {
    async run(renderer) {
        const bird = new Bird(
            new Vec2(34, 24),
            new KeyController(32),
        );

        const game = new Game([bird], new PipePairGenerator(worldBounds), worldBounds);
        await simulateGame(game, renderer);
    }
}
