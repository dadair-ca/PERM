var shiftBalance = function() {
  return PickUps.find().count() - Drops.find().count();
};

var setSeriesData = function() {
  var currentYearStart = moment.tz('America/Edmonton').month(0).date(1);
  console.log(currentYearStart.format());

  var thisYearShifts = Shifts.find({start: {$gte: currentYearStart.format()}}).fetch();
  var thisYearShiftsIds = _.map(thisYearShifts, function(shift) { return shift._id; });
  var drops = Drops.find({shiftId: {$in: thisYearShiftsIds}}).fetch();
  var grabs = PickUps.find({shiftId: {$in: thisYearShiftsIds}}).fetch();

  var droppedShifts = _.map(drops, function(drop) {
    var shift = Shifts.findOne({_id: drop.shiftId});
    return shift;
  });

  var droppedShifts = _.filter(droppedShifts, function(shift) {
    return moment().diff(moment(shift.start), 'years') < 1;
  });

  var monthlyDrops = _.map(droppedShifts, function(shift) {
    var key = {month: moment(shift.start).month()};
    return key;
  });

  var grabbedShifts = _.map(grabs, function(grab) {
    var shift = Shifts.findOne({_id: grab.shiftId});
    return shift;
  });

  var grabbedShifts = _.filter(grabbedShifts, function(shift) {
    return moment().diff(moment(shift.start), 'years') < 1;
  });

  var monthlyGrabs = _.map(grabbedShifts, function(shift) {
    var key = {month: moment(shift.start).month()};
    return key;
  });

  var dropsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var grabsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var netBalance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  _.each(monthlyDrops, function(month) {
    dropsCount[month.month]++;
    netBalance[month.month]--;
  });
  _.each(monthlyGrabs, function(month) {
    grabsCount[month.month]++;
    netBalance[month.month]++;
  });

  if (typeof(Highcharts) != "undefined") {
    Highcharts.charts[0].series[0].setData(dropsCount);
    Highcharts.charts[0].series[1].setData(grabsCount);
    Highcharts.charts[0].series[2].setData(netBalance);
  }
};

Template.balanceStatCard.helpers({
  balance: shiftBalance,
  isNegative: function() { if (shiftBalance() < 0) return true; }
});

Template.shiftLineChart.rendered = function () {
  $(function () {
    $('#shiftLineChart').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: moment().format("YYYY") + ' Shift Activity'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '# of occurences'
        },
      },
      colors: ['#FF6B6B', '#C7F464', '#556270'],
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y:.0f}'
      },

      series: [
        { name: 'Shifts dropped', data: [] },
        { name: 'Shifts grabbed', data: [] },
        { name: 'Net balance', type: 'spline', data: [] },
      ]
    });
  });
  Tracker.autorun(setSeriesData);
}
