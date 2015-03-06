var EventUtilities = {};

EventUtilities.reEmit = function(view, event, newEvent) {
    view.on(event, function(arg) {
        this._eventOutput.emit(newEvent || event, arg);
    }.bind(this));
};

module.exports = EventUtilities;
