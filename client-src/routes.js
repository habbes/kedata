'use strict';

export default function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
    })
    .state('choropleth', {
       url: '/choropleth',
       templateUrl: 'views/choropleth.html'
    });
    
}