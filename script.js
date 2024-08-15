

var groups = {
    'allGroups': [categoriesData[0], categoriesData[1], categoriesData[2], categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[7]],
    'containerGroup': [categoriesData[0], categoriesData[1]],
    'extractGroup': [categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[7]]
}

// Group toggle functionality
function setupGroupControl (groups) {

    Object.keys(groups).forEach((groupName) => {
        const checkbox = document.getElementById(groupName);
        // If the checkbox state is changed
        checkbox.addEventListener('change', function() {
            if (this.checked) { // if switched on
                document.getElementById('allGroups').checked = true; // switch on allGroups toggle when any group is on

                if (groupName === 'allGroups') {
                    Object.keys(groups).forEach((groupName) => {
                        document.getElementById(groupName).checked = true;
                        dashedLineLayer.addTo(map);
                    });
                }

                if (groupName === 'extractGroup') {
                    dashedLineLayer.addTo(map);
                }

                groups[groupName].forEach (({ checkboxId, layerName }) => {  //for each category
                    categoryLayers[layerName].addTo(map);
                    document.getElementById(checkboxId).checked = true;
                });
            } else { // if switched off

                if (groupName === 'allGroups') {
                    Object.keys(groups).forEach((groupName) => {
                        document.getElementById(groupName).checked = false;
                        map.removeLayer(dashedLineLayer);
                    });
                }

                if (groupName === 'extractGroup') {
                    map.removeLayer(dashedLineLayer);
                }

                // Check every group. If all group checkboxes are closed, close the allGroups checkbox
                var allGroupsClosed = true;
                Object.keys(groups).forEach((groupName) => {
                    if(document.getElementById(groupName).checked === true &&  groupName != 'allGroups') {
                        allGroupsClosed = false;
                    }
                });

                // If after iterating through each group there wasn't one open, close the allGroups checkbox
                if (allGroupsClosed === true) {
                    document.getElementById('allGroups').checked = false;
                }

                groups[groupName].forEach (({ checkboxId, layerName }) => {  //for each category
                    map.removeLayer(categoryLayers[layerName]);
                    document.getElementById(checkboxId).checked = false;
                });
            }
        });
    });
}

// Function for setting up toggle checkbox functionality
function setupLayerControl(categories) {

    categories.forEach(({ checkboxId, layerName }) => {
        const checkbox = document.getElementById(checkboxId);

        // Whenever this category checkbox changes, toggle the markers related to the checkbox.
        checkbox.addEventListener('change', function() {
            if (this.checked) { // if switched on
                categoryLayers[layerName].addTo(map); // Turn on markers connected to checkbox (layerName = category)

                if (layerName === 'Industrial Elevator') {
                    dashedLineLayer.addTo(map);
                }

                // Iterate over the keys of the groups object
                for (const groupKey in groups) {
                    if (groups.hasOwnProperty(groupKey)) { // Check if the property belongs to the object itself
                        groups[groupKey].forEach(({layerName: name}) => {
                            if (layerName === name) { // If this category belongs in current group, switch on current group checkbox
                                document.getElementById(groupKey).checked = true; // Turn on current group checkbox
                            }
                        });
                    }
                }
                
            } else { // if switched off
                map.removeLayer(categoryLayers[layerName]); // Turn off markers

                if (layerName === 'Industrial Elevator') {
                    map.removeLayer(dashedLineLayer);
                }

                // Iterate over the keys of the groups object
                for (const groupKey in groups) {
                    if (groups.hasOwnProperty(groupKey)) { // Check if the property belongs to the object itself
                        groups[groupKey].forEach(({layerName: name}) => {
                            if (layerName === name) { // If this category belongs in current group
                                
                                // Check every other category in this group. If all other checkboxes are closed, close the group checkbox
                                var allCategoriesClosed = true;
                                groups[groupKey].forEach(({ checkboxId: id, layerName: name }) => { // Iterate through all group items
                                    if (document.getElementById(id).checked === true) { // If current item's checkbox is open
                                        allCategoriesClosed = false; // Set variable
                                    }
                                });

                                // If after iterating through each item in the group there wasn't one open, close the group checkbox
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

// Updates marker visibility based on checkbox state when loading the page. Fixes issue where markers would be visible but checkboxes were off.
function initializeLayerControls(controlMappings) {
    controlMappings.forEach(({ checkboxId, layerName }) => {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox.checked) {
            categoryLayers[layerName].addTo(map);

            if (layerName === 'Industrial Elevator') {
                dashedLineLayer.addTo(map);
            }
        } else {
            map.removeLayer(categoryLayers[layerName]);

            if (layerName === 'Industrial Elevator') {
                map.removeLayer(dashedLineLayer);
            }
        }
    });
}

// BOTTOM TOOLBAR  ---------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // Handle toggling bottom toolbar with button
    const bottomToolbar = document.getElementById('bottom-toolbar');
    const openToolbarBtn = document.getElementById('openToolbarBtn');
    openToolbarBtn.addEventListener('click', () => {
        bottomToolbar.classList.toggle('collapsed');
    });

    // Setup layer controls
    setupLayerControl(categoriesData);
    
    setupGroupControl(groups);

    // Initialize layer visibility
    initializeLayerControls(categoriesData);

});

// MAP SETUP --------------------------------------------------
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
var bounds = [[0,0], [4302, 7648]];
var image = L.imageOverlay('images/zero-dam-map.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(-2);

// CREATE LOCATION NAMES -----------------------------------------
var locationLabelLayers = [];

function createLocationNames() {
    locationsData.forEach(function(location) {
        var adjustedCoordinates = [bounds[1][0] - location.coordinates[1], location.coordinates[0]];

        var label = L.marker(adjustedCoordinates, {
            icon: L.divIcon({
                className: 'location-label',
                html: location.text,
                iconSize: [150, 40], // Adjust size as needed
                iconAnchor: [75, 20], // Center the text
            }),
            zoomLevel: location.zoomLevel
        });

        label.addTo(map);
        locationLabelLayers.push(label);
    });
}

createLocationNames();   

// CREATE ICON ------------------------------------
function createIcon(size, iconUrl) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2], // Anchor icon to its center
        tooltipAnchor: [size / 2, 1], // Anchor tooltip to right side
        popupAnchor: [0, (-size / 2)]
    });
}

// Define layers for categories
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

// CREATE MARKERS ---------------------------------------------
var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var markers = [];
globalIconSize = 32;

var dashedLineLayer = L.layerGroup().addTo(map);

function createDashedLines() {
    // Define coordinates for the dashed line
    var point1 = [4695, 685];
    var point2 = [3952, 1100];
    var point3 = [4660, 1990];

    var point1Coords = [bounds[1][0] - point1[1], point1[0]];
    var point2Coords = [bounds[1][0] - point2[1], point2[0]];
    var point3Coords = [bounds[1][0] - point3[1], point3[0]];

    // Define polyline options for dashed line style
    var dashedLineOptions = {
        color: 'white', // Line color
        weight: 1,     // Line weight
        dashArray: '8, 8' // Dashed line pattern (8px dashes and 8px gaps)
    };

    // Create polylines with the dashed line style and add them to the layer group
    L.polyline([point1Coords, point2Coords], dashedLineOptions).addTo(dashedLineLayer);
    L.polyline([point1Coords, point3Coords], dashedLineOptions).addTo(dashedLineLayer);
}

createDashedLines();

function createMarkers() {
    markersData.forEach(function(markerData) {
        var adjustedcoordinates = [bounds[1][0] - markerData.coordinates[1], markerData.coordinates[0]];

        var marker = L.marker(adjustedcoordinates, {
            icon: createIcon(globalIconSize, markerData.iconUrl),
            zIndexOffset: 1000 // makes markers appear above everything else
        }).addTo(map);

        // Add marker to the appropriate category layer
        var category = markerData.category || 'Default'; // Fallback to 'Default' if no category is specified
        if (categoryLayers[category]) {
            categoryLayers[category].addLayer(marker);
        } else {
            console.warn(`Category "${category}" not found.`);
        }
        
        // Add icons to tooltips depending on marker properties
        function createTooltipHtml(markerData) {
            const iconSize = '18px'; // change icon size here
            const iconHtml = {
                up: `<img src="images/icons/white-up-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`,
                down: `<img src="images/icons/white-down-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`,
                locked: `<img src="images/icons/white-locked-point-icon.png" style="width: ${iconSize}; height: ${iconSize};" />`
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

        // Bind tooltip (with adjusted html) to the marker
        marker.bindTooltip(tooltipHtml, {direction: 'right', sticky: true});

        // Bind popup to the marker
        marker.bindPopup(markerData.popupText, {autoPan: false, autoClose: false, closeOnClick: false, closeButton: false});

        markers.push(marker);

        if (isTouchDevice) { // Handle touch devices

            // Toggle tooltips and popups
            var tooltipFirstOpen = false;
            marker.on('click', function(event) {
                if (isTooltipOpen()) {
                    marker.closeTooltip();
                    marker.closePopup();
                } else {
                    marker.openTooltip();
                    marker.openPopup();
                }
            });
            // If user taps away from icons, all popups/tooltips will close
            map.on('click', function(event) {
                marker.closePopup();
                marker.closeTooltip();
            });

        } else { // Desktop devices
            // When hovering, open tooltip and increase icon size
            marker.on('mouseover', function() {
                var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] * 1.3), marker.options.icon.options.iconUrl);
                marker.setIcon(newIcon);
                marker.openTooltip();
            });

            // When mouse leaves, revert icon size
            marker.on('mouseout', function() {
                var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] / 1.3), marker.options.icon.options.iconUrl);
                marker.setIcon(newIcon);
            });

            // When icon is clicked, toggle popup
            marker.on('click', function() {
                if (isPopupOpen()) {
                    marker.closePopup();
                } else {
                    marker.openPopup();
                }
            });

            // If user clicks away from icons, all popups will close
            map.on('click', function(event) {
                marker.closePopup();
            });
        }
    });
}

createMarkers();


// UPDATE LABEL VISIBILITY ---------------------------------------
// Allows for dynamic labels depending on zoom level
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

// MARKER SIZE ADJUSTMENTS --------------------------------------
// Change icon sizes dynamically with zoom level 
function updateMarkerSize() {
    var zoom = map.getZoom() - 2;
    var newSize = Math.max(globalIconSize / 2, globalIconSize * Math.pow(2, zoom - map.getMinZoom()));
    
    markers.forEach(function(marker) {
        var iconUrl = marker.options.icon.options.iconUrl;
        var newIcon = createIcon(newSize, iconUrl);
        marker.setIcon(newIcon);
    });
}

// Combined function to handle zoom changes
function onZoomChange() {
    updateMarkerSize();
    updateLabelVisibility();
}

// When map zoom is changed, update icons and labels
map.on('zoomend', onZoomChange);
onZoomChange(); // Call once initially to set up everything correctly
