'use strict';

import angular from 'angular';
import storage from 'angular-local-storage';
import DataService from './DataService';

angular.module('app.services', [storage])
.factory('DataService', DataService);
