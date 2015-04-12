(function() {
  exports.getIP = function() {
    return JSON.parse(localStorage.getItem("settings")).ip;
  };
}());