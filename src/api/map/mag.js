// 定义渐变颜色的数组
import { getList } from "@/api/mapapi/index.js";
import { researchUrl } from "@/api/mapapi/config";

let addedPrimitives = [];
let label2 = []


const gradientColors = [
  Cesium.Color.fromCssColorString('#E24545'), // 红色
  Cesium.Color.fromCssColorString('#FE5A08'), // 橙色
  Cesium.Color.fromCssColorString('#F1D100'), // 黄色
  Cesium.Color.fromCssColorString('#7DB834'), // 绿色
  Cesium.Color.fromCssColorString('#06C9DF'), // 蓝绿色
  Cesium.Color.fromCssColorString('#059BFF'), // 绿色
  Cesium.Color.fromCssColorString('#6868FF') // 蓝绿色

].reverse();

// 创建颜色插值函数，返回渐变颜色
function getGradientColor(value, minValue, maxValue) {
  if (value < minValue) return gradientColors[0]; // 返回最低色
  if (value > maxValue) return gradientColors[gradientColors.length - 1]; // 返回最高色

  const colorCount = gradientColors.length - 1;
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  const index = Math.min(Math.floor(normalizedValue * colorCount), colorCount - 1);
  const fraction = (normalizedValue * colorCount) - index;

  return Cesium.Color.lerp(
    gradientColors[index],
    gradientColors[index + 1],
    fraction,
    new Cesium.Color()
  );
}


// function loadtrim(point, tri, high, id_p, minTypeValue, maxTypeValue) {
//   Promise.all([
//     fetch(point).then(response => response.json()),
//     fetch(tri).then(response => response.json())
//   ])
//     .then(([coordsData, indicesData]) => {
//       const positions = [];
//       const indices = [];
//       const colors = [];
//       const outlineIndices = [];

//       coordsData.features.forEach((feature) => {
//         const coords = feature.geometry.coordinates;
//         const depth = feature.properties.depth ?? -3000;
//         const value = feature.properties.type;


//         const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * high);
//         positions.push(position.x, position.y, position.z);

//         // 根据 type 值进行颜色渐变
//         const color = getGradientColor(value, minTypeValue, maxTypeValue);
//         colors.push(color.red, color.green, color.blue, color.alpha);
//       });

//       indicesData.features.forEach((feature1) => {
//         const pointA = feature1.properties.POINTA - 1;
//         const pointB = feature1.properties.POINTB - 1;
//         const pointC = feature1.properties.POINTC - 1;

//         indices.push(pointA, pointB, pointC);
//         outlineIndices.push(pointA, pointB, pointB, pointC, pointC, pointA);
//       });

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

//       const outlineGeometry = new Cesium.Geometry({
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
//         indices: new Uint16Array(outlineIndices),
//         primitiveType: Cesium.PrimitiveType.LINES,
//         boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
//       });

//       const fillPrimitive = new Cesium.Primitive({
//         releaseGeometryInstances:false,
//         geometryInstances: new Cesium.GeometryInstance({
//           geometry: fillGeometry,
//           id: id_p,
//         }),
//         appearance: new Cesium.PerInstanceColorAppearance({ translucent: true, flat: true }),
//         asynchronous: false
//       });

//       const outlinePrimitive = new Cesium.Primitive({
//         releaseGeometryInstances:false,
//         geometryInstances: new Cesium.GeometryInstance({
//           geometry: outlineGeometry,
//         }),
//         appearance: new Cesium.PolylineColorAppearance(),
//         asynchronous: false
//       });

//       window.viewer.scene.primitives.add(fillPrimitive);
//       window.viewer.scene.primitives.add(outlinePrimitive);
//       addedPrimitives.push({ primitive: fillPrimitive, id: id_p });
//       addedPrimitives.push({ primitive: outlinePrimitive, id: id_p + "_outline" });
//     })
//     .catch(error => {
//       console.error('Error loading GeoJSON data:', error);
//     });
// }
function loadtrim(point, tri, high, id_p, minTypeValue, maxTypeValue,op) {
  Promise.all([
    fetch(point).then(response => response.json()),
    fetch(tri).then(response => response.json())
  ])
    .then(([coordsData, indicesData]) => {
      const positions = [];
      const indices = [];
      const colors = [];
      const outlineIndices = [];
      const boundingBox = {
        west: Number.POSITIVE_INFINITY,
        south: Number.POSITIVE_INFINITY,
        east: Number.NEGATIVE_INFINITY,
        north: Number.NEGATIVE_INFINITY
      };

      coordsData.features.forEach((feature) => {
        const coords = feature.geometry.coordinates;
        const depth = feature.properties.depth ?? -3000;
        const value = feature.properties.type;

        // 更新边界范围
        boundingBox.west = Math.min(boundingBox.west, coords[0]);
        boundingBox.south = Math.min(boundingBox.south, coords[1]);
        boundingBox.east = Math.max(boundingBox.east, coords[0]);
        boundingBox.north = Math.max(boundingBox.north, coords[1]);

        const position = Cesium.Cartesian3.fromDegrees(coords[0], coords[1], depth * high);
        positions.push(position.x, position.y, position.z);

        // 根据 type 值进行颜色渐变
        const color = getGradientColor(value, minTypeValue, maxTypeValue);
        colors.push(color.red, color.green, color.blue, op);
      });

      indicesData.features.forEach((feature1) => {
        const pointA = feature1.properties.POINTA - 1;
        const pointB = feature1.properties.POINTB - 1;
        const pointC = feature1.properties.POINTC - 1;

        indices.push(pointA, pointB, pointC);
        outlineIndices.push(pointA, pointB, pointB, pointC, pointC, pointA);
      });

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

      const outlineGeometry = new Cesium.Geometry({
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
        indices: new Uint16Array(outlineIndices),
        primitiveType: Cesium.PrimitiveType.LINES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
      });

      const fillPrimitive = new Cesium.Primitive({
        releaseGeometryInstances: false,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: fillGeometry,
          id: id_p,
        }),
        appearance: new Cesium.PerInstanceColorAppearance({ translucent: true, flat: true }),
        asynchronous: false
      });

      const outlinePrimitive = new Cesium.Primitive({
        releaseGeometryInstances: false,
        geometryInstances: new Cesium.GeometryInstance({
          geometry: outlineGeometry,
        }),
        appearance: new Cesium.PolylineColorAppearance(),
        asynchronous: false
      });

      window.viewer.scene.primitives.add(fillPrimitive);
      window.viewer.scene.primitives.add(outlinePrimitive);
      addedPrimitives.push({ primitive: fillPrimitive, id: id_p });
      addedPrimitives.push({ primitive: outlinePrimitive, id: id_p + "_outline" });

      // 缩放到加载区域
      const rectangle = Cesium.Rectangle.fromDegrees(
        boundingBox.west,
        boundingBox.south,
        boundingBox.east,
        boundingBox.north
      );
      viewer.camera.flyTo({
        destination: rectangle,
        duration: 2.0 // 飞行到目标区域的时间，单位：秒
      });

    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
}


function clear_trim(id) {
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
  loadtrim,
  clear_trim
}
