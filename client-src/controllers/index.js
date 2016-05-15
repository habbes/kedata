'use strict';

import angular from 'angular';
import services from '../services';
import ChoroplethController from './ChoroplethController';

angular.module('app.controllers', ['app.services'])
.controller('ChoroplethController', ChoroplethController);
