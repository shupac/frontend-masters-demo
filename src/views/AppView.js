var View      = require('famous/core/View');
var Surface   = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var Easing    = require('famous/transitions/Easing');

var Paginator   = require('../utils/Paginator');
var LandingView = require('./login/LandingView');
var SignupView  = require('./login/SignupView');
var LoginView   = require('./login/LoginView');

function AppView() {
    View.apply(this, arguments);

    _createPaginator.call(this);
    _createLandingView.call(this);
    _createSignupView.call(this);
    _createLoginView.call(this);

    this.landingView.on('signup', _showRight.bind(this, this.signupView));
    this.landingView.on('login', _showRight.bind(this, this.loginView));
    this.signupView.on('back', _showLeft.bind(this, this.landingView));
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

function _showLeft(view) {
    this.paginator.showLeft(view);
}

function _showRight(view) {
    this.paginator.showRight(view);
}

module.exports = AppView;
