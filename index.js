var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);
var csgostats = require('./csgostats.js');
var stats = "";



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
 
  var ipSave = "";
  var portSave = "";
  var rconSave = "";
  
  socket.on('new server', function(data){
  console.log('Using new server ' + data['ip']);
  var ip = data['ip'];
  var port = data['port'];
  var rcon = data['rcon'];
  ipSave = ip;
  portSave = port;
  rconSave = rcon;
  stats = new csgostats(ip,port,rcon);  
  });

  socket.on('default server', function(){
  console.log('Using default server.');
  stats = new csgostats('66.150.214.52', 27017, 'OPHQ!2');
  });

  socket.on('get status', function(){
   console.log('get status initiated');
   stats.getStatus(function(err, data){
    if(!err){
     io.emit('status',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });
  
  socket.on('get time left', function(){
   stats.getTimeLeft(function(err, data){
    if(!err){
     io.emit('timeleft',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get banned users', function(){
   stats.listBannedUsers(function(err, data){
    if(!err){
     io.emit('banned',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get maps', function(){
   stats.listMaps(function(err, data){
    if(!err){
     io.emit('maps',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get sourcemod version', function(){
   stats.listSourceModVersion(function(err, data){
    if(!err){
     io.emit('smversion',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get meta version', function(){
   stats.listMetaVersion(function(err, data){
    if(!err){
     io.emit('mversion',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get meta plugins', function(){
   stats.listMetaPlugins(function(err, data){
    if(!err){
     io.emit('mplugins',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('get sourcemod plugins', function(){
   stats.listSourceModPlugins(function(err, data){
    if(!err){
     io.emit('smplugins',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('restart round', function(){
   stats.restartRound(function(err, data){
    if(!err){
     io.emit('restart',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('change map', function(map){
  console.log('attempting to change map to ' + map); 
 stats.changeMap(map,function(err, data){
    if(!err){
       console.log('map change succesful');
       io.emit('status',data);
       console.log('reconnecting to ' + ipSave);
	stats = new csgostats(ipSave,portSave,rconSave);

    }else{
     io.emit('status','Could not connect');
    }
   });

  });

  socket.on('ban user', function(user){
   stats.banUser(user,function(err, data){
    if(!err){
     io.emit('ban',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('unban user', function(user){
   stats.unbanUser(user,function(err, data){
    if(!err){
     io.emit('unban',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

  socket.on('kick user', function(user){
   stats.kickUser(user,function(err, data){
    if(!err){
     io.emit('kick',data);
    }else{
     io.emit('status','Could not connect');
    }
   });
  });

});

http.listen(8000, function(){
console.log('Listening on *:8000');
});


