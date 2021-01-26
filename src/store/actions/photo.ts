import { PhotoService } from '@/services/photo.service';
import { Country } from '@/types/country';
import { PhotoState } from '../states/photo';
import { Photo } from './../../types/photo';
export default {
    async fetchPhotos(
        { commit, state, getters, rootGetters }:
        { commit: any, state: PhotoState, getters: any, rootGetters: any},
        alpha3Code: string,
        category: string
    ): Promise<any> {
        console.log(getters, rootGetters);
        const country: Country = rootGetters['country/countryBy']([
            'alpha3Code',
            alpha3Code,
        ]);
        const name: string = country.name;
        const query: string = encodeURIComponent(
            [name, category].join(' ')
        );
        const page: number = state.photos[alpha3Code]?.photos?.length + 1 || 1;
        const photos: Array<Photo> = await PhotoService.fetch(query, page);
        commit('importPhotos', {alpha3Code, photos});
    },
};