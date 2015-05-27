var Mqtt = require('mqtt');
var mqttClient = Mqtt.connect('mqtt://voyager.orientsoft.cn:11883');

mqttClient.on('connect', function() {
  mqttClient.publish('dualshock-test', JSON.stringify({
    'payload': 'myo'
  }));

  var Myo = require('myo');
  var myMyo = Myo.create();

  myMyo.on('pose', function(poseName, edge){
    var now = new Date();
    var gesture = { 'name': poseName, 'edge':edge };
    var json = { 'name': 'macMyo', 
      'dev': 'myo',
      'time': now.getTime(),
      'type': 'gesture',
      'gesture': gesture
    };

    mqttClient.publish('myo', JSON.stringify(json));

    //myMyo.vibrate('short');
    console.log(json);
  });
});
