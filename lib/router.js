Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

Router.map(function() {
  this.route('public', {path: '/'});
  this.route('signIn', {path: '/sign_in'});
  this.route('shiftsIndex', {
    path: '/shifts',
    waitOn: function() { 
      return [Meteor.subscribe('shifts'), Meteor.subscribe('pickups'), Meteor.subscribe('drops')]; 
    },
  });
  this.route('usersIndex', {
    path: '/users',
  });
  this.route('enrollAccount', {
    path: '/enroll-account/:token',
    data: function() { return this.params; }
  });
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

var requireAdmin = function(pause) {
  if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
    throwFlash('danger', 'You do not have sufficient privileges to access that page.');
    this.render('public');
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearFlashes(); });
Router.onBeforeAction(requireLogin, {only: ['shiftsIndex', 'usersIndex']});
Router.onBeforeAction(requireAdmin, {only: 'usersIndex'});
