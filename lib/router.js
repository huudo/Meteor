Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('news'), Meteor.subscribe('comments')];
  }
});

Router.route('/', {name: 'mainPost'});

Router.route('/news/:_id', {
  name: 'newsPage',
  data: function() { return News.findOne(this.params._id); }
});
Router.route('/submit', {name: 'postSubmit'});