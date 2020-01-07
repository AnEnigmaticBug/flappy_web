import { cameraVel, worldBounds } from './conf.js';
import { Vec2 } from "./vec2.js";

export class Bird {
    constructor(bounds, controller) {
        this.linPos = new Vec2(worldBounds.x * 0.3, 50);
        this.linVel = new Vec2(cameraVel, 0);
        this.angPos = 0;
        this.angVel = 0.1;
        this.bounds = bounds;
        this.controller = controller;
        this.isDead = false;
        this.points = 0;
    }

    shouldFlap(pipePairs) {
        return this.controller.shouldFlap(this.linPos, this.linVel, this.bounds, pipePairs);
    }
}
