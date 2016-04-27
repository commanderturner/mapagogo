var ports = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", "coordinates": [-77.345, 25.06]
            },
            "properties": {
                "name": "Nassau",
                "nation": "English"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-82.331543, 23.059516] },
            "properties": {
                "name": "Havana",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-72.79, 20.039722] },
            "properties": {
                "name": "Tortuga",
                "nation": "French"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-69.890784, 18.479014] },
            "properties": {
                "name": "Santo Domingo",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-72.8669444, 18.4313889] },
            "properties": {
                "name": "Petite Goave",
                "nation": "French"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-76.841, 17.937] },
            "properties": {
                "name": "Port Royal",
                "nation": "English"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-81.374722, 13.348889] },
            "properties": {
                "name": "Old Providence",
                "nation": "English"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-75.5, 10.4] },
            "properties": {
                "name": "Cartagena",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-68.928051, 12.123586] },
            "properties": {
                "name": "Curacao",
                "nation": "Dutch"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-66.9, 10.5] },
            "properties": {
                "name": "Caracas",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-61.507809, 10.657394] },
            "properties": {
                "name": "Trinidad",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-59.625183, 13.105909] },
            "properties": {
                "name": "Bridgetown",
                "nation": "English"
            }
        },
        {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [-61.7138203, 16.0101938] },
            "properties": {
                "name": "Basse-Terre",
                "nation": "French"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", "coordinates": [-63.0569535, 18.0296587]
            },
            "properties": {
                "name": "St. Maarten",
                "nation": "Dutch"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", "coordinates": [-66.0583415, 18.3848264]
            },
            "properties": {
                "name": "San Juan",
                "nation": "Spanish"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", "coordinates": [-61.8443254, 17.1244877]
            },
            "properties": {
                "name": "St. John",
                "nation": "English"
            }
        }
    ]
};
var myOSM;
myOSM = L.tileLayer('http://ajax.pirates.42monkeys.co.uk/osm_tiles/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
var pirateOceanBackdrop;
pirateOceanBackdrop = L.tileLayer('http://ajax.pirates.42monkeys.co.uk/pirate_ocean/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="http://www.naturalearthdata.com">Natural Earth</a>'
    });
var baseMaps = { "myOSM": myOSM, "Pirate Oceans": pirateOceanBackdrop };

var portStyle = {
    radius: 8,
    color: "#ff7800",
    fillColor: "#ff0000",
    weight: 6,
    opacity: 1,
    fillOpacity: 0.8
};

var portsLayer = L.geoJson(ports, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, portStyle);
    },
    style: function (feature) {
        switch (feature.properties.nation) {
            case 'English': return { color: "#ff0000", fillColor: "#FFF" };
            case 'Spanish': return { color: "#FFF200" };
            case 'Dutch': return { color: "#3366CC", fillColor: "#FF6600" };
            case 'French': return { color: "#2A00FF", fillColor: "#FFF200" };
        }
    },
    onEachFeature: onEachFeature
});

function onEachFeature(feature, layer) {
    layer.on({
        click: highlightFeature
    });
}

var map = L.map('map',
    {
        center: [18.5, -76.5],
        zoom: 5,
        layers: [myOSM, pirateOceanBackdrop, portsLayer],
    });
var layerControl = L.control;
layerControl.layers(baseMaps).addTo(map);
pirateOceanBackdrop.bringToFront();

function highlightFeature(e) {
    $.each(portsLayer.getLayers(), function (index, value) {
        portsLayer.resetStyle(value);
    })
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666',
        fillColor: '#00FF00',
        radius: 12
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Port Info</h4>' + (props ?
        '<b>' + props.name + '</b><br />' + props.nation
        : 'Click on a port');
};

info.addTo(map);