function fly(name){
  if(name==='建议1井'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.066311223305618, 34.393914915868123-0.3, 0),
      duration: 1,  // Animation duration, in seconds
    orientation: {
      heading: Cesium.Math.toRadians(0),  // Horizontal direction (heading)
      pitch: Cesium.Math.toRadians(-10),  // Small downward angle to simulate pulling the view back
      roll: 0  // No roll (flat orientation)
    },
    })

  }
  else if(name==='建议2井'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.016347505882351, 34.337675976470592-0.3, 0),
      duration: 1,  // Animation duration, in seconds
    orientation: {
      heading: Cesium.Math.toRadians(0),  // Horizontal direction (heading)
      pitch: Cesium.Math.toRadians(-10),  // Small downward angle to simulate pulling the view back
      roll: 0  // No roll (flat orientation)
    },
    })

  }
  else if(name === '高石1'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.527396, 34.127911, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石2'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.77, 34.3, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石3'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.081487, 34.398328, 60000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石4'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.1058, 34.2765, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石5'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.153, 34.18156, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石6'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.05, 34.1255, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石7'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.51, 34.0708, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石8'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.79, 34.068668, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石9'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.741, 34.0567, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石10'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.076705, 34.090311, 40000),
      duration: 1,  // Animation duration,

    })

  }

  else if(name === '高石11'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.93, 34.21, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石12'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.361, 34.05, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石13'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.6387, 34.288, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石14'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.8698, 34.1648, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石15'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.961, 34.4297, 40000),
      duration: 1,  // Animation duration,

    })

  }
  else if(name === '高石16'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(122.369, 34.25657, 40000),
      duration: 1,  // Animation duration,

    })

  }















}




function flywell(name){
  if(name==='建议1井'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.066311223305618, 34.393914915868123, 10000),
    })

  }
  if(name==='建议2井'){
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(123.016347505882351, 34.337675976470592, 10000),
    })

  }

}

export {
    fly,
    flywell
}