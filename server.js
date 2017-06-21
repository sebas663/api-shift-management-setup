//For work whit environment variable.
require('dotenv').config();

var express     =   require("express");
var compression =   require('compression')
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose    =   require('mongoose');
var morgan      =   require('morgan');
var db          =   require('./models/db');
var permissionRoute      =   require('./routers/permissionType');
var documentTypeRoute    =   require('./routers/documentType');
var professionTypeRoute  =   require('./routers/professionType');
var sexTypeRoute         =   require('./routers/sexType');
var roleRoute            =   require('./routers/roleType');

const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());                                
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 
app.use(compression());

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
var router      =   express.Router();
router.get("/",function(req,res){
    res.json({"message" : "No hay un recurso aqui!!!"});
});
app.use('/',router);
//Add routes
var root = process.env.API_RESOURCE_ROOT;
app.use( root, permissionRoute);
app.use( root, documentTypeRoute);
app.use( root, professionTypeRoute);
app.use( root, sexTypeRoute);
app.use( root, roleRoute);

//show the rosources path in the router
// sexTypeRoute.stack.forEach(function(r){
//   if (r.route && r.route.path){
//     console.log(root + r.route.path)
//   }
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port} ${root}.`)
})
