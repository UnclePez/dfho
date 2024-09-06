

var groups = {
    'allGroups': [categoriesData[0], categoriesData[1], categoriesData[2], categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[7]],
    'containerGroup': [categoriesData[0], categoriesData[1]],
    'extractGroup': [categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[7]]
}

function setupGroupControl (groups) {

    Object.keys(groups).forEach((groupName) => {
        const checkbox = document.getElementById(groupName);

        checkbox.addEventListener('change', function() {
            if (this.checked) { 
                document.getElementById('allGroups').checked = true;

                if (groupName === 'allGroups') {
                    Object.keys(groups).forEach((groupName) => {
                        document.getElementById(groupName).checked = true;
                    });
                }

                groups[groupName].forEach (({ checkboxId, layerName }) => { 
                    categoryLayers[layerName].addTo(map);
                    document.getElementById(checkboxId).checked = true;
                });
            } else {

                if (groupName === 'allGroups') {
                    Object.keys(groups).forEach((groupName) => {
                        document.getElementById(groupName).checked = false;
                    });
                }

                var allGroupsClosed = true;
                Object.keys(groups).forEach((groupName) => {
                    if(document.getElementById(groupName).checked === true &&  groupName != 'allGroups') {
                        allGroupsClosed = false;
                    }
                });
                
                if (allGroupsClosed === true) {
                    document.getElementById('allGroups').checked = false;
                }

                groups[groupName].forEach (({ checkboxId, layerName }) => {  
                    map.removeLayer(categoryLayers[layerName]);
                    document.getElementById(checkboxId).checked = false;
                });
            }
        });
    });
}

function setupLayerControl(categories) {

    categories.forEach(({ checkboxId, layerName }) => {
        const checkbox = document.getElementById(checkboxId);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                categoryLayers[layerName].addTo(map);

                for (const groupKey in groups) {
                    if (groups.hasOwnProperty(groupKey)) {
                        groups[groupKey].forEach(({layerName: name}) => {
                            if (layerName === name) {
                                document.getElementById(groupKey).checked = true; 
                            }
                        });
                    }
                }
                
            } else { 
                map.removeLayer(categoryLayers[layerName]); 

                for (const groupKey in groups) {
                    if (groups.hasOwnProperty(groupKey)) { 
                        groups[groupKey].forEach(({layerName: name}) => {
                            if (layerName === name) { 
                                
                                var allCategoriesClosed = true;
                                groups[groupKey].forEach(({ checkboxId: id, layerName: name }) => { 
                                    if (document.getElementById(id).checked === true) { 
                                        allCategoriesClosed = false; 
                                    }
                                });

                                if (allCategoriesClosed === true) {
                                    document.getElementById(groupKey).checked = false;
                                }
                            }
                        });
                    }
                }
            }
        });
    });
}

function initializeLayerControls(controlMappings) {
    controlMappings.forEach(({ checkboxId, layerName }) => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox.checked) {
            categoryLayers[layerName].addTo(map);
        } else {
            map.removeLayer(categoryLayers[layerName]);
        }
    });
}

function toggleMapDropdown() {
    document.getElementById("mapDropdown").classList.toggle("show")
}

window.onclick = function(event) {
    if (!event.target.matches('.map-drop-btn')) {
    var mapDropdowns = document.getElementsByClassName("map-dropdown-content");
    var i;
    for (i = 0; i < mapDropdowns.length; i++) {
        var openMapDropdown = mapDropdowns[i];
        if (openMapDropdown.classList.contains('show')) {
            openMapDropdown.classList.remove('show');
        }
    }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const bottomToolbar = document.getElementById('leftToolbar');
    const openToolbarBtn = document.getElementById('openLeftToolbarBtn');
    openToolbarBtn.addEventListener('click', () => {
        bottomToolbar.classList.toggle('collapsed');
    });

    setupLayerControl(categoriesData);
    
    setupGroupControl(groups);

    initializeLayerControls(categoriesData);

});

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -3,
    maxZoom: 2,
    zoomDelta: 0.5,
    zoomSnap: 0.5,
    doubleClickZoom: false,
    wheelPxPerZoomLevel: 200,
    zoomAnimation: false,
    attributionControl: false,
    zoomControl: false
});
var bounds = [[0,0], [4800, 4800]];
var image = L.imageOverlay('../images/layaliGroveHD.webp', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(-2);

var locationLabelLayers = [];

function createLocationNames() {
    locationsData.forEach(function(location) {
        var adjustedCoordinates = [bounds[1][0] - location.coordinates[1], location.coordinates[0]];

        var label = L.marker(adjustedCoordinates, {
            icon: L.divIcon({
                className: 'location-label',
                html: location.text,
                iconSize: [150, 40],
                iconAnchor: [75, 20],
            }),
            zoomLevel: location.zoomLevel
        });

        label.addTo(map);
        locationLabelLayers.push(label);
    });
}

createLocationNames();   

function createIcon(size, iconUrl) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        tooltipAnchor: [size / 2, 1],
        popupAnchor: [0, (-size / 2)]
    });
}

var categoryLayers = {
    'Safe': L.layerGroup().addTo(map),
    'Hacker Computer': L.layerGroup().addTo(map),
    'Saeed': L.layerGroup().addTo(map), 
    'Paid Extract': L.layerGroup().addTo(map),
    'Industrial Elevator': L.layerGroup().addTo(map), 
    'Random Extract': L.layerGroup().addTo(map), 
    'Conditional Extract': L.layerGroup().addTo(map), 
    'Normal Extract': L.layerGroup().addTo(map),
};

var markers = [];
globalIconSize = 32;

function createMarkers() {
    markersData.forEach(function(markerData) {
        var adjustedcoordinates = [bounds[1][0] - markerData.coordinates[1], markerData.coordinates[0]];

        var marker = L.marker(adjustedcoordinates, {
            icon: createIcon(globalIconSize, markerData.iconUrl),
            zIndexOffset: 1000
        }).addTo(map);

        var category = markerData.category || 'Default';
        if (categoryLayers[category]) {
            categoryLayers[category].addLayer(marker);
        } else {
            console.warn(`Category "${category}" not found.`);
        }
        
        function createTooltipHtml(markerData) {
            const iconSize = '18px';
            const iconHtml = {
                up: `<img src="../images/icons/white-up-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`,
                down: `<img src="../images/icons/white-down-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`,
                locked: `<img src="../images/icons/white-locked-point-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`
            };
        
            let iconsHtml = '';
            
            if (markerData.height === 'up') {iconsHtml += iconHtml.up;} else if (markerData.height === 'down') {iconsHtml += iconHtml.down;}
        
            if (markerData.locked) {iconsHtml += iconHtml.locked;}

            return `
                <div style="display: flex; align-items: center;">
                    ${iconsHtml}
                    <span style="margin-left: 4px;">${markerData.tooltipText}</span>
                </div>
            `;
        }
        const tooltipHtml = createTooltipHtml(markerData);

        marker.bindTooltip(tooltipHtml, {direction: 'right'});

        marker.bindPopup(markerData.popupText, {autoPan: false, closeButton: false});

        markers.push(marker);

        marker.on('mouseover', function() {
            var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] * 1.3), marker.options.icon.options.iconUrl);
            marker.setIcon(newIcon);
            marker.openTooltip();
        });

        marker.on('mouseout', function() {
            var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] / 1.3), marker.options.icon.options.iconUrl);
            marker.setIcon(newIcon);
        });
    });
}

createMarkers();

function updateLabelVisibility() {
    var currentZoom = map.getZoom();
    locationLabelLayers.forEach(function(label) {
        if (currentZoom >= label.options.zoomLevel) {
            map.addLayer(label);
        } else {
            map.removeLayer(label);
        }
    });
}

function updateMarkerSize() {
    var zoom = map.getZoom() - 2;
    var newSize = Math.max(globalIconSize / 2, globalIconSize * Math.pow(2, zoom - map.getMinZoom()));
    
    markers.forEach(function(marker) {
        var iconUrl = marker.options.icon.options.iconUrl;
        var newIcon = createIcon(newSize, iconUrl);
        if (map.getZoom() <= 0) {
            marker.setIcon(newIcon);
        }
    });
}

function onZoomChange() {
    updateMarkerSize();
    updateLabelVisibility();
}

map.on('zoomend', onZoomChange);
onZoomChange();
