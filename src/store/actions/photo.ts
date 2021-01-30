import { PhotoService } from '@/services/photo.service';
import { PhotoState } from '../states/photo';
import { Photo } from './../../types/photo';
export default {
    async fetchPhotos(
        { commit, state }: { commit: any; state: PhotoState },
        payload: { searchQuery: string; alpha3Code: string; category: string }
    ): Promise<any> {
        const {
            searchQuery,
            alpha3Code,
            category,
        }: {
            searchQuery: string;
            alpha3Code: string;
            category: string;
        } = payload;
        const page: number =
            state?.photos[alpha3Code]?.[category]?.photos?.length + 1 || 1;
        const photos: Array<Photo> = await PhotoService.fetch(
            searchQuery,
            page
        );
        commit('importPhotos', { alpha3Code, photos, category });
    },
    nextPage(
        { commit }: { commit: any },
        payload: {
            alpha3Code: string;
            category: string;
        }
    ): void {
        commit('nextPage', payload);
    },
    resetPage(
        { commit }: { commit: any },
        payload: {
            alpha3Code: string;
            category: string;
        }
    ): void {
        commit('resetPage', payload);
    },
};
