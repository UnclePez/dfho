const markersData = [
    // {//Computer
    //     category: 'Computer', // For marker toggle functionality. Should be a category in categoriesData.js
    //     coordinates: [2379, 1375], // Raw pixel coordinates found by hovering over map image in programs like Gimp or Photoshop
    //     iconUrl: '../images/icons/containers/computer-icon.webp', // Path to the desired marker icon
    //     tooltipText: 'COMPUTER', // The text that will appear next to the mouse when hovering over the icon
    //     popupText: 'Computer', // Text in popup. WIP
    //     height: '', // 'up' adds an upwards chevron icon to the tooltip indicating the marker location is above ground level. 'down' is below ground level.
    //     locked: false, // 'true' adds a locked door icon to the tooltip, indicating the marker is found behind a keycard door
    // },
    // {//Computer
    //     category: 'Computer',
    //     coordinates: [2449, 1572],
    //     iconUrl: '../images/icons/containers/computer-icon.webp',
    //     tooltipText: 'COMPUTER',
    //     popupText: 'Computer',
    //     height: '',
    //     locked: false,
    // },

    // {//Safe
    //     category: 'Safe',
    //     coordinates: [2152, 2893],
    //     iconUrl: '../images/icons/containers/safe-icon.webp',
    //     tooltipText: 'SAFE',
    //     popupText: 'Safe',
    //     height: '',
    //     locked: true,
    // },


    
    // {//Server
    //     category: 'Server',
    //     coordinates: [2222, 2947],
    //     iconUrl: '../images/icons/containers/server-icon.webp',
    //     tooltipText: 'SERVER',
    //     popupText: 'Task loot',
    //     height: '',
    //     locked: false,
    // },


    // {//Boss
    //     category: 'Boss',
    //     coordinates: [2273, 2916],
    //     iconUrl: '../images/icons/boss-icon-red.webp',
    //     tooltipText: 'LEIS',
    //     popupText: 'Chance for boss spawn.',
    //     height: '',
    //     locked: false,
    // },
    
    
    // {//Paid Extract
    //     category: 'Paid Extract',
    //     coordinates: [2102, 3408],
    //     iconUrl: '../images/icons/paid-extract-icon.webp',
    //     tooltipText: 'PAID EXTRACT',
    //     popupText: 'Pay currency earned in-match to extract. Earn in-match currency by finishing in-game tasks or looting other players.',
    //     height: '',
    //     locked: false,
    // },
    // {//Random Extract
    //     category: 'Random Extract',
    //     coordinates: [2956, 2786],
    //     iconUrl: '../images/icons/random-extract-icon.webp',
    //     tooltipText: 'RANDOM EXTRACT',
    //     popupText: 'Randomly open or closed. Green smoke indicates an available extract.',
    //     height: '',
    //     locked: false,
    // },
    // {//Normal Extract
    //     category: 'Normal Extract',
    //     coordinates: [3743, 2724],
    //     iconUrl: '../images/icons/extract-icon.webp',
    //     tooltipText: 'NORMAL EXTRACT',
    //     popupText: 'Available at all times.',
    //     height: '',
    //     locked: false,
    // },
    // {//Train Extract
    //     category: 'Train Extract',
    //     coordinates: [2328, 1971],
    //     iconUrl: '../images/icons/extract-icon.webp',
    //     tooltipText: 'TRAIN EXTRACT',
    //     popupText: 'Train Extract.',
    //     height: '',
    //     locked: false,
    // },


    // {//Travel Bag
    //     category: 'Travel Bag',
    //     coordinates: [2582, 1587],
    //     iconUrl: '../images/icons/containers/travel-bag-icon.webp',
    //     tooltipText: 'TRAVEL BAG',
    //     popupText: 'Travel Bag',
    //     height: '',
    //     locked: false,
    // },


    // {//Small Safebox
    //     category: 'Small Safebox',
    //     coordinates: [1891, 2254],
    //     iconUrl: '../images/icons/containers/small-safebox-icon.webp',
    //     tooltipText: 'SMALL SAFEBOX',
    //     popupText: 'Possible Small Safebox Spawn',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Computer Case
    //     category: 'Computer Case',
    //     coordinates: [2424, 1259],
    //     iconUrl: '../images/icons/containers/computer-case-icon.webp',
    //     tooltipText: 'COMPUTER CASE',
    //     popupText: 'Computer Case',
    //     height: '',
    //     locked: false,
    // },

    
    // {//LG Weapon Crate
    //     category: 'LG Weapon Crate',
    //     coordinates: [2619, 1453],
    //     iconUrl: '../images/icons/containers/large-weapon-crate-icon.webp',
    //     tooltipText: 'LARGE WEAPON CRATE',
    //     popupText: 'Large Weapon Crate',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Ammo Crate
    //     category: 'Ammo Crate',
    //     coordinates: [2329, 1579],
    //     iconUrl: '../images/icons/containers/ammo-crate-icon.webp',
    //     tooltipText: 'AMMO CRATE',
    //     popupText: 'Ammo Crate',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Tool Cabinet
    //     category: 'Tool Cabinet',
    //     coordinates: [2334, 1313],
    //     iconUrl: '../images/icons/containers/tool-cabinet-icon.webp',
    //     tooltipText: 'TOOL CABINET',
    //     popupText: 'Tool Cabinet',
    //     height: '',
    //     locked: false,
    // },

    
    // {//LG Tool Box
    //     category: 'LG Tool Box',
    //     coordinates: [2387, 1335],
    //     iconUrl: '../images/icons/containers/large-toolbox-icon.webp',
    //     tooltipText: 'LARGE TOOL BOX',
    //     popupText: 'Large Tool Box',
    //     height: '',
    //     locked: false,
    // },


    // {//Lab Coat
    //     category: 'Lab Coat',
    //     coordinates: [2440, 1289],
    //     iconUrl: '../images/icons/containers/lab-coat-icon.webp',
    //     tooltipText: 'LAB COAT',
    //     popupText: 'Lab Coat locked behind keycard door',
    //     height: '',
    //     locked: true,
    // },

    // {//Clothing
    //     category: 'Clothing',
    //     coordinates: [1069, 2499],
    //     iconUrl: '../images/icons/containers/clothing-icon.webp',
    //     tooltipText: 'CLOTHING',
    //     popupText: 'Clothing',
    //     height: '',
    //     locked: false,
    // },
    
    // {//Military Medkit
    //     category: 'Military Medkit',
    //     coordinates: [1381, 2334],
    //     iconUrl: '../images/icons/containers/military-med-kit-icon.webp',
    //     tooltipText: 'MILITARY MEDKIT',
    //     popupText: 'Military Medkit',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Medical Pile
    //     category: 'Medical Pile',
    //     coordinates: [1138, 2558],
    //     iconUrl: '../images/icons/containers/pile-of-medical-supplies-icon.webp',
    //     tooltipText: 'MEDICAL PILE',
    //     popupText: 'Pile of medical supplies',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Briefcase
    //     category: 'Briefcase',
    //     coordinates: [1810, 3427],
    //     iconUrl: '../images/icons/containers/briefcase-icon.webp',
    //     tooltipText: 'BRIEFCASE',
    //     popupText: 'Briefcase',
    //     height: '',
    //     locked: false,
    // },

    // {//Premium Storage
    //     category: 'Premium Storage',
    //     coordinates: [1833, 3423],
    //     iconUrl: '../images/icons/containers/premium-storage-box-icon.webp',
    //     tooltipText: 'PREMIUM STORAGE BOX',
    //     popupText: 'Premium Storage Box',
    //     height: '',
    //     locked: true,
    // },

    
    // {//Drawers
    //     category: 'Drawers',
    //     coordinates: [2412, 1588],
    //     iconUrl: '../images/icons/containers/drawer-icon.webp',
    //     tooltipText: 'DRAWERS',
    //     popupText: 'Drawers behind keycard door',
    //     height: '',
    //     locked: false,
    // },


    // {//Climbing Bag
    //     category: 'Premium Storage',
    //     coordinates: [1899, 2206],
    //     iconUrl: '../images/icons/containers/premium-storage-box-icon.webp',
    //     tooltipText: 'CLIMBING BAG',
    //     popupText: 'Climbing bag',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Courier Carton
    //     category: 'Courier Carton',
    //     coordinates: [1064, 2899],
    //     iconUrl: '../images/icons/containers/courier-carton-icon.webp',
    //     tooltipText: 'COURIER CARTON',
    //     popupText: 'Courier Carton',
    //     height: '',
    //     locked: false,
    // },


    // {//Flight Case
    //     category: 'Flight Case',
    //     coordinates: [2415, 1255],
    //     iconUrl: '../images/icons/containers/flight-case-icon.webp',
    //     tooltipText: 'FLIGHT CASE',
    //     popupText: 'Flight Case',
    //     height: '',
    //     locked: false,
    // },

    // {//Dumpster
    //     category: 'Dumpster',
    //     coordinates: [1132, 3206],
    //     iconUrl: '../images/icons/containers/dumpster-icon.webp',
    //     tooltipText: 'DUMPSTER',
    //     popupText: 'Dumpster',
    //     height: '',
    //     locked: false,
    // },


    // {//Field Supply Box
    //     category: 'Field Supply',
    //     coordinates: [1375, 2315],
    //     iconUrl: '../images/icons/containers/field-supply-box-icon.webp',
    //     tooltipText: 'FIELD SUPPLY BOX',
    //     popupText: 'Field Supply Box',
    //     height: '',
    //     locked: false,
    // },


    // {//Bird Nest
    //     category: 'Bird Nest',
    //     coordinates: [3724, 2870],
    //     iconUrl: '../images/icons/containers/bird-nest-icon.webp',
    //     tooltipText: 'BIRD NEST',
    //     popupText: 'Bird Nest',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Stash
    //     category: 'Stash',
    //     coordinates: [1888, 2302],
    //     iconUrl: '../images/icons/containers/hidden-stash-icon.webp',
    //     tooltipText: 'STASH',
    //     popupText: 'Stash',
    //     height: '',
    //     locked: false,
    // },


    // {//Suitcase
    //     category: 'Suitcase',
    //     coordinates: [1133, 2509],
    //     iconUrl: '../images/icons/containers/suitcase-icon.webp',
    //     tooltipText: 'SUITCASE',
    //     popupText: 'Suitcase',
    //     height: '',
    //     locked: false,
    // },

    
    {//Player Spawn
        category: 'Spawn',
        coordinates: [1547, 1433],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [1782, 1735],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [1837, 2125],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2563, 1813],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2618, 1331],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2959, 1453],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2950, 1960],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2807, 2497],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2285, 2619],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2114, 3185],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    {//Player Spawn
        category: 'Spawn',
        coordinates: [2846, 3179],
        iconUrl: '../images/icons/spawn-point-icon.webp',
        tooltipText: 'SPAWN',
        popupText: 'Player Spawn',
        height: '',
        locked: false,
    },
    
    // {//Weapon Crate
    //     category: 'Weapon Crate',
    //     coordinates: [2231, 2919],
    //     iconUrl: '../images/icons/containers/weapon-crate-icon.webp',
    //     tooltipText: 'WEAPON CRATE',
    //     popupText: 'Weapon Crate',
    //     height: '',
    //     locked: false,
    // },

    
    // {//Cement Truck
    //     category: 'Cement Truck',
    //     coordinates: [2959, 2968],
    //     iconUrl: '../images/icons/containers/cement-truck-icon.webp',
    //     tooltipText: 'CEMENT TRUCK',
    //     popupText: 'Cement Truck control panel',
    //     height: '',
    //     locked: false,
    // },
    
    // {//Keycard Door
    //     category: 'Keycard Door',
    //     coordinates: [2175, 2942],
    //     iconUrl: '../images/icons/keycard-door-icon-orange.webp',
    //     tooltipText: 'Kings Suite',
    //     popupText: 'King\'s Suite',
    //     height: '',
    //     locked: true,
    // },
    
    // {//Secret Crate
    //     category: 'Secret Crate',
    //     coordinates: [3085, 1117],
    //     iconUrl: '../images/icons/containers/secret-crate-icon.webp',
    //     tooltipText: 'PROTOCOL CRATE 1',
    //     popupText: 'Secret Protocol Crate',
    //     height: 'up',
    //     locked: false,
    // },

    
    // {//Easter Egg
    //     category: 'Easter Egg',
    //     coordinates: [3149, 2266],
    //     iconUrl: '../images/icons/event-trigger-icon.webp',
    //     tooltipText: 'BUNKER LADDER',
    //     popupText: 'Bunker Ladder',
    //     height: '',
    //     locked: false,
    // },

    
    // Add more markers here
];
