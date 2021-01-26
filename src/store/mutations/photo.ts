import { Photo } from '@/types/photo';
import { PhotoState } from '../states/photo';

export default {
    importPhotos(
        state: PhotoState,
        payload: {
            alpha3Code: string;
            photos: Array<Photo>;
        }
    ): void {
        if (payload.alpha3Code in state.photos === false) {
            state.photos[payload.alpha3Code] = {
                photos: [payload.photos],
                currentPage: 1,
            };
        } else {
            state.photos[payload.alpha3Code].photos.push(payload.photos);
            state.photos[payload.alpha3Code].currentPage++;
        }
    },
    nextPage(state: PhotoState, alpha3Code: string): void {
        state.photos[alpha3Code].currentPage++;
    },
    resetPage(state: PhotoState, alpha3Code: string): void {
        /**
         * Need to reset currentPage to 0 because currentPage should be increased by 1
         * only when the PhotoGallery tries to fetch the photos from the store
         */
        state.photos[alpha3Code].currentPage = 0;
    }
};
