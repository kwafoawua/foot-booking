// -------------------------------------------------------------
    //   Google Map
    // -------------------------------------------------------------  

    (function(){
        var map;

        map = new GMaps({
            el: '#gmap',
            lat: 27.6365042,
            lng: -81.8329502,
            scrollwheel:false,
            zoom: 9,
            zoomControl : true,
            panControl : true,
            streetViewControl : true,
            mapTypeControl: false,
            overviewMapControl: true,
            clickable: false
        });

        var image = '';
        map.addMarker({
            lat: 27.6365042,
            lng: -81.8329502,
            icon: image,
            animation: google.maps.Animation.DROP,
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            backgroundColor: '#d3cfcf',
        });


        var styles = [ 

        {
            "featureType": "road",
            "stylers": [
            { "color": "#dddddd" }
            ]
        },{
            "featureType": "water",
            "stylers": [
            { "color": "#cecece" }
            ]
        },{
            "featureType": "landscape",
            "stylers": [
            { "color": "#efefef" }
            ]
        },{
            "elementType": "labels.text.fill",
            "stylers": [
            { "color": "#555555" }
            ]
        },{
            "featureType": "poi",
            "stylers": [
            { "color": "#cfcfcf" }
            ]
        },{
            "elementType": "labels.text",
            "stylers": [
            { "saturation": 1 },
            { "weight": 0.1 },
            { "color": "#848484" }
            ]
        }

        ];

        map.addStyle({
            styledMapName:"Styled Map",
            styles: styles,
            mapTypeId: "map_style"  
        });

        map.setStyle("map_style");
    }()); 