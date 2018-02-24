/**
 Created by $(USER) on $(DATE)
 **/


gameOfThrones.factory('battleService',['$q', '$http' ,function($q, $http){

    return{


        chart1 : function(){
            return $http.get('https://raw.githubusercontent.com/kartikn27/raw_files/master/start_station_rides.json' ).then(function (response) {
                if (response !== undefined && response.data !== undefined) {
                    return response.data;
                }
                else {
                    return $q.reject(response);
                }
            });
        }

    }
}]);