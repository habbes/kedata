'use strict';

module.exports = function ChoroplethController(DataService) {
    const vm = this;
    
    vm.selectDataset = dset => vm.currentDataset = dset;
    
    DataService.getData()
    .then((data) => { 
        vm.data = data;
    });    
    
};