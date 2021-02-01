<template>
    <div class="w-full h-full">
        <div class="w-full h-full" style="height: 500px" ref="map"></div>
        <div class="absolute" @mouseover="onHover()">hover me</div>
    </div>
    <!-- <div @mouseover="onHover()">hever me</div> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import L from 'leaflet/dist/leaflet-src.esm';

@Options({})
export default class TheMap extends Vue {
    leaflet: any = {};
    map: L.Map = {} as any;
    mapGeoJson: L.GeoJSON<any> = {} as any;
    geoJson: Record<string, unknown> = require('./geojson');

    cca2: string = 'vn';
    style: any = {};

    onHover(): void {
        console.log('asd');
        this.style = {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0.7,
        };
        this.mapGeoJson.setStyle((feature: any) => {
            if (feature.properties.cca2 === this.cca2)
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
        console.log(this.geoJson);
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
            this.map = this.leaflet.map(this.$refs['map'] as HTMLElement);
            this.map.setView([35.0, 105.0], 3);
            // console.log(map);
            const tileLayer: L.TileLayer = this.leaflet.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    // tileSize: 512,
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }
            );
            tileLayer.addTo(this.map);
            this.leaflet.marker([35.0, 105.0]).addTo(this.map);
            this.mapGeoJson = this.leaflet
                .geoJson(this.geoJson, {
                    style: (feature: any) => {
                        if (feature.properties.cca2 === this.cca2)
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
        console.log(feature);
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
