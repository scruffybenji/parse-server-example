// Make sure all installations point to the current user.
Parse.Cloud.beforeSave(Parse.Installation, function(request, response) {
  Parse.Cloud.useMasterKey();
  if (request.user) {
	  request.object.set('user', request.user);
  } else {
    //Commented this out so I can set the channel
    //  	request.object.unset('user');
  }
  response.success();
});
