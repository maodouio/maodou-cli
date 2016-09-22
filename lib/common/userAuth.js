var maodou = require('../maodou');

var btoa = require('btoa');
// var qs=require('querystring');
var rp = require('request-promise'); // https://github.com/request/request-promise
var netrc = require('netrc');
var myNetrc = netrc();

// var UserConfig = require('./UserConfig');

userAuth = function (username, password) {
  var baseAuth = btoa(username + ':' + password);
  // var content = qs.stringify(post_data);
  // console.log(baseAuth);
  var options = {
    method: 'POST',
    uri: 'http://127.0.0.1:3000/user/authenticate',
    body: {
      baseAuth : baseAuth
    },
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(function (parsedBody) {
      // console.log(parsedBody);
      // console.log(typeof parsedBody);
      myNetrc['git.maodou.io'] = {
        login: parsedBody.username,
        password: parsedBody.apiKey
      };

      netrc.save(myNetrc);
      // UserConfig();
      // UserConfig.prototype.save(parsedBody);
      console.log('Login Succeeded!'.green);
    })
    .catch(function (err) {
      console.log(err);
      // POST failed...
      console.log('Login failed.'.red)
    });
};
