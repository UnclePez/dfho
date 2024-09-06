
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
var bounds = [[0,0], [2568, 4908]];
var image = L.imageOverlay('../images/home-map1.webp', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(-1.5);

// CREATE ICON ------------------------------------
function createIcon(size, iconUrl) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        tooltipAnchor: [0, (-size / 2 + 10)],
    });
}

// CREATE MARKERS ---------------------------------------------
var markers = [];
globalIconSize = 150;

function createMarkers() {
    markersData.forEach(function(markerData) {
        var adjustedcoordinates = [bounds[1][0] - markerData.coordinates[1], markerData.coordinates[0]];

        var marker = L.marker(adjustedcoordinates, {
            icon: createIcon(globalIconSize, markerData.iconUrl),
            zIndexOffset: 1000
        }).addTo(map);
        
        function createTooltipHtml(markerData) { 
            let iconsHtml = '';
            return `<div style="display: flex; align-items: center;">${iconsHtml}<span>${markerData.tooltipText}</span></div>`;
        }
        const tooltipHtml = createTooltipHtml(markerData);

        marker.bindTooltip(tooltipHtml, {
            direction: 'top',
            permanent: true,
            className: 'home-tooltip'
        });

        markers.push(marker);

        marker.on('click', function() {
            window.location.href = markerData.url;
        });

        // When hovering, open tooltip and increase icon size
        marker.on('mouseover', function() {
            var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] * 1.3), marker.options.icon.options.iconUrl);
            marker.setIcon(newIcon);
            marker.getTooltip().getElement().classList.add('home-tooltip-hover');
        });

        // When mouse leaves, revert icon size
        marker.on('mouseout', function() {
            var newIcon = createIcon(Math.round(marker.options.icon.options.iconSize[0] / 1.3), marker.options.icon.options.iconUrl);
            marker.setIcon(newIcon);
            marker.getTooltip().getElement().classList.remove('home-tooltip-hover');
        });
    });
}

createMarkers();

// MARKER SIZE ADJUSTMENTS --------------------------------------
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

// When map zoom is changed, update icon sizes
map.on('zoomend', updateMarkerSize);
updateMarkerSize(); // Call once initially to set up everything correctly
