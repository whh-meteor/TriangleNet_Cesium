function loadGeoJsonDataprs() {

  Promise.all([
    fetch('/static/geojson/生储盖/60/60_sorted.geojson').then(response => response.json()),
    fetch('/static/geojson/生储盖/60/Ⅱ类.geojson').then(response => response.json())
  ])
    .then(([coordsData, indicesData]) => {
      const positions = [];
      const indices = [];
      const colors = [];

      coordsData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const depth = feature.properties.depth ?? 0; // Default depth to 0 if null
        const value = feature.properties.type ?? 100;

        const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * 5 + 100);
        positions.push(position.x, position.y, position.z);

        let color;
        switch (value) {
          case 'Ⅱ类':
            color = Cesium.Color.PINK;
            break;
          case 1:
            color = Cesium.Color.YELLOW;
            break;
          case 2:
            color = Cesium.Color.ORANGE;
            break;
          case 3:
            color = Cesium.Color.WHITE;
            break;
          case 6:
            color = Cesium.Color.ORANGE;
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

      const primitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: geometry,
          id: '浅水陆棚相'
        }),
        appearance: appearance,
        asynchronous: false
      });

      this.viewer.scene.primitives.add(primitive);


    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}