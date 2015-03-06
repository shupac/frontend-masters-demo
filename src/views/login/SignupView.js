var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var SequentialLayout = require('famous/views/SequentialLayout');
var InputSurface     = require('famous/surfaces/InputSurface');
var RenderNode       = require('famous/core/RenderNode');

var FlexSequence = require('../../utils/FlexSequence');

function SignupView() {
    View.apply(this, arguments);

    this.views = [];

    _createBackground.call(this);
    _createBack.call(this);
    _createLayout.call(this);
    _createUsername.call(this);
    _createPassword.call(this);
    _createSignup.call(this);
    _createLogin.call(this);

    this.back.on('click', function() {
        this._eventOutput.emit('back');
    }.bind(this));
}

SignupView.prototype = Object.create(View.prototype);
SignupView.prototype.constructor = SignupView;

SignupView.DEFAULT_OPTIONS = {
};

function _createBackground() {
    var background = new Surface({
        classes: ['bg-beige', 'text-orange'],
        content: 'Create Account',
        properties: {
            fontSize: '32px',
            paddingTop: '80px',
            textAlign: 'center'
        }
    });

    this.add(background);
}

function _createBack() {
    this.back = new Surface({
        size: [true, true],
        classes: ['text-orange'],
        content: 'back',
        properties: {
            padding: '5px 0'
        }
    });

    var modifier = new Modifier({
        transform: Transform.translate(30, 20, 1)
    });

    this.add(modifier).add(this.back);
}

function _createLayout() {
    this.layout = new FlexSequence({
        itemSpacing: 15,
        childOrigin: [0.5, 0]
    });

    this.layout.sequenceFrom(this.views);

    var modifier = new Modifier({
        size: function() {
            return [280, this.layout.getSize()[1]];
        }.bind(this),
        origin: [0.5, 0],
        align: [0.5, 0],
        transform: Transform.translate(0, 140, 1)
    });

    this.add(modifier).add(this.layout);
}

function _createUsername() {
    this.username = new InputSurface({
        size: [undefined, 40],
        classes: ['input'],
        type: 'email',
        placeholder: 'username'
    });

    this.views.push(this.username);
}

function _createPassword() {
    this.password = new InputSurface({
        size: [undefined, 40],
        classes: ['input'],
        type: 'password',
        placeholder: 'password'
    });

    this.views.push(this.password);
}

function _createSignup() {
    this.signup = new Surface({
        size: [200, 40],
        classes: ['bg-orange', 'button-round'],
        content: 'Sign Up',
        properties: {
            color: 'white'
        }
    });

    this.views.push({
        renderable: this.signup,
        itemSpacing: 40
    });
}

function _createLogin() {
    this.login = new Surface({
        size: [200, 40],
        classes: ['text-orange', 'button-round'],
        content: 'Login'
    });

    var node = new RenderNode();
    var modifier = new Modifier({
        origin: [0.5, 0],
        align: [0.5, 0]
    });
    node.add(modifier).add(this.login);

    this.views.push(node);
}

module.exports = SignupView;
