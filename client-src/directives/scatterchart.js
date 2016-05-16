import $ from 'jquery';
import Highcharts from 'highcharts';

export default function(){
    return {
        restrict: 'AE',
        scope: {
            db: '=',
            yDataset: '=ydataset',
            xDataset: '=xdataset'
        },
        link: (scope, element, attrs) => {
            
            scope.$watch('xDataset', (value) => {
                refreshChart(value, scope.yDataset); 
            });
            
            scope.$watch('yDataset', (value) => {
                refreshChart(scope.xDataset, value);
            });
            
            function refreshChart(xDataset, yDataset){
                // delete current chart
                $(element).html('');
                setTimeout(() => {
                    drawChart(xDataset, yDataset);
                }, 20);
            }
            
            function drawChart(xDataset, yDataset){
                if(!(xDataset && yDataset)) return;
                
                let opts = {
                    chart: {
                        type: 'scatter'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        title: {
                            text: xDataset
                        }
                    },
                    yAxis: {
                        title: {
                            text: yDataset
                        }
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: `<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b> <br>
                            ${xDataset}: <b>{point.x}</b><br>
                            ${yDataset}: <b>{point.y}</b>`
                    },
                    series: [{
                        name: 'Counties',
                        data: genSeries(xDataset, yDataset)
                    }]
                };
                
                
                $(element).highcharts(opts);
            }
            
            function genSeries(xDataset,yDataset){
                let data = [];
                for(let id in scope.db.counties){
                    let point = {
                        name: scope.db.counties[id].name,
                        x: scope.db.data[xDataset][id],
                        y: scope.db.data[yDataset][id]
                    };
                    data.push(point);
                }
                return data;
            }
        }
        
    };
}