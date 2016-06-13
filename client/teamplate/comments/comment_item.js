Template.commentItem.helpers({
    ownNew: function(){
        return this.userId === Meteor.userId();
    },
    submittedText: function() {
    return this.submitted.toString();
    }
});
Template.commentItem.events({
    'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Comments.remove(currentPostId);    
    }
  }
});