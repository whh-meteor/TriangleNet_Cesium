let addedPrimitives = [];

function loadhanwu(high) {

  Promise.all([
    fetch('/json/烃源岩/南黄海盆地下寒武统有利烃源岩区/tu_5_hanwu_sorted.geojson').then(response => response.json()),
    fetch('/json/烃源岩/南黄海盆地下寒武统有利烃源岩区/tri_h.geojson').then(response => response.json())
  ])
    .then(([coordsData, indicesData]) => {
      const positions = [];
      const indices = [];
      const colors = [];

      coordsData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const depth = feature.properties.depth ?? -3000; // Default depth to 0 if null
        const value = feature.properties.type;

        const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * high);
        positions.push(position.x, position.y, position.z);

        let color;
        switch (value) {
          case '分类岩性':
            color = Cesium.Color.PINK.withAlpha(0.99);
            break;

          default:
            color = Cesium.Color.TRANSPARENT; // Default color
            break;
        }
        colors.push(color.red, color.green, color.blue, color.alpha);
      });

      indicesData.features.forEach((feature1) => {
        indices.push(feature1.properties.POINTA - 1, feature1.properties.POINTB - 1, feature1.properties.POINTC - 1);
      });


      const geometry = new Cesium.Geometry({
        attributes: {
          position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(positions)
          }),
          color: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(colors)
          })
        },
        indices: new Uint16Array(indices),
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
      });

      const appearance = new Cesium.PerInstanceColorAppearance({
        translucent: true,

        flat: true
      });


      const yuanprimitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: geometry,
          id: '下寒武统有利烃源岩分类'
        }),
        appearance: appearance,
        asynchronous: false
      });

      window.viewer.scene.primitives.add(yuanprimitive);
      addedPrimitives.push(yuanprimitive)


    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
};
function clearyuanyan() {
  // Clear all added DataSources


  // Clear all added Primitives
  addedPrimitives.forEach(primitive => {
    window.viewer.scene.primitives.remove(primitive);
  });
  addedPrimitives = [];


}
export default {
  loadhanwu,
  clearyuanyan
};