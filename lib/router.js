Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('shifts'); }
});

Router.map(function() {
  this.route('public', {path: '/'});
  this.route('signIn', {path: '/sign_in'});
  this.route('shiftsIndex', {path: '/shifts'});
});

var requireLogin = function(pause) {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearErrors(); });
Router.onBeforeAction(requireLogin, {only: 'shiftsIndex'});
