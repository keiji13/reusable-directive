angular.module('app', ['ngResource'])
    // SERVICE
    .service('FillText', ['$resource', function($resource) {
        var FillTextMethods = {};

        FillTextMethods.query = {
            method: 'JSONP',
            params: {
                rows: 5,
                id: '{index}',
                firstName: '{firstName}',
                lastName: '{lastName}'
            },
            isArray: true
        };

        var FillText = $resource('http://filltext.com/', {
            id: '@id',
            callback: "JSON_CALLBACK"
        }, FillTextMethods);

        return FillText;

    }])
    .controller('AppCtrl', ['$scope', 'FillText', function($scope, FillText) {
        $scope.employees = [];
        FillText.query()
        .$promise
        .then(function(results) {
            $scope.employees = results;
            
        }, function(err) {
            console.log(err);
            
        });
    }])
    .directive('fullName', function(){
      return {
        restrict: 'E',
        scope: true,
        link: function(scope, element, attrs){
          scope.firstName = attrs.firstName;
          scope.lastName = attrs.lastName;
        },
        template: '{{firstName}} {{lastName}}'
      }
    })
    .directive('initials', function(){
      return {
        restrict: 'E',
        link: function(scope, element, attrs){
          var nameItems = attrs.name.split(' ');
          var initials = [];
          angular.forEach(nameItems, function(nameItem){
              initials.push(nameItem.substring(0,1) + '.');
          });
          scope.initials = initials.join('');
        },
        template: '{{initials}}'
      }
    });