'use strict';

angular.module('roofAngularMaterialDesignApp')
  .controller('DesignRouteCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', '$log', '$rootScope', 'fileReader', function ($scope,$mdSidenav,$mdDialog, $mdMedia,$log, $rootScope, fileReader) {
    console.log(fileReader)
  	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  	$scope.status = '';
    $scope.selectedOption = '';
    $scope.bodyOptions;
    $scope.sectionId = null;

  	$scope.settings = [
  		{ name: 'header', extraScreen: 'header menu', icon: 'action:bookmark_border' },
  		{ name: 'body', extraScreen: 'body menu', icon: 'action:accessibility' },
  		{ name: 'footer', extraScreen: 'header menu', icon: 'action:perm_identity' }
  	];
   
  	$scope.toggleDesign = function(){
  		$mdSidenav('left').toggle();
  	};

  	$scope.showDialog = function(event, name){
     $scope.selectedOption = name;
 		 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

     if($scope.selectedOption === 'header'){
        showHeaderDialog(event,$scope.selectedOption,useFullScreen);
     }else if($scope.selectedOption === 'body'){
        showBodyDialog(event,$scope.selectedOption,useFullScreen);
     }else{
        showFooterDialog(event,$scope.selectedOption,useFullScreen);
     }
  	};

    function showBodyDialog(event,selectedOption,useFullScreen){
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/dialog/dialogTemplate.html',
        parent: angular.element(document.body),
        targetEvent: event,
        locals: {
          selectedOption: selectedOption,
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
    }	

  	//Controller for the dialog
  	function DialogController($scope, $mdDialog, selectedOption){ //selectedOption

      $scope.elements = ['Channel','Paragraph'];
      $scope.colors = ['red', 'blue', 'yellow', 'gray', 'black', 'orange', 'pink', 'white'];
      $scope.channel = ['Channel','Paragraph'];
      $scope.option = ['New Section', 'Current Section'];
      $scope.verticalOptions = ['start', 'center', 'end'];
      $scope.horizontalOptions = ['start', 'center', 'end'];
      $scope.testing = null;

  		$scope.hide = function(){
  			$mdDialog.hide();
  		};
  		$scope.cancel = function(){
  			$mdDialog.cancel();
  		};
  		$scope.answer = function(answer){
  			$mdDialog.hide(answer);
  		}

      $scope.showChannelText = function(){
        return $scope.selectedElement === 'Channel'; 
      }

      $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.imageSrc = result;
          });
      };

      $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
      });

      $scope.addElement = function(){
        var flag = 0;   
        $scope.template = '';
        var concat = null;
        //Start adding the desired elements;
        if($scope.sectionSelected == 'New Section'){
            if($scope.selectedColor){
              $scope.template = '<div layout="row" style="background-color:' + $scope.selectedColor +'" id="'+$scope.sectionName+'" layout-wrap layout-padding flex>';
              $rootScope.sectionId = $scope.sectionName;
            }
        }else if($scope.sectionSelected == 'Current Section'){
              flag = 1;
        }

        if($scope.selectedElement){
          if($scope.selectedElement == 'Channel'){ 
            if($scope.channelRate){
              $scope.template += '<div flex="'+ $scope.channelRate +'" flex-xs="" flex-gt-xs="'+ $scope.channelRate +'" layout-align="center center">' +
                                  '<md-card>' +
                                    '<img src="'+ $scope.imageSrc +'" class="md-card-image" alt="Washed Out">' +
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
              $scope.template = '<div flex="' + $scope.paragraphRate + '" flex="" flex-gt-xs="' + $scope.paragraphRate + '"  layout="column" layout-align="' + $scope.horizontalAling + ' '+ $scope.verticalAling +'" layout-padding layout-marging>' +
                                  '<span class="md-headline">'+ $scope.paragraphTitle +'</span>' + 
                                  '<p>' + $scope.paragraphText + '</p>' +
                                '</div>';
            }
            console.log("Channel title = " + $scope.paragraphTitle);
            console.log("Channel title = " + $scope.paragraphText);
            console.log("Channel title = " + $scope.paragraphRate);
            console.log("Channel title = " + $scope.paragraphRate);
            console.log("Channel title = " + $scope.verticalAling);
            console.log("Channel title = " + $scope.horizontalAling);
          }
        }

        if(flag){
          concat = angular.element( document.querySelector( '#'+$rootScope.sectionId ));
          console.log($scope.sectionName);
        }else{
          concat = angular.element( document.querySelector( '#main-content' ));
        }
        concat.append($scope.template);
        $scope.hide();
      }

  	}

    function showHeaderDialog(event,selectedOption,useFullScreen){
      $mdDialog.show({
        controller: DialogHeaderController,
        templateUrl: 'app/dialog/dialogTemplateHeader.html',
        parent: angular.element(document.body),
        targetEvent: event,
        locals: {
          selectedOption: selectedOption,
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
    }

    function DialogHeaderController($scope, $mdDialog, selectedOption){ //selectedOption
      $scope.colors = ['red', 'blue', 'yellow', 'gray', 'black', 'orange', 'pink', 'white'];
      $scope.verticalOptions = ['start', 'center', 'end'];
      $scope.horizontalOptions = ['start', 'center', 'end'];
      $scope.testing = null;

      $scope.hide = function(){
        $mdDialog.hide();
      };
      $scope.cancel = function(){
        $mdDialog.cancel();
      };
      $scope.answer = function(answer){
        $mdDialog.hide(answer);
      }
      $scope.addHeaderElement = function(){
        var flag = 0;   
        $scope.template = '';
        var concat = null;
        console.log($scope.headerColor);
        $rootScope.theme = 'lime';
      }
    }

    function showFooterDialog(event,selectedOption,useFullScreen){
      $mdDialog.show({
        controller: DialogFooterController,
        templateUrl: 'app/dialog/dialogTemplateFooter.html',
        parent: angular.element(document.body),
        targetEvent: event,
        locals: {
          selectedOption: selectedOption,
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
    }

    function DialogFooterController($scope, $mdDialog, selectedOption){ //selectedOption
      $scope.verticalOptions = ['start', 'center', 'end'];
      $scope.testing = null;

      $scope.hide = function(){
        $mdDialog.hide();
      };
      $scope.cancel = function(){
        $mdDialog.cancel();
      };
      $scope.answer = function(answer){
        $mdDialog.hide(answer);
      }
      $scope.addFooterElement = function(){
        $scope.template = '';
        var concat = null;
        $scope.template =  '<md-toolbar md-theme="' + $rootScope.theme + '" md-theme-watch="true" layout-padding>' +
                            '<div layout="row" layout-align="' + $scope.footerAlign + ' center" flex>' +
                              '<span>' + $scope.footerText + '</span>' +
                            '</div>' +
                           '</md-toolbar>';
        concat = angular.element( document.querySelector( '#footerSection'));
        concat.append($scope.template);
        $scope.hide();
      }
    }

  }]);
