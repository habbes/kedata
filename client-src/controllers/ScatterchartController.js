export default ScatterchartController;

function ScatterchartController($scope, DataService) {
    
    const vm = this;
    
    DataService.getData()
    .then((data) => {
        console.log('data found', data);
        vm.data = data;
        vm.xDataset = data.datasets[0];
        vm.yDataset = data.datasets[1];
        try {
            $scope.$apply();
        } catch(e){}
    })
    .catch(console.err);
    
}