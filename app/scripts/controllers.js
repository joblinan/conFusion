'use strict';

angular.module('confusionApp')

	.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
		$scope.tab = 1;
		$scope.filtText ="";
		$scope.showDetails = false;
        $scope.dishes = {};
        $scope.showMenu = false;
        $scope.message = "Loading...";

		menuFactory.getDishes()
        .then(
            function (response) {
                $scope.dishes = response.data;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText; 
            }
        );

		$scope.select = function(setTab) {
			$scope.tab = setTab;

			if (setTab === 2) {
				$scope.filtText = "appetizer";
			} else if (setTab === 3) {
				$scope.filtText = "mains";
			} else if (setTab === 4) {
				$scope.filtText = "dessert";
			} else {
				$scope.filtText = "";
			}
		};

		$scope.isSelected = function(checkTab) {
			return ($scope.tab === checkTab);
		};

		$scope.toggleDetails = function() {
			$scope.showDetails = !$scope.showDetails;
		};
	}])

    .controller('ContactController', ['$scope', function($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: "",
        };

        $scope.channels = [
            {value: "tel", label: "Tel."},
            {value: "Email", label: "Email"},
        ];

        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                   agree:false, email:"" };

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading...";
        
        menuFactory.getDish(parseInt($stateParams.id, 10))
        .then(
            function (response) {
                $scope.dish = response.data;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );

        $scope.commentsOrder = "";
    }])

    .controller('DishCommentController', ['$scope', function($scope) {
        // Step 1: Create a JavaScript object to hold the comment from the form
        $scope.comments = {
            rating: 5,
            author: "",
            comment: "",
            date: "",
        };

        $scope.setRaing = function(value) {
            $scope.comments.rating = value;
        };
        
        $scope.submitComment = function () {
            
            //Step 2: This is how you record the date
            $scope.comments.date = new Date().toISOString();
            
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.comments);
            
            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();

            //Step 5: reset your JavaScript object that holds your comment
            $scope.comments = {
                rating: 5,
                author: "",
                comment: "",
                date: "",
            };
        };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading...";
        
        menuFactory.getDish(0)
        .then(
            function (response) {
                $scope.dish = response.data;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
        
        $scope.promotion = menuFactory.getPromotion(0);
        $scope.leader = corporateFactory.getLeader(3);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
    }])
;
