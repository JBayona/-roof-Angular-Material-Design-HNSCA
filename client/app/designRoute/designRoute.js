'use strict';

angular.module('roofAngularMaterialDesignApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/designRoute/designRoute.html',
        controller: 'DesignRouteCtrl'
      });
  });
