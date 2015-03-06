var LayoutController = require('../utils/LayoutController');
var ModalView        = require('../views/ModalView');
var LoginViews       = require('../views/login/LoginViews');

var MenuActions = {
    logout: function() {
        ModalView.showLoader();
        LayoutController.toggleMenu(function() {
            ModalView.hideModal();
            LayoutController.showLeft(LoginViews.landingView);
        }.bind(this));
    }
};

module.exports = MenuActions;