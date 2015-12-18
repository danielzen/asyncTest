"use strict";

describe("Mock Controller", function() {

  var mainController, $rootScope, mockFactory, $q, $httpBackend, deferred;

  beforeEach(module('App'));

  beforeEach(inject(function($injector, $controller) {
    $q = $injector.get('$q');

    mockFactory = {
        getData: function() {
          return $q.when({"attribute": 3});
        }
    };

    $rootScope = $injector.get('$rootScope');

    mainController = $controller('MainController', {
      '$rootScope': $rootScope,
      'realFactory': mockFactory
    });

  }));

  it('should have a main controller', function() {
    expect(mainController).not.toBe(null);
  });

  it('should have data in the $rootScope', function() {
    //expect(mockFactory.getData).toHaveBeenCalled();
    //deferred.resolve({ attribute: 2 });
    // We have to call apply for this to work
    $rootScope.$apply();
    expect($rootScope.data instanceof Object).toBeTruthy();
    expect($rootScope.data.attribute).toBe(3);
  });

});
