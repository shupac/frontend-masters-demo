require('./styles');
require('famous-polyfills');

var Engine = require('famous/core/Engine');
var AppView = require('./views/AppView');

var mainContext = Engine.createContext();

mainContext.add(AppView);
