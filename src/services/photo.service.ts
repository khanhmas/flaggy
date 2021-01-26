import { PHOTO_CATEGORY } from '@/config/global.config';
import { Photo, SearchResponse } from '@/types/photo';

export class PhotoService {

    static readonly BASE_URL: string = 'https://localhost:3000/unsplash/';

    static async fetch(q: string, page: number): Promise<Array<Photo>> {
        const queryParams: string = ['q=' + q, 'page=' + page].join(
            '&'
        );
        try {
            const res: Response = await fetch(
                PhotoService.BASE_URL + 'search?' + queryParams
            );
            const searchResponse: SearchResponse = await res.json();
            const photos: Array<Photo> = searchResponse.results;
            return photos;
        } catch (err) {
            throw new Error(err);
        }
    }
}
