var LayoutController = require('../utils/LayoutController');

var LoginController  = require('../controllers/LoginController');

var LoginViews       = require('../views/login/LoginViews');
var ModalView        = require('../views/ModalView');
var ContentView      = require('../views/ContentView');

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
    },
    
    handleAccountCreated: function() {
        ModalView.hideModal();
        LayoutController.showRight(ContentView);
    },

    logout: function() {
        
    }
};

module.exports = LoginActions;