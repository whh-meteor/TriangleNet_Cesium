let addedPrimitives = [];
let addedPrimitives1 = [];
let addedPrimitives3 = [];
let addedPrimitives4 = [];
let addedDataSources = [];
let addedEntities = [];
let addedEntities1 = [];
let addedEntities6 =[]
let pointCollection = new Cesium.PointPrimitiveCollection();


function loadhua(url,labell,coo) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
          const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);

          const wallGeometry = new Cesium.CorridorGeometry({
            positions: positions,
            width: 3000,
            extrudedHeight: 0
          });

          const wallInstance = new Cesium.GeometryInstance({
            geometry: wallGeometry,
            id: feature.properties.Name // 使用特征的Name字段
          });

          const wallAppearance = new Cesium.MaterialAppearance({
            material: Cesium.Material.fromType('Image', {
              color: coo,
            }),
          });

          const wallPrimitive = new Cesium.Primitive({
            geometryInstances: wallInstance,
            appearance: wallAppearance,
            asynchronous: true,
          });

          wallPrimitive.id = feature.properties.Name; // 为wallPrimitive设置ID
         

          window.viewer.scene.primitives.add(wallPrimitive);
          addedPrimitives.push({p:wallPrimitive,id:url}); // 保存对wallPrimitive的引用

          // 添加标签
          const label = window.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(flatCoordinates[0], flatCoordinates[1]), // 使用第一个坐标作为标签位置
            label: {
              text: labell, // 从特征中获取Name字段
              font: '20px Helvetica',
              fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 5,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              pixelOffset: new Cesium.Cartesian2(0, -20), // 标签偏移
            },
          });
          addedEntities.push({p:label,id:url})
        });
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
}
function loadm(url,coo,labell) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
        const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);

        const wallGeometry = new Cesium.CorridorGeometry({
          positions: positions,
          width: 3000,
          extrudedHeight: -90000
        });

        const wallInstance = new Cesium.GeometryInstance({
          geometry: wallGeometry,
          id: feature.properties.Name // 使用特征的Name字段
        });

        const wallAppearance = new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType('Image', {
            color: coo,
          }),
        });

        const wallPrimitive = new Cesium.Primitive({
          geometryInstances: wallInstance,
          appearance: wallAppearance,
          asynchronous: true,
        });

        wallPrimitive.id = feature.properties.Name; // 为wallPrimitive设置ID
        

        window.viewer.scene.primitives.add(wallPrimitive);
        addedPrimitives3.push({p:wallPrimitive,id:labell}); // 保存对wallPrimitive的引用
        const label = window.viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(flatCoordinates[0], flatCoordinates[1]), // 使用第一个坐标作为标签位置
          label: {
            text: labell, // 从特征中获取Name字段
            font: '20px Helvetica',
            fillColor: Cesium.Color.WHITE,
                  outlineColor: Cesium.Color.BLACK,
                  outlineWidth: 5,
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20), // 标签偏移
          },
        });
        addedEntities6.push({p:label,id:labell})
        // 添加标签
        
      });
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
}
function loadm1(url,coo,id) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
        const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);

        const wallGeometry = new Cesium.CorridorGeometry({
          positions: positions,
          width: 1000,
          extrudedHeight: -10000
        });

        const wallInstance = new Cesium.GeometryInstance({
          geometry: wallGeometry,
          id: feature.properties.Name // 使用特征的Name字段
        });

        const wallAppearance = new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType('Image', {
            color: coo,
          }),
        });

        const wallPrimitive = new Cesium.Primitive({
          geometryInstances: wallInstance,
          appearance: wallAppearance,
          asynchronous: true,
        });

        wallPrimitive.id = id; // 为wallPrimitive设置ID
        

        window.viewer.scene.primitives.add(wallPrimitive);
        addedPrimitives4.push({p:wallPrimitive,id:id}); // 保存对wallPrimitive的引用

        // 添加标签
        
      });
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
}

function loadPoints(url,coo) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Create a PointPrimitiveCollection if it doesn't exist
             
            viewer.scene.primitives.add(pointCollection);

            data.features.forEach(feature => {
                const coordinates = feature.geometry.coordinates; // Assuming it's a single point
                const position = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]);
                const labeltt = feature.properties.NAME
               

                const pointGeometry = new Cesium.PointPrimitive({
                    position: position,
                    pixelSize: 10, // Adjust the size of the point as needed
                    color: coo, // Change color as needed
                });
                const labelEntity = window.viewer.entities.add({
                  
                  position: position,
                  
                  label: {
                    text: labeltt,
                    font: '25px Sans-Serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 5,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            
                  
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -10),
                    backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
                    showBackground: true,
                    eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
                  }
            
                });

                // Add the pointGeometry to the pointCollection
                pointCollection.add(pointGeometry);
                addedEntities1.push({p:labelEntity,id:url})
            });

        }).then(addedPrimitives1.push({p:pointCollection,id:url}))
        .catch(error => console.error('Error loading GeoJSON data:', error));
}





  

  function cleardadiLayers(id) {
    // Clear all added DataSources
    addedDataSources.forEach(dataSource => {
      window.viewer.dataSources.remove(dataSource, true);
    });
    addedDataSources = []; // Reset list
  
    // Clear all added Primitives
    addedPrimitives = addedPrimitives.filter(primitive => {
      if (id === primitive.id) {
        window.viewer.scene.primitives.remove(primitive.p);
        return false;
      }
      return true;
    });
  
    // Clear all added Entities
    addedEntities = addedEntities.filter(entity => {
      if (id === entity.id) {
        window.viewer.entities.remove(entity.p);
        return false;
      }
      return true;
    });
  
    //addedEntities = []; // 重置列表// Reset list

    
    //viewer.scene.primitives.remove(pointCollection)
    //pointCollection = new Cesium.PointPrimitiveCollection();
    
  
    // Clear all added Entities
    // Reset list
  };
  function clearp(id) {
    // Clear all added DataSources
    addedDataSources = addedDataSources.filter(dataSource => {
      if (id === dataSource.coo) {
        window.viewer.dataSources.remove(dataSource, true);
        return false; // Remove from the array
      }
      return true; // Keep in the array
    });
  
    // Clear all added Primitives
    addedPrimitives1 = addedPrimitives1.filter(primitive => {
      if (id === primitive.id) {
        window.viewer.scene.primitives.remove(primitive.p);
        return false;
      }
      return true;
    });
  
    // Clear all added Entities
    addedEntities1 = addedEntities1.filter(entity => {
      if (id === entity.id) {
        window.viewer.entities.remove(entity.p);
        return false;
      }
      return true;
    });
  
    // Clear the point collection
    viewer.scene.primitives.remove(pointCollection);
    pointCollection = new Cesium.PointPrimitiveCollection();
  }
  
  // Adding logic
  
  
  function clearm(id) {
    // Clear all added DataSources
   
  
    // Clear all added Primitives
    addedPrimitives3 = addedPrimitives3.filter(primitive => {
      if (id === primitive.id) {
        window.viewer.scene.primitives.remove(primitive.p);
        return false;
      }
      return true;
    });
    addedEntities6 = addedEntities6.filter(entity => {
      if (id === entity.id) {
        window.viewer.entities.remove(entity.p);
        return false;
      }
      return true;
    });

   
  
  
    
  
    // Clear all added Entities
    // Reset list
  };
  function clearm1() {
    // Clear all added DataSources
   
  
    // Clear all added Primitives
    addedPrimitives4.forEach(primitive => {
      window.viewer.scene.primitives.remove(primitive);
    });
   
    addedPrimitives3 = [];}

  export default{
    loadhua,
    cleardadiLayers,
    loadPoints,
    clearp,
    clearm,
    loadm,
    loadm1,
    clearm1
    
  }