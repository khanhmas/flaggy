import { Photo } from '@/types/photo';
import { PhotoState } from '../states/photo';

export default {
    importPhotos(state: PhotoState, payload: {alpha3Code: string, photos: Array<Photo>}) {
        if (payload.alpha3Code in state.photos === false) {
            state.photos[payload.alpha3Code] = {
                photos: [payload.photos],
                currentPage: 1
            };
        } else {
            state.photos[payload.alpha3Code].photos.push(payload.photos);
            state.photos[payload.alpha3Code].currentPage++;
        }
    }
}