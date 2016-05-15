'use strict';

import angular from 'angular';
import services from '../services';
import ChoroplethController from './ChoroplethController';
import ScatterchartController from './ScatterchartController';

angular.module('app.controllers', ['app.services'])
.controller('ChoroplethController', ['$scope','DataService', ChoroplethController])
.controller('ScatterchartController', ['$scope','DataService', ScatterchartController]);
