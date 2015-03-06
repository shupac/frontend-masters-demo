var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var Easing           = require('famous/transitions/Easing');

var LayoutController = require('../utils/LayoutController');

var MenuView    = require('./MenuView');
var ContentView = require('./ContentView');
var ModalView   = require('./ModalView');

var LoginViews = require('./login/LoginViews');

var LoginActions = require('../actions/LoginActions');

var LoginController = require('../controllers/LoginController');

// Central dispatcher
// Should not store state

function AppView() {
    View.apply(this, arguments);

    _createLayoutController.call(this);
    _createModal.call(this);
    _addMenu.call(this);

    LoginController.on('accountCreated', LoginActions.handleAccountCreated);
    ContentView.on('menu', LayoutController.toggleMenu.bind(LayoutController));
    MenuView.on('logout', _logout.bind(this));

    LayoutController.showRight(LoginViews.landingView, { duration: 0 });

    _registerLoginViewEvents.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
};

function _createLayoutController() {
    this.add(LayoutController);
}

function _createModal() {
    var modifier = new Modifier({
        transform: Transform.translate(0, 0, 100)
    });

    this.add(modifier).add(ModalView);
}

function _addMenu() {
    var modifier = new Modifier({
        size: [300, undefined],
        transform: Transform.translate(0, 0, -1)
    });

    this.add(modifier).add(MenuView);
}

function _registerLoginViewEvents() {
    LoginViews.on('showSignup', LoginActions.showSignup);
    LoginViews.on('showLogin', LoginActions.showLogin);
    LoginViews.on('backSignup', LoginActions.backSignup);
    LoginViews.on('submitSignup', LoginActions.submitSignup);
}

function _logout() {
    ModalView.showLoader();
    LayoutController.toggleMenu(function() {
        ModalView.hideModal();
        LayoutController.showLeft(LoginViews.landingView);
    }.bind(this));
}

module.exports = new AppView();
