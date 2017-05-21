var net = require('net');
var cln = {};
var server = net.createServer(function(socket) {
     console.log(Object.keys(cln).length);
    socket.on('data',(d)=> {
         //console.log(this.remotePort);
          var msg = JSON.parse(d.toString());
         //console.log(msg);
        if(msg.id && !msg.msg) {
             cln[msg.id] =  socket; 
            socket.write(' ID  '+msg.id +" registered" );
        }else if(msg.msg) {
         if(Object.keys(cln).length >1) {
              for(let k in  cln) {
                   if(msg.id != k) {
                    cln[k].write(msg.msg);    
                   }
                   
              }
         }
        }
    });
     socket.on('close',(d)=> {
          console.log("socket close");
         var that = this;
         if(Object.keys(cln).length >0) {
                   
           for(let k in cln) {
                if(cln[k] ==socket ) {
                     delete cln[k]; 
                    break;
                }
           }      
         } 
     });
	//socket.write('Echo server\r\n');
   //socket.write('Echo dashu\r\n');
});
server.on('error', (e)=>{
     console.log(e);
});
// uncaughtException handler 
 process.on('uncaughtException', (e) => {
     
      console.log(e.stack);
     
 });
server.listen(1337, '127.0.0.1');