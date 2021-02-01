<template>
    <div class="relative w-full h-full">
        <div class="absolute top-0 bottom-0 w-full h-full" ref="map"></div>
        <!-- <div @mouseover="onHover()">hover me</div> -->
    </div>
    <!-- <div @mouseover="onHover()">hever me</div> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import L from 'leaflet/dist/leaflet-src.esm';
import { Country } from '@/types/country';

@Options({
    props: {
        geoJson: Object,
        country: Object
    }
})
export default class TheMap extends Vue {
    geoJson!: any;
    country!: Country;


    leaflet: any = {};
    map: L.Map = {} as any;
    mapGeoJson: L.GeoJSON<any> = {} as any;
    // geoJson: Record<string, unknown> = require('./geojson');

    style: any = {};

    onHover(): void {
        // console.log('asd');
        this.style = {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0.7,
        };
        this.mapGeoJson.setStyle((feature: any) => {
            // console.log(feature)
            if (feature.properties.ISO_A3.toLowerCase() === this.country.alpha3Code)
                return {
                    weight: 2,
                    opacity: 1,
                    color: 'red',
                    dashArray: '3',
                    fillOpacity: 0.7,
                };
            return { color: 'transparent' };
        });
    }

    async mounted(): Promise<any> {
        console.log(this.country);
        // console.log(this.geoJson);
        this.leaflet = await import('leaflet/dist/leaflet-src.esm');
        delete this.leaflet.Icon.Default.prototype._getIconUrl;
        // eslint-disable-next-line
        this.leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        // console.log(this.leaflet, this.$refs['map']);
        if ((this.$refs['map'] as HTMLElement) != null) {
            this.map = this.leaflet.map(this.$refs['map'] as HTMLElement, {
                center: this.country.latlng,
                // dragging: false,
                boxZoom: false,
                doubleClickZoom: false,
                // scrollWheelZoom: false,
                touchZoom: false,
                // zoomControl: false,
                zoom: 3
            });
            // this.map.setView([35.0, 105.0], 3);
            // console.log(map);
            const tileLayer: L.TileLayer = this.leaflet.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }
            );
            tileLayer.addTo(this.map);
            this.leaflet.marker(this.country.latlng).addTo(this.map);
            const reducedGeoJSon: Array<any> = this.geoJson.features.filter((feature: any) => {
                    return [this.country.alpha3Code, ...this.country.borders].includes(feature.properties.ISO_A3);
                });
            this.mapGeoJson = this.leaflet
                .geoJson(reducedGeoJSon, {
                    style: (feature: any) => {
                        console.log(feature.properties.ISO_A3)
                        if (feature.properties.ISO_A3 === this.country.alpha3Code)
                            return {
                                weight: 2,
                                opacity: 1,
                                // color: 'transparent',
                                dashArray: '3',
                                fillOpacity: 0.7,
                            };
                        // this.style = { color: 'transparent' };
                        return{ color: 'transparent' };
                    },
                    onEachFeature: this.onEachFeature.bind(this),
                })
                .addTo(this.map);
        }
    }

    highlightFeature(feature: any, e: any): void {
        // console.log(feature);
        const layer = e.target;

        layer?.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7,
        });

        if (
            this.leaflet.Browser.ie === false &&
            this.leaflet.Browser.opera &&
            this.leaflet.Browser.edge
        ) {
            layer.bringToFront();
        }
    }

    resetHighlight(e: any): void {
        this.mapGeoJson.resetStyle(e.target);
    }

    onEachFeature(feature: any, layer: any): void {
        layer.on({
            mouseover: this.highlightFeature.bind(this, feature),
            mouseout: this.resetHighlight.bind(this),
            // click: zoomToFeature
        });
    }
}
</script>
