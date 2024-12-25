let entityCollection1 =[]
function dd (x,y,id){
    const position = Cesium.Cartesian3.fromDegrees(
        x,
        y,
        1000
      )
      


      const kk = viewer.entities.add({
        id: id,
        position: position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.PURPLE
        },
        label: {
          text: id,
          font: '25px Arial',
          style: Cesium.LabelStyle.FILL,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10),
          backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
          showBackground: true,
          eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000.0)
          //scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2, 1.5e7, 0.5),
        }
      })
      
      entityCollection1.push({Entities :kk,id :id})
}

// function dd(x, y, id) {
//   const position = Cesium.Cartesian3.fromDegrees(x, y, 1000);

//   // 添加点和标注
//   const kk = viewer.entities.add({
//       id: id,
//       position: position,
//       point: {
//           pixelSize: 10,
//           color: Cesium.Color.PURPLE
//       },
//       label: {
//           text: id,
//           font: '25px Arial',
//           style: Cesium.LabelStyle.FILL,
//           verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//           pixelOffset: new Cesium.Cartesian2(0, -10),
//           backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
//           showBackground: true,
//           eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
//           distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000.0)
//       }
//   });

//   console.log(kk.id);
//   entityCollection1.push({ Entities: kk, id: id });

//   // 添加垂直向下的刻度尺
//   const distanceMeters = 20000; // 总长度 20000 米
//   const segments = 3; // 刻度分段
//   const segmentLength = distanceMeters / segments; // 每段长度
//   const positions = [];
//   const labels = [];

//   for (let i = 0; i <= segments; i++) {
//       // 计算 Z 轴偏移（负方向）
//       const offsetZ = -segmentLength * i;
//       const position = Cesium.Cartesian3.fromDegrees(x, y, 1000 + offsetZ); // 偏移 Z 坐标
//       positions.push(position);

//       // 在每个刻度点添加标注（忽略起点 0）
//       if (i > 0) {
//           labels.push({
//               position,
//               label: {
//                   text: `${(segmentLength * i / 1000).toFixed(0)}`, // 显示为公里
//                   font: '16px sans-serif',
//                   fillColor: Cesium.Color.WHITE,
//                   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//                   outlineWidth: 2,
//                   verticalOrigin: Cesium.VerticalOrigin.CENTER,
//                   pixelOffset: new Cesium.Cartesian2(-30, 0) // 偏移到线左侧
//               }
//           });
//       }
//   }

//   // 添加垂直线
//   viewer.entities.add({
//       polyline: {
//           positions,
//           width: 5,
//           material: Cesium.Color.RED
//       }
//   });

//   // 添加刻度标注
//   labels.forEach(labelData => {
//       viewer.entities.add(labelData);
//   });
// }


function clear(id){
    entityCollection1.forEach(entity => {
        
        if (entity.id === id ) {
    
    
    
        window.viewer.entities.remove(entity.Entities);}
    
      });
}

export default{
    dd,
    clear
}

