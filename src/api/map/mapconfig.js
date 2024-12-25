import waterNormals from "@/assets/image/map/waterNormals.jpg";
import earthspec1k from "@/assets/image/map/earthspec1k.jpg";
import mapbus from "./mapbus";
// import testjson from "../../../public/json/nhh/nhh_noholes.json";
let oceanPrimitive = null;
import CesiumNavigation from "@znemz/cesium-navigation";
function oceanWater(viewer) {
  var viewer = viewer;
  if (!oceanPrimitive) {
    oceanPrimitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        }),
      }),
      // 水材质
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: "Water",
            uniforms: {
              //水区颜色
              baseWaterColor: new Cesium.Color(
                89 / 255,
                148 / 255,
                236 / 255,
                0.3
              ),
              // 从水区到非水区域混合
              // blendColor: new Cesium.Color(0.5, 1.0, 0.699, 1),
              blendColor: new Cesium.Color(89 / 255, 148 / 255, 236 / 255, 0.7),
              normalMap: waterNormals,
              specularMap: earthspec1k,
              frequency: 1000.0, // 波浪数量。
              animationSpeed: 0.01, // 动画速度
              amplitude: 10.0, // 水波振幅
              specularIntensity: 1, // 镜面反射强度
            },
          },
        }),
        aboveGround: true,
      }),
      show: true,
    });
    viewer.scene.primitives.add(oceanPrimitive);

    // 强制持续渲染
    viewer.scene.requestRenderMode = false;
    viewer.scene.postProcessStages.fxaa.enabled = true;

    mapbus.$emit("isCheckOceanShow", 1);
  }
}

function removeOceanWater(viewer) {
  mapbus.$emit("isCheckOceanShow", 2);
  if (oceanPrimitive) {
    viewer.scene.primitives.remove(oceanPrimitive);
    oceanPrimitive = null;
  }
}
function getOceanWaterIsVisable() {
  if (oceanPrimitive) {
    return 1; // 1显示
  } else {
    return 2; // 2隐藏海水
  }
}
function updateMapInfo(viewer) {
  const scene = viewer.scene;
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

  handler.setInputAction(function (movement) {
    const cartesian = viewer.camera.pickEllipsoid(
      movement.endPosition,
      scene.globe.ellipsoid
    );

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
        6
      );
      const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);

      // 获取地形系统中的高度信息
      const positions = [cartographic];
      const promise = Cesium.sampleTerrainMostDetailed(
        viewer.terrainProvider,
        positions
      );

      promise.then(function (updatedPositions) {
        // const altitude = updatedPositions[0].height.toFixed(2)
        const altitude = updatedPositions[0].height.toFixed(2);
        const camera = viewer.camera;
        const heading = Cesium.Math.toDegrees(camera.heading).toFixed(2);
        const pitch = Cesium.Math.toDegrees(camera.pitch).toFixed(2);
        const roll = Cesium.Math.toDegrees(camera.roll).toFixed(2);
        const height = camera.positionCartographic.height.toFixed(2);

        // 更新HTML中的内容
        document.querySelector(
          '.ontime-container-border p[label="经度"]'
        ).textContent = `经度: ${longitude}`;
        document.querySelector(
          '.ontime-container-border p[label="纬度"]'
        ).textContent = `纬度: ${latitude}`;
        document.querySelector(
          '.ontime-container-border p[label="深度"]'
        ).textContent = `深度: ${altitude}`;
      });
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

function loadZoro(viewer) {
  const outerCoreRadius = 6300000;
  viewer.entities.add({
    name: "OuterCore",
    id: "OuterCore",
    position: Cesium.Cartesian3.ZERO,
    ellipsoid: {
      radii: new Cesium.Cartesian3(
        outerCoreRadius,
        outerCoreRadius,
        outerCoreRadius
      ),
      material: Cesium.Color.BLACK,
    },
  });
}

function useTranslucencyRectangle(viewer) {
  var globe = viewer.scene.globe;
  // globe.translucency.enabled = true
  globe.undergroundColor = undefined;
  globe.translucency.frontFaceAlpha = 0.25;
  globe.translucency.rectangle = Cesium.Rectangle.fromDegrees(
    119.0,
    31.0,
    127.0,
    3.0
  );
}
function ClapTerrain() {
  /* 贴地面 */
  let polygon = new Cesium.GeometryInstance({
    geometry: new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          117.0,
          37.5, // 济南
          118.0,
          37.2, // 滨州
          119.0,
          37.0, // 东营
          120.0,
          37.5, // 烟台
          121.4,
          37.5, // 威海
          121.4,
          36.0, // 青岛
          120.5,
          35.5, // 日照
          119.5,
          35.0, // 临沂
          118.0,
          35.0, // 济宁
          116.5,
          34.8, // 菏泽
          115.5,
          35.4, // 曹县
          116.0,
          36.0, // 泰安
          117.0,
          37.5, // 回到济南
        ])
      ),
    }),
  });

  let polygonApperance = new Cesium.MaterialAppearance({
    material: Cesium.Material.fromType("Dot", {
      color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
    }),
  });

  let addPolygonGeometry = new Cesium.GroundPrimitive({
    geometryInstances: polygon,
    appearance: polygonApperance,
  });

  window.viewer.scene.primitives.add(addPolygonGeometry);
}
// 全局变量用于存储GeoJsonDataSource实例
//贴图地形
let geoJsonDataSource;
function addGeoJsonToTerrain() {
  // 创建GeoJsonDataSource实例
  geoJsonDataSource = new Cesium.GeoJsonDataSource();

  // 加载GeoJSON数据并设置贴地(clampToGround: true)
  geoJsonDataSource
    .load("/json/nhh/nhh_bd.json", {
      clampToGround: true, // 确保GeoJSON数据贴合地面
    })
    .then(function (dataSource) {
      // 将数据源添加到viewer中
      window.viewer.dataSources.add(dataSource);

      // 获取所有的实体
      const entities = dataSource.entities.values;

      // 定义一个图像纹理
      const terrainTexture = new Cesium.ImageMaterialProperty({
        image: "/json/nhh/nhh_color2.jpg", // 指定纹理图像的路径
        repeat: new Cesium.Cartesian2(1, 1), // 控制图像的重复方式
        color: Cesium.Color.WHITE.withAlpha(1), // 颜色与透明度设置
      });

      // 遍历每一个实体，设置其外观
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];

        // 将纹理应用到多边形
        entity.polygon.material = terrainTexture;

        entity.polygon.outline = true; // 显示边框
        entity.polygon.outlineColor = Cesium.Color.BLACK; // 边框颜色

        // 启用实体的阴影
        entity.polygon.shadows = Cesium.ShadowMode.ENABLED;
      }
    })
    .catch(function (error) {
      console.error("加载GeoJSON文件时出错：", error);
    });
}

function removeGeoJsonFromTerrain() {
  if (geoJsonDataSource) {
    // 从viewer中移除GeoJsonDataSource
    window.viewer.dataSources.remove(geoJsonDataSource, true);
    geoJsonDataSource = null; // 清空数据源以便下次加载
  } else {
    console.warn("没有加载的GeoJSON数据源可供移除");
  }
}
//获取地形显示状态
function getGeoJsonTerrainStatus() {
  if (geoJsonDataSource) {
    return true; // 1显示
  } else {
    return false; // 2隐藏
  }
}
function flytohome() {
  window.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      108.3136,
      22.8196,
      // 2000000
      2000000
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
    duration: 1,
  });
}
/**
 *  开启/禁用地球
 * @param {*} isBool
 */
function isShowAllEarth(isBool) {
  if (isBool) {
    //禁用地球
    window.viewer.scene.globe.show = false;
    // 禁用星光
    window.viewer.scene.skyAtmosphere.show = false;
    // 禁用海水
    removeOceanWater(window.viewer);
    //禁用球心
    removeEntityByName(window.viewer, "Outer Core");
  } else {
    // 启用地球
    window.viewer.scene.globe.show = true;
    // 启用星光
    window.viewer.scene.skyAtmosphere.show = true;
    // 启用海水
    oceanWater(window.viewer);
    //启用球心
    loadZoro(window.viewer, "Outer Core");
  }
}

function removeEntityByName(viewer, entityName) {
  // 遍历所有实体
  viewer.entities.values.forEach((entity) => {
    if (entity.name === entityName) {
      viewer.entities.remove(entity); // 移除匹配的实体
    }
  });
}

/**
 *  地形裁剪
 * @param {*} geoJson
 * @returns
 */
import TerrainClipPlan from "./TerrainClipPlan";
import * as turf from "@turf/turf";
async function loadClipNhhArea(isBool) {
  return;
  // removeOceanWater(window.viewer)

  var viewer = window.viewer;
  var globe = viewer.scene.globe;
  var points = loadGeoJsonToPoints(testjson);
  const terrainClipPlanInstance = new TerrainClipPlan(viewer, {
    height: 155000,
    splitNum: 1000,
    bottomImg: require("../../../public/sample/bottom2.jpg"),
    wallImg: require("../../../public/sample/wall.jpg"),
  });

  if (isBool) {
    terrainClipPlanInstance.updateTerrainClipData(points);
    maskSurface();
  } else {
    terrainClipPlanInstance.clear();
    removeClippingPolygons();
  }
}

let clippingPolygons = null;
async function maskSurface() {
  let footprint;
  try {
    const dataSource = await Cesium.GeoJsonDataSource.load(
      "/json/nhh/nhh_bd_Polygon.json",
      {
        clampToGround: true,
      }
    );
    viewer.dataSources.add(dataSource);
    footprint = dataSource.entities.values.find((entity) =>
      Cesium.defined(entity.polygon)
    );
    footprint.polygon.outline = false;
  } catch (error) {
    console.log(`加载GeoJSON时出错。${error}`);
  }
  footprint.show = false;
  const positions = footprint.polygon.hierarchy.getValue().positions;
  clippingPolygons = new Cesium.ClippingPolygonCollection({
    polygons: [
      new Cesium.ClippingPolygon({
        positions: positions,
      }),
    ],
  });
  viewer.scene.globe.clippingPolygons = clippingPolygons;

  mapbus.$emit("isCheckExcavationShow", 1);
}

function removeClippingPolygons() {
  if (clippingPolygons) {
    viewer.scene.globe.clippingPolygons = undefined;
    clippingPolygons = null;
    console.log("裁剪多边形已移除");
  } else {
    console.log("没有可移除的裁剪多边形");
  }
  mapbus.$emit("isCheckExcavationShow", 2);
}
function loadGeoJsonToPoints(geoJson) {
  const points = [];
  geoJson.features.forEach((feature) => {
    if (feature.geometry[0].type == "Polygon") {
      feature.geometry[0].coordinates[0].forEach((coord) => {
        const [lng, lat] = coord;
        points.push(Cesium.Cartesian3.fromDegrees(lng, lat, 0));
      });
    }
  });
  return points;
}
/**
 * 获取当前裁剪状态
 * @returns {boolean} 返回当前是否处于裁剪状态
 */
function getClipStatus() {
  return clippingPolygons !== null;
}
/**
 * 加载罗盘
 */
function LoadCompass(viewer) {
  //配置项
  let options = {
    enableCompass: true,
    enableZoomControls: false,
    enableCompassOuterRing: false,
    enableDistanceLegend: false,
  };
  //添加罗盘
  CesiumNavigation(viewer, options);
}
export default {
  oceanWater,
  removeOceanWater,
  updateMapInfo,
  loadZoro,
  useTranslucencyRectangle,
  ClapTerrain,
  addGeoJsonToTerrain,
  removeGeoJsonFromTerrain,
  getGeoJsonTerrainStatus,
  flytohome,
  getOceanWaterIsVisable,
  isShowAllEarth,
  loadClipNhhArea,
  maskSurface,
  LoadCompass,
  getClipStatus,
  removeClippingPolygons,
};
