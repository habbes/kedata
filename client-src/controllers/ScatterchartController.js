export default ScatterchartController;

function ScatterchartController(DataService) {
    
    const vm = this;
    
    DataService.getData()
    .then((data) => {
        console.log('data found', data);
        vm.data = data;
        vm.xDataset = data.datasets[0];
        vm.yDataset = data.datasets[1];
        console.log('x',  vm.xDataset);
        console.log('y', vm.yDataset);
    })
    .catch(console.err);
    
}