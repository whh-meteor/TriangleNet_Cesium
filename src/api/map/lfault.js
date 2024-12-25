let addedPrimitives = [];
let label1 = []

function loadf(sort_url, tri_url, color_1, id_1, high) {
  Promise.all([
    fetch(sort_url).then(response => response.json()),
    fetch(tri_url).then(response => response.json())
  ])
    .then(([coordsData, indicesData]) => {
      const positions = [];
      const indices = [];
      const colors = [];

      coordsData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const depth = feature.properties.depth * high; // Default depth to 0 if null
        const value = feature.properties.type;

        const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth);
        positions.push(position.x, position.y, position.z);

        let color = color_1;

        colors.push(color.red, color.green, color.blue, color.alpha);
      });
      

      indicesData.features.forEach((feature1) => {
        indices.push(feature1.properties.POINTA, feature1.properties.POINTB, feature1.properties.POINTC);
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
          id: id_1,
        }),
        releaseGeometryInstances:false,
        appearance: appearance,
        asynchronous: false
      });

      window.viewer.scene.primitives.add(yuanprimitive);
      addedPrimitives.push({ primitive: yuanprimitive, id: id_1 });

      // 创建Label并添加到场景中
      // const labelCollection = window.viewer.scene.primitives.add(new Cesium.LabelCollection());

      // const labelPosition = Cesium.Cartesian3.fromDegrees(coordsData.features[0].geometry.coordinates[0], coordsData.features[0].geometry.coordinates[1], coordsData.features[0].properties.depth * high);

      // const label = labelCollection.add({
      //   position: labelPosition,
      //   text: id_1, // 使用 id_1 作为文本
      //   font: '20px sans-serif',
      //   fillColor: Cesium.Color.WHITE,
      //   outlineColor: Cesium.Color.BLACK,
      //   outlineWidth: 2,
      //   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      //   pixelOffset: new Cesium.Cartesian2(0, -20) // 标签偏移，使其在点的上方显示
      // });

      // // 把标签添加到 addedPrimitives 中进行管理
      // label1.push(labelCollection);
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
};

function clearfault(id) {
  // 过滤并移除所有与传入的 id 匹配的 Primitives
  addedPrimitives = addedPrimitives.filter(item => {
    if (item.id === id) {
      // 从 Cesium 场景中移除 primitive
      window.viewer.scene.primitives.remove(item.primitive);
      return false; // 从数组中移除该项
    }
    return true; // 保留其他项
  });
  // 过滤并移除所有与传入的 id 匹配的 LabelCollection
  label1 = label1.filter(labelCollection => {
    const labelToRemove = labelCollection.get(0); // 假设只有一个 label
    if (labelToRemove && labelToRemove.text == id) {
      // 从 Cesium 场景中移除 LabelCollection 对象
      window.viewer.scene.primitives.remove(labelCollection);
      return false; // 从数组中移除该 LabelCollection
    }
    return true; // 保留其他 LabelCollection
  });
}


export default {
  loadf,
  clearfault
}