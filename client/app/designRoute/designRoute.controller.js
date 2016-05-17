'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DesignRouteCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', function ($scope,$mdSidenav,$mdDialog, $mdMedia) {

  	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  	$scope.status = '';
    $scope.selectedOption = '';
    $scope.bodyOptions

  	$scope.settings = [
  		{ name: 'header', extraScreen: 'header menu', icon: 'action:bookmark_border' },
  		{ name: 'body', extraScreen: 'body menu', icon: 'action:accessibility' },
  		{ name: 'footer', extraScreen: 'header menu', icon: 'action:perm_identity' }
  	];
   
  	$scope.toggleDesign = function(){
  		$mdSidenav('left').toggle();
  	};

  	$scope.showDialog = function(ev, name){
  		//$scope.toggleDesign();

      $scope.selectedOption = name;

  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

  		$mdDialog.show({
  			controller: DialogController,
  			templateUrl: 'app/dialog/dialogTemplate.html',
  			parent: angular.element(document.body),
  			targetEvent: ev,
        locals: {
          selectedOption: $scope.selectedOption
        },
  			clickOutsideToClose: true,
  			fullscreen: useFullScreen
  		})
  		.then(function(answer){
  			$scope.status = 'Your answer was ' + answer + '.'
  		}, function(){
  			$scope.status = 'You cancelled the dialog.'
  		});

  		$scope.$watch(function(){
  			return $mdMedia('xs') || $mdMedia('sm');
  		},function(wantsFullScreen){
  			$scope.customFullscreen = (wantsFullScreen === true);
  		});
  	};	

  	//Controller for the dialog
  	function DialogController($scope, $mdDialog, selectedOption){
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
  	}

  }]);
