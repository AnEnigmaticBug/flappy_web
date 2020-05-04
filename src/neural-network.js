import { Matrix } from './matrix.js';

class ActivationFns {
    static relu(x) {
        return x > 0 ? x : 0;
    }

    static sigmoid(x) {
        return 1 / (1 + Math.pow(Math.E, -x));
    }
}

export class NeuralNetwork {
    constructor(ipSize, layerSizes) {
        this.ws = [];
        this.bs = [];
        this.activationFns = [];
        this.ipSize = ipSize;
        this.layerSizes = layerSizes;
        this.layerCount = layerSizes.length;

        for (let i = 0; i < this.layerCount; ++i) {
            this.ws.push(Matrix.random(layerSizes[i], i == 0 ? ipSize : layerSizes[i - 1]));
            this.bs.push(Matrix.random(layerSizes[i], 1));

            this.activationFns.push(ActivationFns.relu);
        }

        this.activationFns[this.layerCount - 1] = ActivationFns.sigmoid;
    }

    guess(inputs) {
        let a = new Matrix(inputs.length, 1, inputs);

        for (let i = 0; i < this.layerCount; ++i) {
            const w = this.ws[i];
            const b = this.bs[i];
            a = w.mul(a).add(b).map(this.activationFns[i]);
        }

        return a;
    }

    copy() {
        const copy = new NeuralNetwork(this.ipSize, this.layerSizes);

        for (let i = 0; i < this.layerCount; ++i) {
            copy.ws[i] = this.ws[i].copy();
            copy.bs[i] = this.bs[i].copy();
        }

        return copy;
    }
}
