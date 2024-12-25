let addedPrimitives = [];
let addedDataSources = [];
let addedEntities = [];
let addedEntitiesp = [];
let addedBuyop = []


import { getList } from "@/api/mapapi/index.js";
import { zou } from "@/api/mapapi/config";// 假设 getList 是一个获取 API 数据的方法

function loadzouhang(depth) {
  getList(zou.zouhang, { deep: depth })
    .then(res => {
      if (!res || !res.result) {
        console.error("Invalid response format:", res);
        return;
      }

      const maxIntensity = Math.max(...res.result.map(item => item.speed));

      res.result.forEach(item => {
        const { longDeg: longitude, latDeg: latitude, dir: angle, id, speed: intensity } = item;

        // Main line segment length, adjust to fit the map scale
        const length = 0.3;

        // Calculate end position
        const endPosition = Cesium.Cartesian3.fromDegrees(
          longitude + length * Math.cos(Cesium.Math.toRadians(angle)),
          latitude + length * Math.sin(Cesium.Math.toRadians(angle)),depth*-300
        );

        // Set the start position
        const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, depth*-300);

        // Add point entity
        // const pointEntity = viewer.entities.add({
        //   id: id,
        //   position: position,
        //   point: {
        //     pixelSize: 5,
        //     color: Cesium.Color.MEDIUMVIOLETRED
        //   }
        // });

        // addedEntities.push(pointEntity);

        // Normalize intensity and interpolate colors
        const normalizedIntensity = Math.min(intensity / maxIntensity, 1.0);
        const startColor = Cesium.Color.GREEN;
        const endColor = Cesium.Color.RED;

        // Interpolating RGB components
        const r = Cesium.Math.lerp(startColor.red, endColor.red, normalizedIntensity);
        const g = Cesium.Math.lerp(startColor.green, endColor.green, normalizedIntensity);
        const b = Cesium.Math.lerp(startColor.blue, endColor.blue, normalizedIntensity);

        const arrowColor = new Cesium.Color(r, g, b, 1.0);

        // Add polyline with arrow
        const lineEntity = viewer.entities.add({
          name: "Arrow",
          id:id,
          polyline: {
            positions: [position, endPosition],
            width: 5,
            material: new Cesium.PolylineArrowMaterialProperty(arrowColor),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 500000.0)
          }
        });

        addedEntities.push({Entities:lineEntity,id:depth});
      });

      // Fly the camera to the specified destination
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(131, 19, 3000000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: Cesium.Math.toRadians(0.0)
        },
        duration: 2
      });
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
}

function loadbuoy(name){
getList(zou.buoypoint, { buoyName: name })
.then(res => {
 
  let values = res.result[0].split(",");

// 将两个值转换为数字
let longitude = parseFloat(values[0]);
let latitude = parseFloat(values[1]);


    
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);

   
        const pointEntity = viewer.entities.add({
          
          position: position,
          point: {
            pixelSize: 13,
            color: Cesium.Color.MEDIUMVIOLETRED
          },
          label: {
            text: name,
            font: '25px Arial',
            style: Cesium.LabelStyle.FILL,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
            showBackground: true,
            eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 300000.0)
            //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2, 1.5e7, 0.5),
          },
          id:name
        });

        addedBuyop.push({Entities:pointEntity,id:name});

})



}

function clearbuoy(id){

  addedBuyop.forEach(entity => {
    if(entity.id === id){

    window.viewer.entities.remove(entity.Entities);
  }

  });

}
function loadpoint(){getList(zou.zouhang, { deep: 25 })
.then(res => {
  res.result.forEach(item => {
    const { longDeg: longitude, latDeg: latitude,  id } = item;
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);

   
        const pointEntity = viewer.entities.add({
          
          position: position,
          point: {
            pixelSize: 5,
            color: Cesium.Color.MEDIUMVIOLETRED
          }
        });

        addedEntitiesp.push(pointEntity);})

})

}

function clearzouhang(id) {
  addedPrimitives.forEach(primitive => {
    window.viewer.scene.primitives.remove(primitive);
  });
 


  // 清除所有添加的 entities
  addedEntities.forEach(entity => {
    if(entity.id === id){

    window.viewer.entities.remove(entity.Entities);
  }

  });
 
}

function clearp() {



  // 清除所有添加的 entities
  addedEntitiesp.forEach(entity => {

    window.viewer.entities.remove(entity);

  });}
  
export default {
 
  clearzouhang,
  loadzouhang,
  clearp,
  loadpoint,
  loadbuoy,
  clearbuoy
}