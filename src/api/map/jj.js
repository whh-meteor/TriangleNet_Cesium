let addedEntities = [];
let label = []
let addedPrimitives = []
let cylinder = []
import { getList } from "@/api/mapapi/index.js";
import { JingUrl} from "@/api/mapapi/config";
import JingZhu from '@/api/map/loadjingzhu.js'
function jj() {
    
    
    let x = 1;
    let flog = true;
    let point = viewer.entities.add({
        id: '建议1井',
        position: Cesium.Cartesian3.fromDegrees(123.066545852088169, 34.394345647967171),
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
                return Cesium.Color.ORANGE.withAlpha(x);
            }, false),
            pixelSize: 20,
            outlineWidth: 0
        }
    });
    addedEntities.push({Entities :point, id : 1})
    const labelEntity = window.viewer.entities.add({
                  
        position: Cesium.Cartesian3.fromDegrees(123.066545852088169, 34.394345647967171),
        
        label: {
          text: '建议1井',
          font: '20px Sans-Serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 5,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  
        
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10),
          backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
          showBackground: true,
          eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
        }
  
      });
      label.push({Entities:labelEntity, id : 1})

    getList(JingUrl.jing1).then(res=>{
       
      

              let previousLayerDepth = 0;
              for (let i = 0; i < res.result.length; i++) {
                const item = res.result[i];
                const longitude = item.longDeg;  // 假设每个对象都有 longitude 属性
                const latitude = item.latDeg;
                const layerDepth = item.thickness;
              
                // 设置 max 和 min
                let max = previousLayerDepth ; // 当前数据的 max 为前一个数据的 layerDepth
                let min = layerDepth * -1+max; // 当前数据的 min 为当前的 layerDepth
              
                // 更新 previousLayerDepth 为当前的 layerDepth
                previousLayerDepth = min;
              
                // 生成随机颜色
                function getRandomColor() {
                  const r = Math.floor(Math.random() * 256);
                  const g = Math.floor(Math.random() * 256);
                  const b = Math.floor(Math.random() * 256);
                  return `rgb(${r}, ${g}, ${b})`;
                }
              
                // 使用随机颜色
                let color = Cesium.Color.fromCssColorString(getRandomColor());
              
                const height = ((max + min) / 2) * 10;
                const length = item.thickness * 10;

                
              
             
                // 创建圆柱体
                JingZhu.cylinder(longitude, latitude, height, length, color,1,{
                    longDeg:item.longDeg,
                    latDeg:item.latDeg,
                    name:'建议1井',
                    topDepth:item.topDepth,
                    bottomDepth:item.botDepth,
                    groups:item.groups,
                    lith:item.lith,
                    riskReservoirWarn:item.riskReservoirWarn,
                    systems:item.systems,
                    unified:item.unified,
                    thickness:item.thickness
                    
         
                });

              
              


                //MapConfig.removeOceanWater(window.viewer)
            window.viewer.scene.globe.translucency.enabled = false
                //window.viewer.scene.globe.show = false; // 隐藏地球

                JingZhu.flyToView(-5, 4)
            }
    })
}
function jj2() {
    let x = 1;
    let flog = true;
   let point =  viewer.entities.add({
        id:'建议2井',
        position: Cesium.Cartesian3.fromDegrees(123.016347505882351, 34.337675976470592 ),
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
                return Cesium.Color.PINK.withAlpha(x);
            }, false),
            pixelSize: 20,
            outlineWidth: 0
        }
    });
    addedEntities.push({Entities :point, id : 2})
    const labelEntity = window.viewer.entities.add({
                  
        position: Cesium.Cartesian3.fromDegrees(123.016347505882351, 34.337675976470592 ),
        
        label: {
          text: '建议2井',
          font: '20px Sans-Serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 5,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  
        
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10),
          backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
          showBackground: true,
          eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
          scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
        }
  
      });
      label.push({Entities:labelEntity, id : 2})
      getList(JingUrl.jing2).then(res=>{
        
        for (let i = 0; i < res.result.length; i++) {

        const item = res.result[i];
        const longitude = item.longDeg;  // 假设每个对象都有 longitude 属性
        const latitude = item.latDeg;
        const layerDepth = item.bottomDepth-item.topDepth;
      
      
      
        // 生成随机颜色
        function getRandomColor() {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgb(${r}, ${g}, ${b})`;
        }
      
        // 使用随机颜色
        let color = Cesium.Color.fromCssColorString(getRandomColor());
      
        const height = (-(parseFloat(item.bottomDepth) + parseFloat(item.topDepth)) / 2) * 10;

        const length = layerDepth * 10;

       
      
     
        // 创建圆柱体
        JingZhu.cylinder(longitude, latitude, height, length, color,2,{
            longDeg:item.longDeg,
            latDeg:item.latDeg,
            name:'建议2井',
            topDepth:item.topDepth,
            bottomDepth:item.bottomDepth,
            eqrLayer:item.eqrLayer,
            geologyLayer:item.geologyLayer,
            endTime:item.endTime 
 
        });

      
      


        //MapConfig.removeOceanWater(window.viewer)
    window.viewer.scene.globe.translucency.enabled = false
        //window.viewer.scene.globe.show = false; // 隐藏地球

        JingZhu.flyToView(-5, 4)
      

            
 } })

}

function pou(xb,yb,xe,ye,url,id1,x){
    var wallGeometry = new Cesium.WallGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray([
            xb, yb,  // 起点
            xe, ye   // 终点
        ]),
        maximumHeights: [-20,-20],  // 最大高度
        minimumHeights: [x,x]    // 最小高度
    });

    // 定义外观与纹理
    var wallAppearance = new Cesium.MaterialAppearance({
        material: Cesium.Material.fromType('Image', {
            image: url,
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
    addedPrimitives.push({primitive: wallPrimitive1, id:id1}); 
}

function clear(id){
    addedEntities.forEach(entity => {
      
        if (entity.id === id ) {



        window.viewer.entities.remove(entity.Entities);}
    
      });
     
      label.forEach(entity => {
        if (entity.id === id ) {

        window.viewer.entities.remove(entity.Entities);}
    
      });
      JingZhu.clearwall(id)
     // 重置列表// Reset list // 重置列表// Reset list
}
function clearpou(id){
    addedPrimitives = addedPrimitives.filter(item => {
        if (item.id === id) {
          // 从 Cesium 场景中移除 primitive
          window.viewer.scene.primitives.remove(item.primitive);
          return false; // 从数组中移除该项
        }
        return true; // 保留其他项
      });
}

export default{
    jj,
    jj2,
    clear,
    pou,
    clearpou,
    
}