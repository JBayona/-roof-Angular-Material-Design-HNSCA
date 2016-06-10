'use strict';

angular.module('roofAngularMaterialDesignApp')
  .directive('ngFileSelect', function () {
    return {
      link: function ($scope, element, attrs) {
	       element.bind("change", function(e){
	      
		        $scope.file = (e.srcElement || e.target).files[0];
		        $scope.getFile();
      		})
      }
    };
  });