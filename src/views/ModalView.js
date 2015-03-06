var View   = require('famous/core/View');
var RenderController = require('famous/views/RenderController');

var Loader = require('./utilities/Loader');

function ModalView() {
    View.apply(this, arguments);

    _createModal.call(this);
    _createLoader.call(this);
}

ModalView.prototype = Object.create(View.prototype);
ModalView.prototype.constructor = ModalView;

ModalView.DEFAULT_OPTIONS = {
};

function _createModal() {
    this.modal = new RenderController({
        inTransition: {
            duration: 100
        },
        outTransition: {
            duration: 100
        }
    });

    this.add(this.modal);
}

function _createLoader() {
    this.loader = new Loader();
}

ModalView.prototype.showLoader = function() {
    this.modal.show(this.loader);
    this.loader.reset();
};

ModalView.prototype.hideModal = function() {
    this.modal.hide();
};

module.exports = new ModalView();
