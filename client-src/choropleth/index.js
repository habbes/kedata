'use strict';

import angular from 'angular';
import services from '../services';
import ChoroplethController from './controller';

angular.module('app.choropleth', ['app.services'])
.controller('ChoroplethController', ChoroplethController);
