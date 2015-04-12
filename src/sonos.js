(function(){
  
  var ip = require('ip.js');
  var isPlaying = false;
  
  // check if we are playing or not
  (function() {
    var soapData = makeSOAPDataObject("GetTransportInfo", "GetTransportInfo");
    makeRequestToSonosZone(soapData, function(request) {
      isPlaying = request.response.indexOf("PLAYING") > -1;
    });
  }());
  
  function doAction(eventType, cmdType) {
    return function() {
      
      if(eventType === "play" || eventType === "pause") {
        if(isPlaying) {
          isPlaying = false;
          eventType = "pause";
          cmdType = "Pause";
        } else {
          isPlaying = true;
          eventType = "play";
          cmdType = "Play";
        }  
      }
      
      var soapData = makeSOAPDataObject(eventType, cmdType);
      makeRequestToSonosZone(soapData);
    };
  }
  
  function makeSOAPDataObject(eventType, cmdType, uriType, actionType, bodyData) {
    if (!bodyData || bodyData === undefined) {
      bodyData = "<u:" + cmdType + " xmlns:u=\"urn:schemas-upnp-org:service:AVTransport:1\"><InstanceID>0</InstanceID><Speed>1</Speed></u:" + cmdType + ">";
    }
    
    var bodyText = "<?xml version=\"1.0\" encoding=\"utf-8\"?><s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body>" + bodyData + "</s:Body></s:Envelope>";
    
    return {
      type : eventType,
      uri : uriType || "/MediaRenderer/AVTransport/Control",
      action : actionType || "urn:schemas-upnp-org:service:AVTransport:1#" + cmdType,
      body : bodyText
    };
  }
  
  function makeRequestToSonosZone(SOAPData, callback) {
    if (SOAPData === false || SOAPData === undefined) {
      console.log("Invalid SOAP data: " + JSON.stringify(SOAPData));
      return;
    }
    
    var url = "http://" + ip.getIP() + ":1400" + SOAPData.uri;
    try {
      var request = new XMLHttpRequest();
      request.open("POST", url, false);
      request.setRequestHeader("SOAPAction", SOAPData.action);
      request.setRequestHeader("Content-Type", "text/xml");
      request.onload = function (e) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            if (callback) {
              callback(request, SOAPData);
            }
          } else {
            console.log('Request: ', request);
            console.log("Request returned error code " + request.status.toString());
          }
        }
      };
      request.send(SOAPData.body);
    } catch (error) {
      console.log("Error in XMLHttpRequest: " + error);
    }
  }
  
  exports.playPause = doAction("play", "Play");
  exports.previous = doAction("prev", "Previous");
  exports.next = doAction("next", "Next");
  
}());