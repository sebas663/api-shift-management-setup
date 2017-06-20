// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

//db options
var options = { 
  server: { 
    socketOptions: { 
      keepAlive: 300000, 
      autoReconnect: true,
      connectTimeoutMS: 30000 
    } 
  }, 
 // replset: { 
 //   socketOptions: { 
 //     keepAlive: 300000, 
 //     connectTimeoutMS : 30000 
 //   } 
  //} 
};
// Build the connection string 
var dbURI = process.env.MONGODBCON;

// Create the database connection 
mongoose.connect(dbURI,options); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

require('./../models/permissionType');
require('./../models/documentType');
require('./../models/professionType');
require('./../models/sexType');
require('./../models/roleType');