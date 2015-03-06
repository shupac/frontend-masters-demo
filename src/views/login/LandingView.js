var View      = require('famous/core/View');
var Surface   = require('famous/core/Surface');
var Modifier  = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

function LandingView() {
    View.apply(this, arguments);

    _createBackground.call(this);
    _createSignup.call(this);
    _createLogin.call(this);

    this.signup.on('click', function() {
        this._eventOutput.emit('signup');
    }.bind(this));

    this.login.on('click', function() {
        this._eventOutput.emit('login');
    }.bind(this));
}

LandingView.prototype = Object.create(View.prototype);
LandingView.prototype.constructor = LandingView;

LandingView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-blue', 'text-orange'],
        content: 'Jukebox',
        properties: {
            paddingTop: '35%',
            fontFamily: 'Verdana',
            fontSize: '48px',
            textAlign: 'center'
        }
    });

    this.add(background);
}

function _createSignup() {
    this.signup = new Surface({
        size: [200, 40],
        classes: ['bg-orange', 'button-round'],
        content: 'Create Account',
        properties: {
            color: 'white'
        }
    });

    var modifier = new Modifier({
        origin: [0.5, 0.7],
        align: [0.5, 0.7],
        transform: Transform.translate(0, 0, 1)
    });

    this.add(modifier).add(this.signup);
}

function _createLogin() {
    this.login = new Surface({
        size: [200, 40],
        classes: ['button-round', 'text-orange'],
        content: 'Login'
    });

    var modifier = new Modifier({
        origin: [0.5, 0.7],
        align: [0.5, 0.7],
        transform: Transform.translate(0, 60, 1)
    });

    this.add(modifier).add(this.login);
}

module.exports = LandingView;
