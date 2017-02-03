//require('cloud/installation.js');
//require('cloud/activity.js');
//require('cloud/photo.js');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
