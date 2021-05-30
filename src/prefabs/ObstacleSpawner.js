import Phaser from 'phaser'

export class ObstacleSpawner {
    constructor(scene, graphics) {
        this.scene = scene
        this.obstacles = []
        this.width = 90 * 3;
        this.colorIndex = 3;

        this.psudoRandomArraySize = 600;
        this.psudoRandomArray = new Array(this.psudoRandomArraySize)
        this.reset()
    }

    generateNewPsudoRandomArray() {
        this.psudoRandomArrayIndex = 0;

        let fillCounter = 0;
        let targetIndex = 0;

        this.psudoRandomArray.fill(-1)
        while (fillCounter < this.psudoRandomArraySize - 1) {
            targetIndex = Math.floor(Math.random() * (this.psudoRandomArraySize + 1));
            // targetIndex++;
            if (this.psudoRandomArray[targetIndex] !== -1 || targetIndex === this.psudoRandomArrayIndex || targetIndex === 0) continue
            // otherwise continue....
            this.psudoRandomArray[this.psudoRandomArrayIndex] = targetIndex;
            this.psudoRandomArrayIndex = targetIndex;
            fillCounter++;
        }
        this.psudoRandomArray[this.psudoRandomArrayIndex] = 0;
        console.log("New Psudo-Random Array: ", this.psudoRandomArray)
    }

    reset() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].destory();
        }
        this.obstacles = []
        this.currentlySpawedAreaTopBound = 0
        this.currentlySpawedAreaBottomBound = 0
        this.generateNewPsudoRandomArray()
    }

    drawObstacle(x, y, texture) {
        let sprite = this.scene.add.image(x, y, texture, null)
        sprite.setDepth(3);
        this.obstacles.push(sprite)
        return sprite;
    }


    addCorrectObstacle(x, y) {
        let SideZonesWidth = 60

        let colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff]
        this.colorIndex += Math.ceil(Math.random() * 3)
        this.colorIndex = this.colorIndex % colors.length;

        if (x < -(this.width / 2) + SideZonesWidth) {
            x = -this.width / 2;
            this.scene.graphicsLayer.lineStyle(2, 0xdd55FF, 1);
            // this.scene.graphicsLayer.fillCircle(x, y, 10);
            this.drawObstacle(x, y, "left_crack_1").setOrigin(0, 0.5).setScale(1.5 + Math.random())
        } else if (x > (this.width / 2) - SideZonesWidth) {
            x = this.width / 2;
            this.scene.graphicsLayer.lineStyle(2, 0xddFFdd, 1);
            // this.scene.graphicsLayer.fillCircle(x, y, 10);
            this.drawObstacle(x, y, "right_crack_1").setOrigin(1, 0.5).setScale(1.5 + Math.random())
        } else {
            this.scene.graphicsLayer.lineStyle(2, colors[this.colorIndex], 1);
            // this.scene.graphicsLayer.strokeCircle(x, y, 6);
            let crackNum = Math.floor(Math.random() * 4) + 1;
            this.drawObstacle(x, y, "crack_" + crackNum).setOrigin(0.5, 0.5).setScale(.5 + Math.random())
        }
    }



    update(topYBound, bottomYBound) {

        let obstacleYSpacing = 200

        let addObstacle = (yPx) => {
            if (Math.abs(yPx) % obstacleYSpacing !== 0) return;

            let yNumber = Math.ceil(Math.abs(yPx) / obstacleYSpacing) % this.psudoRandomArraySize

            let psudoRandomNumber = 0
            do {
                // "random" number generator between 0 & 1:
                psudoRandomNumber = this.psudoRandomArray[yNumber] / (this.psudoRandomArray.length - 1);
                if (this.psudoRandomArray[yNumber] % 3 === 0) return;

                yNumber += 4;
                yPx += 20;

                let xPx = Math.floor((psudoRandomNumber - 0.5) * (this.width - 40))
                this.addCorrectObstacle(xPx, yPx)

            } while (this.psudoRandomArray[yNumber] % 4 === 0);
        }

        // bottom y bound is always the (big or positive) number.
        if (bottomYBound > this.currentlySpawedAreaBottomBound) {
            for (let yPx = this.currentlySpawedAreaBottomBound; yPx < bottomYBound; yPx++) {
                addObstacle(yPx);
            }
            this.currentlySpawedAreaBottomBound = bottomYBound;
        }

        // top y bound is always the (small or negative) number.
        if (topYBound < this.currentlySpawedAreaTopBound) {
            for (let yPx = this.currentlySpawedAreaTopBound; yPx > topYBound; yPx--) {
                addObstacle(yPx);
            }
            this.currentlySpawedAreaTopBound = topYBound;
        }
    }
}