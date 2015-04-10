/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var sonos = require('sonos.js');

/*
var musicPlayer = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 168),
  text:'Song title',
  //font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  //textAlign:'center',
  backgroundColor:'white'
});

// Add to splashWindow and show
musicPlayer.add(text);
musicPlayer.show();
*/

var main = new UI.Card({
  title: 'PebbleSonos',
  //icon: 'images/menu_icon.png',
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
