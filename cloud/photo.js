Parse.Cloud.afterDelete('Photo', function(request, response) {
  Parse.Cloud.useMasterKey();
  query = new Parse.Query('Activity');
  query.equalTo('photo', request.object);

  query.find({
    success: function(activities) {
               Parse.Object.destroyAll(activities,  {
                 success: function() {},
                 error: function(error) {
                   console.error('Error deleting related activities ' + error.code + ': ' + error.message);
                 }
               });
             },
    error: function(error) {
             response.error("Error " + error.code + " : " + error.message + " when getting activity.");
           }
  });
});


Parse.Cloud.define("UpdateAllCount", function(request, response) {
  Parse.Cloud.useMasterKey();
  var photoQuery = new Parse.Query("Photo");
  photoQuery.each(function(photo){
    photo.set("likeCount", 0);
    photo.set("commentCount", 0);
    return photo.save();
  }
  ).then(  function(){
    var activityQuery = new Parse.Query("Activity");
    activityQuery.include("photo");
    console.log("starting update all count");

    activityQuery.each(
      function(activity) {

        console.log("Processing for " + activity.id);   

        var photo = activity.get("photo");

        if(!photo){
          return;
        }

        var activityType = activity.get("type");

        if(activityType === "comment"){
          photo.increment("commentCount");
        }else if (activityType === "like"){
          photo.increment("likeCount");
        }

        return photo.save();                    
      })
    .then(function(endphoto){
      console.log("Done.");
      response.success("Done");
    });

  });
});

// Validate Photos have a valid owner in the "user" pointer.
/*Parse.Cloud.beforeSave('Photo', function(request, response) {
  var currentUser = request.user;
  var objectUser = request.object.get('user');

  if(!currentUser || !objectUser) {
  response.error('A Photo should have a valid user.');
  } else if (currentUser.id === objectUser.id) {
  response.success();
  } else {
  response.error('Cannot set user on Photo to a user other than the current user.');
  }
  });*/

/*Parse.Cloud.afterSave('Photo', function(request, response) {
  console.log(request.user.id);

  var PhotoPoster = request.user.get('displayName');

  var message = PhotoPoster + " has posted a new photo"; 
  var payload = 
{
  alert: message,
badge: 'Increment',
p: 'a',
pid: request.object.id
};

console.log(payload);
console.log(message);
});*/
