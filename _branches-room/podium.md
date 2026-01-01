---
slug: podium
title: SM PODIUM
branch-name: SM Podium
layout: branches
css: /css/branches.css
banner: /img/branches-cover/podium.jpg

---

<script>
    function initMap() {
      // 14.585344727971853, 121.0598924571397
      var mapLocation = {lat: 14.585344727971853, lng: 121.0598924571397};
      var customMapType = new google.maps.StyledMapType([
          {
            featureType: 'road',
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            stylers: [
              {visibility: 'simplified'},
              {gamma: 0.5},
              {weight: 0.5},
              { hue: "#333333" }
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
        zoom: 15,
        center: mapLocation,  
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
      });
      
      var image = '/img/map-icon/podium.png'
      
      var marker = new google.maps.Marker({
          position: mapLocation,
          map: map,
          center: mapLocation,
          icon: image
      });
      
      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);
    }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCbLaXdpvjLEkbR6sRGO633HC1z_IMhCA&callback=initMap"></script>