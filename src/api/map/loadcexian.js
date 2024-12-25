function loadcexian() {
  const geojsonFolder = '/static/geojson/侧线/with/';
  const geojsonFiles = [
    'Name_HB15_44.geojson',
    'Name_XQ06_4.geojson',
    'Name_XQ07_10.geojson'
    // Add all your GeoJSON file names here
  ];

  geojsonFiles.forEach(fileName => {
    fetch(geojsonFolder + fileName)
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const coordinates = feature.geometry.coordinates;
          const name = feature.properties.Name;

          this.viewer.entities.add({
            id: name,
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray(coordinates.flat()),
              width: 2,
              material: Cesium.Color.BLUE,
              clampToGround: true
            },

          });
        });
        //     const entities = this.viewer.entities.values;
        // entities.forEach(entity => {
        // console.log('Entity ID:', entity.id);
        // )
        ;
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  });
};
function gaoliang() {
  const intervalId = setInterval(() => {
    const e = this.viewer.entities.getById("XQ06_4");
    
    const positions = e.polyline.positions.getValue();
    this.viewer.entities.add({
      polyline: {
        positions: positions,
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.5, // Strength of the glow effect
          color: Cesium.Color.ORANGERED
        }),
        clampToGround: true
      }
    });

    clearInterval(intervalId);
  }, 1000);
};
export default {
  loadcexian,
  gaoliang
};