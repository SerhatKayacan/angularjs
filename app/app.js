var myFormApp = angular.module("myFormApp", ["ngRoute", "ngAnimate"]);

myFormApp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/", {
        templateUrl: "views\\Home.html",
        controller: "myFormController"
      })
      .when("/formugörüntüle", {
        templateUrl: "views\\formgör.html",
        controller: "myFormController"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);

myFormApp.controller("myFormController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function($scope, $http, $location, $rootScope) {
    $scope.addForm = function() {
      $scope.forms.push({
        formname: $scope.newform.formname,
        fields: [
          {
            required: true,
            name: $scope.newform.isim
          },
          {
            required: true,
            surname: $scope.newform.soyisim
          },
          {
            yas: parseInt($scope.newform.yas)
          }
        ]
      });
      localStorage.setItem("forms", JSON.stringify($scope.forms));
      $scope.newform.formname = "";
      $scope.newform.isim = "";
      $scope.newform.soyisim = "";
      $scope.newform.yas = "";
    };

    const value = JSON.parse(localStorage.getItem("forms"));
    if (value == null) {
      $http.get("data\\forms.json").then(
        function(response) {
          $scope.forms = response.data;
        },
        function errorCallback(error) {
          console.log(error);
        }
      );
    } else {
      $scope.forms = value;
    }

    $scope.formgoster = function(form) {
      var formindex = $scope.forms.indexOf(form);
      $rootScope.x = $scope.forms[formindex];
      $location.url("/formugörüntüle");
    };
  }
]);
