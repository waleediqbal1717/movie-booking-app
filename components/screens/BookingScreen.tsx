import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    Image,
} from 'react-native';
import { Container } from '../common/Container';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';
import { SeatSelectionComponent } from '../common/SeatSelection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { back } from '@/assets/images';

interface BookingScreenProps {
    route: { params: { movieId: number; movieTitle: string } };
    navigation: any;
}


export const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
    const { movieId, movieTitle } = route.params;
    const { width } = useWindowDimensions();
    const isLandscape = width > 600;
    const insets = useSafeAreaInsets();

    const selectedDate = '5 Mar';
    const selectedShowtime = '12:30';
    const showSeatSelection = false;

    const dates = ['5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar'];
    const showtimes = [
        { time: '12:30', hall: 'Cinetech + Hall 1', price: 50, bonus: 2500 },
        { time: '13:30', hall: 'Cinetech', price: 75, bonus: 300 },
        { time: '14:30', hall: 'Cinetech + Hall 2', price: 60, bonus: 2000 },
    ];


    const generateMiniSeats = () => {
        const seats: any[][] = [];
        for (let row = 0; row < 8; row++) {
            const rowSeats = [];
            for (let col = 0; col < 11; col++) {
                let status = 'available';
                if (Math.random() < 0.3) status = 'occupied';
                if (row >= 6) status = 'vip';
                rowSeats.push({ status });
            }
            seats.push(rowSeats);
        }
        return seats;
    };

    const miniSeats = generateMiniSeats();

    const handleSelectSeats = () => {

        console.log('Select seats pressed');
    };

    const getSeatColor = (status: string) => {
        switch (status) {
            case 'available':
                return '#87CEEB';
            case 'occupied':
                return '#FF6B6B';
            case 'vip':
                return '#10B981';
            default:
                return '#87CEEB';
        }
    };

    const totalPrice = 100;

    if (showSeatSelection) {
        return (
            <SeatSelectionComponent
                movieTitle={movieTitle}
                selectedDate={selectedDate}
                selectedShowtime={selectedShowtime}
                onBack={() => console.log('Back pressed')}
                totalPrice={totalPrice}
            />
        );
    }

    return (
        <Container style={{ paddingHorizontal: 0, paddingTop: insets.top }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={back} tintColor={colors.text} style={styles.backButton} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.movieTitle}>{movieTitle}</Text>
                    <Text style={styles.movieSubtitle}>In Theaters December 22, 2021</Text>
                </View>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Date</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.dateContainer}>
                            {dates.map((date) => (
                                <View
                                    key={date}
                                    style={[
                                        styles.dateButton,
                                        selectedDate === date && styles.selectedDateButton,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dateText,
                                            selectedDate === date && styles.selectedDateText,
                                        ]}
                                    >
                                        {date}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>


                <View style={styles.section}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.showtimeScrollContainer}
                    >
                        {showtimes.map((showtime) => (
                            <View
                                key={showtime.time}
                                style={[
                                    styles.showtimeCard,
                                    selectedShowtime === showtime.time && styles.selectedShowtimeCard,
                                ]}
                            >
                                <View style={styles.showtimeHeader}>
                                    <Text style={styles.showtimeText}>{showtime.time}</Text>
                                    <Text style={styles.hallText}>{showtime.hall}</Text>
                                </View>


                                <View style={styles.miniSeatMap}>
                                    {miniSeats.map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.miniSeatRow}>
                                            {row.map((seat, seatIndex) => (
                                                <View
                                                    key={seatIndex}
                                                    style={[
                                                        styles.miniSeat,
                                                        { backgroundColor: getSeatColor(seat.status) },
                                                    ]}
                                                />
                                            ))}
                                        </View>
                                    ))}
                                </View>

                                <Text style={styles.priceText}>
                                    From {showtime.price}$ or {showtime.bonus} bonus
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>


            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.selectSeatsButton} onPress={handleSelectSeats}>
                    <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: '#fff'
    },
    backButton: {
        width: 36,
        height: 36,
        position: 'absolute'
    },
    backButtonText: {
        fontSize: 24,
        fontWeight: '400',
        color: colors.text,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
    },
    movieTitle: {
        fontSize: typography.sizes.lg,
        fontFamily: typography.fontFamily,
        fontWeight: '600',
        color: colors.text,
        textAlign: 'center',
    },
    movieSubtitle: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '400',
        color: '#87CEEB',
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    container: {
        flex: 1,
        paddingHorizontal: spacing.md
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.md,
    },
    dateContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
    },
    dateButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        backgroundColor: '#A6A6A61A',
        borderWidth: 1,
        borderColor: colors.border,
        minWidth: 80,
        alignItems: 'center',
    },
    selectedDateButton: {
        backgroundColor: '#87CEEB',
        borderColor: '#87CEEB',
    },
    dateText: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamilyMedium,
        fontWeight: '500',
        color: colors.text,
    },
    selectedDateText: {
        color: colors.background,
        fontWeight: '600',
    },
    showtimeScrollContainer: {
        paddingHorizontal: spacing.sm,
    },
    showtimeCard: {
        width: 280,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: spacing.md,
        minHeight: 200,
    },
    selectedShowtimeCard: {
        borderColor: '#87CEEB',
        borderWidth: 2,
    },
    showtimeHeader: {
        marginBottom: spacing.md,
    },
    showtimeText: {
        fontSize: typography.sizes.xl,
        fontFamily: typography.fontFamily,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    hallText: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '400',
        color: colors.textSecondary,
    },
    miniSeatMap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: spacing.md,
    },
    miniSeatRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3,
        marginBottom: 3,
    },
    miniSeat: {
        width: 6,
        height: 6,
        borderRadius: 1,
    },
    priceText: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '500',
        color: colors.text,
        textAlign: 'left',
    },
    bottomSection: {
        padding: spacing.lg,
        paddingBottom: spacing.xl,
    },
    selectSeatsButton: {
        width: '100%',
        backgroundColor: '#87CEEB',
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectSeatsButtonText: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '600',
        color: colors.background,
    },
});