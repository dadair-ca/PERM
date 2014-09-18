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
  this.route('chat', {
    path: '/chat',
  });
  this.route('usersShow', {
    path: '/users/:_id',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    },
    waitOn: function() { 
      return [Meteor.subscribe('shifts')]; 
    },
  });
  this.route('usersEdit', {
    path: '/users/:_id/edit',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    },
  });
  this.route('enrollAccount', {
    path: '/enroll-account/:token',
    data: function() { return this.params; }
  });
  this.route('resetPassword', {
    path: '/reset-password/:token',
    data: function() { return this.params; }
  });
  this.route('calendar', {
    path: '/calendar',
    waitOn: function() { 
      return [Meteor.subscribe('shifts')]; 
    }
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
    Router.go('public');
  }
}

var requireNoUser = function(pause) {
  if (Meteor.user()) {
    Router.go('public');
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(function() { clearFlashes(); });
Router.onBeforeAction(requireNoUser, {only: ['signIn']});
Router.onBeforeAction(requireLogin, {except: ['public', 'signIn', 'enrollAccount', 'resetPassword']});
Router.onBeforeAction(requireAdmin, {only: ['usersIndex', 'usersShow']});
