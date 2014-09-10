Development
===========
```
$ curl https://install.meteor.com | /bin/sh
$ git clone https://github.com/adairdavid/PERM.git
$ cd PERM
$ meteor
```
The master branch should contain stable releases, tagged with the release number (1.0.0, etc).

The develop branch is where active development should take place.

Please use pull requests for new features.

Available at [PERM](http://perm.meteor.com).

TODO
====
- [x] Fix login buttons dropdown
- [ ] Deploy to Heroku
- [ ] Add testing framework
- [ ] Get dynamic attendance data from user object

Minimum Viable Product
----------------------
- [x] Users should be able to sign in with email and password
- [x] Users should be able to sign out
- [x] Users should be able to see their upcoming shifts
- [x] Users should be able to see their past shifts
- [ ] Users should be able to see the shifts for the current week
- [ ] Users should be able to drop a shift
- [ ] Users should be able to pick-up a shift
- [ ] Users should be able to see their attendance stats
- [ ] Users should be able to email other users when dropping a shift
