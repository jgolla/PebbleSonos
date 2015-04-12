var UI = require('ui');
//var Vector2 = require('vector2');
var sonos = require('sonos.js');

// set up configuration
require('configuration').init();

var main = new UI.Card({
  title: 'PebbleSonos',
  icon: 'images/menu_icon.png',
  subtitle: 'Play/Pause',
  body: 'Press select button to play pause'
});

main.show();

main.on('click', 'up', function(e) {
});

main.on('click', 'select', function(e) {
  sonos.playPause();
});

main.on('click', 'down', function(e) {
});