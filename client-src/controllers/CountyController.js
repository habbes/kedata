export default CountyController;

function CountyController($scope, DataService) {
    
    
    this.selectCounty = id => { this.currentCounty = this.data.counties[id]; };
    
    DataService.getData()
    .then((data) => {
        this.data = data;
        let first = Object.keys(data.counties)[0];
        this.selectCounty(first);
        try {
            $scope.$apply();
        } catch (e){}
    });
}