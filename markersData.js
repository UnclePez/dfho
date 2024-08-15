// MARKER DATA ------------------------------------------------
const markersData = [
    {
        category: 'Hacker Computer', // For marker toggle functionality. Should be a category in categoriesData.js
        coordinates: [2600, 1910], // Raw pixel coordinates found by hovering over map image in programs like Gimp or Photoshop
        iconUrl: 'images/icons/containers/hacker-computer-icon.png', // Path to the desired marker icon
        tooltipText: 'HACKER COMPUTER', // The text that will appear next to the mouse when hovering over the icon
        popupText: 'This will show information about the Hacker Computer', // Text in popup. WIP
        height: 'up', // 'up' adds an upwards chevron icon to the tooltip indicating the marker location is above ground level. 'down' is below ground level. Any other value will not add an icon
        locked: false, // 'true' adds a locked door icon to the tooltip, indicating the marker is found behind a keycard door
    },
    {
        category: 'Hacker Computer',
        coordinates: [3932, 1188],
        iconUrl: 'images/icons/containers/hacker-computer-icon.png',
        tooltipText: 'HACKER COMPUTER',
        popupText: 'This will show information about the Hacker Computer',
        height: 'up',
        locked: false,
    },
    {
        category: 'Safe',
        coordinates: [4262, 1227],
        iconUrl: 'images/icons/containers/safe-icon.png',
        tooltipText: 'SAFE',
        popupText: 'This will show information about the Safe',
        height: 'up',
        locked: false,
    },
    {
        category: 'Saeed',
        coordinates: [4207, 1374],
        iconUrl: 'images/icons/boss-icon.png',
        tooltipText: 'GUARD CAPTAIN SAEED',
        popupText: 'This will show information about the Boss',
        height: 'up',
        locked: false,
    },
    {
        category: 'Industrial Elevator',
        coordinates: [4695, 685],
        iconUrl: 'images/icons/industrial-extract-icon.png',
        tooltipText: 'INDUSTRIAL ELEVATOR EXTRACT',
        popupText: 'This will show information about the Industrial Elevator Extract',
        height: '',
        locked: false,
    },
    {
        category: 'Industrial Elevator',
        coordinates: [3952, 1100],
        iconUrl: 'images/icons/event-trigger-icon.png',
        tooltipText: 'INDUSTRIAL ELEVATOR SWITCH',
        popupText: 'This will show information about the Industrial Elevator Switch',
        height: 'up',
        locked: false,
    },
    {
        category: 'Industrial Elevator',
        coordinates: [4660, 1990],
        iconUrl: 'images/icons/event-trigger-icon.png',
        tooltipText: 'INDUSTRIAL ELEVATOR SWITCH',
        popupText: 'This will show information about the Industrial Elevator Switch',
        height: '',
        locked: false,
    },
    {
        category: 'Safe',
        coordinates: [4304, 2446],
        iconUrl: 'images/icons/containers/safe-icon.png',
        tooltipText: 'SAFE',
        popupText: 'This will show information about the Safe',
        height: 'up',
        locked: false,
    },
    {
        category: 'Paid Extract',
        coordinates: [3494, 2841],
        iconUrl: 'images/icons/paid-extract-icon.png',
        tooltipText: 'PAID EXTRACT',
        popupText: 'This will show information about the Paid Extract',
        height: '',
        locked: false,
    },
    {
        category: 'Random Extract',
        coordinates: [5264, 4151],
        iconUrl: 'images/icons/random-extract-icon.png',
        tooltipText: 'RANDOM EXTRACT',
        popupText: 'This will show information about the Random Extract',
        height: '',
        locked: false,
    },
    {
        category: 'Conditional Extract',
        coordinates: [5815, 1485],
        iconUrl: 'images/icons/conditional-extract-icon.png',
        tooltipText: 'CONDITIONAL EXTRACT',
        popupText: 'This will show information about the Conditional Extract',
        height: '',
        locked: false,
    },
    {
        category: 'Normal Extract',
        coordinates: [5920, 2910],
        iconUrl: 'images/icons/extract-icon.png',
        tooltipText: 'EXTRACT',
        popupText: 'This will show information about the Extract',
        height: '',
        locked: false,
    },
    // Add more markers here
];
