'use strict';

import 'babel-polyfill';
import 'jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './routes';

angular.module('app',[
    uiRouter
    
])
.config(['$urlRouterProvider','$stateProvider', routes]);
