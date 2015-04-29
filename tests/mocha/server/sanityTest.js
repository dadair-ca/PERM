if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Sanity", function(){
            it("should evaluate true as true", function(){
                chai.assert(true == true);
            });
        });
    });
}
