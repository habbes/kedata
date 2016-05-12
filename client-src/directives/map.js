
import $ from 'jquery';

export default function(){
    return {
        restrict: 'AE',
        scope: {
            data: '=db',
            dataset: '=dataset'  
        },
        link: function(scope, element, attrs) {
            // set map height to prevent small map
            $(element).height(700);            
            scope.$watch('dataset', (dataset) => {
                if(dataset){                    
                    setTimeout(() => {
                        drawMap(scope.data.data[dataset]);
                    }, 20);
                } 
            });
            
            /**
             * deletes current map and draws a new one
             * based on the specified dataset
             */
            function drawMap(dataset){
                // first delete current map if any
                $(element).html("");
                $(element).vectorMap
                ({
                    map: 'kenya',
                    backgroundColor: 'transparent',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            "fill-opacity": 1,
                            stroke: '#aaa',
                            "stroke-width": 2,
                            "stroke-opacity": 1
                        },
                        hover: {
                            "fill-opacity": 0.8,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: 'yellow'
                        },
                        selectedHover: {
                        }
                    },
                    series: {
                        regions: [{
                            values: dataset,
                            scale: ['#C8EEFF', '#0071A4'],
                            normalizeFunction: 'polynomial'
                        }]
                    },
                    zoomOnScroll: false, // set it to false to avoid errors for missing mousewheel event
                });
            }
        }
    };
}