'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DialogStyleCtrl', ['$scope', '$mdDialog', 'selectedOption', function ($scope, $mdDialog, selectedOption) {
    
  	$scope.elements = ['Channel','Paragraph'];
	  $scope.colors = ['red', 'blue', 'yellow', 'gray', 'black', 'orange', 'pink', 'white'];
	  $scope.channel = ['Channel','Paragraph'];
	  $scope.option = ['New Section', 'Current Section'];
	  $scope.verticalOptions = ['Start', 'Center', 'End'];
	  $scope.horizontalOptions = ['Start', 'Center', 'End'];

		$scope.hide = function(){
			$mdDialog.hide();
		};
		$scope.cancel = function(){
			$mdDialog.cancel();
		};
		$scope.answer = function(answer){
    console.log('Option ' + selectedOption + ' was selected');
			$mdDialog.hide(answer);
		}

  }]);
