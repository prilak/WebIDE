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
var app = express();
//app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialize passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



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

//Routes
var authRoute = require('./routes/auth.js')(app, passport);



// app.get("/", function(req, res){
//     res.render("home");
// });
// app.get("/register", function(req, res) {
//     res.render("register"); 
// });
// app.post("/register", function(req, res) {
//     //console.log(req.body);
//     var username = req.body.username;
//     var password = req.body.password;
//     var saltRounds = 10;
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         if(err){
//             console.log(err);
//         }
//         bcrypt.hash(password, salt, function(err, hash) {
//             if(err){
//                 console.log(err);
//             }
//             var sql = "INSERT INTO User (LastName, FirstName, Username, Password) VALUES (NULL, NULL, " + "\'" + username + "\'" + ", " + "\'" + hash + "\'" + ")";
//             con.query(sql, function(err, result){
//                 if(err){
//                     console.log(err);
//                 }
//             });
            
//         // Store hash in your password DB.
//         });
        
//     });
//     passport.authenticate("local")(req, res, function(){
//         res.redirect("/");
//     });
//     res.redirect("/");
// });
// app.get("/login", function(req, res) {
//     res.render("login");
// });
// app.get("/secret", isLoggedIn, function(req, res) {
//     res.render("login"); 
// });
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "/login"
//     }), function(req, res){
//     con.query("SELECT Password FROM User WHERE Username = " + "\'" + req.body.username + "\'", function (err, result, fields) {
//         if (err) throw err;
//         //console.log(result + fields);
//         // JSON.parse(result, function(err, hash){
//         //     if(err)throw err;
//         //     res.send(hash);    
//         // });
//         var hash = result[0].Password;
//         console.log(hash);
//         bcrypt.compare(req.body.password, hash, function(err, res) {
//             //res == true
//             if(err) throw err;
//             console.log(res);
//         });
//         res.send(result);
//     });
    
// });

// app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
// });
console.log(process.env.IP + "   " + process.env.PORT);
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});