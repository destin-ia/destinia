mapboxgl.accessToken = 'pk.eyJ1IjoibjFiM2x1bmcwIiwiYSI6ImNqdDNhN3U2bjEzNzc0NHAxdzI3c252ZjUifQ.gx4WKfJ4pQqU7bLPizhtZA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [-3.702897, 40.432585], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// GEOCODE para que devuelva una posicion lat lon al enviar un texto

document.getElementById('buttonWhere').onclick = () => {

    let geocode = document.getElementById("geocode").value
    console.log(geocode)

    axios.post(`${window.heroku.url}/user/dashboard/geocode`, { geocode })
        .then(response => {

            map.addLayer({
                "id": geocode,
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [response.data.posGeocodeLat, response.data.posGeocodeLon]
                            },
                            "properties": {
                                "title": geocode,
                                "icon": "monument"
                            }
                        }, ]
                    }
                },
                "layout": {
                    "icon-image": "{icon}-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });
        })
}