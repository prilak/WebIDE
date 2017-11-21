var fs = require("fs");
var exec = require("child_process").exec;
var mysql = require("mysql");
var bcrypt = require('bcrypt');
var bodyParser = require("body-parser");

var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


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

// some java test code used to create a .java file 
var java =  "class Main{" + "\n" + 
            "public static void main(String[] args){" + "\n" + 
            "System.out.println(\"hello\");" + "\n" +
            "}" + "\n" +
            "}";
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

app.get("/", function(req, res){
    res.render("home");
});
app.get("/register", function(req, res) {
    res.render("register"); 
});
app.post("/register", function(req, res) {
    //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err){
            console.log(err);
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                console.log(err);
            }
            var sql = "INSERT INTO User (LastName, FirstName, Username, Password) VALUES (NULL, NULL, " + "\'" + username + "\'" + ", " + "\'" + hash + "\'" + ")";
            con.query(sql, function(err, result){
                if(err){
                    console.log(err);
                }
            })
        // Store hash in your password DB.
        });
    });
    res.redirect("/");
});
app.get("/login", function(req, res) {
    res.render("login");
});
app.post("/login", function(req, res){
    con.query("SELECT Password FROM User WHERE Username = " + "\'" + req.body.username + "\'", function (err, result, fields) {
        if (err) throw err;
        //console.log(result + fields);
        // JSON.parse(result, function(err, hash){
        //     if(err)throw err;
        //     res.send(hash);    
        // });
        var hash = result[0].Password;
        console.log(hash);
        bcrypt.compare(req.body.password, hash, function(err, res) {
            //res == true
            if(err) throw err;
            console.log(res);
        });
        res.send(result);
    });
    
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
});