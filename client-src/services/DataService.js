import _ from 'lodash';

export default DataService;

function DataService($http, localStorageService){
    /**
     * fetches and caches the json db, checks
     * the cache first
     */
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
    
    /**
     * fetches and caches the json db, does not
     * attempt to retrieve from cache
     */
    function refreshData(){
        return new Promise((resolve, reject) => {
            return fetchData()
                .then(res => {
                    localStorageService.set('data', res.data);
                    resolve(res);
                });
        });
    }
    
    /**
     * fetch the json db
     */
    function fetchData(){
        return $http.get('/data/data.json');
    }
    
    /**
     * get the rank position of a county for the specified dataset
     * @param {object} county
     * @param {string} dataset
     * @return {number}
     */
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
        refreshData,
        getCountyRank
    };
}
