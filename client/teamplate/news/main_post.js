Template.mainPost.helpers({
  news: function() {
     return News.find({}, {sort: {submitted: -1}});
  }
});