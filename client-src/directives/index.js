
import angular from 'angular';
import '../services';
import map from './map';
import scatter from './scatterchart';
import countyrank from './countyrankchart';

angular.module('app.directives', ['app.services'])
.directive('map', [map])
.directive('scatterchart', [scatter])
.directive('countyrankchart', ['DataService', countyrank]);