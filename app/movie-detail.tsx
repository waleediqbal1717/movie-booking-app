import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MovieDetailScreen } from '../components/screens/MovieDetailScreen';

export default function MovieDetailRoute() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const navigation = {
        navigate: (screen: string, params: any) => {
            if (screen === 'Booking') {
                router.push({
                    pathname: '/booking',
                    params: params,
                });
            }
        },
        goBack: () => router.back(),
    };

    return (
        <MovieDetailScreen
            route={{ params: { movieId: Number(params.movieId) } }}
            navigation={navigation}
        />
    );
} 