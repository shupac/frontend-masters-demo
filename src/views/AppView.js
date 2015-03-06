var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var Easing           = require('famous/transitions/Easing');
var RenderController = require('famous/views/RenderController');

var Paginator   = require('../utils/Paginator');
var LandingView = require('./login/LandingView');
var SignupView  = require('./login/SignupView');
var LoginView   = require('./login/LoginView');
var Loader      = require('./utilities/Loader');

var ContentView = require('./ContentView');

var LoginController = require('../controllers/LoginController');

function AppView() {
    View.apply(this, arguments);

    _createPaginator.call(this);
    _createModal.call(this);

    _createLandingView.call(this);
    _createSignupView.call(this);
    _createLoginView.call(this);
    _createLoader.call(this);

    this.landingView.on('signup', _showRight.bind(this, this.signupView));
    this.landingView.on('login', _showRight.bind(this, this.loginView));
    this.signupView.on('back', _showLeft.bind(this, this.landingView));
    this.signupView.on('submit', _submitSignup.bind(this));
    LoginController.on('accountCreated', _handleAccountCreated.bind(this));
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
};

function _createPaginator() {
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

    this.add(this.paginator);
}

function _createModal() {
    this.modal = new RenderController({
        inTransition: {
            duration: 100
        },
        outTransition: {
            duration: 100
        }
    });
    
    var modifier = new Modifier({
        transform: Transform.translate(0, 0, 100)
    });

    this.add(modifier).add(this.modal);
}

function _createLandingView() {
    this.landingView = new LandingView();

    this.paginator.showRight(this.landingView, { duration: 0 });
}

function _createSignupView() {
    this.signupView = new SignupView();
}

function _createLoginView() {
    this.loginView = new LoginView();
}

function _createLoader() {
    this.loader = new Loader();
}

function _showLeft(view) {
    this.paginator.showLeft(view);
}

function _showRight(view) {
    this.paginator.showRight(view);
}

function _showLoader() {
    this.modal.show(this.loader);
    this.loader.reset();
}

function _submitSignup(credentials) {
    // post credentials
    _showLoader.call(this);
    LoginController.submitSignup(credentials);
}

function _handleAccountCreated() {
    this.modal.hide();
    _showRight.call(this, ContentView);
}

module.exports = new AppView();
