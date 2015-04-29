if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Mocha", function(){
             it("should be sane", function(){
                Meteor.flush();
                chai.assert.equal(true, true);
            });
        });
    });
}
