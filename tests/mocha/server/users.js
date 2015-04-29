if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe("Roles", function() {
            it("should only contain student, nurse, command, admin, and inactive", function() {
                var roles = _.map(Roles.getAllRoles().fetch(), function(role) {
                    return role.name;
                });

                chai.assert.equal(_.contains(roles, 'inactive'), true);
                chai.assert.equal(_.contains(roles, 'student'), true);
                chai.assert.equal(_.contains(roles, 'nurse'), true);
                chai.assert.equal(_.contains(roles, 'command'), true);
                chai.assert.equal(_.contains(roles, 'admin'), true);
                chai.assert.equal(roles.length, 5);
            });
        });

        describe("Users", function() {
            it("should only access public page when inactive", function() {
                // FIXME: implement
            });
        });
    });
}
