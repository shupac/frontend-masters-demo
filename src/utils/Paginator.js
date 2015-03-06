var Entity           = require('famous/core/Entity');
var Transform        = require('famous/core/Transform');
var RenderController = require('famous/views/RenderController');

var ZMAX = 0.0001

function Paginator(options) {
    this._currentTarget = null;
    this._size = [undefined, undefined];

    this._controller = new RenderController(options);
    this._entityId = Entity.register(this);

    this._controller.inOpacityFrom(function() {
        return 1;
    });

    this._controller.outOpacityFrom(function() {
        return 1;
    });

    _createTransforms.call(this);
    if (options) this.setOptions(options);
}

function _createTransforms() {
    this.leftMap = _transformLeft.bind(this);
    this.rightMap = _transformRight.bind(this);
}

function _transformLeft(progress) {
    return Transform.translate(-this._size[0] * (1 - progress), 0, ZMAX * (1 - progress));
}

function _transformRight(progress) {
    return Transform.translate(this._size[0] * (1 - progress), 0, -ZMAX * (1 - progress));
}

Paginator.prototype.showRight = function(content) {
    this._controller.inTransformFrom(this.rightMap);
    this._controller.outTransformFrom(this.leftMap);
    this._currentTarget = content;
    this._controller.show.apply(this._controller, arguments);
};

Paginator.prototype.showLeft = function(content) {
    this._controller.inTransformFrom(this.leftMap);
    this._controller.outTransformFrom(this.rightMap);
    this._currentTarget = content;
    this._controller.show.apply(this._controller, arguments);
};

Paginator.prototype.setOptions = function setOptions(options) {
    this._controller.setOptions(options);
};

Paginator.prototype.render = function render() {
    return this._entityId;
};

Paginator.prototype.commit = function commit(context) {
    this._size[0] = context.size[0];
    this._size[1] = context.size[1];

    return {
        transform: context.transform,
        opacity: context.opacity,
        origin: context.origin,
        size: context.size,
        target: this._controller.render()
    };
};

module.exports = Paginator;
