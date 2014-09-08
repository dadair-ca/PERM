Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('public', {path: '/'});
  this.route('signIn', {path: '/sign_in'});
});
