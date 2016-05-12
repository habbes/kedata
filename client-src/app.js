'use strict';

import 'babel-polyfill';
import 'jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './routes';
import './services';
import './choropleth';
import initData from './initdata';

angular.module('app',[
    uiRouter,
    'app.services',
    'app.choropleth'

])
.config(['$urlRouterProvider','$stateProvider', routes])
.run(['DataService', initData]);
