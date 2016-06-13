Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);

    var user = Meteor.user();
    var news = News.findOne(commentAttributes.postId);
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    return Comments.insert(comment);
  }
});