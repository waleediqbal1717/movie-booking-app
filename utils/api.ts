export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'c6b2128797e20d83af64838229525549';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500') => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string) => getImageUrl(path, 'w780');
export const getPosterUrl = (path: string) => getImageUrl(path, 'w500');
export const getThumbnailUrl = (path: string) => getImageUrl(path, 'w185'); 