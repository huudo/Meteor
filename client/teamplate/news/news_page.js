Template.newsPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  ownComment: function(){
    return Meteor.userId();
  },
});
