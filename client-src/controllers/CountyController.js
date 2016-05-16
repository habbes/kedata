import _ from 'lodash';
export default CountyController;

function CountyController($scope, DataService) {
    
    
    this.selectCounty = id => { this.currentCounty = this.data.counties[id]; };
    
    this.rank = dataset => DataService.getCountyRank(this.currentCounty, dataset);
        
    
    DataService.getData()
    .then((data) => {
        this.data = data;
        let first = Object.keys(data.counties)[0];
        this.selectCounty(first);
        try {
            $scope.$apply();
        } catch (e){}
    });
    
    
    
    function rank(county, counties, dataset){
        //TODO: should be cached
        let sorted = _.sortBy(counties, c => dataset[c.id]);
        
        let sortedIds = sorted.map(c => c.id);
        console.log(sortedIds);
        let r = 1 + sortedIds.indexOf(county.id);
        r = 1 + counties.length - r;
        console.log('rank', r);
        return r;
    }
    
}