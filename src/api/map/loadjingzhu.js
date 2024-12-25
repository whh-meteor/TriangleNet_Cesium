
let addedPrimitives = [];
let addedEntities = [];
let boundingSpheres = [];
let addedPrimitivesok = []
let addedpp =[]
// function loadingceng1(max, min, url) {
//   // Define the wall geometry
//   var wall = new Cesium.GeometryInstance({
//     geometry: new Cesium.WallGeometry({
//       positions: Cesium.Cartesian3.fromDegreesArray([

//         122.058578402002667,
//         34.08690339670266
//         ,

//         122.053684053632182,
//         34.056001697265167
//         ,

//         122.039480101440162,
//         34.028124871473409
//         ,

//         122.017356927231916,
//         34.006001697265162
//         ,

//         121.989480101440165,
//         33.991797745073143
//         ,

//         121.958578402002672,
//         33.986903396702658
//         ,

//         121.927676702565179,
//         33.991797745073143
//         ,

//         121.899799876773429,
//         34.006001697265162
//         ,

//         121.877676702565182,
//         34.028124871473409
//         ,

//         121.863472750373163,
//         34.056001697265167
//         ,

//         121.858578402002678,
//         34.08690339670266
//         ,

//         121.863472750373163,
//         34.117805096140152
//         ,

//         121.877676702565182,
//         34.14568192193191
//         ,

//         121.899799876773429,
//         34.167805096140157
//         ,

//         121.927676702565179,
//         34.182009048332176
//         ,

//         121.958578402002672,
//         34.186903396702661
//         ,

//         121.989480101440165,
//         34.182009048332176
//         ,

//         122.017356927231916,
//         34.167805096140157
//         ,

//         122.039480101440162,
//         34.14568192193191
//         ,

//         122.053684053632182,
//         34.117805096140152
//         ,

//         122.058578402002667,
//         34.08690339670266

//       ]),
//       maximumHeights: max,
//       minimumHeights: min,

//     }),
//     material: Cesium.Color.fromRandom({ alpha: 0.7 }),
//   });

//   // Define the appearance with texture
//   var wallAppearance = new Cesium.MaterialAppearance({
//     material: Cesium.Material.fromType('Image', {
//       //color: Cesium.Color.WHITE.withAlpha(0.9),
//       image: url,
//       repeat: new Cesium.Cartesian2(1, 2),

//     }),
//     translucent: false  // Set to true if you want the texture to be translucent
//   });

//   // Create and add the primitive to the viewer
//   var addWallGeometry = new Cesium.Primitive({
//     geometryInstances: wall,
//     appearance: wallAppearance,
//     asynchronous: true  // Set to true if loading textures asynchronously
//   });

//   let wall_1 = window.viewer.scene.primitives.add(addWallGeometry);
//   addedPrimitives.push(wall_1)
// };

function loadingzhu(x, y, radi, max, min, img, custom,factor) {
  // 定义中心点的经纬度
  var centerLongitude = x;
  var centerLatitude = y;
  var radius = radi; // 半径为100米

  // 生成一个圆形的顶点坐标
  var positions = [];
  for (var i = 0; i <= 360; i += 10) { // 每隔10度生成一个点
    var radians = Cesium.Math.toRadians(i);
    var offsetX = radius * Math.cos(radians);
    var offsetY = radius * Math.sin(radians);
    var newLongitude = centerLongitude + (offsetX / 111319.9); // 1度大约等于111319.9米
    var newLatitude = centerLatitude + (offsetY / 111319.9);
    positions.push(newLongitude, newLatitude);
  }

  // 定义墙几何
  var wallGeometry = new Cesium.WallGeometry({
    positions: Cesium.Cartesian3.fromDegreesArray(positions),
    maximumHeights: Array(positions.length / 2).fill(max*factor),  // 最大高度
    minimumHeights: Array(positions.length / 2).fill(min*factor),   // 最小高度
  });

  // 定义外观与纹理
  var wallAppearance = new Cesium.MaterialAppearance({
    material: Cesium.Material.fromType('Image', {
      image: img,
      repeat: new Cesium.Cartesian2(2, 10),
    }),
    translucent: false  // 纹理是否半透明
  });

  // 创建并添加Primitive到viewer
  var wallPrimitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: wallGeometry,
      id: custom
    }),
    appearance: wallAppearance,
    asynchronous: true  // 异步加载纹理
  });

  let walls = window.viewer.scene.primitives.add(wallPrimitive);
  addedPrimitives.push(walls);

  // 计算当前柱子的包围球，并添加到数组中
  var centerCartesian = Cesium.Cartesian3.fromDegrees(centerLongitude, centerLatitude);
  var boundingSphere = new Cesium.BoundingSphere(centerCartesian, 100000 / 2);
  boundingSpheres.push(boundingSphere);
}
function loadingzhu1(x, y, radi, max, min, img, custom,factor) {
  // 定义中心点的经纬度
  var centerLongitude = x;
  var centerLatitude = y;
  var radius = radi; // 半径为100米

  // 生成一个圆形的顶点坐标
  var positions = [];
  for (var i = 0; i <= 360; i += 10) { // 每隔10度生成一个点
    var radians = Cesium.Math.toRadians(i);
    var offsetX = radius * Math.cos(radians);
    var offsetY = radius * Math.sin(radians);
    var newLongitude = centerLongitude + (offsetX / 111319.9); // 1度大约等于111319.9米
    var newLatitude = centerLatitude + (offsetY / 111319.9);
    positions.push(newLongitude, newLatitude);
  }

  // 定义墙几何
  var wallGeometry = new Cesium.WallGeometry({
    positions: Cesium.Cartesian3.fromDegreesArray(positions),
    maximumHeights: Array(positions.length / 2).fill(max*factor),  // 最大高度
    minimumHeights: Array(positions.length / 2).fill(min*factor),   // 最小高度
  });

  // 定义外观与纹理
  var wallAppearance = new Cesium.MaterialAppearance({
    material: new Cesium.Material({
        fabric: {
            type: 'Color',
            uniforms: {
                color: new Cesium.Color(0, 1, 0, 0.5) // RGBA: 半透明绿色
            }
        }
    }),
    translucent: true // 确保材质半透明
});

  // 创建并添加Primitive到viewer
  var wallPrimitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: wallGeometry,
      id: custom
    }),
    appearance: wallAppearance,
    asynchronous: true  // 异步加载纹理
  });

  let walls = window.viewer.scene.primitives.add(wallPrimitive);
  addedPrimitivesok.push(walls);}
  function loadingzhu2(x, y, radi, max, min, factor) {
    // 定义中心点的经纬度
    var centerLongitude = x;
    var centerLatitude = y;
    var radius = radi; // 半径为100米
  
    // 生成一个圆形的顶点坐标
    var positions = [];
    for (var i = 0; i <= 360; i += 10) { // 每隔10度生成一个点
      var radians = Cesium.Math.toRadians(i);
      var offsetX = radius * Math.cos(radians);
      var offsetY = radius * Math.sin(radians);
      var newLongitude = centerLongitude + (offsetX / 111319.9); // 1度大约等于111319.9米
      var newLatitude = centerLatitude + (offsetY / 111319.9);
      positions.push(newLongitude, newLatitude);
    }
  
    // 定义墙几何
    var wallGeometry = new Cesium.WallGeometry({
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      maximumHeights: Array(positions.length / 2).fill(max*factor),  // 最大高度
      minimumHeights: Array(positions.length / 2).fill(min*factor),   // 最小高度
    });
  
    // 定义外观与纹理
    var wallAppearance = new Cesium.MaterialAppearance({
      material: new Cesium.Material({
          fabric: {
              type: 'Color',
              uniforms: {
                color: new Cesium.Color(1, 1, 0, 1)
                // RGBA: 半透明绿色
              }
          }
      }),
      translucent: true // 确保材质半透明
  });
  
    // 创建并添加Primitive到viewer
    var wallPrimitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: wallGeometry,
        
      }),
      appearance: wallAppearance,
      asynchronous: true  // 异步加载纹理
    });
  
    let walls = window.viewer.scene.primitives.add(wallPrimitive);
    addedpp.push(walls);}
// 加载完所有柱子后，调整摄像机视角
function flyToView(degree ,factor) {
  if (boundingSpheres.length > 0) {
    // 计算所有包围球的联合包围球
    var totalBoundingSphere = Cesium.BoundingSphere.fromBoundingSpheres(boundingSpheres);
    // 飞到联合包围球
    window.viewer.camera.flyToBoundingSphere(totalBoundingSphere, {
      duration: 3, // 飞行时间（秒）
      offset: new Cesium.HeadingPitchRange(
        0, 
        Cesium.Math.toRadians(degree), 
        totalBoundingSphere.radius*factor // 增加range值，拉远视角
      )
    });
    boundingSpheres =[]
  }
}

function cylinder(longitude,latitude,height,length,material,id,idinfo){
  var centerCartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude);

  const cylinder = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),

    cylinder: {

      length: length,  // 圆柱的高度
      topRadius: 2500.0,  // 圆柱顶部的半径，可以根据需要调整
      bottomRadius: 2500.0,  // 圆柱底部的半径，可以根据需要调整
      material: material,
      // 圆柱的材质和颜色
    },
    customDD: idinfo
  });
  var centerCartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude);
  var boundingSphere = new Cesium.BoundingSphere(centerCartesian, 100000 / 2);
  boundingSpheres.push(boundingSphere);
  addedEntities.push({entities:cylinder,id:id})

}


function scale(long,lat,maxMinValue, factor,id){
  
    



 


    // 记录当前的 max，作为下一个对象的 min 使

const numTicks = 10; // Number of intervals for the scale
const tickInterval = maxMinValue*factor / numTicks;
const tickLength = maxMinValue*factor; // Length of each tick mark

for (let j = 0; j <= numTicks; j++) {
const tickPositionHeight = 0 - j * tickInterval
const tickPosition = Cesium.Cartesian3.fromDegrees(long, lat, tickPositionHeight);
const scale = viewer.entities.add({
position: tickPosition,
polyline: {
positions: [
Cesium.Cartesian3.fromDegrees(long, lat, tickPositionHeight ),
Cesium.Cartesian3.fromDegrees(long, lat, 0)
],
width: 2,
material: Cesium.Color.YELLOW
}
});
addedEntities.push({entities:scale,id:id})


// Add label for each tick mark
const scalelabel = viewer.entities.add({
position: tickPosition,
label: {
text: `深度: ${(0 + j * maxMinValue / numTicks).toFixed(2)}`,
font: '12px Arial',
fillColor: Cesium.Color.WHITE,
verticalOrigin: Cesium.VerticalOrigin.CENTER,
horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
pixelOffset: new Cesium.Cartesian2(30, 0),
scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.5)
}
});
addedEntities.push({entities:scalelabel,id:id})
}
}




function loadLabels(url, style, coo) {
  fetch(url)
    .then(response => response.json())
    .then(geojson => {
      geojson.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const label = feature.properties.Station_ID;
        const position = Cesium.Cartesian3.fromDegrees(...coordinates);

        // 添加标签实体
        const labelEntity1 = window.viewer.entities.add({
          position: position,
          point: {
            pixelSize: 30,
            color: Cesium.Color.GRAY,
            clampToGround: false
          },
          label: {
            text: label,
            font: style,
            fillColor: coo,
            style: Cesium.LabelStyle.FILL,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0.0),
            showBackground: true,
            eyeOffset: new Cesium.Cartesian3(0, 0, -10000),
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 1.5e7, 0.1),
          }
        });

        addedEntities.push(labelEntity1);
        // 保存对labelEntity的引用
      });
    })
    .catch(error => {
      console.error('Failed to load GeoJSON:', error);
    });
};


function clearwall(id) {
  addedPrimitives.forEach(primitive => {
    window.viewer.scene.primitives.remove(primitive);
  });
  

  addedEntities.forEach(entity => {
    
    if (entity.id === id ) {



    window.viewer.entities.remove(entity.entities);}

  });
 
}
function clearok() {
  addedPrimitivesok.forEach(primitive => {
    window.viewer.scene.primitives.remove(primitive);
  });}


  function clearpp() {
    addedpp.forEach(primitive => {
      window.viewer.scene.primitives.remove(primitive);
    });

  
 
}
export default {
  //loadingceng1,
  loadingzhu,
  loadLabels,
  flyToView,
  scale,
  cylinder,
  loadingzhu1,
  clearok,
  clearpp,
  loadingzhu2,


  clearwall

}