---
slug: pasig
title: AYALA MALLS THE 30TH
branch-name: Ayala Malls The 30th
layout: branches
css: /css/branches.css
banner: /img/branches-cover/makati.jpg

---

<script>
    function initMap() {
      var mapLocation = {lat: 14.580458, lng: 121.064753};
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
      
      
      
      var marker = new google.maps.Marker({
          position: mapLocation,
          map: map,
          center: mapLocation
      });
      
      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);
    }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCbLaXdpvjLEkbR6sRGO633HC1z_IMhCA&callback=initMap"></script>