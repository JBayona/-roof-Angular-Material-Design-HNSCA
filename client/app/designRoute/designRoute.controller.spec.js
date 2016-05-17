'use strict';

describe('Controller: DesignRouteCtrl', function () {

  // load the controller's module
  beforeEach(module('roofAngularMaterialDesignApp'));

  var DesignRouteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesignRouteCtrl = $controller('DesignRouteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
