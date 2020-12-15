
// init map
const map = L.map('map', {}).setView([-43.51, 158], 4);
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
L.Edit.Rectangle.prototype.setOptions({ uniformScaling: false });