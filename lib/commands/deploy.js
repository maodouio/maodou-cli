"use strict";

var simpleGit = require('simple-git');
var netrc = require('netrc');
var sleep = require('sleep-promise');
var btoa = require('btoa');
var request = require('request');

function getSubdomainFromRemotes(remotes) {
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

  console.log('This may take a while, go for a coffee if you like :)\nIf you abort this command, the build process will also be aborted on the server.\n\nHere comes the server build log:');

  let subdomain;
  simpleGit(process.cwd()) // TODO: check if there's no change to push to server
    .push('maodou', 'master')
    .then(sleep(2000))
    .getRemotes(true, function (err, res) {
      subdomain = getSubdomainFromRemotes(res);
    })
    .then(function () {
      request({
        method: 'POST',
        uri: 'https://maodou.io/api/deploy',
        headers: {
          Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
        },
        body: {
          subdomain: subdomain
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
