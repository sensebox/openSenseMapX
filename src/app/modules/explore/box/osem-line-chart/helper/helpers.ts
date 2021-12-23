
export function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });

}

export function extractDateSteps(dateRange) {
    let steps = [];
    let step = 3600000;
    let currentDate = dateRange[0];
    while (currentDate <= dateRange[1]){
        steps.push(currentDate);
        currentDate = new Date(currentDate.getTime() +  step);
    }
    return steps;
    // const steps =
}


export function setLayerSource (layerId, source, sourceLayer, map) {
    const oldLayers = map.getStyle().layers;
    const layerIndex = oldLayers.findIndex(l => l.id === layerId);
    const layerDef = oldLayers[layerIndex];
    const before = oldLayers[layerIndex + 1] && oldLayers[layerIndex + 1].id;
    layerDef.source = source;
    if (sourceLayer) {
        layerDef['source-layer'] = sourceLayer;
    }
    map.removeLayer(layerId);
    map.addLayer(layerDef, before);
}

export function positionPopup(pixelPosition){

    if((window.innerWidth - pixelPosition.x) < 300) {
        document.getElementById("osem-popup").style.right = (window.innerWidth -( pixelPosition.x-10)) + 'px';
        document.getElementById("osem-popup").style.left = '';
    } else {
        document.getElementById("osem-popup").style.left = (pixelPosition.x+10) + 'px';
        document.getElementById("osem-popup").style.right = '';
    }

    if((window.innerHeight - pixelPosition.y) < 350) {
        document.getElementById("osem-popup").style.bottom = (window.innerHeight - pixelPosition.y) + 'px';
        document.getElementById("osem-popup").style.top = '';
    } else {
        document.getElementById("osem-popup").style.top = (pixelPosition.y) + 'px';
        document.getElementById("osem-popup").style.bottom = '';
    }
    // document.getElementById("osem-popup").style.top = pixelPosition.y + 'px';

}


export function applyFilters(data, filter){

    return data.filter(dataItem => {
        if(
            (filter.exposure === 'all' || filter.exposure === dataItem.exposure) &&
            (filter.model === null || filter.model === dataItem.model) &&
            (filter.group === null || filter.group === dataItem.group)
        ){
            return dataItem;
        }
    })
}

export function processBoxData(data){
    console.log('data',data);
    let boxes = [];
    let sensors = [];
    data.forEach(box => {
        box.sensors.forEach(sensor => {
            sensors.push({
                ...sensor,
                boxes_id: box._id,
                boxes_name: box.name
            });
        })
        boxes.push({
            ...box,
            sensors: box.sensors.map(sensor => sensor._id)
        })
    })
    // console.log('BOXES', boxes);
    // console.log('SENSORS', sensors);
    return [boxes, sensors];
}

// round coordinates to 5 decimal places (1m), TODO: move this to backend?
export function roundCoordinates(coordinates){
    coordinates = [Math.round((coordinates[0] + Number.EPSILON) * 100000) / 100000, Math.round((coordinates[1] + Number.EPSILON) * 10000) / 10000]
    // console.log(coordinates)
    return coordinates;
}


export function toGeoJson(data) {

    let geojson = data.map(item => {
    //   if (item.lat && item.lon) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: roundCoordinates([item.lon, item.lat]),
            // coordinates: item.currentLocation.coordinates,
          },
          properties: {
            // name: item.name,
            _id: item._id,
            exposure: item.exposure,
            createdAt: item.createdAt,
            state: item.state,
            name: item.name,
            sensors: item.sensors,
            values: item.values ? item.values : null,
            live: item.live ? item.live : null
          }
        }
    //   }
    });

    geojson = {
      type: 'FeatureCollection',
      features: geojson
    };
    return geojson;
  }

