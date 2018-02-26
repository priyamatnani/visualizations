/**
 Created by $(USER) on $(DATE)
 **/


gameOfThrones.factory('battleService',['$q', '$http' ,function($q, $http){

    return{


        bikeRides : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/start_station_rides.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        userType : function(url){
            return $http.get(url).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        zipcodeRidesHours : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/zip_rides_hours.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        dayRides : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/day_rides.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        dateRides : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/date_rides.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        hourRides : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/rides_per_hour.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        subscriberRides : function(obj){
            return $http.get(obj).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        customerRides : function(obj){
            return $http.get(obj).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        popularStations : function(){

            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/popular_routes.json').then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },
        zipCodeRides : function(){

            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/popular_routes.json').then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        },



    }
}]);