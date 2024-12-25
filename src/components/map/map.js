function Map() {
  // 其他映射
  const colorMappings = {
    Ⅰ类: {
      color: new Cesium.Color.fromCssColorString("#4B0082"),
      labelPosition: [123.56, 34.384],
    },
    Ⅱ类: {
      color: new Cesium.Color.fromCssColorString("#7B2CBF"),
      labelPosition: [122.31, 34.778],
    },

    // 其他映射
  };
  loadtri(
    "/json/p.geojson",
    "/json/t.geojson",
    3,
    "南黄海盆地震旦-志留油气有利区带",
    colorMappings,
    1
  );
}
import { getList } from "@/api/mapapi/index.js";
import { researchUrl } from "@/api/mapapi/config";

let addedPrimitives = [];
let label2 = [];
/**
 *  加载三角网地形
 * @param {*} point 点JSON数据
 * @param {*} tri   三角网JSON数据
 * @param {*} high 拉伸比例
 * @param {*} id_p  primitive 的ID
 * @param {*} colorMappings label颜色和位置
 * @param {*} op 透明度
 */
function loadtri(point, tri, high, id_p, colorMappings, op) {
  Promise.all([
    fetch(point).then((response) => response.json()),
    fetch(tri).then((response) => response.json()),
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
        north: Number.NEGATIVE_INFINITY,
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

        const position = Cesium.Cartesian3.fromDegrees(
          coords[0],
          coords[1],
          -1 * depth * high
        );
        positions.push(position.x, position.y, position.z);

        // 使用传入的颜色映射查找颜色
        const color = colorMappings[value]?.color || Cesium.Color.TRANSPARENT;
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
            values: new Float64Array(positions),
          }),
          color: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(colors),
          }),
        },
        indices: new Uint16Array(indices),
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(positions),
      });

      const outlineGeometry = new Cesium.Geometry({
        attributes: {
          position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float64Array(positions),
          }),
          color: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 4,
            values: new Float32Array(colors),
          }),
        },
        indices: new Uint16Array(outlineIndices),
        primitiveType: Cesium.PrimitiveType.LINES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(positions),
      });

      const fillPrimitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: fillGeometry,
          id: id_p,
        }),
        releaseGeometryInstances: false,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: true,
          flat: true,
        }),
        asynchronous: false,
      });

      const outlinePrimitive = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: outlineGeometry,
        }),
        appearance: new Cesium.PolylineColorAppearance(),
        asynchronous: false,
      });

      window.viewer.scene.primitives.add(fillPrimitive);
      window.viewer.scene.primitives.add(outlinePrimitive);
      addedPrimitives.push({ primitive: fillPrimitive, id: id_p });
      addedPrimitives.push({
        primitive: outlinePrimitive,
        id: id_p + "_outline",
      });

      // 添加 labelCollection 部分
      const labelCollection = window.viewer.scene.primitives.add(
        new Cesium.LabelCollection()
      );
      const labelCollection11 = window.viewer.scene.primitives.add(
        new Cesium.LabelCollection()
      );

      Object.keys(colorMappings).forEach((key) => {
        const labelCoords = colorMappings[key]?.labelPosition;
        if (labelCoords) {
          const labelPosition = Cesium.Cartesian3.fromDegrees(
            labelCoords[0],
            labelCoords[1],
            0
          );
          labelCollection11.add({
            position: labelPosition,
            id: id_p + key,
            text: key, // 使用映射的键作为标签文本
            font: "20px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 5,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -50),
          });
          label2.push({ primitive: labelCollection11, id: id_p + key });

          getList(researchUrl.labeltext, {
            areaName: id_p,
            raTypeDetail: key,
          }).then((res) => {
            labelCollection.add({
              position: labelPosition,
              text: `面积：${res.result[0].area * 12364.8} sq km`, // 第二行内容
              font: "16px sans-serif",
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 5,
              id: id_p + key + "1",
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -30),
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0.0,
                500000.0
              ),
            });
            label2.push({ primitive: labelCollection, id: id_p + key + "1" });
          });
        }
      });

      // 缩放到加载区域
      const rectangle = Cesium.Rectangle.fromDegrees(
        boundingBox.west,
        boundingBox.south,
        boundingBox.east,
        boundingBox.north
      );
      viewer.camera.flyTo({
        destination: rectangle,
        duration: 2.0, // 2 秒内飞行到目标区域
      });
    })
    .catch((error) => {
      console.error("Error loading GeoJSON data:", error);
    });
}

function clear_tri(id) {
  addedPrimitives = addedPrimitives.filter((item) => {
    if (item.id === id || item.id === id + "_outline") {
      window.viewer.scene.primitives.remove(item.primitive);
      return false;
    }
    return true;
  });
  label2 = label2.filter((item) => {
    // 检查 ID 是否以 id_p 开头
    if (item.id.startsWith(id)) {
      window.viewer.scene.primitives.remove(item.primitive);
      return false;
    }
    return true;
  });
}

export default { loadtri, clear_tri, Map };
