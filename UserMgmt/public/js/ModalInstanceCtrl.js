
(function (angular){

    var theModule = angular.module("ModalInstance", ['ui.bootstrap']);
    
    //theModule.controller('ModalDemoCtrl', ["$scope", "$uibModal","$log",
        
    //    function ($scope, $uibModal, $log) {
        
    //    $scope.items = ['item1', 'item2', 'item3'];
        
    //        $scope.animationsEnabled = true;
            
            
            
    //        $scope.showCreateEmployeeForm = function () {
    //            //  $location.path('/newEmployeeForm');
    //            $uibModal.open({
    //                animation: $scope.animationsEnabled,
    //                templateUrl: '/newEmployeeForm',
    //                controller: 'ModalInstanceCtrl',
    //                //  size: size,
    //                resolve: {
    //                    items: function () {
    //                        return $scope.items;
    //                    }
    //                }
    //            });
    //        }
        
        //$scope.showCreateEmployeeForm = function () {
            
        //    var modalInstance = $uibModal.open({
        //        animation: $scope.animationsEnabled,
        //        templateUrl: '/newEmployeeForm',
        //        controller: 'ModalInstanceCtrl',
        //  //      size: size,
        //        resolve: {
        //            items: function () {
        //                return $scope.items;
        //            }
        //        }
        //    });
            
        //    modalInstance.result.then(function (selectedItem) {
        //        $scope.selected = selectedItem;
        //    }, function () {
        //        $log.info('Modal dismissed at: ' + new Date());
        //    });
        //};
        
        //$scope.toggleAnimation = function () {
        //    $scope.animationsEnabled = !$scope.animationsEnabled;
        //};

   //     }]);


    theModule.controller("ModalInstanceCtrl", ["$scope", "$uibModalInstance", "items",
        
    function ($scope, $uibModalInstance, items) {
    
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };
    
        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };
    
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

})(window.angular);