import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { Container } from '../common/Container';
import { colors, spacing, typography } from '../../constants/theme';
import type { Movie } from '../../types/movie';
import { SearchResultCard } from '../common/SearchResultCard';
import { search } from '@/assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchScreenProps {
    navigation: any;
}

const mockSearchResults: Movie[] = [
    {
        id: 1,
        title: 'Timeless',
        overview: 'A fantasy adventure movie',
        poster_path: '/path/to/poster1.jpg',
        backdrop_path: '/path/to/backdrop1.jpg',
        release_date: '2023-01-01',
        vote_average: 8.5,
        vote_count: 1000,
        popularity: 100,
        genre_ids: [1, 2],
        adult: false,
        video: false,
        original_language: 'en',
        original_title: 'Timeless',
    },
    {
        id: 2,
        title: 'In Time',
        overview: 'A sci-fi thriller',
        poster_path: '/path/to/poster2.jpg',
        backdrop_path: '/path/to/backdrop2.jpg',
        release_date: '2023-02-01',
        vote_average: 7.8,
        vote_count: 800,
        popularity: 90,
        genre_ids: [3, 4],
        adult: false,
        video: false,
        original_language: 'en',
        original_title: 'In Time',
    },
    {
        id: 3,
        title: 'A Time To Kill',
        overview: 'A crime drama',
        poster_path: '/path/to/poster3.jpg',
        backdrop_path: '/path/to/backdrop3.jpg',
        release_date: '2023-03-01',
        vote_average: 8.2,
        vote_count: 1200,
        popularity: 110,
        genre_ids: [5, 6],
        adult: false,
        video: false,
        original_language: 'en',
        original_title: 'A Time To Kill',
    },
];

const categoryImages = {
    'Comedies': 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
    'Crime': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'Family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop',
    'Documentaries': 'https://images.unsplash.com/photo-1489599162110-8c1c4d02e9b3?w=400&h=300&fit=crop',
    'Dramas': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop',
    'Fantasy': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    'Holidays': 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    'Horror': 'https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400&h=300&fit=crop',
    'Sci-Fi': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
    'Thriller': 'https://images.unsplash.com/photo-1489599162110-8c1c4d02e9b3?w=400&h=300&fit=crop',
};

const searchResultImages = {
    'Timeless': 'https://images.unsplash.com/photo-1489599162110-8c1c4d02e9b3?w=400&h=300&fit=crop',
    'In Time': 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
    'A Time To Kill': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
};

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query.trim()) {
            const filtered = mockSearchResults.filter(movie =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    };

    const handleMoviePress = (movie: Movie) => {
        navigation.navigate('MovieDetail', { movieId: movie.id });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const renderSearchResult = ({ item }: { item: Movie }) => (
        <SearchResultCard
            movie={item}
            onPress={handleMoviePress}
            imageUrl={searchResultImages[item.title as keyof typeof searchResultImages]}
            genre={item.title === 'Timeless' ? 'Fantasy' :
                item.title === 'In Time' ? 'Sci-Fi' : 'Crime'}
        />
    );

    const categories = [
        { id: 1, name: 'Comedies' },
        { id: 2, name: 'Crime' },
        { id: 3, name: 'Family' },
        { id: 4, name: 'Documentaries' },
        { id: 5, name: 'Dramas' },
        { id: 6, name: 'Fantasy' },
        { id: 7, name: 'Holidays' },
        { id: 8, name: 'Horror' },
        { id: 9, name: 'Sci-Fi' },
        { id: 10, name: 'Thriller' },
    ];

    const renderCategoryItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.categoryImageContainer}>
                <Image
                    source={{ uri: categoryImages[item.name as keyof typeof categoryImages] }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                />
                <View style={styles.categoryOverlay} />
                <Text style={styles.categoryName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: colors.background }}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Image source={search} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="TV shows, movies and more"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            autoFocus={false}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={handleClearSearch}>
                                <Text style={styles.clearButton}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            {searchQuery.length > 0 && (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Top Results</Text>
                    <FlatList
                        data={searchResults}
                        renderItem={renderSearchResult}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        style={styles.resultsList}
                    />
                </View>
            )}
            {searchQuery.length === 0 && (
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.categoryRow}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContent}
                    />
                </View>
            )}
        </View>
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
    },
    searchContainer: {
        paddingHorizontal: spacing.md,
        width: '100%',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F6',
        borderRadius: 100,
        paddingHorizontal: spacing.md,
    },
    searchIcon: {
        height: 36,
        width: 36,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: colors.text,
        fontFamily: typography.fontFamily,
    },
    clearButton: {
        color: colors.text,
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: spacing.md,
    },
    resultsList: {
        flex: 1,
    },
    searchResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        marginBottom: spacing.sm,
    },
    searchResultImageContainer: {
        width: 80,
        height: 60,
        marginRight: spacing.md,
        borderRadius: 8,
        overflow: 'hidden',
    },
    searchResultImage: {
        width: '100%',
        height: '100%',
    },
    searchResultContent: {
        flex: 1,
    },
    searchResultTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    searchResultGenre: {
        fontSize: 14,
        color: '#666',
    },
    searchResultOptions: {
        padding: spacing.sm,
    },
    searchResultOptionsText: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    categoriesContainer: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    categoriesContent: {
        paddingBottom: spacing.xl,
    },
    categoryRow: {
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    categoryCard: {
        flex: 1,
        marginHorizontal: spacing.xs,
    },
    categoryImageContainer: {
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    categoryName: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});