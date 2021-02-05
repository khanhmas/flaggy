<template>
    <div class="w-full map-container h-96 md:h-full" ref="map"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import L from 'leaflet/dist/leaflet-src.esm';
import { Country } from '@/types/country';
import { CountryMap } from '@/classes/map';
import leafletConfig from '@/config/leaflet.config';

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

    changeFeatureStyle(alpha3Code: string): void {
        const callback: L.StyleFunction<any> = (
            feature: GeoJSON.Feature<GeoJSON.Geometry, any> | undefined
        ): L.PathOptions => {
            let res: L.PathOptions = {};
            if (feature?.id !== this.country.alpha3Code) {
                const onHover: boolean = alpha3Code !== '' ? true : false;
                if (onHover === false) {
                    this.mapGeoJson?.resetStyle();
                    (this.infoControl as any).update();
                } else if (feature?.id === alpha3Code) {
                    res = leafletConfig.hoveringCountryStyles;
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
        this.createInfoControl();
        CountryMap.subscribe(this.changeFeatureStyle.bind(this));
    }

    beforeUnmount(): void {
        CountryMap.unsubscribeAll();
    }

    private createInfoControl(): void {
        this.infoControl = this.leaflet.control();
        let div: HTMLElement;
        this.infoControl!.onAdd = (): HTMLElement => {
            div = this.leaflet.DomUtil.create(
                'div',
                leafletConfig.infoControl.cssClasses
            );
            (this.infoControl as any).update();
            return div;
        };
        (this.infoControl as any).update = (props: any): void => {
            div.innerHTML =
                props != null
                    ? `<h3>${props.name}</h3>`
                    : `<h3>${leafletConfig.infoControl.defaultLabel}</h3>`;
        };
    }

    createTileLayer(): void {
        this.tileLayer = this.leaflet?.tileLayer(
            leafletConfig.tileLayer.urlTemplate,
            leafletConfig.tileLayer.options
        );
    }

    private createMarker(): void {
        this.marker = this.leaflet?.marker(this.country.latlng);
    }

    private createMapGeoJson(): void {
        const reducedGeoJSon:
            | GeoJSON.FeatureCollection
            | unknown = this.geoJson?.features.filter(
            (feature: GeoJSON.Feature) => {
                return [
                    this.country.alpha3Code,
                    ...this.country.borders,
                ].includes(feature.id as string);
            }
        );
        this.mapGeoJson = this.leaflet?.geoJson(reducedGeoJSon, {
            style: (feature: GeoJSON.Feature) =>
                feature.id === this.country.alpha3Code
                    ? leafletConfig.currentCountryStyles
                    : leafletConfig.neighborCountryStyles,
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
                ...leafletConfig.mapStyles,
            });

            this.map?.whenReady(this.onMapReady.bind(this));
        });
    }

    onMapReady(): void {
        if (this.map != null) {
            this.tileLayer?.addTo(this.map);
            this.marker?.addTo(this.map);
            this.mapGeoJson?.addTo(this.map);
            this.infoControl?.addTo(this.map);
        }
    }

    highlightFeature(event: L.LeafletMouseEvent): void {
        const layer: any = event.target;
        const feature: GeoJSON.Feature = layer.feature;
        if (
            this.leaflet?.Browser.ie === false &&
            this.leaflet?.Browser.opera === false &&
            this.leaflet?.Browser.edge === false
        ) {
            layer.bringToFront();
        }
        CountryMap.notify(feature.id as string);
    }

    resetHighlight(): void {
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

    .custom-info-control {
        padding: 0.5rem;
    }
}
</style>
