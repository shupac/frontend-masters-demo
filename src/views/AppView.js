var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');

var LandingView = require('./login/LandingView');

function AppView() {
    View.apply(this, arguments);

    _createLandingView.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
};

function _createLandingView() {
    this.landingView = new LandingView({
        name: 'Bar'
    });
}

module.exports = AppView;
