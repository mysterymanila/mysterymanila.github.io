---
slug: quezon
title: quezon 
branch-name: Quezon City
layout: branches
css: /css/branches.css

---

<script>
      function initMap() {
        var customMapType = new google.maps.StyledMapType([
            {
              stylers: [
                {hue: '#2d2d2d'},
                {visibility: 'simplified'},
                {gamma: 0.5},
                {weight: 0.5}
              ]
            },
            {
              elementType: 'labels',
              stylers: [{visibility: 'on'}]
            },
            {
              featureType: 'water',
              stylers: [{color: '#2d2d2d'}]
            }
          ], {
            name: 'Custom Style'
        });
        var customMapTypeId = 'custom_style';

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 40.674, lng: -73.946},  // Brooklyn.
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
          }
        });

        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
      }
    </script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCbLaXdpvjLEkbR6sRGO633HC1z_IMhCA&callback=initMap"></script>