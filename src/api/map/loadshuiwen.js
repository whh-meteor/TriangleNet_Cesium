function zouhang() {
  fetch('/static/geojson/250m.geojson')
    .then(response => response.json())
    .then(geojson => {
      const pointCollection = new Cesium.PointPrimitiveCollection();

      // Step 1: Calculate the maximum intensity
      let maxIntensity = 0;
      geojson.features.forEach(feature => {
        const intensity = feature.properties.speed;
        if (intensity > maxIntensity) {
          maxIntensity = intensity;
        }
      });

      // Step 2: Use the maximum intensity to set colors and add entities
      geojson.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
        const depth = feature.properties.水深m;
        const angle = feature.properties.dir;
        const intensity = feature.properties.speed;
        const id = feature.properties.id;

        const length = 0.03; // Main line segment length, adjust to fit the map scale

        // Calculate the end position
        const endPosition = Cesium.Cartesian3.fromDegrees(
          longitude + length * Math.cos(Cesium.Math.toRadians(angle)),
          latitude + length * Math.sin(Cesium.Math.toRadians(angle))
        );

        // Set the start position
        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, depth);

        // Add the point
        pointCollection.add({
          position: position,
          pixelSize: 5,
          color: Cesium.Color.LIGHTBLUE,
          outlineWidth: 0
        });

        // Manually interpolate between green and red based on intensity
        const normalizedIntensity = Math.min(intensity / maxIntensity, 1.0);

        // Colors for interpolation
        const startColor = Cesium.Color.GREEN;
        const endColor = Cesium.Color.RED;

        // Interpolating RGB components
        const r = Cesium.Math.lerp(startColor.red, endColor.red, normalizedIntensity);
        const g = Cesium.Math.lerp(startColor.green, endColor.green, normalizedIntensity);
        const b = Cesium.Math.lerp(startColor.blue, endColor.blue, normalizedIntensity);

        const arrowColor = new Cesium.Color(r, g, b, 1.0);

        // Add the main line segment with an arrow
        this.viewer.entities.add({
          id: id,
          name: "Arrow",
          polyline: {
            positions: [position, endPosition],
            width: 5,
            material: new Cesium.PolylineArrowMaterialProperty(arrowColor)
          }
        });
      });

      this.viewer.scene.primitives.add(pointCollection);
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(134.230942, 14.53610783),
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // Adjust heading if needed
          pitch: Cesium.Math.toRadians(-90.0), // Adjust pitch if needed
          roll: Cesium.Math.toRadians(0.0) // Adjust roll if needed
        }
      });
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}