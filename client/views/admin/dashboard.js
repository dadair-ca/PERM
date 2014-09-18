var shiftBalance = function() {
  return PickUps.find().count() - Drops.find().count();
};
Template.balanceStatCard.helpers({
  balance: shiftBalance,
  isNegative: function() { if (shiftBalance() < 0) return true; }
});
