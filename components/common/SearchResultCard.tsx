import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';
import type { Movie } from '../../types/movie';

interface SearchResultCardProps {
    movie: Movie;
    onPress: (movie: Movie) => void;
    imageUrl?: string;
    genre?: string;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
    movie,
    onPress,
    imageUrl,
    genre = 'Fantasy'
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(movie)}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUrl || 'https://images.unsplash.com/photo-1489599162110-8c1c4d02e9b3?w=400&h=300&fit=crop' }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {movie.title}
                </Text>
                <Text style={styles.genre} numberOfLines={1}>
                    {genre}
                </Text>
            </View>
            <TouchableOpacity style={styles.optionsButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.optionsText}>⋯</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
    },
    imageContainer: {
        width: 80,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    genre: {
        fontSize: 14,
        color: '#666',
        fontWeight: '400',
    },
    optionsButton: {
        padding: spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsText: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
        lineHeight: 20,
    },
});