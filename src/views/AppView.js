var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var Easing           = require('famous/transitions/Easing');
var Transitionable   = require('famous/transitions/Transitionable');

var LayoutController = require('../utils/LayoutController');

var LandingView = require('./login/LandingView');
var SignupView  = require('./login/SignupView');
var LoginView   = require('./login/LoginView');

var MenuView    = require('./MenuView');
var ContentView = require('./ContentView');
var ModalView   = require('./ModalView');

var LoginController = require('../controllers/LoginController');

function AppView() {
    View.apply(this, arguments);

    this.contentPosition = new Transitionable(0);
    this.showMenu = false;

    _createLayoutController.call(this);
    _createModal.call(this);
    _addMenu.call(this);

    _createLandingView.call(this);
    _createSignupView.call(this);
    _createLoginView.call(this);

    this.landingView.on('signup', _showRight.bind(this, this.signupView));
    this.landingView.on('login', _showRight.bind(this, this.loginView));
    this.signupView.on('back', _showLeft.bind(this, this.landingView));
    this.signupView.on('submit', _submitSignup.bind(this));

    LoginController.on('accountCreated', _handleAccountCreated.bind(this));

    ContentView.on('menu', _toggleMenu.bind(this));
    MenuView.on('logout', _logout.bind(this));
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
};

function _createLayoutController() {
    var modifier = new Modifier({
        transform: function() {
            return Transform.translate(this.contentPosition.get(), 0, 1)
        }.bind(this)
    });

    this.add(modifier).add(LayoutController);
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

function _createLandingView() {
    this.landingView = new LandingView();

    LayoutController.showRight(this.landingView, { duration: 0 });
}

function _createSignupView() {
    this.signupView = new SignupView();
}

function _createLoginView() {
    this.loginView = new LoginView();
}

function _showLeft(view) {
    LayoutController.showLeft(view);
}

function _showRight(view) {
    LayoutController.showRight(view);
}

function _submitSignup(credentials) {
    // post credentials
    ModalView.showLoader();
    LoginController.submitSignup(credentials);
}

function _handleAccountCreated() {
    ModalView.hideModal();
    _showRight.call(this, ContentView);
}

function _toggleMenu(callback) {
    var position = this.showMenu ? 0 : 300;
    this.contentPosition.halt();
    this.contentPosition.set(position, { duration: 600, curve: Easing.outExpo }, callback);
    this.showMenu = !this.showMenu;
}

function _logout() {
    ModalView.showLoader();
    _toggleMenu.call(this, function() {
        ModalView.hideModal();
        LayoutController.showLeft(this.landingView);
    }.bind(this));
}

module.exports = new AppView();
