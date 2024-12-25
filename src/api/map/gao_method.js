import load from '@/api/map/gaoo'

 function loadgao(high,op){

    for (let i = 1; i < 6; i++) {
        load.loadaotao1(
        `/json/圈闭/高石${i}/高石${i}.geojson`,
          `/json/圈闭/高石${i}/高石${i}_tri.geojson`,
          "高石",
          Cesium.Color.fromBytes(193, 8, 3),
          `高石${i}`,
          high,
          `/json/圈闭/高石${i}/Name_高石${i}.geojson`,op
    )
        
    }
for (let i = 6; i< 18; i++){
    load.loadaotao1(
        `/json/圈闭/高石${i}/高石${i}.geojson`,
          `/json/圈闭/高石${i}/高石${i}_tri.geojson`,
          "高石",
          Cesium.Color.fromBytes(252, 18, 12),
          `高石${i}`,
          high,
          `/json/圈闭/高石${i}/Name_高石${i}.geojson`,op)

}
for (let i = 19; i< 26; i++){
    load.loadaotao1(
        `/json/圈闭/kangkang.geojson`,
          `/json/圈闭/高石${i}/高石${i}_tri.geojson`,
          "圈闭",
          Cesium.Color.fromBytes(253, 97, 93),
          `高石${i}`,
          high,
          `/json/圈闭/高石${i}/Name_高石${i}.geojson`,op)

}
   
    

}
 function clear(){
    for(let i = 1; i <26;i++){
    load.clearyuanyan1(`高石${i}`)}

}
 export default {
    loadgao,
    clear
 }