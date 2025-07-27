import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BookingScreen } from '../components/screens/BookingScreen';

export default function BookingRoute() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const navigation = {
        navigate: (screen: string, params: any) => {
            if (screen === 'Payment') {
                router.push({
                    pathname: '/payment',
                    params: params,
                });
            }
        },
        goBack: () => router.back(),
    };

    return (
        <BookingScreen
            route={{
                params: {
                    movieId: Number(params.movieId),
                    movieTitle: String(params.movieTitle || 'Movie')
                }
            }}
            navigation={navigation}
        />
    );
} 