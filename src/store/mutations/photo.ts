import { Photo } from '@/types/photo';
import { PhotoState } from '../states/photo';

export default {
    importPhotos(
        state: PhotoState,
        payload: {
            alpha3Code: string;
            photos: Array<Photo>;
            category: string;
        }
    ): void {
        state.photos[payload.alpha3Code] =
            state.photos[payload.alpha3Code] ?? {};
        state.photos[payload.alpha3Code][payload.category] =
            state.photos[payload.alpha3Code][payload.category] ?? {};
        let {
            photos = [],
            currentPage = 0,
        }: { currentPage: number; photos: Array<Array<Photo>> } = state.photos[
            payload.alpha3Code
        ][payload.category];
        photos.push(payload.photos);
        state.photos[payload.alpha3Code][payload.category].photos = photos;
        state.photos[payload.alpha3Code][
            payload.category
        ].currentPage = ++currentPage;
    },
    nextPage(state: PhotoState, payload: {alpha3Code: string, category: string}): void {
        const {alpha3Code, category}: {alpha3Code: string, category: string} = payload;
        state.photos[alpha3Code][category].currentPage++;
    },
    resetPage(state: PhotoState, payload: {alpha3Code: string, category: string}): void {
        /**
         * Need to reset currentPage to 0 because currentPage should be increased by 1
         * only when the PhotoGallery tries to fetch the photos from the store
         */
        const {alpha3Code, category}: {alpha3Code: string, category: string} = payload;
        state.photos[alpha3Code][category].currentPage = 0;
    },
};
