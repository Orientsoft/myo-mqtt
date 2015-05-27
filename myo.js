var Mqtt = require('mqtt');
var mqttClient = Mqtt.connect({ 'host': 'voyager.orientsoft.cn', 'port': 11883 });

var Myo = require('myo');
var myMyo = Myo.create();

// parameters
var outTopic = 'myo-test-out';
var inTopic = 'myo-test-in';
 
myMyo.on('pose', function(poseName, edge){
  var now = new Date();
  var gesture = { 'name': poseName, 'edge':edge };
  var json = { 'name': 'macMyo', 
    'dev': 'myo',
    'time': now.getTime(),
    'type': 'gesture',
    'gesture': gesture
  };

  mqttClient.publish(outTopic, JSON.stringify(json));
  //myMyo.vibrate('short');
  console.log(json);
});
