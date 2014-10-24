
if (process.argv.length !== 3) {
  console.log('usage: node app.js <kafka server:port>');
  process.exit(1);
}

var server = process.argv[2];

var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var client = new kafka.Client(server);
var producer = new HighLevelProducer(client);

console.log('Doing stuff...');

var payloads = [
  { topic: 'test', messages: 'Hello World'},
  { topic: 'test', messages: ['Hello', 'Again']}
];

producer.on('ready', function() {
  console.log('Producer Ready...');
  var sendResult = function(err, data) { };

  for (var i=0; i<100; i++) {
    payloads[1].messages.push('Message : ' + i);
    producer.send(payloads, sendResult);
  }
  console.log('Done Ctrl-C me');
});
