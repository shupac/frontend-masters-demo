var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');

function LandingView() {
    View.apply(this, arguments);

    console.log(this.options.name);
}

LandingView.prototype = Object.create(View.prototype);
LandingView.prototype.constructor = LandingView;

LandingView.DEFAULT_OPTIONS = {
    name: 'Foo'
};

module.exports = LandingView;
