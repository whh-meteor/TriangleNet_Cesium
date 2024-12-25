import Fault from '@/api/map/lfault.js'

function loadsun(high) {
  for (let i = 1; i <= 38; i++) {
    if (i === 2) {
      continue; // 跳过 fault2
    }
    Fault.loadf(
      `/json/fault/fault${i}/fault${i}.geojson`,
      `/json/fault/fault${i}/tri_${i}.geojson`,
      Cesium.Color.RED.withAlpha(0.99),
      `F${i}`,
      high
    );
  }


}

function clear() {
  Fault.clearfault()
}


export default {
  loadsun,
  clear

}