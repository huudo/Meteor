Meteor.publish('news', function() {
  return News.find();
});
Meteor.publish('comments', function(postId) {
  
  return Comments.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
