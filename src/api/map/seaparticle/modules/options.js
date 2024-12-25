const defaultFields = {
  U: 'U',
  V: 'V',
  W: '',
  H: 'dem',
  lon: 'lon',
  lat: 'lat',
  lev: '',
  tem: 'tem',
  dem: 'dem',
  hs: 'hs',
  dirm: 'dirm'
}

const defaultColorTable = [[[1.0, 1.0, 1.0]]]

const defaultParticleSystemOptions = {
  // maxParticles: 64 * 64,
  // particleHeight: 1000.0,
  // fadeOpacity: 0.996,
  // dropRate: 0.003,
  // dropRateBump: 0.01,
  // speedFactor: 1.0,
  // lineWidth: 4.0,
  // dynamic: true
  maxParticles: 50000, // 最大粒子数(会自动取平方数)
  particleHeight: 1000.0, // 粒子高度
  fadeOpacity: 0.996, // 拖尾透明度
  dropRate: 0.003, // 粒子重置率
  dropRateBump: 0.01, // 随速度增加的粒子重置率百分比，速度越快越密集，
  // 最终的粒子重置率particleDropRate = dropRate + dropRateBump * speedNorm;
  speedFactor: 2.0, // 粒子速度
  lineWidth: 1, // 线宽
  dynamic: true // 是否动态运行
}

export { defaultFields, defaultColorTable, defaultParticleSystemOptions }
