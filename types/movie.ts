export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    video: boolean;
    original_language: string;
    original_title: string;
}

export interface MovieDetails extends Movie {
    runtime: number;
    status: string;
    tagline: string;
    genres: Genre[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    budget: number;
    revenue: number;
    homepage: string;
    imdb_id: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MovieVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

export interface MovieImages {
    backdrops: MovieImage[];
    posters: MovieImage[];
    logos: MovieImage[];
}

export interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
}

export interface UpcomingMoviesResponse {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieDetailsResponse extends MovieDetails { }

export interface MovieVideosResponse {
    id: number;
    results: MovieVideo[];
}

export interface MovieImagesResponse extends MovieImages { } 