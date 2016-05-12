'use strict';

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

    return {
        getData
    };
}
