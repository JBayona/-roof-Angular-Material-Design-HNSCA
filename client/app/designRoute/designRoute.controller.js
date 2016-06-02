'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DesignRouteCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', '$log', function ($scope,$mdSidenav,$mdDialog, $mdMedia,$log) {

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
        //scope: $scope,        // use parent scope in template
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
  	function DialogController($scope, $mdDialog, selectedOption){ //selectedOption

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
        //console.log('Option ' + selectedOption + ' was selected');
  			$mdDialog.hide(answer);
  		}

      $scope.showChannelText = function(){
        return $scope.selectedElement === 'Channel';
      }

      $scope.addElement = function(){
        var flag = 0;   
        $scope.template = '';
        var concat = null;
        //Start adding the desired elements;
        if($scope.sectionSelected == 'New Section'){
            if($scope.selectedColor){
              $scope.template = '<div layout="row" style="background-color:' + $scope.selectedColor +'" id="'+$scope.sectionName+'" layout-wrap layout-padding flex>';
            }
        }else if($scope.sectionSelected == 'Current Section'){
              flag = 1;
        }

        if($scope.selectedElement){
          if($scope.selectedElement == 'Channel'){
            if($scope.channelRate){
              $scope.template += '<div flex="'+ $scope.channelRate +'" flex-xs="" flex-gt-xs="'+ $scope.channelRate +'" layout-align="center center">' +
                                  '<md-card>' +
                                    '<img src="assets/images/roof1.jpg" class="md-card-image" alt="Washed Out">' +
                                      '<md-card-title>' +
                                        '<md-card-title-text>' + 
                                          '<span class="md-headline">'+ $scope.channelTitle +'</span>' + 
                                        '</md-card-title-text>' + 
                                      '</md-card-title>' + 
                                      '<md-card-content>' +
                                        '<p>' + $scope.channelText + '</p>' +
                                      '</md-card-content>' +
                                  '</md-card>'
                                '</div></div>'; //Quitar un div porque sale del principal, ese va al final siempre
            }
          }else if($scope.selectedElement == 'Paragraph'){
            if($scope.paragraphRate){
            }
            console.log("Channel title = " + $scope.paragraphTitle);
            console.log("Channel title = " + $scope.paragraphText);
            console.log("Channel title = " + $scope.paragraphRate);
          }
        }

        if(flag){
          //concat = angular.element( document.querySelector( "#'"+$scope.sectionName+'" ));
          console.log($scope.sectionName);
        }else{
          concat = angular.element( document.querySelector( '#main-content' ));
        }
        concat.append($scope.template);
        $scope.hide();
      }

  	}

  }]);
