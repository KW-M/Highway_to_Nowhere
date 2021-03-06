var GetValue = Phaser.Utils.Objects.GetValue;


export default class EndingR extends Phaser.Scene {
  constructor() {
    super("EndingR")
    this.wasDown = false
  }

  PageTypingText(scene, x, y, text, config) {
    var text = scene.add.rexBBCodeText(x, y, text, config);
    text.page = scene.plugins.get('rextextpageplugin').add(text, GetValue(config, 'page', undefined));
    text.typing = scene.plugins.get('rextexttypingplugin').add(text, GetValue(config, 'type', undefined));

    text.start = function (text, speed) {
      this.page.setText(text);
      if (speed !== undefined) {
        this.typing.setTypeSpeed(speed);
      }
      this.typeNextPage();
    };

    text.typeNextPage = function (speed) {
      if (!this.page.isLastPage) {
        text.forceNextPage()
      } else {
        console.log('done!');

        this.emit('complete');

      }
    };

    text.forceNextPage = function () {
      var txt = this.page.getNextPage();
      this.typing.start(txt);
      console.log('getting next page!');
    };
    text.typing.on('complete', text.typeNextPage, text);
    return text;
  }


  create() {
    console.log("in intro scene")
    var content = `
    As Karen approaches her home, she feels a pang of frustration. However, for the first time in her life, there isn't really anybody to blame for it.
                                        [color=black].[/color]
    She considers how absurd the whole escapade was, how she dragged her whole family out just to bring them back home without having really understood anything. With nowhere else to go, her frustration begins to dissipate.



                      [color=black].[/color]
    With a sad chuckle, she turns to join her children at the window. They watch together as the desert slowly begins to change, as life returns to the earth.`;

    this.text = this.PageTypingText(this, this.cameras.main.width / 2 - 300, this.cameras.main.height / 2 - 300, '', {
      fontSize: '24px',
      wrap: {
        mode: 'word',
        width: 600
      },
      maxLines: 8,
      type: {
        speed: 0.9 * 1000, // found the speed setting
      }
    });

    this.text.once('complete', () => {
      console.log('done');
      window.restartOnBoot = true;
      this.scene.start('MenuScene');
    }).start(content, 50);
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      if (!this.wasDown) {
        this.text.typeNextPage()
      }
      this.wasDown = true
    } else {
      this.wasDown = false
    }
  }

  preload() {
    var url;

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
    this.load.plugin('rexbbcodetextplugin', url, true);

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextpageplugin.min.js';
    this.load.plugin('rextextpageplugin', url, true);

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js';
    this.load.plugin('rextexttypingplugin', url, true);
  }
}