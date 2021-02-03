<template>
    <div class="w-full map-container h-96 md:h-full" ref="map"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import L from 'leaflet/dist/leaflet-src.esm';
import { Country } from '@/types/country';
import { CountryMap } from '@/classes/map';

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

    map: L.Map | null = null;
    mapGeoJson: L.GeoJSON<any> | null = null;
    tileLayer: L.TileLayer | null = null;
    marker: L.Marker | null = null;
    infoControl: L.Control | null = null;

    onHoverFeature(alpha3Code: string): void {
        const callback: L.StyleFunction<any> = (
            feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined
        ): L.PathOptions => {
            let res: L.PathOptions = {};

            if (alpha3Code === '') {
                this.mapGeoJson?.resetStyle();
                (this.infoControl as any).update();
            } else {
                if (
                    feature?.id === alpha3Code &&
                    feature?.id !== this.country.alpha3Code
                ) {
                    res = {
                        weight: 3,
                        fillColor: 'rgb(110, 231, 183)',
                    };
                    (this.infoControl as any).update({
                        name: feature.properties.name,
                    });
                }
            }
            return res;
        };
        this.mapGeoJson?.setStyle(callback);
    }

    created(): void {
        this.createTileLayer();
        this.createMarker();
        this.createMapGeoJson();
        this.createControl();
        CountryMap.subscribe(this.onHoverFeature.bind(this));
    }

    beforeUnmount(): void {
        CountryMap.unsubscribeAll();
    }

    private createControl(): void {
        const leaflet: Record<string, any> = this.leaflet;
        this.infoControl = leaflet.control();
        let div: HTMLElement;
        (this.infoControl as any).onAdd = function(map: L.Map): HTMLElement {
            div = leaflet.DomUtil.create(
                'div',
                'bg-opacity-80 bg-white rounded-md p-2 text-gray-900'
            );
            this.update();
            return div;
        };
        (this.infoControl as any).update = function(props: any) {
            if (props != null) div.innerHTML = `<h3>${props.name}</h3>`;
            else div.innerHTML = '<h3>Hover a border country</h3>';
        };
    }

    createTileLayer(): void {
        this.tileLayer = this.leaflet?.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        );
    }

    private createMarker(): void {
        this.marker = this.leaflet?.marker(this.country.latlng);
    }

    private createMapGeoJson(): void {
        const reducedGeoJSon:
            | GeoJSON.FeatureCollection
            | unknown = this.geoJson?.features.filter((feature: any) => {
            return [this.country.alpha3Code, ...this.country.borders].includes(
                feature.id
            );
        });
        this.mapGeoJson = this.leaflet?.geoJson(reducedGeoJSon, {
            style: (feature: any) => {
                if (feature.id === this.country.alpha3Code)
                    return {
                        weight: 3,
                        dashArray: '3',
                        fillOpacity: 0.7,
                    };
                return { color: 'transparent', fillColor: 'rgb(17, 24, 39)' };
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
                minZoom: 3,
                maxZoom: 4,
                zoom: 3,
            });

            this.map?.whenReady(this.onMapReady.bind(this));
        });
    }

    onMapReady(): void {
        this.tileLayer?.addTo(this.map!);
        this.marker?.addTo(this.map!);
        this.mapGeoJson?.addTo(this.map!);
        this.infoControl?.addTo(this.map!);
    }

    highlightFeature(event: L.LeafletMouseEvent): void {
        const layer: any = event.target;
        const feature: GeoJSON.Feature = layer.feature;

        // layer?.setStyle({
        //     weight: 5,
        //     color: '#666',
        //     dashArray: '',
        //     fillOpacity: 0.7,
        // });

        if (
            this.leaflet?.Browser.ie === false &&
            this.leaflet?.Browser.opera === false &&
            this.leaflet?.Browser.edge === false
        ) {
            layer.bringToFront();
        }
        CountryMap.notify(feature.id as string);
    }

    resetHighlight(event: L.LeafletMouseEvent): void {
        // this.mapGeoJson?.resetStyle(event.target);
        CountryMap.notify('');
    }

    redirectDetailCountry(feature: GeoJSON.Feature): void {
        this.$router.push({
            name: 'Detail',
            params: { alpha3Code: feature.id as string },
        });
    }

    onEachFeature(feature: GeoJSON.Feature, layer: L.Layer): void {
        layer.on({
            mouseover: this.highlightFeature.bind(this),
            mouseout: this.resetHighlight.bind(this),
            click: this.redirectDetailCountry.bind(this, feature),
        });
    }
}
</script>
<style lang="scss">
.map-container {
    * {
        z-index: 1;
    }
}
</style>
