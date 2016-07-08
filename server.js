
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
//var flash = require('connect-flash');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');


//var depd = require("depd");
var app = express();


app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var controllers = require("./controllers");

//Opt into Services

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(cookieParser());
//app.use(express.cookieParser('keyboard cat'));
//app.use(session({ secret: "UserMgmt" }));

//app.use(flash());

//set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Map the routes
controllers.init(app);

var server = http.createServer(app);

server.listen(3000);

