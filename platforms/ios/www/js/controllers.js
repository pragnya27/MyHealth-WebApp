angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'No Appointments set up',
      template: ' '
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('exampleCtrl',function($scope, $ionicPopup, $timeout){

$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: ' Enter your daily medicine dosage',
       template: ''
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

$scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Save',
       template: 'Are you sure you want to save the information'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

$scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: 'Time Set for medicine',
     subTitle: ' ',
     scope: $scope,
     buttons: [
       { text: 'Snooze' },
       {
         text: '<b>OK</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };









$scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 }
    
    
  ];


$scope.name="asd";
  $scope.items = [];
  $scope.addItem = function (dateEnter, itemName) {
   $scope.items.push({
      date: dateEnter,
      name: itemName
   });
   $scope.dateEnter = "";
   $scope.itemName = "";
 };
  
 $scope.removeItem = function (index) {
   $scope.items.splice(index, 1);
 };


  

})



.controller('factsCtrl', function($scope, $state, $ionicPopup, AuthService){


})

.controller('resultCtrl', function($scope, $state, $ionicPopup, AuthService){


})


.controller('appointmentsCtrl', function($scope, $state, $ionicPopup, AuthService){
  $scope.name="asd";
  $scope.items = [];
  $scope.addItem = function (itemAmount, itemName) {
   $scope.items.push({
      amount: itemAmount,
      name: itemName
   });
   $scope.itemAmount = "";
   $scope.itemName = "";
 };
  
 $scope.removeItem = function (index) {
   $scope.items.splice(index, 1);
 };

$scope.goToAppointments = function() {
    // $http.get('http://localhost:8100/valid').then(
    //   function(result) {
    //     $scope.response = result;
    //   });

    //AuthService.logout();
    $state.go('facts');


  };

$scope.goBack = function() {
    $state.go('appointments');
  };


 


})




.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };





  $scope.performValidRequest = function() {
    // $http.get('http://localhost:8100/valid').then(
    //   function(result) {
    //     $scope.response = result;
    //   });

    //AuthService.logout();
    $state.go('example');


  };

  $scope.performUnauthorizedRequest = function() {
    // $http.get('http://localhost:8100/notauthorized').then(
    //   function(result) {
    //     // No result here..
    //   }, function(err) {
    //     $scope.response = err;
    //   });

$state.go('appointments');

  };

  $scope.performInvalidRequest = function() {
    // $http.get('http://localhost:8100/notauthenticated').then(
    //   function(result) {
    //     // No result here..
    //   }, function(err) {
    //     $scope.response = err;
    //   });
    $state.go('results');
  };
});
