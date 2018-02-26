/**
 Created by $(USER) on $(DATE)
 **/
uberBikes.controller('insightsController',['battleService', function(battleService){
    console.log("insightsController>>>>")

    var self = this;


    self.getData = function(){
        battleService.dataInsights().then(function(resp){
            self.tableData = resp;
            self.tableData = self.tableData.slice(0,20);
        });
    };

    self.getData();

}]);