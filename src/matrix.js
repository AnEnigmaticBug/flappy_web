export class Matrix {
    constructor(rows, cols, values) {
        this.rows = rows;
        this.cols = cols;
        this.values = values;
    }

    static custom(rows, cols, f) {
        const values = new Array(rows * cols);

        for (let i = 0; i < values.length; i++) {
            values[i] = f(Math.floor(i / cols), i % cols);
        }

        return new Matrix(rows, cols, values);
    }

    static random(rows, cols) {
        return Matrix.custom(rows, cols, (r, c) => Math.random() - 0.5);
    }

    static zeroes(rows, cols) {
        return Matrix.custom(rows, cols, (r, c) => 0);
    }

    get(r, c) {
        return this.values[c + r * this.cols];
    }

    add(other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw TypeError(`Can't add ${this.rows}x${this.cols} and ${other.rows}x${other.cols}`);
        }

        return Matrix.custom(this.rows, this.cols, (r, c) => this.get(r, c) + other.get(r, c));
    }

    mul(other) {
        if (this.cols !== other.rows) {
            throw TypeError(`Can't mul ${this.rows}x${this.cols} and ${other.rows}x${other.cols}`);
        }

        return Matrix.custom(this.rows, other.cols, (r, c) => {
            let sum = 0;
            for (let i = 0; i < this.cols; i++) {
                sum += this.get(r, i) * other.get(i, c);
            }

            return sum;
        });
    }

    map(f) {
        return Matrix.custom(this.rows, this.cols, (r, c) => f(this.get(r, c)));
    }

    copy() {
        return new Matrix(this.rows, this.cols, Array.from(this.values));
    }
}
