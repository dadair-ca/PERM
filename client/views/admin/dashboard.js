var shiftBalance = function() {
  return PickUps.find().count() - Drops.find().count();
};

var setSeriesData = function() {
  var droppedShifts = _.map(Drops.find().fetch(), function(drop) {
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

  var monthCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  _.each(monthlyDrops, function(month) {
    monthCounts[month.month]++;
  });

  if (typeof(Highcharts) != "undefined") {
    Highcharts.charts[0].series[0].setData(monthCounts);
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
        text: 'Shift Drops'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '# of occurences'
        },
        min: 0
      },
      colors: ['#FF6B6B', '#C7F464'],
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y:.0f}'
      },

      series: [{
        name: 'Shifts dropped',
        data: []
      }]
    });
  });
  Tracker.autorun(setSeriesData);
}
