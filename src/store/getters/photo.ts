import { PhotoState } from '@/store/states/photo';
import { Photo } from '@/types/photo';

export default {
    getCurrentPhotosPage: (state: PhotoState) => (payload: {
        alpha3Code: string;
        category: string;
    }): Array<Photo> => {
        const countryPhotos: {
            photos: Array<Array<Photo>>;
            currentPage: number;
        } = state.photos[payload.alpha3Code]?.[payload.category];
        return countryPhotos != null ? countryPhotos.photos[countryPhotos.currentPage - 1] : [];
    },
    shouldFetch: (state: PhotoState) => (payload: {
        alpha3Code: string;
        category: string;
    }): boolean => {
        const countryPhotos: {
            photos: Array<Array<Photo>>;
            currentPage: number;
        } = state.photos[payload.alpha3Code]?.[payload.category];
        return (
            countryPhotos == null ||
            countryPhotos.photos.length < countryPhotos.currentPage + 1
        );
    },
    getAllPhotos: (state: PhotoState) => (payload: {
        alpha3Code: string;
        category: string;
    }): Array<Photo> => {
        const countryPhotos: {
            photos: Array<Array<Photo>>;
            currentPage: number;
        } = state.photos[payload.alpha3Code]?.[payload.category];
        return countryPhotos != null ? countryPhotos.photos.flat() : [];
    },
};
