let addedPrimitives = [];
let label2 = []
// function loadaotao1(sort_url, tri_url, type_1, color_1, id_1) {

//   Promise.all([
//     fetch(sort_url).then(response => response.json()),
//     fetch(tri_url).then(response => response.json())
//   ])
//     .then(([coordsData, indicesData]) => {
//       const positions = [];
//       const indices = [];
//       const colors = [];

//       coordsData.features.forEach((feature) => {
//         const coords = feature.geometry.coordinates;
//         const depth = feature.properties.depth ?? -3000; // Default depth to 0 if null
//         const value = feature.properties.type;

//         const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * 6 + 60000);
//         positions.push(position.x, position.y, position.z);

//         let color;
//         switch (value) {
//           case type_1:
//             color = color_1;
//             break;

//           default:
//             color = Cesium.Color.TRANSPARENT; // Default color
//             break;
//         }
//         colors.push(color.red, color.green, color.blue, color.alpha);
//       });

//       indicesData.features.forEach((feature1) => {
//         indices.push(feature1.properties.POINTA - 1, feature1.properties.POINTB - 1, feature1.properties.POINTC - 1);
//       });


//       const geometry = new Cesium.Geometry({
//         attributes: {
//           position: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.DOUBLE,
//             componentsPerAttribute: 3,
//             values: new Float64Array(positions)
//           }),
//           color: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.FLOAT,
//             componentsPerAttribute: 4,
//             values: new Float32Array(colors)
//           })
//         },
//         indices: new Uint16Array(indices),
//         primitiveType: Cesium.PrimitiveType.TRIANGLES,
//         boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
//       });

//       const appearance = new Cesium.PerInstanceColorAppearance({
//         translucent: true,

//         flat: true
//       });


//       const yuanprimitive = new Cesium.Primitive({
//         geometryInstances: new Cesium.GeometryInstance({
//           geometry: geometry,
//           id: id_1,

//         }),

//         appearance: appearance,
//         asynchronous: false
//       });

//       window.viewer.scene.primitives.add(yuanprimitive);
//       addedPrimitives.push({ primitive: yuanprimitive, id: id_1 });
//       //console.log(yuanprimitive.geometryInstances.id)
//       //console.log(addedPrimitives)


//     })
//     .catch(error => {
//       console.error('Error loading GeoJSON data:', error);
//     });
// };

// function loadaotao1(sort_url, tri_url, type_1, color_1, id_1) {

//   Promise.all([
//     fetch(sort_url).then(response => response.json()),
//     fetch(tri_url).then(response => response.json())
//   ])
//     .then(([coordsData, indicesData]) => {
//       const positions = [];
//       const indices = [];
//       const colors = [];

//       coordsData.features.forEach((feature) => {
//         const coords = feature.geometry.coordinates;
//         const depth = feature.properties.depth ?? -3000; // Default depth to -3000 if null
//         const value = feature.properties.type;

//         const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * 6 + 60000);
//         positions.push(position.x, position.y, position.z);

//         let color;
//         switch (value) {
//           case type_1:
//             color = color_1;
//             break;

//           default:
//             color = Cesium.Color.TRANSPARENT; // Default color
//             break;
//         }
//         colors.push(color.red, color.green, color.blue, color.alpha);
//       });

//       indicesData.features.forEach((feature1) => {
//         indices.push(feature1.properties.POINTA - 1, feature1.properties.POINTB - 1, feature1.properties.POINTC - 1);
//       });

//       // Create fill geometry
//       const fillGeometry = new Cesium.Geometry({
//         attributes: {
//           position: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.DOUBLE,
//             componentsPerAttribute: 3,
//             values: new Float64Array(positions)
//           }),
//           color: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.FLOAT,
//             componentsPerAttribute: 4,
//             values: new Float32Array(colors)
//           })
//         },
//         indices: new Uint16Array(indices),
//         primitiveType: Cesium.PrimitiveType.TRIANGLES,
//         boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
//       });

//       // Create outline geometry by adding a small offset or duplicating the shape
//       const outlinePositions = [...positions]; // You may need to adjust positions to create the outline effect
//       const outlineIndices = [...indices]; // Make sure to correctly handle outline indices
//       const outlineGeometry = new Cesium.Geometry({
//         attributes: {
//           position: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.DOUBLE,
//             componentsPerAttribute: 3,
//             values: new Float64Array(outlinePositions)
//           }),
//           color: new Cesium.GeometryAttribute({
//             componentDatatype: Cesium.ComponentDatatype.FLOAT,
//             componentsPerAttribute: 4,
//             values: new Float32Array(colors)
//           })
//         },
//         indices: new Uint16Array(outlineIndices),
//         primitiveType: Cesium.PrimitiveType.LINES, // Use LINES for the outline
//         boundingSphere: Cesium.BoundingSphere.fromVertices(outlinePositions)
//       });

//       const fillAppearance = new Cesium.PerInstanceColorAppearance({
//         translucent: true,
//         flat: true
//       });

//       const outlineAppearance = new Cesium.PolylineColorAppearance(); // Use PolylineColorAppearance for outline

//       // Create fill primitive
//       const fillPrimitive = new Cesium.Primitive({
//         geometryInstances: new Cesium.GeometryInstance({
//           geometry: fillGeometry,
//           id: id_1,
//         }),
//         appearance: fillAppearance,
//         asynchronous: false
//       });

//       // Create outline primitive
//       const outlinePrimitive = new Cesium.Primitive({
//         geometryInstances: new Cesium.GeometryInstance({
//           geometry: outlineGeometry,
//           id: id_1 + "_outline", // Unique ID for outline
//         }),
//         appearance: outlineAppearance,
//         asynchronous: false
//       });

//       window.viewer.scene.primitives.add(fillPrimitive);
//       window.viewer.scene.primitives.add(outlinePrimitive);

//       addedPrimitives.push({ primitive: fillPrimitive, id: id_1 });
//       addedPrimitives.push({ primitive: outlinePrimitive, id: id_1 + "_outline" });

//     })
//     .catch(error => {
//       console.error('Error loading GeoJSON data:', error);
//     });
// };
function loadaotao1(sort_url, tri_url, type_1, color_1, id_1, high) {
  Promise.all([
    fetch(sort_url).then(response => response.json()),
    fetch(tri_url).then(response => response.json()),
    fetch('/json/圈闭/point.geojson').then(response => response.json())
  ])
    .then(([coordsData, indicesData, pointData]) => {
      const positions = [];
      const indices = [];
      const colors = [];
      const outlineIndices = []; // 用于存储轮廓线的索引

      coordsData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const depth = feature.properties.depth ?? -3000; // 默认深度为 -3000，如果为空
        const value = feature.properties.type;

        const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * high);
        positions.push(position.x, position.y, position.z);

        let color;
        switch (value) {
          case type_1:
            color = color_1;
            break;

          default:
            color = Cesium.Color.TRANSPARENT; // 默认颜色
            break;
        }
        colors.push(color.red, color.green, color.blue, color.alpha);
      });

      indicesData.features.forEach((feature1) => {
        const pointA = feature1.properties.POINTA - 1;
        const pointB = feature1.properties.POINTB - 1;
        const pointC = feature1.properties.POINTC - 1;

        // 添加三角形的索引
        indices.push(pointA, pointB, pointC);

        // 为每条边创建线段，生成轮廓线的索引
        outlineIndices.push(pointA, pointB); // 边 AB
        outlineIndices.push(pointB, pointC); // 边 BC
        outlineIndices.push(pointC, pointA); // 边 CA
      });

      const labelCollection = window.viewer.scene.primitives.add(new Cesium.LabelCollection());

      pointData.features.forEach((feature2) => {
        const coords = feature2.geometry.coordinates; // 获取点的经纬度
        const name = feature2.properties.Name;
        

        const labelPosition = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], 0); // 转换为Cartesian3
        const label = labelCollection.add({
          position: labelPosition,
          text: name, // 使用名称作为文本
          font: '20px sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 5,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 300000.0) // 标签偏移，使其在点的上方显示
        });

        // 将标签添加到 addedPrimitives 中进行管理
        label2.push(labelCollection);
      });

      // 创建填充几何体
      const fillGeometry = new Cesium.Geometry({
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

      // 创建轮廓几何体
      const outlineGeometry = new Cesium.Geometry({
        attributes: {
          position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(positions) // 轮廓与填充几何体共用相同的顶点
          }),
          color: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(colors) // 使用相同的颜色数组
          })
        },
        indices: new Uint16Array(outlineIndices), // 使用线段索引
        primitiveType: Cesium.PrimitiveType.LINES, // 通过 LINES 绘制轮廓
        boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
      });

      const fillAppearance = new Cesium.PerInstanceColorAppearance({
        translucent: true,
        flat: true
      });

      const outlineAppearance = new Cesium.PolylineColorAppearance(); // 使用 PolylineColorAppearance 来显示轮廓

      // 创建填充 Primitive
      const fillPrimitive = new Cesium.Primitive({
        releaseGeometryInstances:false,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: fillGeometry,
          id: id_1,
        }),
       
        
        appearance: fillAppearance,
        asynchronous: false
      });

      // 创建轮廓 Primitive
      const outlinePrimitive = new Cesium.Primitive({
        releaseGeometryInstances:false,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: outlineGeometry,
          id: id_1 + "_outline", // 为轮廓使用唯一的 ID
        }),
        
        appearance: outlineAppearance,
        asynchronous: false
      });

      window.viewer.scene.primitives.add(fillPrimitive);
      window.viewer.scene.primitives.add(outlinePrimitive);

      // 将填充和轮廓 Primitive 保存到数组
      addedPrimitives.push({ primitive: fillPrimitive, id: id_1 });
      addedPrimitives.push({ primitive: outlinePrimitive, id: id_1 + "_outline" });

    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}




function clearyuanyan1(id) {
  // Filter and remove all Primitives with the matching ID
  addedPrimitives = addedPrimitives.filter(item => {
    if (item.id === id || item.id === id + "_outline") {
      // Remove the primitive from the scene
      window.viewer.scene.primitives.remove(item.primitive);
      return false; // Remove from the array
    }
    return true; // Keep in the array
  });
  label2 = label2.filter(item => {

    // 从 Cesium 场景中移除 LabelCollection 对象
    window.viewer.scene.primitives.remove(item);
    // 保留其他对象
  });
}






export default {
  loadaotao1,

  clearyuanyan1
};