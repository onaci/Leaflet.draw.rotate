
// init map
const map = L.map('map', {}).setView([-43.51, 159], 6);
L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png")
    .addTo(map);

// basic leaflet draw demo
const editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers); 
const options = {
    position: 'topright',
    draw: {
        marker: false,
        circle: false, 
        circlemarker: false
    },
    edit: {
        featureGroup: editableLayers
    }
};

const drawControl = new L.Control.Draw(options);
map.addControl(drawControl);
map.on(L.Draw.Event.CREATED, function (e) {
    const { layer } = e;
    editableLayers.addLayer(layer);
});

// ROTATE -> EXAMPLE SET OPTIONS
L.Edit.Rectangle.prototype.setOptions({ uniformScaling: false, scaleRounding: 4 });

// example pre-loaded geom
const geoJSON = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[154.197588,-40.444499],[155.038019,-39.542405],[162.606197,-43.581959],[161.765766,-44.428894],[154.197588,-40.444499]]]}};
const latLngs = geoJSON.geometry.coordinates[0].map(c => L.latLng(c[1], c[0]));
latLngs.pop();
const boundaryLayer = L.rectangle(latLngs, { transform: true });
boundaryLayer.transform.enable();
boundaryLayer.setLatLngs(latLngs);
editableLayers.addLayer(boundaryLayer);
