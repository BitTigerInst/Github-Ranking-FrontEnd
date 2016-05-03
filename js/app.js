var app = angular.module('ranking_board', ['chart.js']);

app.controller('main_controller', ['$scope', function ($scope) {


    var FirebaseRef = new Firebase("https://bittiger-ranking.firebaseio.com/");

    FirebaseRef.child('user_events').on("value", function (snapshot) {

        $scope.members = snapshot.val()['events'];
        $scope.list_created_time = snapshot.val()['created_time'];
        $scope.$apply();
        console.log($scope.list_created_time);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    $scope.order_patterns = ['Total', 'PushEvent', 'PullRequestEvent', 'CreateEvent', 'ForkEvent'];
    $scope.order = 'Total';
    console.log($scope.order);


    $scope.dropboxitemselected = function (item) {
        $scope.order = item;
        console.log("New Order: " + $scope.order);
    }

}]);