import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_KEY } from '../utils/api';
import type {
    UpcomingMoviesResponse,
    MovieDetailsResponse,
    MovieVideosResponse,
    MovieImagesResponse
} from '../types/movie';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUpcomingMovies: builder.query<UpcomingMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({
                url: '/movie/upcoming',
                params: {
                    api_key: API_KEY,
                    page,
                },
            }),
        }),

        getMovieDetails: builder.query<MovieDetailsResponse, number>({
            query: (movieId) => ({
                url: `/movie/${movieId}`,
                params: {
                    api_key: API_KEY,
                },
            }),
        }),

        getMovieVideos: builder.query<MovieVideosResponse, number>({
            query: (movieId) => ({
                url: `/movie/${movieId}/videos`,
                params: {
                    api_key: API_KEY,
                },
            }),
        }),

        getMovieImages: builder.query<MovieImagesResponse, number>({
            query: (movieId) => ({
                url: `/movie/${movieId}/images`,
                params: {
                    api_key: API_KEY,
                },
            }),
        }),
    }),
});

export const {
    useGetUpcomingMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMovieVideosQuery,
    useGetMovieImagesQuery,
} = movieApi; 