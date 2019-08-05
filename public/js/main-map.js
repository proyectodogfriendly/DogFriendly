

    function initMap() {


        const myMap = new google.maps.Map(

            document.getElementById('myMap'),
            {
                center: { lat: 40.3922581, lng: -3.698573845 },
                zoom: 10
            }
        )

        const geoCoder = new google.maps.Geocoder()

        geoCodeAdress(geoCoder, myMap)
    }


    const geoCodeAdress = (geoCoder, resultsMap) => {

        let address = document.getElementById('address').value

        geoCoder.geocode(
            { 'address': address },
            (results, status) => {

                console.log(results)


                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                })

                resultsMap.setCenter(results[0].geometry.location)

            }
        )
    }