Development
===========
To contribute, please fork the repository and create pull requests.

The master branch should contain stable releases, tagged with the release number (1.0.0, etc).

The develop branch is where active development should take place.

Please use pull requests for new features.

Available at [PERM](http://54.186.106.12/).

TODO
====
- [x] Fix login buttons dropdown
- [x] Deploy to ~~Heroku~~ EC2
- [ ] Add testing framework
- [x] Get dynamic attendance data from user object
- [x] Attendance chart should be ~~simple values~~ removed if window is too small
- [x] Connect to ~~Mailchimp~~ Mailgun
- [x] Ensure all datetimes are generated for Mountain Time
- [x] Should use Bootstrap grid system on /shifts so it collapses on mobile

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
- [x] Users should be able to email other users when dropping a shift
- [x] Administrators should be able to create new users
- [x] Administrators should be able to create shifts for a student

Version 1.1
-----------
- [ ] Users should be able to see a calendar view of all shifts
- [ ] Users should be categorized as [student, command, nurse, admin]
- [ ] Shifts should be categorized as [student, command, nurse, admin]
- [ ] Users should be able to pick up shifts that match their role
- [ ] Users should be able to reset their password
- [ ] Users should be able to upload a profile picture
- [ ] /users/:id and /shifts should be unified, with functionality based on
  current user
