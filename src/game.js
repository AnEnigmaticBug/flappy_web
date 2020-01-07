import { cameraVel, flapForce, gravity } from "./conf.js";

export class Game {
    constructor(birds, pipePairGenerator, worldBounds) {
        this.birds = birds;
        this.pipePairGenerator = pipePairGenerator;
        this.worldBounds = worldBounds;
        this.shift = 0;
        this.ticks = 0;
        this.pipePairs = [];

        pipePairGenerator.fastForwardTo(worldBounds.x);
    }

    update() {
        this.birds = this.birds.filter((bird) => {
            return !bird.isDead;
        });

        for (const bird of this.birds) {
            bird.linVel.y += gravity;
            bird.linPos = bird.linPos.plus(bird.linVel);

            if (bird.shouldFlap(this.pipePairs)) {
                bird.linVel.y = -flapForce;
            }

            for (const pipePair of this.pipePairs) {
                if (this.checkCollisions(bird, pipePair)) {
                    bird.isDead = true;
                    break;
                }
            }
        }

        this.managePipePairs();

        this.shift += cameraVel;
        this.ticks++;
    }

    managePipePairs() {
        this.pipePairs = this.pipePairs.filter((pair) => {
            return pair.gapPos.x + pair.gapBounds.x > this.shift;
        }, this);

        while (this.pipePairGenerator.test().gapPos.x < this.shift + this.worldBounds.x) {
            this.pipePairs.push(this.pipePairGenerator.next());
        }
    }

    checkCollisions(bird, pipePair) {
        if (bird.linPos.x > pipePair.gapPos.x + pipePair.gapBounds.x) {
            return false;
        }
        if (bird.linPos.x + bird.bounds.x < pipePair.gapPos.x) {
            return false;
        }
        if (bird.linPos.y < pipePair.gapPos.y) {
            return true;
        }
        if (bird.linPos.y + bird.bounds.y > pipePair.gapPos.y + pipePair.gapBounds.y) {
            return true;
        }
        return false;
    }
}