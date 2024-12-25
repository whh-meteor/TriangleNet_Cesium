let addedPrimitives = [];
let addedDataSources = [];
let addedEntities = [];



function loadpendi(url) {
  fetch(url)
    .then(response => response.json())
    .then(geojson => {
      geojson.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const properties = feature.properties;

        // 获取位置数组并转换为 Cesium.Cartesian3
        const positions = coordinates[0][0].map(coord =>
          Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
        );

        // 创建 Cesium.GeometryInstance，用于定义几何图形
        const geometryInstance = new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(positions),
            perPositionHeight: false // 使多边形贴合地形
          }),
          id: properties.name, // 使用 GeoJSON 中的 name 属性作为实例的 id
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.SKYBLUE)
          }
        });

        // 创建 Cesium.GroundPrimitive 并添加到场景中
        const groundPrimitive = new Cesium.GroundPrimitive({
          geometryInstances: geometryInstance,
          appearance: new Cesium.PerInstanceColorAppearance({
            flat: true,
            translucent: false
          })
        });

        window.viewer.scene.primitives.add(groundPrimitive);
        addedPrimitives.push(groundPrimitive); // 将 GroundPrimitive 添加到数组中进行管理
      });
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}



function loadboundary() {
  fetch('/json/大地/boundary.geojson')
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
        const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);

        const wallGeometry = new Cesium.CorridorGeometry({
          positions: positions,
          width: 1000,
          extrudedHeight: 1
        });

        const wallInstance = new Cesium.GeometryInstance({
          geometry: wallGeometry,
          id: feature.id
        });

        const wallAppearance = new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType('Image', {
            color: Cesium.Color.SLATEBLUE,
          }),
        });

        const wallPrimitive = new Cesium.Primitive({
          geometryInstances: wallInstance,
          appearance: wallAppearance,
          asynchronous: true
        });

        window.viewer.scene.primitives.add(wallPrimitive);
        addedPrimitives.push(wallPrimitive); // 保存对wallPrimitive的引用
      });
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
};

function addLabels() {
  const labels = [
    { position: [123.48, 35.8, 1000], text: '烟台坳陷' },
    { position: [122, 34.4, 10000], text: '崂山隆起' },
    { position: [122.5, 33.67, 1000], text: '青岛坳陷' }
  ];

  labels.forEach(label => {
    const position = Cesium.Cartesian3.fromDegrees(...label.position);

    const labelEntity = window.viewer.entities.add({
      id: label.text,
      position: position,
      point: {
        pixelSize: 20,
        color: Cesium.Color.fromCssColorString('#0077be').withAlpha(0.99),
        clampToGround: false,
        
      },
      label: {
        text: label.text,
        font: '25px Sans-Serif',
        fillColor: Cesium.Color.WHITE,

        style: Cesium.LabelStyle.FILL,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
        backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
        showBackground: true,
        eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
      }

    });
    addedEntities.push(labelEntity); // 保存对labelEntity的引用


  });
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
            clampToGround: false,
            
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
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
          }
        });

        addedEntities.push(labelEntity); // 保存对labelEntity的引用
      });
    })
    .catch(error => {
      console.error('Failed to load GeoJSON:', error);
    });
}





function loadfault() {
  fetch('/json/大地/断层.geojson')
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const flatCoordinates = feature.geometry.coordinates[0].flatMap(coord => coord.length >= 2 ? [coord[0], coord[1]] : []);
        const positions = Cesium.Cartesian3.fromDegreesArray(flatCoordinates);

        const wallGeometry = new Cesium.CorridorGeometry({
          positions: positions,
          width: 1000,
          extrudedHeight: 1
        });

        const wallInstance = new Cesium.GeometryInstance({
          geometry: wallGeometry,
          id: feature.id
        });

        const wallAppearance = new Cesium.MaterialAppearance({
          material: Cesium.Material.fromType('Image', {
            color: Cesium.Color.PURPLE,
          }),
        });

        const wallPrimitive = new Cesium.Primitive({
          geometryInstances: wallInstance,
          appearance: wallAppearance,
          asynchronous: true
        });

        window.viewer.scene.primitives.add(wallPrimitive);
        addedPrimitives.push(wallPrimitive); // 保存对wallPrimitive的引用
      });
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
};

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



export default {
  loadpendi,
  loadboundary,
  addLabels,
  loadfault,
  cleardadiLayers,
  loadmangLabels

};

