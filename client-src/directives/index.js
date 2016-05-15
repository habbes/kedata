
import angular from 'angular';
import map from './map';
import scatter from './scatterchart';

angular.module('app.directives', [])
.directive('map', map)
.directive('scatterchart', scatter);