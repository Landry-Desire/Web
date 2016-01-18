'use strict';

angular.module('Bill')
.controller('BillCtrl', ['$scope', '$routeParams', '$http', '$cookies' ,
	function ($scope, $routeParams,  $http, $cookies ) {

		$scope.myBill ={}

		$scope.getBill = function(){
			$http.get('/bills/RecupBills')
			.success(function(r){
				$scope.myBills = r.success;
				for(var bill in $scope.myBills){
					if($scope.myBills[bill]._id == $routeParams.id)
						$scope.myBill=$scope.myBills[bill]
				}
			})
			.error(function(r){
				return r;
			})
		}


		$scope.editBill = function(){

			alert($scope.myBill.friend)

			var params = { 
				bill : {
					description: $scope.myBill.description,
					amount :$scope.myBill.amount,
					splitType: $scope.myBill.splitType
				},

				pseudo : $scope.myBill.friend

			}

			$http.post('/bills/friendsBills/'+$scope.myBill._id, params)
			.success(function (r) {
				alert('friend added',r);
				$scope.getBill();
			}).error(function (r) {
				console.log('firend not added',r);
			})

		}





		$scope.getAllUsers = function(){
			$http.get('/users/all')
			.success(function(r){
				for(var i in r){
					if(r[i].pseudo==$cookies.globals.currentUser)
						r.splice(i,1);		
				}
			//alert(JSON.stringify(r))
			$scope.allUsers = r;
		})
			.error(function(r){
				return r;
			})
		}

		$scope.getAllUsers();
		$scope.getBill()
	}])
