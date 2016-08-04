# Development

To contribute, please fork the repository and create pull requests.

The master branch should contain stable releases, tagged with the release number (1.0.0, etc).

The develop branch is where active development should take place.

Please use pull requests for new features.

Available at [PERM](https://www.pemrap.com).

# TODO

- [x] Fix login buttons dropdown
- [x] Deploy to Heroku ~~EC2~~
- [x] Add testing framework
- [x] Get dynamic attendance data from user object
- [x] Attendance chart should be ~~simple values~~ removed if window is too small
- [x] Connect to ~~Mailchimp~~ Mailgun
- [x] Ensure all datetimes are generated for Mountain Time
- [x] Should use Bootstrap grid system on /shifts so it collapses on mobile
- [ ] Add unit, integration, and regression tests!!

## Minimum Viable Product

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

## Version 1.1

- [x] Users should be able to see a calendar view of all shifts
- [x] Users should be categorized as [student, command, nurse, admin]
- [x] Shifts should be categorized as [student, command, nurse, admin]
- [x] Users should be able to pick up shifts that match their role
- [x] Users should be able to reset their password
- [ ] Users should be able to upload a profile picture
- [ ] /users/:id and /shifts should be unified, with functionality based on
  current user
- [x] Administrators should be able to change a user's role(s)
- [ ] Users should have to confirm that they attended a shift
- [ ] There should be a Study resource for study info
- [ ] Persistent chat log
- [x] Administrators can specify user starting dates
- [x] Fix time difference calculation of the calendar
- [ ] Admins should confirm deleting a shift (could mis-click)
- [ ] Users must have at least a first and last name
- [ ] User email login should be case insensitive
- [x] Changing user start date breaks user stat counts
- [x] ~~Users should be able to reset their password without logging in~~
- [x] ~~When an admin drops a user from a shift, the shift can't be picked up~~
- [x] Command users should be able to pick up regular student shifts

- [ ] Should be able to correct and reverify an email address
