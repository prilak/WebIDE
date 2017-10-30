var fs = require('fs');
var exec = require('child_process').exec;


var java =  "class Main{" + "\n" + 
            "public static void main(String[] args){" + "\n" + 
            "System.out.println(\"hello\");" + "\n" +
            "}" + "\n" +
            "}";

var dir = exec("java Main", function(err, stdout, stderr) {
  if (err) {
    // should have err.code here?  
  }
  console.log(stdout);
});

dir.on('exit', function (code) {
  // exit code is code
});
        
fs.writeFile('Main.java', java, function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 