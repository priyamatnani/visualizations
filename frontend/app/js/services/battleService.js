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
        userType : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/subscriber_count.json' ).then(function (response) {
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


    }
}]);