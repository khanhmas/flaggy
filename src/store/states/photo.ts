import { Photo } from '@/types/photo';

export type PhotoState = {
    photos: Record<string, {photos: Array<Array<Photo>>, currentPage: number}>
}
