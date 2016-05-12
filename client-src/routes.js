'use strict';

export default function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('choropleth', {
       url: '/choropleth',
       templateUrl: 'choropleth/choropleth.html'
    });
    
}