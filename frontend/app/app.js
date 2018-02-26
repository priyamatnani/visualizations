
var uberBikes = angular.module('uberBikes',['ui.router', 'ngMaterial', 'ngAnimate','ngAria','nvd3','ngTable']);


uberBikes.config(['$stateProvider','$urlRouterProvider', '$qProvider', function($stateProvider,$urlRouterProvider, $qProvider){

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'view/dashboard.html'

        });

    $qProvider.errorOnUnhandledRejections(false);

}]);