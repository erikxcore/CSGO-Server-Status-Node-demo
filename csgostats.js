//Requirements
var Rcon = require('./csgorcon.js').newHandle;

//Global
var exports = module.exports = {};


//Constructor
function csgostats(ip,port,password){
        this.ip = ip;
        this.port = port;
        this.password = password;
        this.conn = new Rcon();
        this._connect();
};



//Methods
//Private
var _onConnected = function(err, response){
  if(err){console.error(err);return;}
  console.log("connected", response);
};

//Public
csgostats.prototype._connect = function(){
	this.conn.connect(this.ip,this.port,this.password,_onConnected);
};

csgostats.prototype.getTimeLeft = function(callback){
this.conn.sendCommand('timeleft', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.getStatus = function(callback){

this.conn.sendCommand('status', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});

};

csgostats.prototype.listBannedUsers = function(callback){
this.conn.sendCommand('listid', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.listMaps = function(callback){
this.conn.sendCommand('maps *', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.listSourceModPlugins = function(callback){
this.conn.sendCommand('sm plugins list', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.listMetaPlugins = function(callback){
this.conn.sendCommand('meta list', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.listSourceModVersion = function(callback){
this.conn.sendCommand('sm version', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.listMetaVersion = function(callback){
this.conn.sendCommand('meta version', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.restartRound = function(callback){
this.conn.sendCommand('mp_restartgame 5', function(err, response){
console.log('command sent!');
if(err){
callback(err, null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.changeMap = function(map, callback){
this.conn.sendCommand('map ' + map, function(err, response){
console.log('command sent!');
if(err){
callback(err,null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.banUser = function(user, callback){
this.conn.sendCommand('writeid ' + user, function(err, response){
console.log('command sent!');
if(err){
callback(err,null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.unbanUser = function(user, callback){
this.conn.sendCommand('removeid ' + user, function(err, response){
console.log('command sent!');
if(err){
callback(err,null);
}else{
callback(null, response['data']);
}
});
};

csgostats.prototype.kickUser = function(user, callback){
this.conn.sendCommand('kickid ' + user, function(err, response){
console.log('command sent!');
if(err){
callback(err,null);
}else{
callback(null, response['data']);
}
});
};

//Export for other modules
module.exports = csgostats;

