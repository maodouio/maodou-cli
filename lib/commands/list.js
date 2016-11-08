var netrc = require('netrc');
var btoa = require('btoa');
var rp = require('request-promise');
var moment = require('moment');
var pad = require('pad');

function listInstances() {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  var options = {
    method: 'GET',
    uri: 'https://maodou.io/api/projects',
    headers: {
      Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
    },
    json: true // Automatically stringifies the body to JSON
  };

  rp(options)
    .then(function(res) {
      console.log(`${pad('SUBDOMAIN', 20)}${pad('CREATED', 20)}UPDATED`);
      res.forEach(function (value) {
        const subdomain = pad(value.subdomain, 20);
        const createdTime = pad(moment(value.createdAt).fromNow(), 20);
        const updatedTime = value.updatedAt?pad(moment(value.updatedAt).fromNow(), 20):'';
        console.log(`${subdomain}${createdTime}${updatedTime}`);
      });
    })
    .catch(function(err) {
      console.log(err.message);
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('list')
    .description('List your app instances.')
    .action(listInstances);
};
