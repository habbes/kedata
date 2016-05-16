import $ from 'jquery';
import 'highcharts';

export default function(DataService) {
    return {
        restrict: 'AE',
        scope: {
            db: '=',
            county: '=',
        },
        link: (scope, element, attrs) => {
            
            scope.$watch('county', (value) => {
                if(!value) return;
                setTimeout(() => {
                    drawChart(value);
                }, 20);
            });
            
            function drawChart(county){
                $(element).html('');
                let opts = {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: `${county.name}'s rank in different datasets`
                    },
                    xAxis: {
                        title: {
                            text: 'Dataset'
                        },
                        categories: scope.db.datasets
                    },
                    yAxis: {
                        title: {
                            text: `${county.name}'s Rank`
                        }
                    },
                    series: [
                        {
                            data: genSeries(county)
                        }
                    ]
                };
                
                $(element).highcharts(opts);
            }
            
            function genSeries(county){
                let data = [];
                for(let dataset of scope.db.datasets){
                    data.push(DataService.getCountyRank(county, dataset));
                }
                return data;
            }
            
        }
    };
}