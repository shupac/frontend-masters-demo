var View      = require('famous/core/View');
var Surface   = require('famous/core/Surface');
var Transform = require('famous/core/Transform');

function LoginView() {
    View.apply(this, arguments);

    _createBackground.call(this);
}

LoginView.prototype = Object.create(View.prototype);
LoginView.prototype.constructor = LoginView;

LoginView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-beige']
    });

    this.add(background);
}

module.exports = LoginView;
