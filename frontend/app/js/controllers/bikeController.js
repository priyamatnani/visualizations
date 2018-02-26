/**
 Created by $(USER) on $(DATE)
 **/

uberBikes.controller('bikeController',['bikeService', function(bikeService){



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

        bikeService.bikeRides().then(function(resp){

            self.chartData = angular.copy(resp);
                var lineAlpha = [], lineBeta = [];

            i = 0;
            self.chartData.forEach(function(d) {
                    d['bike_count'] = +d['bike_count'];
                    d['rides']  = +d['rides'];

                // self.chartLabels.push(d['StartStation']);
                lineAlpha.push({x:d['StartStation'], y: d['bike_count']});
                lineBeta.push({x: d['StartStation'] , y: d['rides']});
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
                bottom: 70,
                left: 65
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            xAxis: {
                axisLabel: 'Stations',
                rotateLabels : 25,
                staggerLabels: false

            },


            yAxis: {
                axisLabel: 'Rides & Bike count',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                }
            },
            useInteractiveGuideline: false
        }
    };



    self.userType3 = function(url){



        bikeService.userType(url).then(function(resp){
            self.userAvgHours = [];
            self.userAvgHours.push({
                key : "Count",
                values : resp
            });
            self.$apply();


        });
    };


    self.userType2 = function(url){



        bikeService.userType(url).then(function(resp){
            self.userRideHours = [];
            self.userRideHours.push({
                key : "Count",
                values : resp
            });
            self.userType3('https://raw.githubusercontent.com/kartikn27/raw_files/master/user_avg_hours.json');

        });
    };

    self.userType = function(){

        var url = "https://raw.githubusercontent.com/kartikn27/raw_files/master/subscriber_count.json";
        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[1] = true;


        bikeService.userType(url).then(function(resp){

            self.userRideCount = resp;
            // userRideCount

            self.userType2("https://raw.githubusercontent.com/kartikn27/raw_files/master/user_total_hours.json")

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

    self.options.userType2 = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 65
            },
            x: function(d){ return d.label; },
            y: function(d){return d.value + (1e-10);},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'User Type'
                //rotateLabels : 45,

            },
            yAxis: {
                axisLabel: 'Total hours'
            }
        }
    };
    self.options.userType3 = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 65
            },
            x: function(d){ return d.label; },
            y: function(d){return d.value + (1e-10);},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'User Type'
            },
            yAxis: {
                axisLabel: 'Average Hours'
            }
        }
    };

    self.zipcodeRidesHours = function(){


        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[1] = true;

        bikeService.zipcodeRidesHours().then(function(resp){

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
                left: 70
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            xAxis: {
                axisLabel: 'Zipcode',
                // rotateLabels : 45
                // staggerLabels: false

            },


            yAxis: {
                axisLabel: 'Rides & Hours',
                rotateLabels: -10 ,
                tickFormat: function(d){
                    return d3.format('f')(d);
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

        bikeService.dayRides().then(function(resp){
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

        bikeService.dateRides().then(function(resp){

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
                axisLabel: 'Dates',
                tickFormat: function(d){
                    return ( days[new Date(d).getDay()] + ' ' + d3.time.format('%d-%m-%y')(new Date(d)))
                }
            },
            yAxis: {
                axisLabel: 'Rides',
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
                left: 65
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

        bikeService.hourRides().then(function(resp){
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


    self.userRidesOakland = function(){
        self.OakchartData = [];

        var SJsubs = "https://raw.githubusercontent.com/kartikn27/raw_files/master/OK_rides_combined.json";
        bikeService.subscriberRides(SJsubs).then(function(resp){
            json = resp;
            json1 = [];
            json2 = [];

            for(var i = 0; i < json.length;i++){
                json1[i] = {};
                json2[i] = {};
                json1[i].x = new Date(json[i].x);
                json2[i].x = new Date(json[i].x);
                json1[i].y = new Date(json[i].y1);
                json2[i].y = new Date(json[i].y2);

            }
            var keywordObjScatter = {
                "key": 'Customer',
                "type": "line",
                "values": json1,
                "color": 'red',
                "yAxis": 1
            };
            var keywordObjLine = {
                "key": 'Subscriber',
                "type": "bar",
                "values": json2,
                "color": 'yellow',
                "yAxis": 1
            };
            self.OakchartData.push(keywordObjScatter,keywordObjLine)
            // self.userRidesOakland();
        });

    };

    self.userRidesSJ = function(){
        self.SJchartData = [];

        var SJsubs = "https://raw.githubusercontent.com/kartikn27/raw_files/master/SJ_rides_combined.json";
        bikeService.subscriberRides(SJsubs).then(function(resp){
                json = resp;
                json1 = [];
                json2 = [];

                for(var i = 0; i < json.length;i++){
                    json1[i] = {};
                    json2[i] = {};
                    json1[i].x = new Date(json[i].x);
                    json2[i].x = new Date(json[i].x);
                    json1[i].y = new Date(json[i].y1);
                    json2[i].y = new Date(json[i].y2);

                }
                var keywordObjScatter = {
                    "key": 'Customer',
                    "type": "scatter",
                    "values": json1,
                    "color": 'red',
                    "yAxis": 1
                };
                var keywordObjLine = {
                    "key": 'Subscriber',
                    "type": "scatter",
                    "values": json2,
                    "color": 'blue',
                    "yAxis": 1
                };
                self.SJchartData.push(keywordObjScatter,keywordObjLine)
                self.userRidesOakland();
        });

    };


    self.userRidesByArea = function(){
        self.SFchartData = [];

        for(var i = 0 ; i < self.charts.length; i++){
            self.charts[i] = false;
        }
        self.charts[4] = true;

        var SFsubs = "https://raw.githubusercontent.com/kartikn27/raw_files/master/SF_subs.json";
        var SFcust = "https://raw.githubusercontent.com/kartikn27/raw_files/master/SF_cus.json";
        bikeService.subscriberRides(SFsubs).then(function(resp){
            bikeService.customerRides(SFcust).then(function(resp2){
                json1 = resp;
                json2 = resp2;



                for(var i = 0; i < json1.length;i++){
                    json1[i].x = new Date(json1[i].x);
                    json2[i].x = new Date(json2[i].x);

                }
                var keywordObjScatter = {
                    "key": 'Subscriber',
                    "type": "bar",
                    "values": json1,
                    "color": 'red',
                    "yAxis": 1
                };
                var keywordObjLine = {
                    "key": 'Customer',
                    "type": "bar",
                    "values": json2,
                    "color": 'blue',
                    "yAxis": 1
                };
                self.SFchartData.push(keywordObjScatter,keywordObjLine);

                self.userRidesSJ();
            });
        });





    };

    self.options.SFrides = {
        chart: {
            type: 'multiChart',
            height: 450,
            margin : {
                top: 30,
                right: 60,
                bottom: 50,
                left: 70
            },
            color: d3.scale.category10().range(),
            //useInteractiveGuideline: true,
            duration: 500,
            xAxis: {
                tickFormat: function(d){
                    return ( days[new Date(d).getDay()] + ' ' + d3.time.format('%d-%m-%y')(new Date(d)))

                }
            },
            yAxis1: {
                axisLabel: 'Number of Rides',
                tickFormat: function(d){
                    return d3.format('f')(d);
                }
            },
            yAxis2: {
                tickFormat: function(d){
                    return d3.format('f')(d);
                }
            }
        }
    };

    setTimeout(function(){
        console.log('scope api:', self.api);
        self.api.refresh();

    });



   self.popularTable = function(){
       for(var i = 0 ; i < self.charts.length; i++){
           self.charts[i] = false;
       }
       self.charts[5] = true;

        bikeService.popularStations().then(function(resp){
            self.popularStationTable = resp;
            self.popularStationTable = self.popularStationTable.slice(0,39)
            self.tableParams = new NgTableParams({}, { dataset: self.popularStationTable});
        });
   };

   self.zipCodeRides = function () {
       for(var i = 0 ; i < self.charts.length; i++){
           self.charts[i] = false;
       }
       self.charts[3] = true;
       bikeService.zipCodeRides().then(function(resp){



           self.chartData = angular.copy(resp);
           var lineAlpha = [], lineBeta = [];

           self.chartData.forEach(function(d) {
               d['no_of_subscribers'] = +d['no_of_subscribers'];
               d['no_of_bikes']  = +d['no_of_bikes'];

               lineAlpha.push({x: d['ZipCode'], y: d['no_of_subscribers']});
               lineBeta.push({x: d['ZipCode'] , y: d['no_of_bikes']});
           });

           self.zipData = [
               {
                   values: lineAlpha,
                   key: 'Subscriber  count',
                   color: 'yellow'
               },
               {
                   values: lineBeta,
                   key: 'Bike Count',
                   color: 'red'
               }
           ];

           self.$apply();

       });
   };

    self.options.zipData = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 65
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            xAxis: {
                // axisLabel: self.chartLabels,
                //rotateLabels : 45,
                // staggerLabels: false

            },


            yAxis: {
                axisLabel: 'Bike count & Subscriber count',
                tickFormat: function(d){
                    return d3.format('f')(d);
                }
            },
            useInteractiveGuideline: false
        }
    };




}]);