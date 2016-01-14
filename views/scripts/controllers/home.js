'use strict';

angular.module('Home')
.controller('HomeCtrl',["$scope","$http","$cookies",function($scope,$http,$cookies){

	$scope.bill ={};
	$scope.allBills ={}

	$scope.addBill=function(){
		var params ={ 
			description: $scope.bill.Description,
			amount :$scope.bill.Amount,
			splitType: $scope.bill.SplitType
		}
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
				if(r[i].pseudo==$cookies.globals.currentUser)
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


	$scope.getMe = function(){
		$http.get('/users/')
		.success(function(r){
			$scope.me = r;
		})
		.error(function(r){
			console.log('error',r);
		})

	}

	$scope.getAllBills();
	$scope.getMe();

}]);