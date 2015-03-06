var LayoutController = require('../utils/LayoutController');
var LoginViews       = require('../views/login/LoginViews');
var ModalView        = require('../views/ModalView');
var LoginController  = require('../controllers/LoginController');

var LoginActions = {
    showSignup: function() {
        LayoutController.showRight(LoginViews.signupView);
    },

    showLogin: function() {
        LayoutController.showRight(LoginViews.loginView);
    },

    backSignup: function() {
        LayoutController.showLeft(LoginViews.landingView);
    },

    submitSignup: function(credentials) {
        ModalView.showLoader();
        LoginController.submitSignup(credentials);
    }
};

module.exports = LoginActions;