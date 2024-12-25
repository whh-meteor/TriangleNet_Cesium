// loadqianzuan.js

import JingZhu from '@/api/map/loadjingzhu.js' // 根据 JingZhu 的实际路径进行导入
import CesiumPopupComponent from '@/api/map/popup.js'; // 根据需要导入其他依赖
import { getList } from "@/api/mapapi/index.js";
import { JingUrl } from "@/api/mapapi/config";// 假设 getList 是一个获取 API 数据的方法

export function loadingwell(isChecked, datatt) {
  var viewer = window.viewer;
  var handler = window.handler
  let tabletype = null;

  if (isChecked) {

    // Initialize window.forclear if it's undefined
    if (!window.forclear) {
      window.forclear = [];
    }

    if (handler) {
      handler.destroy();
      handler = null;
    }

    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((click) => {
      const pickedObject = viewer.scene.pick(click.position);

      if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && Cesium.defined(pickedObject.id._id)) {
        const id = String(pickedObject.id._id);
        const longg = pickedObject.id._customData.long;
        const latt = pickedObject.id._customData.lat;
        const topp = pickedObject.id._customData.top;
        const bott = pickedObject.id._customData.bot;
        const hh = pickedObject.id._customData.h;

        const cartesian = viewer.scene.pickPosition(click.position);
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

        CesiumPopupComponent.clearAllPopups();
        getList(JingUrl.getrockbyid, { stationId: id, tableType: String(tabletype) }).then(res => {
          for (let i = 0; i < res.result.length; i++) {
            const item = res.result[i];
            const longitude = item.longDeg;
            const latitude = item.latDeg;
            const max = item.ssamTopDepth * -1;
            const min = item.ssamBotDepth * -1;
            const type = item.lithCd;
            const staId = item.stationId;
            const subId = item.subsampleId;

            JingZhu.loadingzhu(longitude, latitude, 40000, 10000, 0, `/sample/img/${type}.png`, { statId: staId, subtId: subId });
          }
        });

        new CesiumPopupComponent(viewer, {
          longitude: Cesium.Math.toDegrees(cartographic.longitude),
          latitude: Cesium.Math.toDegrees(cartographic.latitude),
          htmlContent: `<div class="title">大地构造</div><div class="content">ID: ${id} <br>纬度: ${longg} <br>经度: ${latt} <br>顶层高度: ${topp}m <br>最低深度: ${bott}m <br>取样深度: ${hh}m</div>`
        });
      } else if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.primitive._instanceIds) && Cesium.defined(pickedObject.id)) {
        const statid = String(pickedObject.id.statId);
        window.STATID = String(pickedObject.id.statId);

        const subid = String(pickedObject.id.subtId);
        window.SAMID = String(pickedObject.id.subtId);
        getList(JingUrl.stattype, { stationId: statid, subsampleId: subid }).then(res => {
          window.chartTypes = res.result;
          window.isShow1 = true
        });
      } else {
        window.chartTypes = [];
        CesiumPopupComponent.clearAllPopups();
        JingZhu.clearwall();
        window.isShow1 = false
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    getList(JingUrl.jinginfoList, { dataType: datatt }).then(res => {
      for (let i = 0; i < res.result.length; i++) {
        const item = res.result[i];
        tabletype = item.tableType;
        const longitude = item.longDeg;
        const latitude = item.latDeg;
        const label = item.stationId;
        const coordinates = [longitude, latitude];
        const position = Cesium.Cartesian3.fromDegrees(...coordinates);
        const TopDepth = item.ssamTopDepth;
        const BotDepth = item.ssamBotDepth;
        const height = BotDepth - TopDepth;

        const centerPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, (height * -1 / 2));
        const cylinder = viewer.entities.add({
          position: centerPosition,
          cylinder: {
            length: height,
            topRadius: 2500.0,
            bottomRadius: 2500.0,
            material: Cesium.Color.RED.withAlpha(0.5),
          },
        });

        const labelEntity1 = viewer.entities.add({
          position: position,
          id: label,
          point: {
            pixelSize: 15,
            color: Cesium.Color.GRAY,
            clampToGround: true
          },
          customData: {
            long: longitude,
            lat: latitude,
            top: TopDepth,
            bot: BotDepth,
            h: height
          },
          label: {
            text: label,
            font: '15px Arial',
            style: Cesium.LabelStyle.FILL,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
            showBackground: true,
            eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2, 1.5e7, 0.5),
          },
        });

        // Add entities to window.forclear
        window.forclear.push(labelEntity1);
        window.forclear.push(cylinder);
      }
      window.forclear = window.forclear; // Reassign to make sure it's available globally
    });
  } else {
    CesiumPopupComponent.clearAllPopups();
    if (window.forclear && window.forclear.length > 0) {
      window.forclear.forEach((entity) => viewer.entities.remove(entity));
      window.forclear = [];
    }
    JingZhu.clearwall();
    window.isShow1 = false
  }
}


