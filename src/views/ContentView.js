var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');

function ContentView() {
    View.apply(this, arguments);

    _createBackground.call(this);
}

ContentView.prototype = Object.create(View.prototype);
ContentView.prototype.constructor = ContentView;

ContentView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-blue']
    });

    this.add(background);
}

module.exports = new ContentView();
