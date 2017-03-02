// Code goes here

var app = angular.module("clientApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider.when("/Clients", {
      templateUrl: "view-list.html",
      controller: "listController"
    })
    .when("/Clients/add", {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when("/Clients/:index", {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .otherwise({
      redirectTo: "/Clients"
    })
});

app.factory("clientService", ["$rootScope", function($rootScope) {
  var svc = {};
  
  var data = [{
      tsn: "12345",
      payroll_cd: "TZ305",
      company_name: "Apple Inc",
      status: "s",
      eff_date: "03-01-17",
      user_id: "obs",
      migrate_requested_ts: "02-10-17"
    }, {
      tsn: "24557",
      payroll_cd: "MZ315",
      company_name: "ADP Corp",
      status: "s",
      eff_date: "03-02-17",
      user_id: "abs",
      migrate_requested_ts: "02-10-17"
    }, {
      tsn: "00245",
      payroll_cd: "AR322",
      company_name: "DELL Inc",
      status: "s",
      eff_date: "03-03-17",
      user_id: "ols",
      migrate_requested_ts: "02-10-17"
    }];
    
    svc.getClients = function() {
      return data;
    };
    
    svc.addClients = function(client) {
      data.push(client);
    }
    
    svc.deleteClient = function(index) {
      data.splice(index, 1);
    }
    
    svc.editClients = function(client) {
      
    }
  
  return svc;
}]);

app.controller("listController", ["$scope", "$location", "$routeParams", "clientService",
  function($scope, $location, $routeParams, clientService) {

    $scope.data = clientService.getClients();
    
    $scope.addClient = function() {
      $location.path("/Clients/add");
    };
    
    $scope.addItem = function(x) {
      $location.path("/Clients/" + x);
    };
    

  }
]);

app.controller("addController", ["$scope", "$location", "$routeParams", "clientService",
  function($scope, $location, $routeParams, clientService) {

  $scope.save = function() {
    
   // clientService.addClients({tsn: " ", payroll: " ", company_name: " ", status: " ", eff_date: " ", user_id: " ", migrate_requested_ts: " "});
    //tsn: $scope.Client.tsn, payroll_cd: $scope.Client.payroll_cd, company_name: $scope.Client.company_name, status: $scope.Client.status, eff_date: $scope.Client.eff_date, user_id: $scope.Client.eff_date, migrate_requested_ts: $scope.Client.migrate_requested_ts
    $location.path("/Clients");
  };
  
  $scope.cancel = function() {
    $location.path("/Clients");
  };



  }
]);

app.controller("editController", ["$scope", "$location", "$routeParams", "clientService",
  function($scope, $location, $routeParams, clientService) {

$scope.Client = clientService.getClients()[parseInt($routeParams.index)];

 $scope.save = function() {
   
    clientService.addClients({tsn: $scope.Client.tsn, payroll_cd: $scope.Client.payroll_cd, company_name: $scope.Client.company_name, status: $scope.Client.status, eff_date: $scope.Client.eff_date, user_id: $scope.Client.eff_date, migrate_requested_ts: $scope.Client.migrate_requested_ts});
    $location.path("/Clients");
    
  };
  
  $scope.delete = function() {
    clientService.deleteClient($routeParams.index);
    $location.path("/Clients");
  }
  
  $scope.cancel = function() {
    $location.path("/Clients");
  };



  }
]);