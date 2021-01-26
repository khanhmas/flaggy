import { PhotoService } from '@/services/photo.service';
import { PhotoState } from '../states/photo';
import { Photo } from './../../types/photo';
export default {
    async fetchPhotos(
        {
            commit,
            state,
        }: { commit: any, state: PhotoState},
        payload: { searchQuery: string; alpha3Code: string }
    ): Promise<any> {
        const {
            searchQuery,
            alpha3Code,
        }: { searchQuery: string; alpha3Code: string } = payload;
        const page: number = state.photos[alpha3Code]?.photos?.length + 1 || 1;
        const photos: Array<Photo> = await PhotoService.fetch(
            searchQuery,
            page
        );
        commit('importPhotos', { alpha3Code, photos });
    },
    nextPage({ commit }: { commit: any }, alpha3Code: string): void {
        commit('nextPage', alpha3Code);
    },
    resetPage({ commit }: { commit: any }, alpha3Code: string): void {
        commit('resetPage', alpha3Code);
    },
};
