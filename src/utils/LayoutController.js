var Paginator      = require('./Paginator');
var View           = require('famous/core/View');
var Easing         = require('famous/transitions/Easing');
var RenderNode     = require('famous/core/RenderNode');
var Modifier       = require('famous/core/Modifier');
var Transform      = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');

function LayoutController() {
    View.apply(this, arguments);

    this.contentPosition = new Transitionable(0);
    this.showMenu = false;
    
    var modifier = new Modifier({
        transform: function() {
            return Transform.translate(this.contentPosition.get(), 0, 1)
        }.bind(this)
    });

    this.paginator = new Paginator({
        inTransition: {
            curve: Easing.outExpo,
            duration: 800
        },
        outTransition: {
            curve: Easing.outExpo,
            duration: 800
        }
    });

    this.add(modifier).add(this.paginator);
}

LayoutController.prototype = Object.create(View.prototype);
LayoutController.prototype.constructor = LayoutController;

LayoutController.prototype.toggleMenu = function(callback) {
    var position = this.showMenu ? 0 : 300;
    this.contentPosition.halt();
    this.contentPosition.set(position, { duration: 600, curve: Easing.outExpo }, callback);
    this.showMenu = !this.showMenu;
};

LayoutController.prototype.showRight = function() {
    this.paginator.showRight.apply(this.paginator, arguments);
};

LayoutController.prototype.showLeft = function() {
    this.paginator.showLeft.apply(this.paginator, arguments);
};

module.exports = new LayoutController();
