import { cameraVel, flapForce, gravity } from "./conf.js";

const DID_NOT_HIT = 0;
const HIT_UPPER_PIPE = 1;
const HIT_LOWER_PIPE = 2;

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
            return !bird.isDead || bird.linPos.x > this.shift;
        });

        for (const bird of this.birds) {
            if (bird.isDead) {
                bird.linVel.y += gravity;
                bird.linPos.y += bird.linVel.y;
                bird.angPos -= bird.angVel;
                continue;
            }

            bird.linVel.y += gravity;
            bird.linPos = bird.linPos.plus(bird.linVel);

            if (bird.shouldFlap(this.pipePairs)) {
                bird.linVel.y = -flapForce;
                bird.angPos = bird.angPos < +0.4 ? bird.angPos + bird.angVel * 2 : bird.angPos;
            } else {
                bird.angPos = bird.angPos > -0.2 ? bird.angPos - bird.angVel : bird.angPos;
            }

            for (const pipePair of this.pipePairs) {
                let hitStatus = this.checkCollisions(bird, pipePair);

                if (hitStatus == DID_NOT_HIT) {
                    continue;
                }

                if (hitStatus == HIT_UPPER_PIPE) {
                    bird.missHeight = pipePair.gapPos.y - bird.linPos.y;
                }

                if (hitStatus == HIT_LOWER_PIPE) {
                    bird.missHeight = ((bird.linPos.y - pipePair.gapPos.y) - pipePair.gapBounds.y) + bird.bounds.y;
                }

                bird.isDead = true;
                break;
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
            return DID_NOT_HIT;
        }
        if (bird.linPos.x + bird.bounds.x < pipePair.gapPos.x) {
            return DID_NOT_HIT;
        }
        if (bird.linPos.y < pipePair.gapPos.y) {
            return HIT_UPPER_PIPE;
        }
        if (bird.linPos.y + bird.bounds.y > pipePair.gapPos.y + pipePair.gapBounds.y) {
            return HIT_LOWER_PIPE;
        }
        return DID_NOT_HIT;
    }

    isOver() {
        return this.birds.every((bird) => {
            return bird.isDead && bird.linPos.x < this.shift;
        });
    }
}
