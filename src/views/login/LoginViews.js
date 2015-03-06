var EventUtilities = require('../../utils/EventUtilities');
var EventHandler   = require('famous/core/EventHandler');

var LandingView = require('./LandingView');
var SignupView  = require('./SignupView');
var LoginView   = require('./LoginView');

function LoginViews() {
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);

    this.landingView = new LandingView();
    this.signupView = new SignupView();
    this.loginView = new LoginView();

    _registerEvents.call(this);
}

function _registerEvents() {
    EventUtilities.reEmit.call(this, this.landingView, 'signup', 'showSignup');
    EventUtilities.reEmit.call(this, this.landingView, 'login', 'showLogin');
    EventUtilities.reEmit.call(this, this.signupView, 'back', 'backSignup');
    EventUtilities.reEmit.call(this, this.signupView, 'submit', 'submitSignup');
    EventUtilities.reEmit.call(this, this.loginView, 'back', 'backLogin');
    EventUtilities.reEmit.call(this, this.loginView, 'submit', 'submitLogin');
}

module.exports = new LoginViews();
