'use strict';

export default ChoroplethController;

function ChoroplethController($scope, DataService) {
    const vm = this;
    
    vm.selectDataset = dset => vm.currentDataset = dset;
    
    DataService.getData()
    .then((data) => { 
        vm.data = data;
        vm.currentDataset = data.datasets[0];
        try {
            $scope.$apply();
        } catch(e){}
    });    
    
}