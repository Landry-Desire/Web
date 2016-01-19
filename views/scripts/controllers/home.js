'use strict';

angular.module('Home')
.controller('HomeCtrl',["$scope","$http","$cookies",'$window',function($scope,$http,$cookies,$window){

	$scope.bill ={};
	$scope.allBills ={};
	$scope.allUsers=[];

	$scope.addBill=function(){
		var params ={ 
			description: $scope.bill.description,
			amount :$scope.bill.amount,
			splitType: $scope.bill.splitType
		}
		console.log(params);
		$http.post('/bills/AddBills',params)
		.success(function (r) {
			alert('Bill added',r);
			$scope.getAllBills();
		}).error(function (r) {
			console.log('Bill not added',r);
		})
		//alert(JSON.stringify(params))
	}


	$scope.getAllBills = function(){
		$http.get('/bills/RecupBills')
		.success(function(r){
			for(var i in r){
				if(r[i].pseudo==JSON.parse($cookies.get("globals")).currentUser)
					r.splice(i,1);		
			}
			//alert("ALL BILLS :"+JSON.stringify(r.message))
			$scope.allBills = r;
			$scope.getMe();
		})
		.error(function(r){
			return r;
		})
	}

	$scope.billDetails =function(id){
		$window.location.href="#/bill/"+id
		console.log(JSON.stringify(id));
	}

	$scope.getMe = function(){
		$http.get('/users/')
		.success(function(r){
			$scope.me = r;
		})
		.error(function(r){
			console.log('error',r);
		})

	}

	//$scope.getAllUsers();
	$scope.getAllBills();
	$scope.getMe();

}]);