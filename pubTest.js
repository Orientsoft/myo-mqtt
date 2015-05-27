var Mqtt = require('mqtt');
var mqttClient = Mqtt.connect({'host': 'voyager.orientsoft.cn', 'port': 11883});

// parameters
var outTopic = 'myo-test-out';
var inTopic = 'myo-test-in';
 
mqttClient.publish(outTopic, 'hello world');
