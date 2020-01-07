import { Vec2 } from "./vec2.js";

export class PipePair {
    constructor(gapPos, gapBounds) {
        this.gapPos = gapPos;
        this.gapBounds = gapBounds;
    }
}

export class PipePairGenerator {
    constructor(worldBounds) {
        this.worldBounds = worldBounds;
        this.n = 0;
        this.randomization = Math.random();
    }

    test() {
        return new PipePair(
            new Vec2(240 * this.n, (this.worldBounds.y / 2) - 60 + Math.sin(this.n * 2 + this.randomization) * 60),
            new Vec2(60, 120),
        );
    }

    next() {
        const p = this.test();
        this.n++;
        return p;
    }

    fastForwardTo(x) {
        while (this.next().gapPos.x < x) { }
    }
}
