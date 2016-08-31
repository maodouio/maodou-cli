var Git = require("nodegit");
var remove = require('remove');
var fs = require('fs');

console.log("Just a moment...");

var str1="./";
var str2= process.argv[3] ? process.argv[3] : "myApp";
var str3= "/.git";
var temp = str1.concat(str2);
var gitdir = temp.concat(str3);

var  creatApp = function(){
  Git.Clone("https://github.com/maodouio/meteor-react-redux-base.git", temp)
    .then(function() {
      remove(gitdir, function(err){
      if (err) console.error(err);
      });
    })
    .then(function() {
      console.log("myApp created～");
    })
    .catch(function(err) { console.log(err); });
}

fs.stat(temp, function(err, stat) {
    if(err == null) {
        if(stat.isDirectory()) {
            console.log('Directory already exist!');
            try {
                remove.removeSync(temp);
                console.log('Delete it successfully!');
            } catch (err) {
                console.error(err);
            }
            creatApp();
        } 
    }else{
      creatApp();
    } 
});