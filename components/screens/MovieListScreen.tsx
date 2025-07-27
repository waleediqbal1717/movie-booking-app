import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    useWindowDimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGetUpcomingMoviesQuery } from '../../store/api';
import { MovieCard } from '../common/MovieCard';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { colors, spacing, typography } from '../../constants/theme';
import type { Movie } from '../../types/movie';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { search } from '@/assets/images';

export const MovieListScreen: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const insets = useSafeAreaInsets();

    const {
        data: moviesData,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useGetUpcomingMoviesQuery({ page });

    const handleMoviePress = (movie: Movie) => {
        router.push({
            pathname: '/movie-detail',
            params: { movieId: movie.id },
        });
    };

    const handleLoadMore = () => {
        if (moviesData && page < moviesData.total_pages) {
            setPage(page + 1);
        }
    };

    const handleRefresh = () => {
        setPage(1);
        refetch();
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <MovieCard
            movie={item}
            onPress={handleMoviePress}
            style={{ marginBottom: spacing.md }}
        />
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.title}>Watch</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
                <Image source={search} style={styles.searchButton} tintColor={colors.textLight} />
            </TouchableOpacity>

        </View>
    );

    const renderFooter = () => {
        if (!moviesData || page >= moviesData.total_pages) return null;

        return (
            <View style={styles.footer}>
                <Button
                    title="Load More"
                    onPress={handleLoadMore}
                    loading={isFetching}
                    variant="outline"
                />
            </View>
        );
    };

    if (error) {
        return (
            <Container>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load movies</Text>
                    <Button title="Retry" onPress={handleRefresh} />
                </View>
            </Container>
        );
    }

    return (
        <Container style={styles.container}>
            {renderHeader()}
            <FlatList
                data={moviesData?.results || []}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background || '#f5f5f5',
        paddingHorizontal: 0,
        alignItems: 'center'
    },
    header: {
        marginBottom: spacing.lg,
        backgroundColor: 'white',
        paddingVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: spacing.md,
    },
    title: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '500' as const,
        color: colors.text || '#000',
    },
    searchButton: {
        width: 50,
        height: 50,
    },
    listContainer: {
        paddingBottom: spacing.xl,
    },
    footer: {
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: typography.sizes.lg,
        fontFamily: typography.fontFamily,
        fontWeight: '500' as const,
        color: colors.error,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
});