var Mqtt = require('mqtt');
var mqttClient = Mqtt.connect({ 'host': 'voyager.orientsoft.cn', 'port': 11883 });

var topic = 'myo-test-out';

mqttClient.subscribe(topic);
mqttClient.on('message', function(topic, message) {
  console.log(topic + ' - ' + message);
});
