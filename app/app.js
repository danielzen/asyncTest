angular.module('App', []);

// Controller
angular.module('App')
  .controller('MainController', ['$rootScope', 'realFactory', MainController]);

function MainController($rootScope, factory) {
  factory.getData().then(function(data) {
    $rootScope.data = data;
  });
}

angular.module('App')
  .factory('realFactory', realFactory);

// Factory
function realFactory($http) {
  var dataPromise = $http.get('/sample.json').then(function(response) {
    return response.data;
  });

  console.log('real');
  return {
    getData: function() {
      return dataPromise;
    }
  }
}


