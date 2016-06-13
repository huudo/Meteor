Template.newsPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  ownComment: function(){
    return Meteor.userId();
  },
});
Template.newsPage.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentPostId = this._id;

    var postProperties = {
      body: $(e.target).find('[name=comment_text]').val()
     
    }

    Meteor.call('commentInsert', postProperties, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
     
      Router.go('newsPage', {_id: currentPostId});  
    });
  }
});