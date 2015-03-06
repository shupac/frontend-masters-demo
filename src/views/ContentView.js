var View               = require('famous/core/View');
var Surface            = require('famous/core/Surface');
var Modifier           = require('famous/core/Modifier');
var Transform          = require('famous/core/Transform');
var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

var HeaderView = require('./feed/HeaderView');

function ContentView() {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createLayout.call(this);
    _createHeader.call(this);

    this.header.on('menu', function() {
        this._eventOutput.emit('menu');
    }.bind(this));
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

function _createLayout() {
    this.layout = new HeaderFooterLayout({
        headerSize: 44,
        footerSize: 80
    });

    var modifier = new Modifier({
        transform: Transform.translate(0, 0, 1)
    });

    this.add(modifier).add(this.layout);
}

function _createHeader() {
    this.header = new HeaderView();

    this.layout.header.add(this.header);
}

module.exports = new ContentView();
