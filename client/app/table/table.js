'use strict';

angular.module('roofAngularMaterialDesignApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/table', {
        templateUrl: 'app/table/table.html',
        controller: 'TableCtrl'
      });
  });
