
import $ from 'jquery';

export default function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
           
            console.log($(element));
            // $(element).width(500);
            $(element).height(700);
            console.log('here');
            
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
                zoomOnScroll: false, // set it to false to avoid errors for missing mousewheel event
            });
            
            let map = $(element).vectorMap('get', 'mapObject');
        }
    };
}