'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DialogController', function ($scope, $mdDialog) {
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  
});
