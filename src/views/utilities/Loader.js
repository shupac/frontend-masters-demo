var View         = require('famous/core/View');
var Surface      = require('famous/core/Surface');
var Modifier     = require('famous/core/Modifier');
var Transform    = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');

function Loader() {
    View.apply(this, arguments);

    this.initialTime = Date.now();

    _createBackground.call(this);
    _createLoader.call(this);
}

Loader.prototype = Object.create(View.prototype);
Loader.prototype.constructor = Loader;

Loader.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        properties: {
            backgroundColor: 'black'
        }
    });

    var modifier = new Modifier({
        opacity: 0.7
    });

    this.add(modifier).add(background);
}

function _createLoader() {
    this.loader = new ImageSurface({
        size: [60, 60],
        content: 'images/loader.png'
    });

    var modifier = new Modifier({
        transform: function() {
            return Transform.thenMove(Transform.rotateZ(.0035 * (Date.now() - this.initialTime)), [0, 0, 1]);
        }.bind(this),
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this.add(modifier).add(this.loader);
}

Loader.prototype.reset = function() {
    this.initialTime = Date.now();
};

module.exports = Loader;
