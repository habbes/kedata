import _ from 'lodash';

export default DataService;

function DataService($http, localStorageService){
    function getData(){
        return new Promise((resolve, reject) => {
            let data = localStorageService.get('data');
            if(data)
                return resolve(data);
            return fetchData()
            .then((res) => {
                localStorageService.set('data', res.data);
                resolve(res);
            });
        });
    }

    function fetchData(){
        return $http.get('/data/data.json');
    }
    
    function getCountyRank(county, dataset){
        // check cache first
        let rank = inCache();
        if(rank) return rank;    
        
        let db = localStorageService.get('data');
        
        let data = db.data[dataset];
        let counties = _.values(db.counties);
        // sort dataset
        let sorted = _.sortBy(counties, c => data[c.id]);
        let sortedIds = sorted.map(c => c.id);
        
        // get descending rank (highest value is #1)
        rank = counties.length - sortedIds.indexOf(county.id);
        
        //cache value
        cacheValue(rank);
        
        // -- cache helpers
        
        function cacheValue(rank){
            localStorageService.set(getCacheKey(), rank);
        }
        
        function inCache(){
            return localStorageService.get(getCacheKey());
        }
        
        function getCacheKey(){
            return `countyRank#${county.id}#${dataset}`;
        } 
        
    }
    

    return {
        getData,
        getCountyRank
    };
}
