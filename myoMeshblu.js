// parameters
var myUUID = 'eda93090-cd30-11e4-9bb2-33d0ff29c2d5';
var myToken = 'd45000f01be14d71c794e1f9eaa9f081b7ea298e';
var nodeUUID = '7b1f5340-d9c6-11e4-b36d-a347ebd7f19e';

var Skynet = require('meshblu');
var request = require('request');

var conn = Skynet.createConnection({
  'uuid': myUUID,
  'token': myToken,
  // 'protocol': 'mqtt',
  // 'qos': 0,
  'server': '106.185.42.141',
  'port': 8088
});

conn.on('notReady', function(data) {
  console.log('Not ready.');
  console.log(data);
});

conn.on('ready', function(data) {
  console.log('Ready.');
  console.log(data);
  conn.message({
    'devices': [nodeUUID],
    'payload': 'myo'
  });

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

    conn.message({
      'devices': [nodeUUID],
      'payload': JSON.stringify(json)
    });

    //myMyo.vibrate('short');
    console.log(json);
  });
});
