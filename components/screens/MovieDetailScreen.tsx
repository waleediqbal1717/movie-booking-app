import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    Modal,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetMovieDetailsQuery, useGetMovieVideosQuery } from '../../store/api';
import { Button } from '../common/Button';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { getBackdropUrl, getPosterUrl } from '../../utils/api';
import { back } from '@/assets/images';

interface MovieDetailScreenProps {
    route: { params: { movieId: number } };
    navigation: any;
}

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const webViewRef = useRef<WebView>(null);

    const {
        data: movieDetails,
        isLoading: detailsLoading,
        error: detailsError,
    } = useGetMovieDetailsQuery(movieId);

    const {
        data: videosData,
        isLoading: videosLoading,
    } = useGetMovieVideosQuery(movieId);

    const handleWatchTrailer = () => {
        const trailer = videosData?.results.find(video => video.type === 'Trailer');
        if (trailer) {
            setSelectedVideo(trailer.key);
            setShowTrailer(true);
        }
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
        setSelectedVideo(null);
    };

    const handleBookTickets = () => {
        navigation.navigate('Booking', { movieId, movieTitle: movieDetails?.title });
    };

    if (detailsLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (detailsError || !movieDetails) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load movie details</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} />
            </SafeAreaView>
        );
    }

    const heroHeight = isLandscape ? height * 0.7 : height * 0.5;


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >

                <View style={[styles.heroSection, { height: heroHeight }]}>
                    <Image
                        source={{ uri: getBackdropUrl(movieDetails.backdrop_path) }}
                        style={styles.backdropImage}
                        resizeMode="cover"
                    />


                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    />


                    <View style={styles.navigationHeader}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={back} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={styles.navigationTitle}>Watch</Text>
                    </View>


                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.xxl }}>
                        <Text style={styles.releaseInfo}>
                            In Theaters {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Text>
                        <View style={isLandscape ? styles.actionButtonsLandscape : styles.actionButtons}>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleBookTickets}>
                                <Text style={styles.primaryButtonText}>Get Tickets</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={handleWatchTrailer}
                                disabled={videosLoading || !videosData?.results.length}
                            >
                                <View style={styles.playIcon}>
                                    <Text style={styles.playIconText}>▶</Text>
                                </View>
                                <Text style={styles.secondaryButtonText}>Watch Trailer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.contentCard}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Genres</Text>
                        <View style={styles.genresContainer}>
                            {movieDetails.genres.slice(0, 4).map((genre, index) => {
                                const genreColors = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'];
                                return (
                                    <View
                                        key={genre.id}
                                        style={[styles.genreTag, { backgroundColor: genreColors[index % genreColors.length] }]}
                                    >
                                        <Text style={styles.genreText}>{genre.name}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>


                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.overviewText}>{movieDetails.overview}</Text>
                    </View>


                    {isLandscape && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Details</Text>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Runtime</Text>
                                    <Text style={styles.detailValue}>{movieDetails.runtime} min</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Rating</Text>
                                    <Text style={styles.detailValue}>★ {movieDetails.vote_average.toFixed(1)}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Status</Text>
                                    <Text style={styles.detailValue}>{movieDetails.status}</Text>
                                </View>
                            </View>
                        </View>
                    )}


                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>


            <Modal
                visible={showTrailer}
                animationType="fade"
                presentationStyle="fullScreen"
                statusBarTranslucent
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleCloseTrailer}
                    >
                        <Text style={styles.closeButtonText}>Done</Text>
                    </TouchableOpacity>

                    {selectedVideo && (
                        <WebView
                            ref={webViewRef}
                            source={{
                                html: `
                                    <!DOCTYPE html>
                                    <html>
                                        <head>
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                                            <style>
                                                body { 
                                                    margin: 0; 
                                                    padding: 0; 
                                                    background: #000; 
                                                    font-family: Arial, sans-serif;
                                                }
                                                .video-container { 
                                                    position: relative; 
                                                    width: 100vw; 
                                                    height: 100vh; 
                                                    display: flex; 
                                                    align-items: center; 
                                                    justify-content: center; 
                                                }
                                                iframe { 
                                                    width: 100%; 
                                                    height: 100%; 
                                                    border: none; 
                                                }
                                            </style>
                                        </head>
                                        <body>
                                            <div class="video-container">
                                                <iframe 
                                                    id="youtube-player"
                                                    src="https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&enablejsapi=1&origin=*" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen>
                                                </iframe>
                                            </div>
                                            <script src="https://www.youtube.com/iframe_api"></script>
                                            <script>
                                                let player;
                                                
                                                function onYouTubeIframeAPIReady() {
                                                    player = new YT.Player('youtube-player', {
                                                        events: {
                                                            'onStateChange': onPlayerStateChange
                                                        }
                                                    });
                                                }
                                                
                                                function onPlayerStateChange(event) {
                                                    // YT.PlayerState.ENDED = 0
                                                    if (event.data === YT.PlayerState.ENDED) {
                                                        window.ReactNativeWebView.postMessage('videoEnded');
                                                    }
                                                }
                                                
                                                // Fallback method in case API doesn't load
                                                let checkInterval = setInterval(function() {
                                                    const iframe = document.getElementById('youtube-player');
                                                    if (iframe && iframe.contentDocument) {
                                                        try {
                                                            const video = iframe.contentDocument.querySelector('video');
                                                            if (video && video.ended) {
                                                                window.ReactNativeWebView.postMessage('videoEnded');
                                                                clearInterval(checkInterval);
                                                            }
                                                        } catch(e) {
                                                            // Cross-origin restrictions
                                                        }
                                                    }
                                                }, 2000);
                                                
                                                // Clean up interval after 5 minutes
                                                setTimeout(() => clearInterval(checkInterval), 300000);
                                            </script>
                                        </body>
                                    </html>
                                `
                            }}
                            style={styles.video}
                            allowsFullscreenVideo={true}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={false}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            scalesPageToFit={true}
                            onMessage={(event) => {
                                if (event.nativeEvent.data === 'videoEnded') {
                                    handleCloseTrailer();
                                }
                            }}
                            onNavigationStateChange={(navState) => {
                                // Close modal if user navigates away from video
                                if (navState.url && !navState.url.includes('youtube.com/embed') && !navState.url.includes('about:blank')) {
                                    handleCloseTrailer();
                                }
                            }}
                            onError={(syntheticEvent) => {
                                console.warn('WebView error: ', syntheticEvent.nativeEvent);
                            }}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        position: 'relative',
        width: '100%',
    },
    backdropImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    navigationHeader: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        zIndex: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    navigationTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: typography.fontFamily,
    },
    movieTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: spacing.xs,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        fontFamily: typography.fontFamily,
    },
    releaseInfo: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: spacing.sm,
        fontFamily: typography.fontFamilySemiBold,
    },
    contentCard: {
        backgroundColor: '#fff',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        minHeight: '50%',
    },
    actionButtons: {
        marginBottom: spacing.xl,
    },
    actionButtonsLandscape: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    primaryButton: {
        backgroundColor: '#61C3F2',
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: typography.fontFamily,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: '#61C3F2'
    },
    playIcon: {
        marginRight: spacing.sm,
    },
    playIconText: {
        color: '#fff',
        fontSize: 14,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: typography.fontFamily,
    },
    profileSection: {
        alignItems: 'flex-end',
        marginBottom: spacing.xl,
    },
    profileAvatars: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarD: {
        backgroundColor: '#6B7280',
    },
    avatarS: {
        backgroundColor: '#6366F1',
    },
    avatarText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 16,
        color: colors.text,
        fontFamily: typography.fontFamilySemiBold,
        marginBottom: spacing.md,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    genreTag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    genreText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: typography.fontFamilyBold,
    },
    overviewText: {
        fontSize: 14,
        color: colors.text,
        fontFamily: typography.fontFamily,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    detailItem: {
        flex: 1,
        minWidth: 100,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        fontSize: 18,
        color: '#6B7280',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: spacing.lg,
    },
    errorText: {
        fontSize: 18,
        color: '#EF4444',
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: spacing.lg,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    video: {
        flex: 1,
        backgroundColor: 'black'
    },
});