import { Photo } from '@/types/photo';

export interface PhotoCategory {
    [key: string]: {photos: Array<Array<Photo>>, currentPage: number}
};

export type PhotoState = {
    photos: Record<string, PhotoCategory>;
};
