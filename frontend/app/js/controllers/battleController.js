/**
 Created by $(USER) on $(DATE)
 **/

gameOfThrones.controller('battleController',['battleService', function(battleService){



    var self = this;

    self.data = [];
    self.charts=[false,false,false,false,false];
    self.chartLabels =[];
    self.options ={};


    self.chart1 = function(){
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[0] = true;

        battleService.chart1().then(function(resp){
            console.log("RESP>>>",resp)

            self.chartData = angular.copy(resp);
                var lineAlpha = [], lineBeta = [];

            i = 0;
            self.chartData.forEach(function(d) {
                    d['bike_count'] = +d['bike_count'];
                    d['rides']  = +d['rides'];

                self.chartLabels.push(d['StartStation']);
                lineAlpha.push({x: i+1, label: d['StartStation'],y: d['bike_count']});
                    lineBeta.push({x: i+1 , label: d['StartStation'],y: d['rides']});
                    i += 1;
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
        });


    };



    self.options.chart1 = {
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

    self.userType = function(){

        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[0] = true;

        battleService.userType().then(function(resp){
            console.log("RESP>>>",resp);

            self.chartData = angular.copy(resp);


        });
    };

    self.options.userType = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };


    setTimeout(function(){
        console.log('scope api:', self.api);
        self.chart1();
        self.api.refresh();

    });



}]);