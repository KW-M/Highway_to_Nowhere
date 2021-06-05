import images_box from 'url:/assets/grey_box.png';
import images_checkbox from 'url:/assets/desert_bg.png';
import button02 from 'url:/assets/blue_button02.png'
import button03 from 'url:/assets/blue_button02.png'


export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('menuScene');
  }

  preload() {
    this.load.image('box', images_box);
    this.load.image('checkedBox', images_checkbox);
    this.load.image('blueButton1', button02);
    this.load.image('blueButton2', button03);
  }

  create () {
    this.gameButton = this.add.sprite(0, -100, 'blueButton1').setInteractive();
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', (pointer) => {
      // this.events.off();
      // this.scale.off('resize')
      this.scene.start('playScene');
    });

    this.optionsButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);
    this.optionsButton.on('pointerdown', (pointer) => {
      // this.events.off();
      // this.scale.off('resize')
      this.scene.start('dialogscene');
      // this.scene.start('optionsScene');
    });

    this.controlsButton = this.add.sprite(0, 100, 'blueButton1').setInteractive();
    this.controlsText = this.add.text(0, 0, 'Controls', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.controlsText, this.controlsButton);
    this.controlsButton.on('pointerdown', function (pointer) {
      // this.events.off();
      // this.scale.off('resize')
      this.scene.start('Introscene');
    }.bind(this));

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1');
    });

    // handle when the screen size changes (device rotated, window resized, etc...)
    this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
      if (this.cameras.main === undefined) return;
      this.cameras.resize(gameSize.width, gameSize.height);
      this.cameras.main.centerOn(0, 0)
    });
    this.cameras.main.centerOn(0, 0)
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};
