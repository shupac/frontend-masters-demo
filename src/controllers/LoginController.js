var EventHandler = require('famous/core/EventHandler');

var LoginController = {
    _eventInput: new EventHandler(),
    _eventOutput: new EventHandler()
};

EventHandler.setInputHandler(LoginController, LoginController._eventInput);
EventHandler.setOutputHandler(LoginController, LoginController._eventOutput);

LoginController.submitSignup = function (credentials) {
    setTimeout(function() {
        this._eventOutput.emit('accountCreated');
    }.bind(this), 1000);
}

module.exports = LoginController;
