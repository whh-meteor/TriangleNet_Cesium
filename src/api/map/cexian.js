import { cexianUrl} from "@/api/mapapi/config";
import { getList } from "@/api/mapapi/index.js";



let addedEntities = []
let addedPrimitives = [];
let addedPrimitives1 = [];
let heatt = null
let baseUrl= process.env.VUE_APP_BASE_URL + '/manage/loadFile?id='
function loadcexian (name,x,project) {
    getList(cexianUrl.cexian, { tlineKind: name,type:null,areaId:project }).then(res => {
        //console.log(res.result)
        const boundingBox = {
          west: Number.POSITIVE_INFINITY,
          south: Number.POSITIVE_INFINITY,
          east: Number.NEGATIVE_INFINITY,
          north: Number.NEGATIVE_INFINITY
        };
        for (let i = 0; i < res.result.length; i++) {
          
            
            let item = res.result[i]; 
           
             // 获取当前线段数据
            let pic = item.fileId
            let id = item.tlineId
            // 添加线到Cesium Viewer
            let midpointLongitude = (item.begLongDeg + item.endLongDeg) / 2;
let midpointLatitude = (item.begLatDeg + item.endLatDeg) / 2;
const positions= Cesium.Cartesian3.fromDegreesArray([
    item.begLongDeg, item.begLatDeg,  // 起点
    item.endLongDeg, item.endLatDeg   // 终点
]);

boundingBox.west = Math.min(boundingBox.west, midpointLongitude);
boundingBox.south = Math.min(boundingBox.south, midpointLatitude);
boundingBox.east = Math.max(boundingBox.east, midpointLongitude);
boundingBox.north = Math.max(boundingBox.north, midpointLatitude);


const wallGeometry1 = new Cesium.CorridorGeometry({
  positions: positions,
  width: x,
  extrudedHeight: 0
});

const wallInstance = new Cesium.GeometryInstance({
  geometry: wallGeometry1,
  id:{
    areaName :item.areaName,
    projectName: item.projectName,
    shapeLeng: item.shapeLeng,
    tlineId: item.tlineId,
    tlineLeng: item.tlineLeng,
    areaId: item.areaId,
    sryDatase:item.sryDatase,
    sryBegDate: item.sryBegDate,
    sryEndDate: item.sryEndDate,
    
    tlineKind: item.tlineKind,
    begLongDeg: item.begLongDeg,
    begLatDeg:item.begLatDeg,
    endLongDeg :item.endLongDeg,
    endLatDeg :item.endLatDeg 















  }
  
  
});

const wallAppearance1 = new Cesium.MaterialAppearance({
  material: Cesium.Material.fromType('Image', {
    color: new Cesium.Color.fromCssColorString(item.color),
  }),
});

const wallPrimitive = new Cesium.Primitive({
  geometryInstances: wallInstance,
  appearance: wallAppearance1,
  asynchronous: true,
  
  
  
  
  
});

//console.log(wallPrimitive)
window.viewer.scene.primitives.add(wallPrimitive)
addedPrimitives1.push({ primitive: wallPrimitive, id: name });

const rectangle = Cesium.Rectangle.fromDegrees(
  boundingBox.west,
  boundingBox.south,
  boundingBox.east,
  boundingBox.north
);
viewer.camera.flyTo({
  destination: rectangle,
  duration: 2.0 // 2 秒内飞行到目标区域
});







// 添加标签到线段中心
let label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(midpointLongitude, midpointLatitude),
    label: {
        text: id,  // 标签内容
        font: '14pt sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 300000.0)
    }
});
            //addedEntities.push({ entity: cee, id: name }); 
            addedEntities.push({ entity: label, id: name });// Store the actual entity
            if(pic !==''){
                var wallGeometry = new Cesium.WallGeometry({
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        item.begLongDeg, item.begLatDeg,  // 起点
                        item.endLongDeg, item.endLatDeg   // 终点
                    ]),
                    maximumHeights: [-20,-20],  // 最大高度
                    minimumHeights: [-40000,-40000]    // 最小高度
                });
            
                // 定义外观与纹理
                var wallAppearance = new Cesium.MaterialAppearance({
                    material: Cesium.Material.fromType('Image', {
                        image: `${baseUrl}${pic}`,
                        // image:  '/sample/井剖面/1well_Trace1700.jpg',
                        repeat: new Cesium.Cartesian2(1, 1),
                    }),
                    translucent: false  // 纹理是否半透明
                });
                
            
                // 创建并添加Primitive到viewer
                var wallPrimitive1 = new Cesium.Primitive({
                    geometryInstances: new Cesium.GeometryInstance({
                        geometry: wallGeometry
                    }),
                    appearance: wallAppearance,
                    asynchronous: true  // 异步加载纹理
                });
            
                viewer.scene.primitives.add(wallPrimitive1);
                addedPrimitives.push({primitive: wallPrimitive1, id:name,x:item.tlineId}); 
            }
        }
    });
}

function control_line(id) {
  
  addedPrimitives.forEach(item => {
    if (item.x === id) {
      // 切换 primitive 的显示状态
      
      item.primitive.show = !item.primitive.show;
    }
  });
}








function addHeatMap1() {
    let bounds = {
        north: 39.14,
        south: 30,
        east: 126.11,
        west: 119.17,
    };
    let heatMap = CesiumHeatmap.create(
      viewer, // your cesium viewer
      bounds, // bounds for heatmap layer
      {
        // heatmap.js options go here
         maxOpacity: 0.9,
         gradient: {
          0.0: 'lime',       // 从绿色开始
          0.25: 'yellow',    // 25%使用黄色
          0.5: 'orange',     // 50%使用橙色
          0.75: 'red',       // 75%使用红色
          1.0: 'darkred'    // 顶部使用洋红色
      }
        
      },
    );
    // let data = [
    //   { x: 106.254153, y: 29.2883939, value: 76 },
    //   { x: 106.2654284, y: 29.2854935, value: 63 },
    //   { x: 106.265005, y: 29.284573, value: 1 },
    //   { x: 106.264001, y: 29.283456, value: 21 },
    //   { x: 106.263219, y: 29.282181, value: 28 },
    //   { x: 106.262788, y: 29.279673, value: 41 },
    //   { x: 106.2632087, y: 29.2742665, value: 75 },
    //   { x: 106.2505158, y: 29.28138, value: 76 },
    //   { x: 106.2531094, y: 29.2833591, value: 100 },
    //   { x: 106.2531093, y: 29.2844560, value: 80 },
    //   { x: 106.253293, y: 29.284826, value: 1 },
    //   { x: 106.250099, y: 29.285638, value: 21 },
    //   { x: 106.2469149, y: 29.2864109, value: 28 },
    //   { x: 106.254119, y: 29.276274, value: 41 },
    // ];
    let data = [];
    getList(cexianUrl.heat).then(res => {
        for (let i = 0; i < res.result.length; i++) {
            let item = res.result[i];
            data.push({
                x: item.x, // 适当调整经度
                y: item.y, // 适当调整纬度
                value: 2.5 // 随机生成权重值
            });
        }
        //console.log(data);
        setTimeout(() => {
            heatMap.setWGS84Data(0, 10, data);
            //console.log(heatMap)
            this.heatt = heatMap

        }, 1000); // 500毫秒的延迟
    });
     

    
    
    

    

    
   
  }
  function clearheat (x){
    this.heatt.show(x)
}

function addHeatMap() {
    // let bounds = {
    //   west: 106.243911,
    //   east: 106.270811,
    //   south: 29.244545,
    //   north: 29.289995,
    // };
    let bounds = {
        north: 39.14,
        south: 30,
        east: 126.11,
        west: 119.17,
      };

    let heatMap = CesiumHeatmap.create(
      viewer, // your cesium viewer
      bounds, // bounds for heatmap layer
      {
        // heatmap.js options go here
         maxOpacity: 0.8
       // gradient: {  // the gradient used if not given in the heatmap options object
	//   '.3': '#d9e7fc',
	//   '.65': '#2a7aed',
	//   '.8': '#fbd801',
	//   '.95': '#18c3a1'
	// },
      },
    );

    let point = []
    
    

    getList(cexianUrl.heat).then(res => {
        //console.log(res.result)
        
        for (let i = 0; i < res.result.length; i++) {
            let item = res.result[i]
            point.push({
                x: item.x, // 适当调整经度
                y: item.y, // 适当调整纬度
                value: 2.5 // 随机生成权重值
            })
        }
    
    
    
    })
    //console.log(point)

    
    // let data = [
    //   { x: 106.254153, y: 29.2883939, value: 76 },
    //   { x: 106.2654284, y: 29.2854935, value: 63 },
    //   { x: 106.265005, y: 29.284573, value: 1 },
    //   { x: 106.264001, y: 29.283456, value: 21 },
    //   { x: 106.263219, y: 29.282181, value: 28 },
    //   { x: 106.262788, y: 29.279673, value: 41 },
    //   { x: 106.2632087, y: 29.2742665, value: 75 },
    //   { x: 106.2505158, y: 29.28138, value: 76 },
    //   { x: 106.2531094, y: 29.2833591, value: 100 },
    //   { x: 106.2531093, y: 29.2844560, value: 80 },
    //   { x: 106.253293, y: 29.284826, value: 1 },
    //   { x: 106.250099, y: 29.285638, value: 21 },
    //   { x: 106.2469149, y: 29.2864109, value: 28 },
    //   { x: 106.254119, y: 29.276274, value: 41 },
    // ];
    let valueMin = 0;
    let valueMax = 10;
    heatMap.setWGS84Data(valueMin, valueMax,point );
    heatMap.show(true)
    //console.log(heatMap)
  
  }


function clearcexian(name) {
    // 清除所有添加的 entities that match the given name
    for (let i = addedEntities.length - 1; i >= 0; i--) {
        if (addedEntities[i].id === name) {
            viewer.entities.remove(addedEntities[i].entity);  // Remove the actual entity
            addedEntities.splice(i, 1);  // Remove the entity from the array
        }
    }
    addedPrimitives = addedPrimitives.filter(item => {
        if (item.id === name) {
          // 从 Cesium 场景中移除 primitive
          window.viewer.scene.primitives.remove(item.primitive);
          return false; // 从数组中移除该项
        }
        return true; // 保留其他项
      });
      addedPrimitives1 = addedPrimitives1.filter(item => {
        if (item.id === name) {
          // 从 Cesium 场景中移除 primitive
          window.viewer.scene.primitives.remove(item.primitive);
          return false; // 从数组中移除该项
        }
        return true; // 保留其他项
      });
    
}

function toggleWallPrimitiveById(show) {
  addedPrimitives.forEach(item => {
      item.primitive.show = show; // 根据需要传入 true 或 false
  });
}

export default {
    clearheat,
    loadcexian,
    clearcexian,
    addHeatMap,
    addHeatMap1,
    
    toggleWallPrimitiveById,
    control_line
    
};

  