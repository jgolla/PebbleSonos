(function() {
  exports.init = function() {
    
    // display configuration screen
    Pebble.addEventListener("showConfiguration", function() {
      var config = "https://dl.dropboxusercontent.com/u/1021323/sonossettings.html";
      var settings = encodeURIComponent(localStorage.getItem("settings"));
      Pebble.openURL(config + "?settings=" + settings);
    });
    
    // close configuration screen
    Pebble.addEventListener("webviewclosed", function(e) {
      try {
        var settings = JSON.parse(decodeURIComponent(e.response));
        localStorage.clear();
        localStorage.setItem("settings", JSON.stringify(settings));
      } catch(err) {
        console.log("No JSON response or received Cancel event");
      }
    });
  };
}());