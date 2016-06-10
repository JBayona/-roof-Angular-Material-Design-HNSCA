'use strict';

angular.module('roofAngularMaterialDesignApp')
  .directive('ngFileSelect', function () {
    return {
      link: function ($scope, element, attrs) {
	       element.bind("change", function(e){
            //console.log("This is on file select");
		        $scope.file = (e.srcElement || e.target).files[0];
            console.log($scope.file);
            console.log($scope.file.name);
		        $scope.getFile();
      		})
      }
    };
  });