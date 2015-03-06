var View      = require('famous/core/View');
var Surface   = require('famous/core/Surface');
var Modifier  = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

function HeaderView() {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createLeftButton.call(this);

    this.leftButton.on('click', function() {
        this._eventOutput.emit('menu');
    }.bind(this));
}

HeaderView.prototype = Object.create(View.prototype);
HeaderView.prototype.constructor = HeaderView;

HeaderView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-orange'],
        content: 'Jukebox',
        properties: {
            color: 'white',
            textAlign: 'center',
            fontSize: '24px',
            lineHeight: '44px'
        }
    });

    this.add(background);
}

function _createLeftButton() {
    this.leftButton = new Surface({
        size: [44, 44],
        content: '<img style="height:100%;" src="images/hamburger.png">',
        properties: {
            padding: '7px'
        }
    });

    var modifier = new Modifier({
        transform: Transform.translate(0, 0, 1)
    });

    this.add(modifier).add(this.leftButton);
}

module.exports = HeaderView;
