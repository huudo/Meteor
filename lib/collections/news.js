News = new Mongo.Collection('news');
validatePost = function validatePost(post) {                                                                   // 22
  var errors = {};                                                                                             // 23
                                                                                                               //
  if (!post.title) errors.title = "Please fill in a headline";                                                 // 25
                                                                                                               //
  if (!post.url) errors.url = "Please fill in a URL";                                                          // 28
                                                                                                               //
  return errors;                                                                                               // 31
};   
Meteor.methods({
  newsInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    
    var postWithSameLink = News.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });
    
    var postId = News.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = News.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});
