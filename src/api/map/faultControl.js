import lFault from '@/api/map/lfault.js'

// faultControl.js

export function duan3(isChecked, extra_control, terrainPercentage) {
  lFault.clearfault('断层3');
  if (isChecked) {
    extra_control[0].duan3 = isChecked;
    lFault.loadf(
      `/json/fault/fault3/fault3.geojson`,
      `/json/fault/fault3/tri_3.geojson`,
      Cesium.Color.ORANGE.withAlpha(0.99),
      `断层3`,
      terrainPercentage
    );
  } else {
    lFault.clearfault('断层3');
    CesiumPopupComponent.clearAllPopups();
    extra_control[0].duan2 = false;
  }
}
