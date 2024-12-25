let addedEntities =[]
function loadGeoJson(url,id) {
    fetch(url)
      .then(response => response.json())
      .then(geojson => {
        geojson.features.forEach(feature => {
          const coordinates = feature.geometry.coordinates;
  
          // 将经纬度坐标转换为 Cesium 世界坐标
          const position = Cesium.Cartesian3.fromDegrees(...coordinates);
  
          // 添加一个红色的点实体到 Cesium 的实体集合中
          const labelEntity = window.viewer.entities.add({
            position: position,
            point: {
              pixelSize: 7,
              color: Cesium.Color.RED,
              clampToGround: true
            },
          });
          addedEntities.push({Entity:labelEntity,id:id})
  
          // 如果需要，可以保存对 labelEntity 的引用以便后续操作
        });
      })
      .catch(error => {
        console.error('Failed to load GeoJSON:', error);
      });
  }

  function clear (id){
    addedEntities.forEach(item=>{
        if(item.id===id){
            window.viewer.entities.remove(item.Entity)

        }}
    )
  }

  export default{
    loadGeoJson,
    clear
  }