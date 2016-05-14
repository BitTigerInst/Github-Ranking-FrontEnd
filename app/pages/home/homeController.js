app.controller('home_controller', ['$scope', function ($scope) {

    // For firebase initialization and date updates
    var FirebaseRef = new Firebase("https://bittiger-ranking.firebaseio.com/");
    var first_launch = true;
    FirebaseRef.child('user_events').on("value", function (snapshot) {

            $scope.members = snapshot.val().events;
            $scope.list_created_time = snapshot.val().created_time;
            $scope.$apply();

            if (!first_launch) {
                bootstrap_alert('Ranking is just updated at ' + $scope.list_created_time);
            }
            first_launch = false;
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    // For ranking order
    $scope.order_patterns = ['Total', 'PushEvent', 'PullRequestEvent', 'CreateEvent', 'ForkEvent'];
    $scope.order = 'Total';
    $scope.dropboxitemselected = function (item) {
        $scope.order = item;
        console.log("New Order: " + $scope.order);
    };

    // Remains for future
    $scope.checkOrganization = function (member) {
        //        if (member['organization'] == 'top_coders') {
        //            console.log(member);
        //            return 'success';
        //        }
        return 'success';
    };

    bootstrap_alert = function (message) {

        angular.element('#alert_placeholder').html('<div class="alert alert-success" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Updated! </strong> Ranking has been updated at ' + $scope.list_created_time + ' LoL</div>');
        angular.element("#success-alert").alert();
        angular.element("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            angular.element("#success-alert").alert('close');
            angular.element("#success-alert").replaceWith(divClone.clone());
        });
    };

    // testing area
    $scope.series = ['Ranking'];

    $scope.expandCell = function (member) {

        if (!member.rankings || !member.rankings_timestamps) {
            var ranking_history = member.ranking_history;
            member.rankings = [];
            member.rankings_timestamps = [];
            for (var j = 0; j < ranking_history.length; j++) {
                member.rankings.push(ranking_history[j].ranking);
                member.rankings_timestamps.push(ranking_history[j].timestamp.slice(5, 10).replace('-', '/'));
            }
        }

        member.expanded = !member.expanded;
    };

    $scope.color = [{ // default
        "fillColor": "rgba(0, 0, 0, 1)",
        "backgroundColor": "rgba(0,0,0,0)",
        "borderColor": "rgba(75,192,192,1)"
        }];

    $scope.options = {
        responsive: true,
        hoverMode: 'label',
        fill: false,
        animation: {

        },
        elements: {
            line: {
                borderWidth: 3
            },
        },
        legend: {
            display: true,
            position: 'bottom'
        },

        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    offsetGridLines: false
                },
                    }],
            yAxes: [{
                type: "linear",
                display: true,
                position: "left",

                id: "y-axis",
                ticks: {
                    display: true,
                    reverse: true,
                    suggestedMax: 25,
                    min: 1,
                },
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                }
            }],
        }
    };
}]);

function make_range(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}