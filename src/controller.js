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
