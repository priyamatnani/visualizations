/**
 Created by $(USER) on $(DATE)
 **/

gameOfThrones.controller('battleController',['battleService', function(battleService){



    var self = this;

    self.data = [];
    self.charts=[false,false,false,false,false];
    self.chartLabels =[];
    self.options ={};


    self.bikeRides = function(){
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[0] = true;

        battleService.bikeRides().then(function(resp){
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



    self.options.bikeRides = {
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

            var lineAlpha = [];

            i = 0;
            self.chartData.forEach(function(d) {
                d['value']  = +d['value'];

                lineAlpha.push({x: d['label'],y: d['value']});
                i += 1;
            });

            self.data = [
                {
                    values: lineAlpha,
                    key: 'Count',
                    color: 'blue'
                }

            ];

            self.$apply();


        });
    };

    self.options.userType = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            xAxis: {
                axisLabel: '',
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

    self.zipcodeRidesHours = function(){


        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[1] = true;

        battleService.zipcodeRidesHours().then(function(resp){
            console.log("RESP>>>",resp)

            self.zipcodeData = angular.copy(resp);
            var lineAlpha = [], lineBeta = [];

            i = 0;
            self.zipcodeData.forEach(function(d) {

                if(i < 10){
                    d['hours'] = +d['hours'];
                    d['rides']  = +d['rides'];

                    // self.chartLabels.push(d['ZipCode']);
                    lineAlpha.push({x: d['ZipCode'], label: d['ZipCode'],y: d['hours']});
                    lineBeta.push({x: d['ZipCode'] , label: d['ZipCode'],y: d['rides']});
                    i += 1;
                }

            });

            self.data = [
                {
                    values: lineAlpha,
                    key: 'Hours',
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

    self.options.zipcodeRide = {
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
                // axisLabel: '',
                // rotateLabels : 45
                // staggerLabels: false

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

    self.dayRides = function () {

        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[2] = true;

        battleService.dayRides().then(function(resp){
            console.log("RESP>>>",resp);

            self.chartData = [];

            self.chartData = angular.copy(resp);


        });
    };

    self.options.dayRides = {
        chart: {
            type: 'pieChart',
            // donut: true,
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

    self.dateRides = function(){
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[3] = true;

        battleService.dateRides().then(function(resp){
            console.log("RESP>>>",resp);

            var json = angular.copy(resp);

            self.chartData = [],
            shapes = ['circle'],


                self.chartData.push({
                key: 'Rides',
                values: []
            });

            for (var j = 0; j < json.length; j++) {
                self.chartData[0].values.push({
                    x: new Date(json[j].start_date)
                    , y: json[j].rides
                    , size: Math.random()
                    , shape: shapes[0]
                });
            }
            console.log(data)
            return data;


        });
    };

    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun']


    self.options.dateRides = {
        chart: {
            type: 'scatterChart',
            height: 450,
            color: d3.scale.category10().range(),
            scatter: {
                onlyCircles: true
            },
            showDistX: true,
            showDistY: true,
            tooltipContent: function(key) {
                return '<h3>' + key + '</h3>';
            },
            duration: 350,
            xAxis: {
                axisLabel: 'X Axis',
                tickFormat: function(d){
                    return ( days[new Date(d).getDay()] + ' ' + d3.time.format('%d-%m-%y')(new Date(d)))
                }
            },
            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format('f')(d);
                },
                axisLabelDistance: -5
            },
            zoom: {
                //NOTE: All attributes below are optional
                enabled: false,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: false,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };




    self.options.hourRides = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Time (hours)'
            },
            yAxis: {
                axisLabel: 'Rides Count',
                tickFormat: function(d){
                    return d3.format('f')(d);
                }
                // axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };



    self.hourRides = function() {
        var sin2 = [];
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[2] = true;

        battleService.hourRides().then(function(resp){
            json = resp;
            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < json.length; i++) {
                sin2.push({
                    x: json[i]['start_hour'],
                    y: json[i]['rides']

                });
            }

            //Line chart data should be sent as an array of series objects.
            self.dataHourRides = [

                {
                    values: sin2,
                    key: 'No. of Rides',
                    color: '#FFA500',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        });



    };
    setTimeout(function(){
        console.log('scope api:', self.api);
        self.api.refresh();

    });



}]);