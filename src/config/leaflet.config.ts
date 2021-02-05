export default {
    currentCountryStyles: {
        weight: 3,
        dashArray: '3',
        fillOpacity: 0.7,
    },
    neighborCountryStyles: {
        color: 'transparent',
        fillColor: 'rgb(17, 24, 39)',
    },
    hoveringCountryStyles: {
        weight: 3,
        fillColor: 'rgb(110, 231, 183)',
    },
    infoControl: {
        cssClasses: 'bg-opacity-80 bg-white rounded-md p-2 text-gray-900 custom-info-control',
        defaultLabel: 'Hover a border country',
    },
    tileLayer: {
        urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    },
    mapStyles: {
        // dragging: false,
        // boxZoom: false,
        // doubleClickZoom: false,
        // scrollWheelZoom: false,
        // touchZoom: false,
        // zoomControl: false,
        minZoom: 3,
        maxZoom: 4,
        zoom: 3,
    }
};
