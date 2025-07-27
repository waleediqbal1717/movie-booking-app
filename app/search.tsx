import React from 'react';
import { useRouter } from 'expo-router';
import { SearchScreen } from '../components/screens/SearchScreen';

export default function SearchRoute() {
    const router = useRouter();

    const navigation = {
        navigate: (screen: string, params: any) => {
            if (screen === 'MovieDetail') {
                router.push({
                    pathname: '/movie-detail',
                    params: params,
                });
            }
        },
        goBack: () => router.back(),
    };

    return <SearchScreen navigation={navigation} />;
} 