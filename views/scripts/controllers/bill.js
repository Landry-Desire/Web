'use strict';

angular.module('Bill')
.controller('BillCtrl', ['$scope', '$routeParams', '$http', '$cookies' ,
	function ($scope, $routeParams,  $http, $cookies ) {

		$scope.addfriend=false;
		$scope.myBill ={}
		$scope.friend = "";
		$scope.left = 0;
		$scope.tmp=0;
		$scope.updatable = false;
		$scope.$watch('myBill',function (newV,oldV) {
							console.log('myBill updated',$scope.tmp);
							$scope.updatable = ((JSON.stringify(newV) !== JSON.stringify(oldV) ) && $scope.tmp>1);
							$scope.tmp +=1;
						},true);
		$scope.getBill = function(){
			$http.get('/bills/RecupBills')
			.success(function(r){
				r = r.success;
				console.log(r);
				for(var i in r){
					if(r[i]._id === $routeParams.id){
						/*console.log(r[i].split);*/
						$scope.myBill=r[i];
						
						break;
					}
				}
			})
			.error(function(r){
				return r;
			})
		};
		$scope.addFToB = function () {
			if($scope.friend === "")
				return;
			for (var i in $scope.myBill.split){
				if($scope.myBill.split[i].pseudo === $scope.friend){
					console.log('This friend already in the bill');
					return;
				}
					
			}
			console.log({'fn':'addFToB'},$scope.friend);
			if($scope.myBill.splitType==="EQUAL"){
				$scope.myBill.split.push({pseudo:$scope.friend,part:1});
			}
			else{
				$scope.myBill.split.push({pseudo:$scope.friend,part:0});
			}
			$scope.getLeft();
			console.log($scope.myBill);
		};
		$scope.getLeft = function () {
			var total = 0;
			for (var i in $scope.myBill.split){
				var s = parseInt(i);
				console.log('bug',$scope.myBill.split[s].part);
				total = total + parseInt($scope.myBill.split[s].part);
			}
			$scope.left =  $scope.myBill.amount - total;
			$scope.checkUpdatable();
		}
		$scope.editBill = function(){
			console.log($scope.myBill);
			$http.put('/bills',$scope.myBill)
			.success(function (r) {
				console.log(r);
				$scope.getBill();
			}).error(function (r) {
				alert('Bill not modified');
			})
		}
		$scope.getAllUsers = function(){
			$http.get('/friends/mine')
			.success(function(r){
				r = r.data.friends;
				for(var i in r){
					if(r[i].pseudo==JSON.parse($cookies.get("globals")).currentUser)
						r.splice(i,1);		
				}
				$scope.allUsers = r;
			})
			.error(function(r){
				return r;
			})
		}

		$scope.checkUpdatable = function () {
			console.log('updatable',$scope.left == 0);
			 $scope.updatable =($scope.left == 0);
		}

		$scope.getBill();
		$scope.getAllUsers();
		
	}])
