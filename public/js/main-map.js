window.onload = () => {
  let show = false;
  var markers = [];
  var myLatLng = { lat: 40.413031, lng: -3.696575 };
  let btnBarrio = document.getElementById("btn-barrio");
  const addMarker = data => {
    //console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      var position = new google.maps.LatLng(
        data.data[i].position.coordinates[1],
        data.data[i].position.coordinates[0]
      );
      var title = data.data[i].district;
      var myimage = {
        url: "/images/huella2.png", //ruta de la imagen
        size: new google.maps.Size(30, 30) //tamaño de la imagen
        //   origin: new google.maps.Point(0,0), //origen de la iamgen
        //el ancla de la imagen, el punto donde esta marcando, en nuestro caso el centro inferior.
        //   anchor: new google.maps.Point(0,0)
      };
      var marker = new google.maps.Marker({
        position,
        map,
        icon: myimage,
        title: title
      });
      markers.push(marker);
    }
  };
  const setMapOnAll = map => {
    for (var i = 0; i < markers.length; i++) {
      //console.log(markers[i]);
      markers[i].setMap(map);
    }
  };
  // Removes the markers from the map, but keeps them in the array.
  const clearMarkers = () => {
    setMapOnAll(null);
  };
  // Shows any markers currently in the array.
  const showMarkers = () => {
    setMapOnAll(map);
  };
  // Deletes all markers in the array by removing references to them.
  const deleteMarkers = () => {
    clearMarkers();
    markers = [];
  };
  document.getElementById("btn-barrio").onclick = () => {
    deleteMarkers();
    let barrio = document.getElementById("barrio").value;
    axios
      .get("http://localhost:3000/api/district", {
        params: { barrio }
      })
      .then(response => {
        addMarker(response);
        setMapOnAll(map);
      });
  };

  document.getElementById("btn-area").onclick = () => {
    deleteMarkers();
    let area = document.getElementById("area").value;
    axios
      .get("http://localhost:3000/api/districta", {
        params: { area }
      })
      .then(response => {
        addMarker(response);
        setMapOnAll(map);
      });
  };
  // console.log(document.getElementById("barrio").value);

  // btnBarrio.onclick = () => {
  //   show = true;
  //   console.log(barrio);
  //  axios.get("http://localhost:3000/api/district", { params: { barrio } });
  // .then(districts => res.json(districts))
  // .catch(err => console.log(err));
  // };
  var map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 14,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            color: "#000"
          },
          {
            visibility: "off"
          },
          {
            weight: 7.5
          }
        ]
      },
      {
        elementType: "labels.text",
        stylers: [
          {
            color: "#fff"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f5f5"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#5934eb"
          },
          {
            weight: 7.5
          }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#5934eb"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#b6a7eb"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.icon",
        stylers: [
          {
            color: "#e39944"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#d9eb34"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#5934eb"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#c9c9c9"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e"
          }
        ]
      }
    ]
  });
  // axios.get("http://localhost:3000/api/places").then(response => {
  //   //   console.log(response.data)
  //   //imagen de icono
  //   var myimage = {
  //     url: "/images/huella2.png", //ruta de la imagen
  //     size: new google.maps.Size(30, 30) //tamaño de la imagen
  //     //   origin: new google.maps.Point(0,0), //origen de la iamgen
  //     //el ancla de la imagen, el punto donde esta marcando, en nuestro caso el centro inferior.
  //     //   anchor: new google.maps.Point(0,0)
  //   };
  //   // fin imagen de icono
  //   for (i = 0; i < response.data.length; i++) {
  //     var position = new google.maps.LatLng(
  //       response.data[i].position.coordinates[1],
  //       response.data[i].position.coordinates[0]
  //     );
  //     //  bounds.extend(position);
  //     marker = new google.maps.Marker({
  //       position,
  //       map,
  //       icon: myimage,
  //       title: response.data[i].name
  //     });
  //   }
  //   marker.setMap(map);
  // });
  // axios.get("http://localhost:3000/api/areas").then(response => {
  //   //   console.log(response.data)
  //   var myimage2 = {
  //     url: "/images/area2.png", //ruta de la imagen
  //     size: new google.maps.Size(30, 30) //tamaño de la imagen
  //     //   origin: new google.maps.Point(0,0), //origen de la iamgen
  //     //el ancla de la imagen, el punto donde esta marcando, en nuestro caso el centro inferior.
  //     //   anchor: new google.maps.Point(0,0)
  //   };
  //   for (i = 0; i < response.data.length; i++) {
  //     var position = new google.maps.LatLng(
  //       response.data[i].position.coordinates[1],
  //       response.data[i].position.coordinates[0]
  //     );
  //     //  bounds.extend(position);
  //     marker = new google.maps.Marker({
  //       position,
  //       map,
  //       icon: myimage2,
  //       title: response.data[i].district
  //     });
  //   }
  //   marker.setMap(map);
  // });
};
