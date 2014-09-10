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

Available at [PERM](http://ec2-54-68-95-11.us-west-2.compute.amazonaws.com/).

TODO
====
- [x] Fix login buttons dropdown
- [x] Deploy to ~~Heroku~~EC2
- [ ] Add testing framework
- [x] Get dynamic attendance data from user object
- [ ] Attendance chart should be simple values if window is too small
- [ ] Connect to Mailchimp

Minimum Viable Product
----------------------
- [x] Users should be able to sign in with email and password
- [x] Users should be able to sign out
- [x] Users should be able to see their upcoming shifts
- [x] Users should be able to see their past shifts
- [x] Users should be able to see the shifts for the current week
- [x] Users should be able to drop a shift
- [x] Users should be able to pick-up a shift
- [x] Users should be able to see their attendance stats
- [ ] Users should be able to email other users when dropping a shift
- [ ] Administrators should be able to create shifts for a student
