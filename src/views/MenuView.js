var View      = require('famous/core/View');
var Surface   = require('famous/core/Surface');
var Modifier  = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

function MenuView() {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createLogout.call(this);

    this.logout.on('click', function() {
        this._eventOutput.emit('logout');
    }.bind(this));
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView;

MenuView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-black']
    });

    this.add(background);
}

function _createLogout() {
    this.logout = new Surface({
        size: [200, 40],
        classes: ['button-round', 'text-orange'],
        content: 'Logout'
    });

    var modifier = new Modifier({
        origin: [0.5, 0.8],
        align: [0.5, 0.8]
    });

    this.add(modifier).add(this.logout);
}

module.exports = new MenuView();
