'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DesignRouteCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', function ($scope,$mdSidenav,$mdDialog, $mdMedia) {

  	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  	$scope.status = '';
    $scope.selectedOption = '';
    $scope.bodyOptions;

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
          selectedOption: $scope.selectedOption,
        },
  			clickOutsideToClose: true,
        scope: $scope,        // use parent scope in template
        //preserveScope: true,  // do not forget this if use parent scope
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

      $scope.elements = ['Channel','Paragraph'];
      $scope.colors = ['red', 'blue', 'yellow', 'gray', 'black', 'orange', 'pink', 'white'];
      $scope.channel = ['Channel','Paragraph'];
      $scope.option = ['New Section', 'Current Section'];
      $scope.verticalOptions = ['Start', 'Center', 'End'];
      $scope.horizontalOptions = ['Start', 'Center', 'End'];
      $scope.testing = null;

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

      $scope.showChannelText = function(){
        return $scope.selectedElement === 'Channel';
      }

      $scope.addElement = function(){
        $scope.template = '';

        //Start adding the desired elements;
        if($scope.sectionSelected == 'New Section'){
            if($scope.selectedColor){
              $scope.template = '<div layout="row" style="background-color:' + $scope.selectedColor +'" layout-wrap layout-padding flex>' +
              '<h1>Hello</h1></div>';
            }
        }else{
            console.log('Existing section');
        }

        if($scope.selectedElement){
          console.log("Element " + $scope.selectedElement + " selected");
          if($scope.selectedElement == 'Channel'){
            console.log("Channel title = " + $scope.channelTitle);
            console.log("Channel title = " + $scope.channelText);
            console.log("Channel title = " + $scope.channelRate);
          }else if($scope.selectedElement == 'Paragraph'){
            console.log("Channel title = " + $scope.paragraphTitle);
            console.log("Channel title = " + $scope.paragraphText);
            console.log("Channel title = " + $scope.paragraphRate);
          }
        }

      }

  	}

  }]);
