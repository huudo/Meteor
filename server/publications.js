Meteor.publish('news', function() {
  return News.find();
});
Meteor.publish('comments', function() {
  return Comments.find();
});