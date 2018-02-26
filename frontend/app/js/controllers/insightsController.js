/**
 Created by $(USER) on $(DATE)
 **/
gameOfThrones.controller('insightsController',['battleService', function(battleService){
    console.log("insightsController>>>>")

    var self = this;
    battleService.dataInsights().then(function(resp){
        self.tableData = resp;
        self.tableData = self.tableData.slice(0,20);
    });
}]);