"use strict";

var btoa = require('btoa');
var fs = require('fs');
var rp = require('request-promise');
var simpleGit = require('simple-git');
var Spinner = require('cli-spinner').Spinner;
var netrc = require('netrc');
var sleep = require('sleep-promise');

function createProject(subdomain) {
  var myNetrc = netrc();

  if (!myNetrc['git.maodouapp.com']) {
    console.log('Please run "maodou login" first');
    return;
  }

  simpleGit()
    .getRemotes(true, function(err, res) {
      if (err) {
        console.log('Failed to read git repository.');
        process.exit(1);
      }

      let remote;
      if (remote = res.find(rmt => rmt.name === 'maodou')) {
        const url = remote.refs.push;
        console.log(`This repository has already been initialized for subdomain "${url.substr(url.lastIndexOf('/') + 1)}".`);
        process.exit(1);
      }
    })
    .then(function () {
      var options = {
        method: 'POST',
        uri: 'https://maodou.io/api/projects',
        headers: {
          Authorization: `Basic ${btoa(myNetrc['git.maodouapp.com'].login + ':' + myNetrc['git.maodouapp.com'].password)}`
        },
        body: {
          subdomain: subdomain,
          custom: true
        },
        json: true // Automatically stringifies the body to JSON
      };

      rp(options)
        .then(sleep(2000)) // TODO: find other ways to ensure project creation is completed on server
        .then(function(_) {
          console.log(`Creating a new maodou app in ${subdomain} ...`);
          var spinner = new Spinner('%s');
          spinner.setSpinnerString('|/-\\');
          spinner.start();

          simpleGit()
            .init()
            .addRemote('maodou', `https://git.maodouapp.com/${myNetrc['git.maodouapp.com'].login}/${subdomain}`, function (err) {
              if (err) {
                spinner.stop(true);
                console.log('Init project failed.'.red);
              }
            })
            .push('maodou', 'master', function (err) {
              if (err) {
                spinner.stop(true);
                console.log('Init project failed.'.red);
              }
            })
            .then(function () {
              spinner.stop(true);
              console.log('Init project succeeded!'.green);
            });
        })
        .catch(function(err) {
          console.log(err.message);
          console.log('Init project failed.'.red)
        });
    });
}

module.exports = function(maodou) {
  maodou.program
    .command('init', '<subdomain>')
    .description('Initialize local repository to be a Maodou App.')
    .action(createProject);
};
