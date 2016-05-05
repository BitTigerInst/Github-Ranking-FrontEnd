var app = angular.module('ranking_board', ['chart.js']);

app.controller('main_controller', ['$scope', function ($scope) {

    var FirebaseRef = new Firebase("https://bittiger-ranking.firebaseio.com/");
    var first_launch = true;

    FirebaseRef.child('user_events').on("value", function (snapshot) {

        $scope.members = snapshot.val()['events'];
        $scope.list_created_time = snapshot.val()['created_time'];
        $scope.$apply();

        if (!first_launch) {
            bootstrap_alert('Ranking is just updated at ' + $scope.list_created_time);
            first_launch = false;
        } else {
            first_launch = false;
        }
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


    $scope.checkOrganization = function (member) {
        //        if (member['organization'] == 'top_coders') {
        //            console.log(member);
        //            return 'success';
        //        }
        return 'success';
    }

    bootstrap_alert = function (message) {

        angular.element('#alert_placeholder').html('<div class="alert alert-success" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Updated! </strong> Ranking has been updated at ' + $scope.list_created_time + ' LoL</div>');

        angular.element("#success-alert").alert();
        angular.element("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            angular.element("#success-alert").alert('close');
            angular.element("#success-alert").replaceWith(divClone.clone());
        });
    }
}]);