ownsShift = function(userId, shift) {
  return shift && shift.ownerId === userId;
};

droppedShift = function(userId, shift) {
  return shift && shift.ownerId === null;
};
