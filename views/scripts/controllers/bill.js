'use strict';

angular.module('Bill')
.controller('BillCtrl', ['$scope', '$routeParams', '$http', '$cookies' ,
	function ($scope, $routeParams,  $http, $cookies ) {

		$scope.addfriend=false;
		$scope.myBill ={}
		$scope.splits={}

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


/*
		$scope.addFriendToBill=function(){
			
			alert("friend added")
			$scope.addfriend=false;


			var params = { 	
				pseudo : $scope.myBill.friend
				splitType: $scope.myBill.splitType
			}


			$http.post('/bills/friendsBills/'+$scope.myBill._id, params)
			.success(function (r) {
				alert('friend added',r);
				$scope.getBill();
			}).error(function (r) {
				console.log('firend not added',r);
			})
		}
		*/

		$scope.editBill = function(){

			alert($scope.myBill.friend)

			var params = { 	
				description: $scope.myBill.description,
				amount :$scope.myBill.amount,
				splitType: $scope.myBill.splitType
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
			console.log($cookies)
			$http.get('/users/all')
			.success(function(r){
				for(var i in r){
					if(r[i].pseudo==JSON.parse($cookies.get("globals")).currentUser)
						r.splice(i,1);		
				}
			//alert(JSON.stringify(r))
			$scope.allUsers = r;
		})
			.error(function(r){
				return r;
			})
		}

/*

		$scope.calculateSplits = function(bill){
			var result=null;
			var length=bill.split.length;
		if(bill.split!=null){
           console.log("bill not shared")
		} else{
           if(bill.splitType=="EQUAL"){
           	  result=bill.amount/length;
              
           }

		}
		*/

		$scope.getAllUsers();
		$scope.getBill()
	}])
