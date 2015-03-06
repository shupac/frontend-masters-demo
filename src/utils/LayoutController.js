var Paginator = require('./Paginator');
var Easing    = require('famous/transitions/Easing');

module.exports = new Paginator({
    inTransition: {
        curve: Easing.outExpo,
        duration: 800
    },
    outTransition: {
        curve: Easing.outExpo,
        duration: 800
    }
});
