import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions, ImageStyle } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../constants/theme';
import { getPosterUrl } from '../../utils/api';
import type { Movie } from '../../types/movie';
import { LinearGradient } from 'expo-linear-gradient';

interface MovieCardProps {
    movie: Movie;
    onPress: (movie: Movie) => void;
    style?: any;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, style }) => {
    const { width } = useWindowDimensions();


    const cardWidth = width - (spacing.md * 2);
    const imageHeight = 200;

    return (
        <TouchableOpacity
            style={[styles.container, { width: cardWidth }, style]}
            onPress={() => onPress(movie)}
            activeOpacity={0.8}
        >
            <View style={[styles.imageContainer, { height: imageHeight }]}>
                <Image
                    source={{ uri: getPosterUrl(movie.poster_path) }}
                    style={styles.image as ImageStyle}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                    style={styles.gradientOverlay}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {movie.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.sm,
        ...shadows.md,
    },
    imageContainer: {
        borderRadius: borderRadius.lg || 12,
        overflow: 'hidden',
        backgroundColor: colors.surface || '#fff',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    titleContainer: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        right: spacing.md,
    },
    title: {
        fontSize: typography.sizes.lg || 18,
        fontFamily: typography.fontFamily,
        fontWeight: '700' as const,
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});