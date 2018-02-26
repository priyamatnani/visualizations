/**
 Created by $(USER) on $(DATE)
 **/
uberBikes.controller('insightsController',['bikeService', function(bikeService){
    console.log("insightsController>>>>")

    var self = this;


    self.getData = function(){
        bikeService.dataInsights().then(function(resp){
            self.tableData = resp;
            self.tableData = self.tableData.slice(0,20);
        });
    };

    self.getData();

}]);