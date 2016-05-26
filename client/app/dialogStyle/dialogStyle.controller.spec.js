'use strict';

describe('Controller: DialogStyleCtrl', function () {

  // load the controller's module
  beforeEach(module('roofAngularMaterialDesignApp'));

  var DialogStyleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogStyleCtrl = $controller('DialogStyleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
