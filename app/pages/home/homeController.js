app.controller('home_controller', ['$scope', function ($scope) {

    $scope.octcocat_index = Math.floor((Math.random() * 9) + 1); // 1~9
    console.log($scope.octcocat_index);

    // For firebase initialization and date updates
    var FirebaseRef = new Firebase("https://bittiger-ranking.firebaseio.com/");
    var first_launch = true;
    $scope.total_contribution = 0;
    FirebaseRef.child('user_events').on("value", function (snapshot) {

            $scope.members = snapshot.val().events;
            $scope.list_created_time = snapshot.val().created_time;

            if (!first_launch) {
                bootstrap_alert('Ranking is just updated at ' + $scope.list_created_time);
            }
            first_launch = false;
            $scope.$apply();
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

    // For database update alert
    bootstrap_alert = function (message) {

        angular.element('#alert_placeholder').html('<div class="alert alert-success" id="success-alert"><button type="button" class="close" data-dismiss="alert">x</button><strong>Updated! </strong> Ranking has been updated at ' + $scope.list_created_time + ' LoL</div>');
        angular.element("#success-alert").alert();
        angular.element("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            angular.element("#success-alert").alert('close');
            angular.element("#success-alert").replaceWith(divClone.clone());
        });
    };

    // For getting medal category
    $scope.get_medal = function (score) {
        var medal = "bronze";

        if (score >= 50) {
            medal = "gold";
        } else if (score >= 20) {
            medal = "silver";
        }

        return medal;
    };

    // graph configurations
    $scope.series = ['Ranking'];
    $scope.expandCell = function (member) {

        if ($scope.total_contribution === 0) {
            for (var i = 0; i < $scope.members.length; i++) {
                $scope.total_contribution += $scope.members[i].Total;
            }
        }

        if (!member.rankings || !member.rankings_timestamps) {
            var ranking_history = member.ranking_history;
            member.rankings = [];
            member.rankings_timestamps = [];
            for (var j = 0; j < ranking_history.length; j++) {

                member.rankings.push(ranking_history[j].ranking);
                if (j % 5 === 0) {
                    var sliced_timestamp = ranking_history[j]
                        .timestamp.slice(5, 10)
                        .replace('-', '/')
                        .replace('/0', '/');
                    if (sliced_timestamp.startsWith('0')) {
                        //                        member.rankings_timestamps.push(sliced_timestamp.slice(1, 5));
                    } else {
                        //                        member.rankings_timestamps.push(sliced_timestamp);
                    }
                    member.rankings_timestamps.push("");

                } else {
                    member.rankings_timestamps.push("");

                }
            }
        }
        should_calculate_total_contribution = false;
        member.expanded = !member.expanded;
    };

    $scope.colors = [{
        "fillColor": "rgba(0, 0, 0, 1)",
        "backgroundColor": "rgba(0,0,0,0)",
        "borderColor": "rgba(210, 74, 62, 1)"
        }];

    var red_border = [{
        "fillColor": "rgba(0, 0, 0, 1)",
        "backgroundColor": "rgba(0,0,0,0)",
        "borderColor": "rgba(210, 74, 62, 1)"
        }];

    var green_border = [{
        "fillColor": "rgba(0, 0, 0, 1)",
        "backgroundColor": "rgba(0,0,0,0)",
        "borderColor": "rgba(46,125,50,1)"
        }];


    $scope.get_chart_color = function (ranking_change) {

        if (ranking_change <= 0) {
            return green_border;
        }

        return red_border;
    };

    $scope.line_options = {
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
            display: false,
            position: 'bottom',
            labels: {
                boxWidth: 20,
                fontSize: 10
            }
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
                    suggestedMax: 20,
                    min: 1,
                },
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                }
            }],
        }
        //        annotation: {
        //            annotations: [{
        //                type: 'line',
        //                mode: 'horizontal',
        //                scaleID: 'y-axis',
        //                value: '5',
        //                borderColor: '#ECEFF1',
        //                borderWidth: 2
        //        }]
        //        }
    };

    $scope.pie_options = {
        responsive: true,
        animation: {

        },
        elements: {
            line: {
                borderWidth: 0
            },
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                boxWidth: 10,
                fontSize: 10
            }
        }
    };

    $scope.pie_colors = ['#FD1F5E', '#64CEAA'];
}]);

function make_range(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}