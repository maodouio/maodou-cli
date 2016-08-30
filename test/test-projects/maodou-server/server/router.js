var bodyParser = require( 'body-parser');
Picker.middleware( bodyParser() );

var post = Picker.filter(function(req, res) {
  // console.log("req is ", req.method)
  return req.method == "POST";
});

// test cmd
// 1. sudo npm install body-parser
// 2. curl -v -H "Content-Type: application/json" -X POST --data "@params.json" http://localhost:3000/feed
//    curl -v -X POST --data "message=goodnews" http://localhost:3000/feed
//    curl -v -X POST --data "message=goodnews" http://readless.maodou.io/feed
//    curl -X POST --data "message=MyFirstMessage" http://localhost:3000/feed
post.route('/user/authenticate', function(params, req, res, next) {
  console.log("req data is:", req.body);
  //console.log(process.env);
  console.log("The user is:", req.body.login);
  console.log("The password is:", req.body.password);

  // if(!req.body.login || !req.body.password){
  //   res.end(JSON.stringify({"1024"}));
  // };

  var ret = {"id":"49372","company":"Maodou Inc.","created_datetime":"Thu, 06 Aug 2015 21:34:41 GMT","email":"limingth@maodou.io","firstName":"","flags":{"isVerified":false},"jobTitle":"CEO","lastName":"","level":"NORMAL","projectLimit":"50","servoLimit":"10","status":"NORMAL","username":req.body.login,"isOrg":false,"linkedAccounts":{},"authToken":"ef5a625e-7bd5-45e8-9ffc-26798c373021"};
  if(req.body.login){
    res.end(JSON.stringify(ret));
  }

});