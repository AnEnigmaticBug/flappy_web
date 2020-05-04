import { worldBounds } from "./conf.js";

const pressedKeys = new Map();

document.addEventListener('keydown', (ev) => {
    pressedKeys.set(ev.keyCode, true);
});

document.addEventListener('keyup', (ev) => {
    pressedKeys.set(ev.keyCode, false);
});

export class KeyController {
    constructor(flapKeyCode) {
        this.flapKeyCode = flapKeyCode;
    }

    shouldFlap(linPos, linVel, pipePairs) {
        return pressedKeys.has(this.flapKeyCode) && pressedKeys.get(this.flapKeyCode);
    }
}

export class NetController {
    constructor(neuralNet) {
        this.neuralNet = neuralNet;
    }

    shouldFlap(linPos, linVel, pipePairs) {
        let closestPipe = null;

        for (let p of pipePairs) {
            if (linPos.x < p.gapPos.x + p.gapBounds.x) {
                closestPipe = p;
            }
        }

        const xSep = closestPipe != null ? closestPipe.gapPos.x - linPos.x : worldBounds.x - linPos.x;
        const ySep = closestPipe != null ? closestPipe.gapPos.y - linPos.y : worldBounds.y - linPos.y;

        return this.neuralNet.guess([
            linPos.y,
            xSep,
            ySep,
            linVel.y,
        ]).get(0, 0) > 0.5;
    }
}
