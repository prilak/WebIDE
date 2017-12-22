var fs = require("fs");
var exec = require("child_process").exec;
var mysql = require("mysql");
var bCrypt = require('bcrypt-nodejs');
var bodyParser = require("body-parser");
var passport = require("passport");
var express = require("express");
var session = require('express-session');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var upload = require('express-fileupload');
var app = express();

// for file uploads
app.use(upload());

//var http = require('http').Server(app).listen(80);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialize passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
// app.set('views', './views');
// app.engine('hbs', exphbs({
//     extname: '.hbs'
// }));
// app.set('view engine', '.hbs');

// For EJS
app.set('views', './views');
app.set("view engine", "ejs");

//------------------------------------------
/* Some commands for using mysql with cloud 9
mysql-ctl start
mysql-ctl stop
mysql-ctl cli
*/
//------------------------------------------



// credentials to login to database 
var con = mysql.createConnection({
  host: "localhost",
  user: "prilak",
  database: "test",
  password: ""
});


// creates connection to mysql server
con.connect(function(err) {
  if (err) throw err;
});

//Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


//------------------------------------
// test
// con.query("SELECT * FROM User", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
//------------------------------------
// exec is used to execute BASH commands
// var dir = exec("java Main", function(err, stdout, stderr) {
//   if (err) {
//     // should have err.code here?  
//   }
//   console.log(stdout);
// });

// dir.on('exit', function (code) {
//   // exit code is code
// });

// fs is used to interact (read, write, append) files in Node.js 
// fs.writeFile('Main.java', java, function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// }); 
app.get('/upload', function(req, res){
    res.render('upload');
})
app.post('/upload', function(req, res){
  if(req.files){
        var file = req.files.filename;
        var filename = req.files.filename.name;
        file.mv("./upload/" + filename, function(err){
            if(err){
                console.log(err);
                res.send("error occured");
            } else {
                res.send("Successfully uploaded!");
            }
            
        });
  }
});
//Routes
var authRoute = require('./routes/auth.js')(app, passport);


app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});