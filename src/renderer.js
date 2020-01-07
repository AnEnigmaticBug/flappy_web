export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.pipeHeadImg = new Image();
        this.pipeHeadImg.src = './assets/images/pipe-head.png';
        this.pipeBodyImg = new Image();
        this.pipeBodyImg.src = './assets/images/pipe-body.png';
        this.birdFrames = [new Image(), new Image(), new Image()];
        this.birdFrames[0].src = './assets/images/bird-0.png';
        this.birdFrames[1].src = './assets/images/bird-1.png';
        this.birdFrames[2].src = './assets/images/bird-2.png';
        this.backgroundImg = new Image();
        this.backgroundImg.src = './assets/images/background.png';
        this.frameIndex = 0;
        this.flapPeriod = 4;
    }

    render(game) {
        if (game.ticks % this.flapPeriod == 0) {
            this.frameIndex = (this.frameIndex + 1) % 3;
        }

        const scale = this.ctx.canvas.height / game.worldBounds.y;
        this.ctx.scale(scale, scale);

        this.drawBackground(game);
        this.drawBirds(game);
        this.drawPairs(game);
        

        this.ctx.resetTransform();
    }

    drawBackground(game) {
        const ratio = this.backgroundImg.width / this.backgroundImg.height;
        const width = ratio * game.worldBounds.y;

        const xOffset = game.shift % width;

        for (let i = 0; i < (game.worldBounds.x / width) + 1; i++) {
            this.ctx.drawImage(this.backgroundImg, width * i - xOffset, 0, width, game.worldBounds.y);
        }
    }

    drawBirds(game) {
        const birdImg = this.birdFrames[this.frameIndex];
        for (const bird of game.birds) {
            const x = bird.linPos.x - game.shift;
            const y = bird.linPos.y;
            this.ctx.save();
            this.ctx.translate(x + bird.bounds.x / 2, y + bird.bounds.y / 2);
            this.ctx.rotate(bird.angPos);
            this.ctx.drawImage(birdImg, -bird.bounds.x / 2, -bird.bounds.y / 2, bird.bounds.x, bird.bounds.y);
            this.ctx.restore();
        }
    }

    drawPairs(game) {
        for (const pair of game.pipePairs) {
            this.ctx.save();
            this.ctx.translate(pair.gapPos.x - game.shift, 0);
            this.drawUpperPipe(game.worldBounds, pair);
            this.drawLowerPipe(game.worldBounds, pair);
            this.ctx.restore();
        }
    }

    drawUpperPipe(worldBounds, pipePair) {
        this.ctx.save();
        this.ctx.translate(0, pipePair.gapPos.y);
        this.ctx.rotate(Math.PI);
        this.ctx.translate(-pipePair.gapBounds.x, 0);
        this.drawPipe(worldBounds, pipePair.gapBounds);
        this.ctx.restore();
    }

    drawLowerPipe(worldBounds, pipePair) {
        this.ctx.save();
        this.ctx.translate(0, pipePair.gapPos.y + pipePair.gapBounds.y);
        this.drawPipe(worldBounds, pipePair.gapBounds);
        this.ctx.restore();
    }

    drawPipe(worldBounds, gapBounds) {
        const scale = gapBounds.x / this.pipeHeadImg.width;
        const headHeight = this.pipeHeadImg.height * scale;
        const bodyHeight = this.pipeBodyImg.height * scale;

        this.ctx.drawImage(this.pipeHeadImg, 0, 0, gapBounds.x, headHeight);

        for (let i = 0; i < Math.ceil(worldBounds.y / headHeight); i++) {
            this.ctx.drawImage(this.pipeBodyImg, 0, headHeight + bodyHeight * i - i, gapBounds.x, bodyHeight);
        }
    }
}
