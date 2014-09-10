Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [Meteor.subscribe('shifts'), Meteor.subscribe('pickups'), Meteor.subscribe('drops')]; 
  }
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
      throwFlash('danger', 'You need to sign in before you can access that page.');
      this.render('signIn');
    }
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearFlashes(); });
Router.onBeforeAction(requireLogin, {only: 'shiftsIndex'});
