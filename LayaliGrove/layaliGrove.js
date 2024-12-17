

var groups = {
    'allGroups': [categoriesData[0], categoriesData[1], categoriesData[2], categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[7], categoriesData[8], categoriesData[9], categoriesData[10], categoriesData[11], categoriesData[12], categoriesData[13], categoriesData[14], categoriesData[15], categoriesData[16], categoriesData[17], categoriesData[18], categoriesData[19], categoriesData[20], categoriesData[21], categoriesData[22], categoriesData[23], categoriesData[24], categoriesData[25], categoriesData[26], categoriesData[27], categoriesData[28], 
    categoriesData[29], categoriesData[30], categoriesData[31], categoriesData[32], categoriesData[33],],
    'containerGroup': [categoriesData[0], categoriesData[1], categoriesData[7], categoriesData[8], categoriesData[9], categoriesData[10], categoriesData[11], categoriesData[12], categoriesData[13], categoriesData[14], categoriesData[15], categoriesData[16], categoriesData[17], categoriesData[18], categoriesData[19], categoriesData[20], categoriesData[21], categoriesData[22], categoriesData[23], categoriesData[24], categoriesData[25], categoriesData[26], categoriesData[27], 
    categoriesData[27], categoriesData[29], categoriesData[30], categoriesData[31]], 
    'extractGroup': [categoriesData[3], categoriesData[4], categoriesData[5], categoriesData[6], categoriesData[28]]
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
                    });
                }

                groups[groupName].forEach (({ checkboxId, layerName }) => {  //for each category
                    categoryLayers[layerName].addTo(map);
                    document.getElementById(checkboxId).checked = true;
                });
            } else { // if switched off

                if (groupName === 'allGroups') {
                    Object.keys(groups).forEach((groupName) => {
                        document.getElementById(groupName).checked = false;
                    });
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
        } else {
            map.removeLayer(categoryLayers[layerName]);
        }
    });
}

// Map Dropdown stuff
function toggleMapDropdown() {
    document.getElementById("mapDropdown").classList.toggle("show")
}

// Close the dropdown menu if the user clicks outside of it
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

// BOTTOM TOOLBAR  ---------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // Handle toggling left toolbar with button

    const leftToolbar = document.getElementById('leftToolbar');
    const openToolbarBtn = document.getElementById('openLeftToolbarBtn');
    openToolbarBtn.addEventListener('click', () => {
        leftToolbar.classList.toggle('collapsed');
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
    maxZoom: 3,
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

/*
// TEMP FUNCTIONS FOR MARKER PLACEMENT
map.on('click', function(e) {
    
    // Get the clicked coordinates (Leaflet latLng)
    var latLng = e.latlng;

    // In GIMP, 0,0 is at the top-left, and the coordinates increase downward.
    // We need to adjust the Y-coordinate for the GIMP system.
    var invertedY = bounds[1][0] - latLng.lat;

    // Format the coordinates in the GIMP style [X, Y] with whole numbers (no decimals)
    var coordinates = `${Math.round(latLng.lng)}, ${Math.round(invertedY)}`;

    // Copy the coordinates to the clipboard
    copyToClipboard(coordinates);
});

// Function to copy the coordinates to clipboard
function copyToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}*/


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
    'Computer': L.layerGroup().addTo(map),
    'Boss': L.layerGroup().addTo(map), 
    'Paid Extract': L.layerGroup().addTo(map),
    'Train Extract': L.layerGroup().addTo(map), 
    'Random Extract': L.layerGroup().addTo(map), 
    'Normal Extract': L.layerGroup().addTo(map),
    'Travel Bag': L.layerGroup().addTo(map),
    'Small Safebox': L.layerGroup().addTo(map),
    'Computer Case': L.layerGroup().addTo(map),
    'LG Weapon Crate': L.layerGroup().addTo(map),
    'Ammo Crate': L.layerGroup().addTo(map),
    'Tool Cabinet': L.layerGroup().addTo(map),
    'LG Tool Box': L.layerGroup().addTo(map),
    'Lab Coat': L.layerGroup().addTo(map),
    'Clothing': L.layerGroup().addTo(map),
    'Military Medkit': L.layerGroup().addTo(map),
    'Medical Pile': L.layerGroup().addTo(map),
    'Briefcase': L.layerGroup().addTo(map),
    'Premium Storage': L.layerGroup().addTo(map),
    'Drawers': L.layerGroup().addTo(map),
    'Courier Carton': L.layerGroup().addTo(map),
    'Flight Case': L.layerGroup().addTo(map),
    'Dumpster': L.layerGroup().addTo(map),
    'Field Supply': L.layerGroup().addTo(map),
    'Bird Nest': L.layerGroup().addTo(map),
    'Stash': L.layerGroup().addTo(map),
    'Suitcase': L.layerGroup().addTo(map),
    'Spawn': L.layerGroup().addTo(map),
    'Server': L.layerGroup().addTo(map),
    'Weapon Crate': L.layerGroup().addTo(map),
    'Cement Truck': L.layerGroup().addTo(map),
    'Keycard Door': L.layerGroup().addTo(map),
    'Secret Crate': L.layerGroup().addTo(map),
};

// CREATE MARKERS ---------------------------------------------
//var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var markers = [];
globalIconSize = 32;

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
            `;//<span style="margin-left: 4px;">${markerData.tooltipText}</span>        <span style="margin-left: 4px; font-family: Arial;">${markerData.tooltipText + " [" + markerData.coordinates + "]"}</span>
        }
        const tooltipHtml = createTooltipHtml(markerData);

        // Bind tooltip (with adjusted html) to the marker
        marker.bindTooltip(tooltipHtml, {direction: 'right'});

        // Bind popup to the marker
        marker.bindPopup(markerData.popupText, {autoPan: false, closeButton: false});

        markers.push(marker);

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
        if (map.getZoom() <= 0) { // When zooming in past zoom level 0, icons don't get larger. This is so they don't overlap and to make it easier to see in-game position.
            marker.setIcon(newIcon);
        }
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
