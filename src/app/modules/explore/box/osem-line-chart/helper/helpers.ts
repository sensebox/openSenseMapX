
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