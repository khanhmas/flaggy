<template>
    <div class="w-full h-full" ref="map"></div>
    <!-- <div class="relative w-full h-full">
        <div class="absolute top-0 bottom-0 w-full h-full" ref="map"></div>
    </div> -->
    <!-- <div @mouseover="onHover()">hever me</div> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import L from 'leaflet/dist/leaflet-src.esm';
import { Country } from '@/types/country';

@Options({
    props: {
        geoJson: Object,
        country: Object,
        leaflet: Object,
    },
})
export default class TheMap extends Vue {
    country!: Country;
    geoJson!: GeoJSON.FeatureCollection;
    leaflet!: Record<string, any>;

    map: L.Map = {} as any;
    mapGeoJson: L.GeoJSON<any> = {} as any;
    tileLayer: L.TileLayer | null = null;
    marker: L.Marker | null = null;

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
            if (feature.id.toLowerCase() === this.country.alpha3Code)
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

    created(): void {
        this.tileLayer = this.leaflet?.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        );
        this.marker = this.leaflet?.marker(this.country.latlng);
        const reducedGeoJSon:
            | GeoJSON.FeatureCollection
            | unknown = this.geoJson?.features.filter((feature: any) => {
            return [this.country.alpha3Code, ...this.country.borders].includes(
                feature.id
            );
        });
        this.mapGeoJson = this.leaflet?.geoJson(reducedGeoJSon, {
            style: (feature: any) => {
                // console.log(feature.id);
                if (feature.id === this.country.alpha3Code)
                    return {
                        weight: 2,
                        opacity: 1,
                        // color: 'transparent',
                        dashArray: '3',
                        fillOpacity: 0.7,
                    };
                // this.style = { color: 'transparent' };
                return { color: 'transparent' };
            },
            onEachFeature: this.onEachFeature.bind(this),
        });
    }

    mounted(): void {
        /**
         * Fix displaying map issue for China
         */
        setTimeout(() => {
            this.map = this.leaflet?.map(this.$refs.map as HTMLElement, {
                center: this.country.latlng,
                // dragging: false,
                // boxZoom: false,
                // doubleClickZoom: false,
                // scrollWheelZoom: false,
                // touchZoom: false,
                // zoomControl: false,
                zoom: 3,
            });
            this.tileLayer?.addTo(this.map);
            this.marker?.addTo(this.map);
            this.map.whenReady(this.onMapReady.bind(this));
        });
    }

    onMapReady(): void {
        this.mapGeoJson.addTo(this.map);
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
            this.leaflet?.Browser.ie === false &&
            this.leaflet?.Browser.opera &&
            this.leaflet?.Browser.edge
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
