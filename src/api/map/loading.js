let addedPrimitives = [];
let label1 = [];
let addedEntities = []
function loadGeoJsonDatat10(url, coi, id_1, extra,) {
  fetch(url)
    .then(response => response.json())
    .then(geojson => {
      const pointCollection = new Cesium.PointPrimitiveCollection();
      pointCollection.id = id_1; // 设置id以便以后移除

      geojson.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
        const depth = feature.properties.VALUE;

        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, depth * extra);

        pointCollection.add({
          position: position,
          pixelSize: 4,
          color: coi,
          outlineWidth: 0,
        });
      });

      // 添加点集合到场景中并保存
      window.viewer.scene.primitives.add(pointCollection);
      addedPrimitives.push(pointCollection);

      // 创建并添加标签
      const labelCollectionlayer = window.viewer.scene.primitives.add(new Cesium.LabelCollection());
      const labelPosition = Cesium.Cartesian3.fromDegrees(
        geojson.features[0].geometry.coordinates[0]-0.1,
        geojson.features[0].geometry.coordinates[1],
        geojson.features[0].properties.VALUE * extra
      );
      let x = 1;
    let flog = true;
      let point =  viewer.entities.add({
        id: id_1
,        position: labelPosition,
        point: {
            show: true,
            color: new Cesium.CallbackProperty(function () {
                // 闪烁透明度
                if (flog) {
                    x -= 0.05;
                    if (x <= 0) flog = false;
                } else {
                    x += 0.05;
                    if (x >= 1) flog = true;
                }

                // 动态改变颜色
                return Cesium.Color.YELLOW.withAlpha(x);
            }, false),
            pixelSize: 20,
            outlineWidth: 0
        }
    });
    addedEntities.push({Entities :point, id : id_1})
      

      const label = labelCollectionlayer.add({
        position: labelPosition,
        text: id_1,
        font: '20px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20)
      });

      // 设置label的id
      labelCollectionlayer.id = id_1;
      label1.push(labelCollectionlayer);
    }
  )
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}

function clearlayer(id) {
  // 根据 id 清除对应的 PointPrimitiveCollection
  addedPrimitives = addedPrimitives.filter(primitive => {
    if (primitive.id === id) {
      window.viewer.scene.primitives.remove(primitive); // 从 Cesium 场景中移除
      return false; // 从数组中移除
    }
    return true; // 保留其他对象
  });

  // 根据 id 清除对应的 LabelCollection
  label1 = label1.filter(label => {
    if (label.id === id) {
      window.viewer.scene.primitives.remove(label); // 从 Cesium 场景中移除
      return false; // 从数组中移除
    }
    return true; // 保留其他对象
  });
  addedEntities.forEach(entity => {
    
    if (entity.id === id ) {



    window.viewer.entities.remove(entity.Entities);}

  });
}


export default {
  loadGeoJsonDatat10,
  clearlayer
}