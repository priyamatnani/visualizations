/**
 Created by $(USER) on $(DATE)
 **/

gameOfThrones.controller('battleController',['battleService', function(battleService){



    var self = this;

    self.data = [];
    self.charts=[false,false,false,false,false];
    self.chartLabels =[];


    self.chart1 = function(){
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[0] = true;

        battleService.chart1().then(function(resp){
            console.log("RESP>>>",resp)

            self.chartData = angular.copy(resp);
            // d3.json(resp, function(error, data) {
                // d3.csv("../../demo.csv", function(error, data) {
                var lineAlpha = [], lineBeta = [];

                i = 0;
            self.chartData.forEach(function(d) {
                    // d['StartStation'] = d['StartStation'],
                    d['bike_count'] = +d['bike_count'],
                    d['rides']  = +d['rides'];

                self.chartLabels.push(d['StartStation']);
                lineAlpha.push({x: i+1, label: d['StartStation'],y: d['bike_count']});
                    lineBeta.push({x: i+1 , label: d['StartStation'],y: d['rides']});
                    i += 1
                });

                self.data = [
                    {
                        values: lineAlpha,
                        key: 'Bike count',
                        color: 'blue'
                    },
                    {
                        values: lineBeta,
                        key: 'Rides',
                        color: 'green'
                    }
                ];

                self.$apply();
            // });
        });


    }

    // self.csvData();

    self.options = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            xAxis: {
                axisLabel: self.chartLabels,
                //rotateLabels : 45,
                staggerLabels: false

            },


            yAxis: {
                axisLabel: '',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                }
            },
            useInteractiveGuideline: false
        }
    };


    setTimeout(function(){
        console.log('scope api:', self.api);
        self.chart1();
        self.api.refresh();

    });



}]);