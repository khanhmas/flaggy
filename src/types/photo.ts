export interface Tag {
    type: string;
    title: string;
    source: Record<string, unknown>;
}

export interface Photo {
    alt_description: string;
    blur_hash: string;
    description: string;
    width: number;
    height: number;
    id: string;
    likes: number;
    links: {
        download: string;
        download_location: string;
        html: string;
    };
    tags: Array<Tag>;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };
    user: PhotoGrapher;
    // custom attributes
    classSize?: string;
}

export interface SearchResponse {
    total: number;
    total_pages: number;
    results: Array<Photo>;
}

export interface PhotoGrapher {
    username: string;
    links: {
        html: string;
    };
    profile_image: {
        large: string;
        medium: string;
        small: string;
    };
}
