import { PhotoState } from '@/store/states/photo';
import { Photo } from '@/types/photo';

export default {
    getCurrentPhotosPage: (state: PhotoState) => (
        alpha3Code: string
    ): Array<Photo> => {
        if (alpha3Code in state.photos) {
            const countryPhotos: {
                photos: Array<Array<Photo>>;
                currentPage: number;
            } = state?.photos[alpha3Code];
            return countryPhotos.photos[countryPhotos.currentPage - 1];
        } else return [];
    },
    shouldFetch: (state: PhotoState) => (alpha3Code: string): boolean => {
        const countryPhotos: {
            photos: Array<Array<Photo>>;
            currentPage: number;
        } = state?.photos[alpha3Code];
        return (
            countryPhotos == null ||
            countryPhotos.photos.length < countryPhotos.currentPage + 1
        );
    },
    getAllPhotos: (state: PhotoState) => (alpha3Code: string): Array<Photo> => {
        const countryPhotos: {
            photos: Array<Array<Photo>>;
            currentPage: number;
        } = state?.photos[alpha3Code];
        return countryPhotos != null ? countryPhotos.photos.flat() : [];
    }
};
