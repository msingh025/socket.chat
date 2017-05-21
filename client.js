var net = require('net');


var client = new net.Socket();
var clntID = 0;
client.connect(1337, '127.0.0.1', function () {
	console.log('Connected');
    
});
client.on('data', function (data) {
	console.log('Received: ' + data);
    
	//client.destroy(); // kill client after server's response
});

client.on('close', function () {
	console.log('Connection closed');
});
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please Enter you id ', (id) => {
     var data = '{"id":"'+id+'", "message":""}';
    clntID = id;
     client.write(data);
    
});

rl.on('line', (input) => {
    
  //console.log(`Received: ${input}`);
    // var data = '{"id":'+id+', "message":""}';
     var data = '{"id":"'+clntID+'", "msg":"'+input+'"}';
    client.write(data);
});

process.on('SIGINT', function() {
    client.destroy();
});
    
 process.on('uncaughtException', (e) => {
     
      console.log(e.stack);
     
 });