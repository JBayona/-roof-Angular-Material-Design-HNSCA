'use strict';

angular.module('roofAngularMaterialDesignApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });