"use strict";
var App = angular.module("todo", ["ui.sortable", "LocalStorageModule"]);
App.controller("TodoCtrl", function ($scope, localStorageService) {
	$scope.init = function () {
		if (!localStorageService.get("todoList")) {
			$scope.model = [
				{
					name: "Primary", list: [
						{ taskName: "Test", isDone: false },
					]
				}
			];
		}else{
			$scope.model = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	$scope.addTodo = function () {
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTodo, isDone: false });
		$scope.newTodo = "";
	};

$scope.deleteTodo = function () {
	var length = $scope.model[$scope.currentShow].list.length;
	 for (var i = 0; i < length; i++) {
				if($scope.model[$scope.currentShow].list[i].isDone==true){
					$scope.model[$scope.currentShow].list.splice(i,1);
					i--;
				}
			}
			if($scope.model[$scope.currentShow].list==0){
				$scope.selectAll=false;
			};
		};

		$scope.deleteSingle = function(item){
			var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
		}

$scope.checkAll = function () {
       angular.forEach($scope.model[$scope.currentShow].list, function (user) {
				 user.isDone = true;
		   });
   };

	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});
