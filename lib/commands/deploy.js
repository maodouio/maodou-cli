"use strict";

var simpleGit = require('simple-git');
var netrc = require('netrc');
var sleep = require('sleep-promise');
var btoa = require('btoa');
var request = require('request');

function getAppNameFromRemotes(remotes) {
  const remote = remotes.find(remote => remote.name === 'maodou');
  const url = remote.refs.push;
  return url.substr(url.lastIndexOf('/') + 1);
}

function pushCommits() {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  let appName;
  simpleGit(process.cwd()) // TODO: check if there's no change to push to server
    .push('maodou', 'master')
    .then(sleep(2000))
    .getRemotes(true, function (err, res) {
      appName = getAppNameFromRemotes(res);
    })
    .then(function () {
      request({
        method: 'POST',
        uri: 'https://maodou.io/api/deploy',
        headers: {
          Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
        },
        body: {
          appName: appName
        },
        json: true // Automatically stringifies the body to JSON
      }).pipe(process.stdout);
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('deploy')
    .description('Deploy to server.')
    .action(pushCommits);
};
