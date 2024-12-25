import CesiumPopupComponent from '@/api/map/popup.js'
import { getList } from "@/api/mapapi/index.js";
import { dingdianUrl, JingUrl, layerUrl, researchUrl } from "@/api/mapapi/config";
import mapbus from '@/api/map/mapbus';
import huajie from '@/api/map/huajie.js'
export default function createClickHandler(viewer,te) {
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  

  handler.setInputAction((click) => {
    
    const cartesian = viewer.scene.pickPosition(click.position);
  

    const pickedObjects = viewer.scene.drillPick(click.position);  // 获取点击位置所有物体
    if (pickedObjects.length > 0) {  // 确保至少有两个图层
      let secondValidObject = null;

      // 遍历 pickedObjects，跳过第一个图层，选择第二个有效图层
      for (let i = 0; i < pickedObjects.length; i++) {  // 从索引 1 开始，跳过第一个图层
        const pickedObject = pickedObjects[i];
        
        if (Cesium.defined(pickedObject) && typeof pickedObject.id === 'string'&&  pickedObject.id !== '高石1'&& !pickedObject.id.startsWith('高石')&& pickedObject.primitive.id !== '高石3大构造') {
          
          const id = String(pickedObject.id);
          //console.log('This is the second layer ID: ' + id);
          let pickedPosition = pickedObject.primitive.geometryInstances.geometry.attributes.position.values
          ;
          //console.log(pickedPosition)
          const depths = [];
                for (let j = 0; j < pickedPosition.length; j += 3) {
                    const vertex = new Cesium.Cartesian3(
                        pickedPosition[j],
                        pickedPosition[j + 1],
                        pickedPosition[j + 2]
                    );
                    const distance = Cesium.Cartesian3.distance(vertex, cartesian);
                    depths.push(distance);
                }

                // 输出深度值
                
                
                // 找到最小深度
                const minDepth = Math.min(...depths);
                

          //console.log(pickedObject.primitive.geometryInstances.geometry._positions)
      
          getList(researchUrl.research, {areaName:id }).then(res => {
            //const img = res.result[4].fileId; // 获取 img
            //console.log('ffa'+img)

            // 发送 img 值到事件总线
            // mapbus.$emit('show',true)
            // mapbus.$emit('imgUpdated', img);
            
            

           
          

          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();

          // 创建弹出框，显示第二层的地层信息
          let popup = new CesiumPopupComponent(viewer, {
            longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
            latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
            height: cartographic.height,  // 高度
            htmlContent: `<div class="title">${res.result.raType}</div><div class="content">
    <div class="info-only"><span class="content-key">图鉴名: </span><span class="content-value">${id}  </span> </div>
    <div class="info-only"><span class="content-key">深度范围: </span><span  class="content-value">${res.result.depth} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">所属地层: </span><span  class="content-value">${res.result.layer}反射层</span> </div>
    <div class="info-only"><span class="content-key">所属地图: </span><span  class="content-value">${res.result.raMap}</span> </div>
    <div class="info-only"><span class="content-key">当前经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前深度: </span><span  class="content-value">-${(minDepth/te).toFixed(4)} </span><span class="content-unit">m</span> </div>
    
</div>
`
          });
        })

          secondValidObject = pickedObject;  // 保存第二个有效对象
          
          break;  // 找到第二个有效对象后退出循环
        }
        if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id._id && ['崂山隆起', '青岛坳陷', '烟台坳陷'].includes(pickedObject.id._id)) {
          const id = String(pickedObject.id._id)
          //console.log('this is id' + id)
          const cartesian = viewer.scene.pickPosition(click.position);
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups()
          getList(researchUrl.dadi, { tectonicName: id }).then(
            res => {



              let popup = new CesiumPopupComponent(viewer, {
                longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
                latitude: Cesium.Math.toDegrees(cartographic.latitude),  // 纬度
                htmlContent: `<div class="title">${id}</div><div class="content">介绍： ${res.result[0].
                  dataDesc}</div>`
              });
            })
            secondValidObject = pickedObject;  // 保存第二个有效对象
          
            break;  // 找到第二个有效对象后退出循环

        }
        if (Cesium.defined(pickedObject) &&  pickedObject.id === '高石1') {
          //console.log(pickedObject);
          const id = String(pickedObject.id);
          
          window.showgao = true
          mapbus.$emit('changeMessage', false,'高石1')
          setTimeout(() => {
            mapbus.$emit('changeMessage', true,'高石1',false)
            mapbus.$emit('changeMessage1', false,'高石3号大构造')
            
          }, 1000);
          
          //console.log('This is the second layer ID: ' + id+ 'and factor is' +window.showgao)
        

          // 创建弹出框，显示第二层的地层信息
         
         
          let pickedPosition = pickedObject.primitive.geometryInstances.geometry.attributes.position.values
          ;
          //console.log(pickedPosition)
          const depths = [];
                for (let j = 0; j < pickedPosition.length; j += 3) {
                    const vertex = new Cesium.Cartesian3(
                        pickedPosition[j],
                        pickedPosition[j + 1],
                        pickedPosition[j + 2]
                    );
                    const distance = Cesium.Cartesian3.distance(vertex, cartesian);
                    depths.push(distance);
                }

                // 输出深度值
              
                
                // 找到最小深度
                const minDepth = Math.min(...depths);
               

          //console.log(pickedObject.primitive.geometryInstances.geometry._positions)

         
          
          getList(layerUrl.gaoinfo, { trapName: id}).then(res => {
            console.log(res.result)
            const layer =  res.result.layer
            const layerNum = res.result.layerNum
            const closureAmp = res.result.closureAmp
            const trapArea = res.result.trapArea
            const highAlt = res.result.highAlt
            const mcmLine = res.result.mcmLine
            const mcmLine2 = res.result.mcmLine2
            
            const relLevel = res.result.relLevel
            const maxTl = res.result.maxTl

          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();

          // 创建弹出框，显示第二层的地层信息
          let popup = new CesiumPopupComponent(viewer, {
            longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
            latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
            height: cartographic.height,  // 高度
            htmlContent: `<div class="title">${id}</div><div class="content">
    <div class="info-only"><span class="content-key">高石: </span><span class="content-value">${id}  </span> </div>
    <div class="info-only"><span class="content-key">当前经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前深度: </span><span  class="content-value">${(minDepth/te).toFixed(4)} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">层位: </span><span class="content-value">${layer}  </span> </div>
    <div class="info-only"><span class="content-key">层数: </span><span class="content-value">${layerNum}  </span> </div>
    <div class="info-only"><span class="content-key">闭合幅度: </span><span  class="content-value">${closureAmp} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">圈闭面积: </span><span  class="content-value">${trapArea} </span><span class="content-unit">km^2</span> </div>
    <div class="info-only"><span class="content-key">高点海拔: </span><span  class="content-value">${highAlt} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">主控测线1: </span><span class="content-value">${mcmLine}  </span> </div>
    <div class="info-only"><span class="content-key">主控测线2: </span><span class="content-value">${mcmLine2}  </span> </div>
    <div class="info-only"><span class="content-key">可靠程度: </span><span class="content-value">${relLevel}  </span> </div>
        <div class="info-only"><span class="content-key">最大圈闭层位: </span><span class="content-value">${maxTl}  </span> </div>

    
</div>
`
          });
        })
        
        

          secondValidObject = pickedObject;  // 保存第二个有效对象
          
          break;  // 找到第二个有效对象后退出循环
        }
        
        if (Cesium.defined(pickedObject) &&  pickedObject.id === '高石3') {
          //console.log(pickedObject);
          const id = String(pickedObject.id);
          //const trapName

          
          getList(layerUrl.gaoinfo, { trapName: id}).then(res => {
            console.log(res.result)
            const layer =  res.result.layer
            const layerNum = res.result.layerNum
            const closureAmp = res.result.closureAmp
            const trapArea = res.result.trapArea
            const highAlt = res.result.highAlt
            const mcmLine = res.result.mcmLine
            const mcmLine2 = res.result.mcmLine2
            
            const relLevel = res.result.relLevel
            const maxTl = res.result.maxTl



            //const trapName = res.result[0].trapName

          
           


          
          mapbus.$emit('changeMessage', false,'高石3')
          setTimeout(() => {
            mapbus.$emit('changeMessage', true,'高石3',false)
            mapbus.$emit('changeMessage1', false,'高石3号大构造')
            
          }, 1000);
         
          //console.log('This is the second layer ID: ' + id+ 'and factor is' +window.showgao)
        

          // 创建弹出框，显示第二层的地层信息
         
          
          let pickedPosition = pickedObject.primitive.geometryInstances.geometry.attributes.position.values
          ;
          //console.log(pickedPosition)
          const depths = [];
                for (let j = 0; j < pickedPosition.length; j += 3) {
                    const vertex = new Cesium.Cartesian3(
                        pickedPosition[j],
                        pickedPosition[j + 1],
                        pickedPosition[j + 2]
                    );
                    const distance = Cesium.Cartesian3.distance(vertex, cartesian);
                    depths.push(distance);
                }

                // 输出深度值
                
                
                // 找到最小深度
                const minDepth = Math.min(...depths);
                

          //console.log(pickedObject.primitive.geometryInstances.geometry._positions)

         
          huajie.loadm1('/json/高石3范围/boundry.geojson', Cesium.Color.WHITE.withAlpha(0.6),'高石3大构造');

          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();

          // 创建弹出框，显示第二层的地层信息
          let popup = new CesiumPopupComponent(viewer, {
            longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
            latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
            height: cartographic.height,  // 高度
            htmlContent: `<div class="title">${id}</div><div class="content">
    <div class="info-only"><span class="content-key">高石: </span><span class="content-value">${id}  </span> </div>
    <div class="info-only"><span class="content-key">当前经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前深度: </span><span  class="content-value">${(minDepth/te).toFixed(4)} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">层位: </span><span class="content-value">${layer}  </span> </div>
    <div class="info-only"><span class="content-key">层数: </span><span class="content-value">${layerNum}  </span> </div>
    <div class="info-only"><span class="content-key">闭合幅度: </span><span  class="content-value">${closureAmp} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">圈闭面积: </span><span  class="content-value">${trapArea} </span><span class="content-unit">km^2</span> </div>
    <div class="info-only"><span class="content-key">高点海拔: </span><span  class="content-value">${highAlt} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">主控测线1: </span><span class="content-value">${mcmLine}  </span> </div>
    <div class="info-only"><span class="content-key">主控测线2: </span><span class="content-value">${mcmLine2}  </span> </div>
    <div class="info-only"><span class="content-key">可靠程度: </span><span class="content-value">${relLevel}  </span> </div>
        <div class="info-only"><span class="content-key">最大圈闭层位: </span><span class="content-value">${maxTl}  </span> </div>



    
</div>
`
          });
        })
        

          secondValidObject = pickedObject;  // 保存第二个有效对象
          
          break;  // 找到第二个有效对象后退出循环
        }
        if (Cesium.defined(pickedObject) && 
        Cesium.defined(pickedObject.primitive) && 
        pickedObject.primitive.id === '高石3大构造') {
          
           mapbus.$emit('changeMessage', false,'高石3')
          setTimeout(() => {
            mapbus.$emit('changeMessage1', true,'高石3号大构造')
            
          }, 1000);
        secondValidObject = pickedObject;  // 保存第二个有效对象
        break;
    }
    

        if (Cesium.defined(pickedObject) &&  pickedObject.id === '高石2') {
          //console.log(pickedObject);
          const id = String(pickedObject.id);
          huajie.clearm1()
          mapbus.$emit('changeMessage', false,'高石2')
          setTimeout(() => {
            mapbus.$emit('changeMessage', true,'高石2',false)
            mapbus.$emit('changeMessage1', false,'高石3号大构造')
            
          }, 1000);
         
          //console.log('This is the second layer ID: ' + id+ 'and factor is' +window.showgao)
        

          // 创建弹出框，显示第二层的地层信息
         
          
          let pickedPosition = pickedObject.primitive.geometryInstances.geometry.attributes.position.values
          ;
          //console.log(pickedPosition)
          const depths = [];
                for (let j = 0; j < pickedPosition.length; j += 3) {
                    const vertex = new Cesium.Cartesian3(
                        pickedPosition[j],
                        pickedPosition[j + 1],
                        pickedPosition[j + 2]
                    );
                    const distance = Cesium.Cartesian3.distance(vertex, cartesian);
                    depths.push(distance);
                }

                // 输出深度值
                
                
                // 找到最小深度
                const minDepth = Math.min(...depths);
               

          //console.log(pickedObject.primitive.geometryInstances.geometry._positions)
          getList(layerUrl.gaoinfo, { trapName: id}).then(res => {
            console.log(res.result)
            const layer =  res.result.layer
            const layerNum = res.result.layerNum
            const closureAmp = res.result.closureAmp
            const trapArea = res.result.trapArea
            const highAlt = res.result.highAlt
            const mcmLine = res.result.mcmLine
            const mcmLine2 = res.result.mcmLine2
            
            const relLevel = res.result.relLevel
            const maxTl = res.result.maxTl

         
          

          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();

          // 创建弹出框，显示第二层的地层信息
          let popup = new CesiumPopupComponent(viewer, {
            longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
            latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
            height: cartographic.height,  // 高度
            htmlContent: `<div class="title">${id}</div><div class="content">
    <div class="info-only"><span class="content-key">高石: </span><span class="content-value">${id}  </span> </div>
    <div class="info-only"><span class="content-key">当前经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">当前深度: </span><span  class="content-value">${(minDepth/te).toFixed(4)} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">层位: </span><span class="content-value">${layer}  </span> </div>
    <div class="info-only"><span class="content-key">层数: </span><span class="content-value">${layerNum}  </span> </div>
    <div class="info-only"><span class="content-key">闭合幅度: </span><span  class="content-value">${closureAmp} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">圈闭面积: </span><span  class="content-value">${trapArea} </span><span class="content-unit">km^2</span> </div>
    <div class="info-only"><span class="content-key">高点海拔: </span><span  class="content-value">${highAlt} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">主控测线1: </span><span class="content-value">${mcmLine}  </span> </div>
    <div class="info-only"><span class="content-key">主控测线2: </span><span class="content-value">${mcmLine2}  </span> </div>
    <div class="info-only"><span class="content-key">可靠程度: </span><span class="content-value">${relLevel}  </span> </div>
        <div class="info-only"><span class="content-key">最大圈闭层位: </span><span class="content-value">${maxTl}  </span> </div>

    
</div>
`
          });
        })
        
        

          secondValidObject = pickedObject;  // 保存第二个有效对象
          
          break;  // 找到第二个有效对象后退出循环
        }
        if (Cesium.defined(pickedObject) && typeof pickedObject.id === 'string' && pickedObject.id !== '高石1' && pickedObject.id !== '高石3'&& pickedObject.id.startsWith('高石')&& pickedObject.id !== '高石2') {
          
          const id = String(pickedObject.id);
         
          let pickedPosition = pickedObject.primitive.geometryInstances.geometry.attributes.position.values
          ;
          //console.log(pickedPosition)
          const depths = [];
                for (let j = 0; j < pickedPosition.length; j += 3) {
                    const vertex = new Cesium.Cartesian3(
                        pickedPosition[j],
                        pickedPosition[j + 1],
                        pickedPosition[j + 2]
                    );
                    const distance = Cesium.Cartesian3.distance(vertex, cartesian);
                    depths.push(distance);
                }

                // 输出深度值
              
                
                // 找到最小深度
                const minDepth = Math.min(...depths);
                
          //console.log(pickedObject.primitive.geometryInstances.geometry._positions)

         
          huajie.clearm1()

          getList(layerUrl.gaoinfo, { trapName: id}).then(res => {
            console.log(res.result)
            const layer = res.result.layer !== undefined ? res.result.layer : '无';
const layerNum = res.result.layerNum !== undefined ? res.result.layerNum : '无';
const closureAmp = res.result.closureAmp !== undefined ? res.result.closureAmp : '无';
const trapArea = res.result.trapArea !== undefined ? res.result.trapArea : '无';
const highAlt = res.result.highAlt !== undefined ? res.result.highAlt : '无';
const mcmLine = res.result.mcmLine !== undefined ? res.result.mcmLine : '无';
const mcmLine2 = res.result.mcmLine2 !== undefined ? res.result.mcmLine2 : '无';
const relLevel = res.result.relLevel !== undefined ? res.result.relLevel : '无';
const maxTl = res.result.maxTl !== undefined ? res.result.maxTl : '无';


          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();

          // 创建弹出框，显示第二层的地层信息
          let popup = new CesiumPopupComponent(viewer, {
            longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
            latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
            height: cartographic.height,  // 高度
            htmlContent: `<div class="title">${id}</div><div class="content">
    <div class="info-only"><span class="content-key">ID: </span><span class="content-value">${id}  </span> </div>
    <div class="info-only"><span class="content-key">经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
    <div class="info-only"><span class="content-key">深度: </span><span  class="content-value">${(minDepth/te).toFixed(4)} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">层位: </span><span class="content-value">${layer}  </span> </div>
    <div class="info-only"><span class="content-key">层数: </span><span class="content-value">${layerNum}  </span> </div>
    <div class="info-only"><span class="content-key">闭合幅度: </span><span  class="content-value">${closureAmp} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">圈闭面积: </span><span  class="content-value">${trapArea} </span><span class="content-unit">km^2</span> </div>
    <div class="info-only"><span class="content-key">高点海拔: </span><span  class="content-value">${highAlt} </span><span class="content-unit">m</span> </div>
    <div class="info-only"><span class="content-key">主控测线1: </span><span class="content-value">${mcmLine}  </span> </div>
    <div class="info-only"><span class="content-key">主控测线2: </span><span class="content-value">${mcmLine2}  </span> </div>
    <div class="info-only"><span class="content-key">可靠程度: </span><span class="content-value">${relLevel}  </span> </div>
    <div class="info-only"><span class="content-key">最大圈闭层位: </span><span class="content-value">${maxTl}  </span> </div>

    
</div>
`
          });
        })
        
        

          secondValidObject = pickedObject;  // 保存第二个有效对象
          
          break;  // 找到第二个有效对象后退出循环
        }
        if (Cesium.defined(pickedObject) && 
        Cesium.defined(pickedObject.collection) && 
        Cesium.defined(pickedObject.collection.id) && 
        pickedObject.collection.id.startsWith('T')) {
          
          const id = String(pickedObject.collection.id);
          





          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          CesiumPopupComponent.clearAllPopups();
          getList(layerUrl.layerdepth, { layer: id, lon: Cesium.Math.toDegrees(cartographic.longitude), lat: Cesium.Math.toDegrees(cartographic.latitude) }).then(res => {
           



            // 创建弹出框，显示第二层的地层信息
            let popup = new CesiumPopupComponent(viewer, {
              longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
              latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
              height: cartographic.height,  // 高度
              htmlContent: `<div class="title">地层信息</div><div class="content">
<div class="info-only"><span class="content-key">地层号: </span><span class="content-value">${id}反射层  </span> </div>
<div class="info-only"><span class="content-key">当前经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span> </div>
<div class="info-only"><span class="content-key">当前纬度: </span><span  class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span><span class="content-unit">° </span> </div>
<div class="info-only"><span class="content-key">当前深度: </span><span  class="content-value">${res.result.deep} </span><span class="content-unit">m</span> </div>
</div>
`

            });
          })

          secondValidObject = pickedObject;  // 保存第二个有效对象
          break;  // 找到第二个有效对象后退出循环
        }
        if (Cesium.defined(pickedObject) && 
               Cesium.defined(pickedObject.id) && 
               Cesium.defined(pickedObject.id._id) && 
               pickedObject.id._id.startsWith("建议1井")){
             
                mapbus.$emit('changeMessage', false,pickedObject.id._id)
                setTimeout(() => {
                  mapbus.$emit('changeMessage', true,pickedObject.id._id,false)
                  mapbus.$emit('changeMessage1', false,'高石3号大构造')
                  
                }, 1000);



                secondValidObject = pickedObject;  // 保存第二个有效对象
                break;  // 找到第二个有效对
               }
               if (Cesium.defined(pickedObject) && 
               Cesium.defined(pickedObject.id) && 
               Cesium.defined(pickedObject.id._id) && 
               pickedObject.id._id.startsWith("建议2井")){
              
                mapbus.$emit('changeMessage', false,pickedObject.id._id,false)
                setTimeout(() => {
                  mapbus.$emit('changeMessage', true,pickedObject.id._id,true)
                  mapbus.$emit('changeMessage1', false,'高石3号大构造')
                  
                }, 1000);



                secondValidObject = pickedObject;  // 保存第二个有效对象
                break;  // 找到第二个有效对
               }

               if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && Cesium.defined(pickedObject.id._customDD) && pickedObject.id._customDD.name.startsWith("建议2井")) {

CesiumPopupComponent.clearAllPopups()

var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
let popup = new CesiumPopupComponent(viewer, {
  longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
  latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
  height: cartographic.height,  // 高度
  htmlContent: `<div class="title">建议2井信息</div><div class="content">
<div class="info-only"><span class="content-key">名称: </span><span class="content-value">建议2井 </span> </div>
<div class="info-only"><span class="content-key">纬度: </span><span class="content-value">${pickedObject.id._customDD.longDeg.toFixed(4)} </span> </div>
<div class="info-only"><span class="content-key">经度: </span><span  class="content-value">${pickedObject.id._customDD.latDeg.toFixed(4)} </span><span class="content-unit">° </span> </div>
<div class="info-only"><span class="content-key">层上方深度: </span><span  class="content-value">${pickedObject.id._customDD.topDepth} </span><span class="content-unit">m</span> </div>
<div class="info-only"><span class="content-key">层下方深度: </span><span  class="content-value">${pickedObject.id._customDD.bottomDepth} </span><span class="content-unit">m</span> </div>
<div class="info-only"><span class="content-key">地层名称: </span><span  class="content-value">${pickedObject.id._customDD.eqrLayer}</span><span  class="content-unit"> </span> </div>
<div class="info-only"><span class="content-key">地理名称: </span><span  class="content-value">${pickedObject.id._customDD.geologyLayer}</span><span  class="content-unit"> </span> </div>
<div class="info-only"><span class="content-key">结束时间: </span><span  class="content-value">${pickedObject.id._customDD.endTime}</span><span  class="content-unit"> </span> </div>
</div>
`

});
secondValidObject = pickedObject;  // 保存第二个有效对象
break;
               }  
               if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && Cesium.defined(pickedObject.id._customDD) && pickedObject.id._customDD.name.startsWith("建议1井")) {
             
                CesiumPopupComponent.clearAllPopups()
                
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                let popup = new CesiumPopupComponent(viewer, {
                  longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
                  latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
                  height: cartographic.height,  // 高度
                  htmlContent: `<div class="title">建议1井信息</div><div class="content">
                <div class="info-only"><span class="content-key">名称: </span><span class="content-value">建议2井 </span> </div>
                <div class="info-only"><span class="content-key">经度: </span><span class="content-value">${pickedObject.id._customDD.longDeg.toFixed(4)} </span> </div>
                <div class="info-only"><span class="content-key">纬度: </span><span  class="content-value">${pickedObject.id._customDD.latDeg.toFixed(4)} </span><span class="content-unit">° </span> </div>
                <div class="info-only"><span class="content-key">层上方深度: </span><span  class="content-value">${pickedObject.id._customDD.topDepth} </span><span class="content-unit">m</span> </div>
                <div class="info-only"><span class="content-key">层下方深度: </span><span  class="content-value">${pickedObject.id._customDD.bottomDepth} </span><span class="content-unit">m</span> </div>
                <div class="info-only"><span class="content-key">地层类别: </span><span  class="content-value">${pickedObject.id._customDD.systems}</span><span  class="content-unit"> </span> </div>
                <div class="info-only"><span class="content-key">警告: </span><span  class="content-value">${pickedObject.id._customDD.riskReservoirWarn}</span><span  class="content-unit"> </span> </div>
                <div class="info-only"><span class="content-key">统别: </span><span  class="content-value">${pickedObject.id._customDD.unified}</span><span  class="content-unit"> </span> </div>
                <div class="info-only"><span class="content-key">组别: </span><span  class="content-value">${pickedObject.id._customDD.groups}</span><span  class="content-unit"> </span> </div>

                
                <div class="info-only"><span class="content-key">岩性介绍: </span><span  class="content-value">${pickedObject.id._customDD.lith}</span><span  class="content-unit"> </span> </div>

                </div>
                `
                
                });
                secondValidObject = pickedObject;  // 保存第二个有效对象
                break;
                               } 
               if (Cesium.defined(pickedObject) && 
                               Cesium.defined(pickedObject.id) && 
                               Cesium.defined(pickedObject.id._id) && 
                               pickedObject.id._id.startsWith("T")) {
                        
                       
                        const id = String(pickedObject.id._id);
                       
                        
                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                        CesiumPopupComponent.clearAllPopups();
                        
                        getList(layerUrl.layerdepth, { layer: id, lon: Cesium.Math.toDegrees(cartographic.longitude), lat: Cesium.Math.toDegrees(cartographic.latitude) })
                            .then(res => {

                
                                // 创建弹出框，显示第二层的地层信息
                                let popup = new CesiumPopupComponent(viewer, {
                                    longitude: Cesium.Math.toDegrees(cartographic.longitude), // 经度
                                    latitude: Cesium.Math.toDegrees(cartographic.latitude),   // 纬度
                                    height: cartographic.height,  // 高度
                                    htmlContent: `<div class="title">地层信息</div><div class="content">
                                        <div class="info-only"><span class="content-key">地层号: </span><span class="content-value">${id}  </span></div>
                                        <div class="info-only"><span class="content-key">纬度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)} </span></div>
                                        <div class="info-only"><span class="content-key">经度: </span><span class="content-value">${Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)} </span><span class="content-unit">° </span></div>
                                        <div class="info-only"><span class="content-key">岩石种类: </span><span class="content-value">${res.result.lithology}</span></div>
                                        <div class="info-only"><span class="content-key">地层深度: </span><span class="content-value">${res.result.speed}</span><span class="content-unit">m </span></div>
                                        <div class="info-only"><span class="content-key">对应地质名称: </span><span class="content-value">${res.result.botAttr}</span></div>
                                        <div class="info-only"><span class="content-key">介绍: </span><span class="content-value">${res.result.fracture}</span></div>
                                    </div>`
                                });
                            });
                
                        secondValidObject = pickedObject;  // 保存第二个有效对象
                        break;  // 找到第二个有效对象后退出循环
                    }       
      }

      if (!secondValidObject) {
        
        CesiumPopupComponent.clearAllPopups();
        mapbus.$emit('changeMessage', false)
        mapbus.$emit('changeMessage1', false,'高石3号大构造')
      }

    } else {
      CesiumPopupComponent.clearAllPopups();
      mapbus.$emit('changeMessage', false)
      mapbus.$emit('changeMessage1', false,'高石3号大构造')  // 如果没有第二个图层，清除弹出框
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  return handler;
}
