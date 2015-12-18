"use strict";

describe("Main Controller", function() {

  var mainController, $rootScope, factory, $q, $httpBackend;

  beforeEach(module('App'));

  beforeEach(inject(function($injector, $controller, _realFactory_) {
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    factory = _realFactory_;

    $httpBackend.when('GET', '/sample.json').respond({attribute: 2});

    mainController = $controller('MainController', {
      '$rootScope': $rootScope,
      'factory': factory
    });

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a main controller', function() {
    expect(mainController).not.toBe(null);
    $httpBackend.expectGET('/sample.json');
    $httpBackend.flush();
  });

  it('should have data in the $rootScope', function() {
    $httpBackend.expectGET('/sample.json');
    $httpBackend.flush();
    expect($rootScope.data instanceof Object).toBeTruthy();
    expect($rootScope.data.attribute).toBe(2);
  });

});
