require('./installation.js');
require('./activity.js');
require('./photo.js');

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
