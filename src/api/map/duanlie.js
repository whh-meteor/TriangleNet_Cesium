let addedPrimitives = [];
let addedDataSources = [];
let addedEntities = [];

function loadfra() {
    fetch('/json/断裂/断裂线.geojson')
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
          const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);
          const id = feature.properties.Name
          
  
          const wallGeometry = new Cesium.CorridorGeometry({
            positions: positions,
            width: 1000,
            extrudedHeight: 1000
          });
  
          const wallInstance = new Cesium.GeometryInstance({
            geometry: wallGeometry,
            id:id
            
            
          });
  
          const wallAppearance = new Cesium.MaterialAppearance({
            material: Cesium.Material.fromType('Image', {
              color: Cesium.Color.RED,
            }),
          });
  
          const wallPrimitive = new Cesium.Primitive({
            geometryInstances: wallInstance,
            appearance: wallAppearance,
            asynchronous: true,
            id: id
            
            
            
            
          });
          wallPrimitive.id = id
          

          
  
          window.viewer.scene.primitives.add(wallPrimitive);
          addedPrimitives.push(wallPrimitive); 
          // 保存对wallPrimitive的引用
        });
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
  };

  function loadmangLabels(url, style, coo) {
    fetch(url)
      .then(response => response.json())
      .then(geojson => {
        geojson.features.forEach(feature => {
          const coordinates = feature.geometry.coordinates;
          const label = feature.properties.Name;
          const position = Cesium.Cartesian3.fromDegrees(...coordinates);
  
          // 添加标签实体
          const labelEntity = window.viewer.entities.add({
            position: position,
            point: {
              pixelSize: 1,
              color: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
              clampToGround: false
            },
            label: {
              text: label,
              font: style,
              fillColor: coo,
              style: Cesium.LabelStyle.FILL,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -10),
              backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
              showBackground: true,
              eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
              //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000.0)
            }
          });
  
          addedEntities.push(labelEntity); // 保存对labelEntity的引用
        });
      })
      .catch(error => {
        console.error('Failed to load GeoJSON:', error);
      });
  }
  

  function cleardadiLayers() {
    // Clear all added DataSources
    addedDataSources.forEach(dataSource => {
      window.viewer.dataSources.remove(dataSource, true);
    });
    addedDataSources = []; // Reset list
  
    // Clear all added Primitives
    addedPrimitives.forEach(primitive => {
      window.viewer.scene.primitives.remove(primitive);
    });
    addedPrimitives = [];
  
  
    // 清除所有添加的 entities
    addedEntities.forEach(entity => {
  
      window.viewer.entities.remove(entity);
  
    });
    addedEntities = []; // 重置列表// Reset list
  
    // Clear all added Entities
    // Reset list
  };


  export default{
    loadfra,
    cleardadiLayers,
    loadmangLabels
  }