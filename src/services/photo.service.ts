import { Photo, SearchResponse } from '@/types/photo';

export class PhotoService {
    static readonly BASE_URL: string = process.env.VUE_APP_PHOTO_API_DOMAIN;

    static async fetch(q: string, page: number): Promise<Array<Photo>> {
        const queryParams: string = ['q=' + q, 'page=' + page].join('&');
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

    static trackDownload(link: string): void {
        const body: BodyInit = JSON.stringify({ link });
        fetch(PhotoService.BASE_URL + 'trackdownload', {
            method: 'POST',
            /**
             * need to explicitly set header application/json so that body-parser in expressjs could understand
             * therefore, in express, req.body can return the meaningful value
             */
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });
    }
}
