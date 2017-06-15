var express     =   require("express");
var compression =   require('compression')
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose    =   require('mongoose');
var morgan      =   require('morgan');
var permissionRoute      =   require('./routers/permissionType');
var documentTypeRoute    =   require('./routers/documentType');
var professionTypeRoute  =   require('./routers/professionType');
var sexTypeRoute         =   require('./routers/sexType');
var roleRoute            =   require('./routers/roleType');

//For work whit environment variable.
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());                                
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 
app.use(compression());

//don't show the log when it is test
if(process.env.MONGODBCON !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//db options
var options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              };
//db connection 
var mongoDB = process.env.MONGODBCON;
mongoose.connect(mongoDB,options);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Add headers always before adding the routes!!!!
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//var router      =   express.Router();
//router.get("/",function(req,res){
  //  res.json({"message" : "No hay un recurso aqui!!!"});
//});
//app.use('/',router);

//Add routes
var root = process.env.API_RESOURCE_ROOT;
app.use( root, permissionRoute);
app.use( root, documentTypeRoute);
app.use( root, professionTypeRoute);
app.use( root, sexTypeRoute);
app.use( root, roleRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port} ${root}.`)
})
