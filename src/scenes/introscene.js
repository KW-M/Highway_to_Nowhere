var GetValue = Phaser.Utils.Objects.GetValue;


export default class Introscene extends Phaser.Scene {
    constructor() {
        super("Introscene")
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
        var txt = this.page.getNextPage();
        this.typing.start(txt);
      } else {
        this.emit('complete');
      }
    };

    text.typing.on('complete', text.typeNextPage, text);
    return text;
    }

  create() {
    console.log("in intro scene")
    var content = `
    In the year 20XX, Earth has become inhospitable to the human race. 
    Aliens from Planet Nowhere have descended to intervene. The Nowherians have two heads, each making different claims and promising different things. 
    
    They say there's a space elevator down Highway 51, and something about eforts to terraform the Earth. [b] They say we don't have much time.[/b]


    You burst into the living room where the kids are playing JortFite and you tell them it's time to go. Everybody gets in the car and you drive off towards the highway. You'll get your answers the only way you know how: [color=red] you will speak to their manager. [/color]`;

    var text = this.PageTypingText(this, this.game.config.width / 2 - 300, this.game.config.height / 2, '', {
        fontSize: '24px',
        wrap: {
          mode: 'word',
          width: 600
        },
        maxLines: 7
      });
      text.once('complete', function () {
        console.log('done');
      }).start(content, 50);
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
        var txt = this.page.getNextPage();
        this.typing.start(txt);
      } else {
        this.emit('complete');
      }
    }
    text.typing.on('complete', text.typeNextPage, text);
    return text;
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