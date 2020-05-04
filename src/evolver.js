import { Bird } from './bird.js';
import { worldBounds } from './conf.js';
import { NetController } from './controller.js';
import { Game } from './game.js';
import { NeuralNetwork } from './neural-network.js';
import { PipePairGenerator } from './pipe-pair.js';
import { Vec2 } from './vec2.js';

async function simulateGame(game, renderer) {
    while (true) {
        if (game.isOver()) {
            return;
        }

        game.update();
        renderer.render(game);
        await new Promise(requestAnimationFrame);
    }
}

function compareBirds(b1, b2) {
    const xDiff = b2.linPos.x - b1.linPos.x;
    if (xDiff == 0) {
        return b1.missHeight - b2.missHeight;
    }

    return xDiff;
}

function getMatingBird(birds) {
    const competitor1 = birds[Math.floor(Math.random() * birds.length)];
    const competitor2 = birds[Math.floor(Math.random() * birds.length)];

    return compareBirds(competitor1, competitor2) <= 0 ?
        competitor1 :
        competitor2;
}

export class Evolver {
    constructor(populationSize) {
        this.population = [];

        for (let i = 0; i < populationSize; ++i) {
            this.population.push(new NeuralNetwork(4, [2, 2, 1]));
        }
    }

    async run(renderer, generationCount) {
        for (let g = 0; g < generationCount; ++g) {
            let birds = this.population.map((net) => {
                return new Bird(
                    new Vec2(34, 24),
                    new NetController(net),
                );
            });

            const game = new Game(birds, new PipePairGenerator(worldBounds), worldBounds);
            await simulateGame(game, renderer);

            birds.sort(compareBirds);
            birds = birds.slice(0, birds.length / 4);

            this.population.length = 0;

            for (let i = 0; i < birds.length * 1; ++i) {
                this.population.push(birds[i].controller.neuralNet);
            }

            for (let i = 0; i < birds.length * 1; ++i) {
                this.population.push(
                    birds[i].controller.neuralNet
                        .copy()
                        .mutate(0.3, 0.1),
                );
            }

            for (let i = 0; i < birds.length * 2; ++i) {
                const b1 = getMatingBird(birds);
                const b2 = getMatingBird(birds);

                this.population.push(
                    b1.controller.neuralNet
                        .crossWith(b2.controller.neuralNet)
                        .mutate(0.4, 0.2),
                );
            }
        }
    }
}
