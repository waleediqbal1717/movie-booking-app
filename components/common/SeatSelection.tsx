import React from 'react';
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
import { screen } from '@/assets/images';

interface Seat {
    id: string;
    row: number;
    column: number;
    status: 'available' | 'occupied' | 'selected' | 'vip';
    price: number;
}

interface SeatSelectionComponentProps {
    movieTitle: string;
    selectedDate: string;
    selectedShowtime: string;
    onBack: () => void;
    totalPrice: number;
}

export const SeatSelectionComponent: React.FC<SeatSelectionComponentProps> = ({
    movieTitle,
    selectedDate,
    selectedShowtime,
    onBack,
    totalPrice = 100,
}) => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;


    const seatSize = isLandscape ? Math.min(width / 30, 20) : Math.min(width / 25, 18);
    const seatSpacing = isLandscape ? 2 : 1;


    const getStaticSeatStatus = (rowIndex: number, seatNumber: number): 'available' | 'occupied' | 'selected' | 'vip' => {

        if (rowIndex >= 10) {
            return 'vip';
        }


        const occupiedSeats = [
            [2, 5], [2, 6], [4, 11], [4, 12], [5, 2], [5, 3], [5, 16], [5, 17]
        ];

        const selectedSeats = [
            [2, 15]
        ];

        if (selectedSeats.some(([r, s]) => r === rowIndex && s === seatNumber)) {
            return 'selected';
        }

        if (occupiedSeats.some(([r, s]) => r === rowIndex && s === seatNumber)) {
            return 'occupied';
        }

        return 'available';
    };

    const generateSeats = (): Seat[][] => {
        const seats: Seat[][] = [];


        const seatLayout = [

            { leftSeats: 2, centerSeats: 0, rightSeats: 2, gaps: [2, 2] },

            { leftSeats: 4, centerSeats: 10, rightSeats: 4, gaps: [0, 0] },

            { leftSeats: 4, centerSeats: 10, rightSeats: 4, gaps: [0, 0] },

            { leftSeats: 4, centerSeats: 8, rightSeats: 4, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 10, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 8, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 10, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 8, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 10, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 8, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 10, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 5, centerSeats: 8, rightSeats: 5, gaps: [0, 0] },

            { leftSeats: 0, centerSeats: 4, rightSeats: 4, gaps: [4, 0] },
        ];

        seatLayout.forEach((rowConfig, rowIndex) => {
            const rowSeats: Seat[] = [];
            let seatNumber = 1;


            for (let i = 0; i < rowConfig.leftSeats; i++) {
                const seatId = `${rowIndex + 1}-${seatNumber}`;
                rowSeats.push({
                    id: seatId,
                    row: rowIndex + 1,
                    column: seatNumber,
                    status: getStaticSeatStatus(rowIndex, seatNumber),
                    price: rowIndex >= 10 ? 150 : 50,
                });
                seatNumber++;
            }


            for (let i = 0; i < rowConfig.gaps[0]; i++) {
                rowSeats.push({
                    id: `gap-${rowIndex + 1}-${seatNumber}`,
                    row: rowIndex + 1,
                    column: seatNumber,
                    status: 'gap' as any,
                    price: 0,
                });
                seatNumber++;
            }


            for (let i = 0; i < rowConfig.centerSeats; i++) {
                const seatId = `${rowIndex + 1}-${seatNumber}`;
                rowSeats.push({
                    id: seatId,
                    row: rowIndex + 1,
                    column: seatNumber,
                    status: getStaticSeatStatus(rowIndex, seatNumber),
                    price: rowIndex >= 10 ? 150 : 50,
                });
                seatNumber++;
            }


            for (let i = 0; i < rowConfig.gaps[1]; i++) {
                rowSeats.push({
                    id: `gap-${rowIndex + 1}-${seatNumber}`,
                    row: rowIndex + 1,
                    column: seatNumber,
                    status: 'gap' as any,
                    price: 0,
                });
                seatNumber++;
            }


            for (let i = 0; i < rowConfig.rightSeats; i++) {
                const seatId = `${rowIndex + 1}-${seatNumber}`;
                rowSeats.push({
                    id: seatId,
                    row: rowIndex + 1,
                    column: seatNumber,
                    status: getStaticSeatStatus(rowIndex, seatNumber),
                    price: rowIndex >= 10 ? 150 : 50,
                });
                seatNumber++;
            }

            seats.push(rowSeats);
        });

        return seats;
    };


    const seats = generateSeats();


    const selectedSeats = [
        { id: '3-15', row: 3, column: 15, status: 'selected' as const, price: 50 }
    ];

    const getSeatColor = (seat: any) => {
        if (seat.status === 'gap') {
            return 'transparent';
        }

        if (seat.status === 'selected') {
            return '#6366F1';
        }

        switch (seat.status) {
            case 'available':
                return '#87CEEB';
            case 'occupied':
                return '#FF6B6B';
            case 'vip':
                return '#10B981';
            default:
                return '#E5E5E5';
        }
    };

    const renderSeat = (seat: any, index: number) => {
        if (seat.status === 'gap') {
            return (
                <View
                    key={seat.id}
                    style={{
                        width: seatSize,
                        height: seatSize,
                    }}
                />
            );
        }

        return (
            <View
                key={seat.id}
                style={[
                    styles.seat,
                    {
                        width: seatSize,
                        height: seatSize,
                        backgroundColor: getSeatColor(seat),
                        borderColor: seat.status === 'selected' ? '#4F46E5' : 'transparent',
                        borderWidth: seat.status === 'selected' ? 2 : 0,
                    }
                ]}
            />
        );
    };

    return (
        <Container>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.movieTitle}>{movieTitle}</Text>
                    <Text style={styles.movieSubtitle}>
                        {selectedDate} • {selectedShowtime}
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >

                <Image source={screen} style={{ width: '100%', height: 100 }} />

                <View style={[styles.seatMapContainer, isLandscape && styles.seatMapLandscape]}>
                    {seats.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.seatRowContainer}>
                            <Text style={[styles.rowNumber, { fontSize: Math.max(seatSize * 0.6, 10) }]}>
                                {rowIndex + 1}
                            </Text>

                            <View style={[styles.seatRow, { gap: seatSpacing }]}>
                                {row.map((seat, seatIndex) => renderSeat(seat, seatIndex))}
                            </View>

                            <Text style={[styles.rowNumber, { fontSize: Math.max(seatSize * 0.6, 10) }]}>
                                {rowIndex + 1}
                            </Text>
                        </View>
                    ))}
                </View>


                <View style={[styles.legend, isLandscape && styles.legendLandscape]}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#6366F1' }]} />
                        <Text style={styles.legendText}>Selected</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
                        <Text style={styles.legendText}>Not available</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
                        <Text style={styles.legendText}>VIP (150$)</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#87CEEB' }]} />
                        <Text style={styles.legendText}>Regular (50$)</Text>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.bottomSection}>
                <View style={styles.selectionSummary}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedSeatsScroll}
                    >
                        <View style={styles.selectedSeatTag}>
                            <Text style={styles.selectedSeatText}>15/3</Text>
                            <TouchableOpacity style={styles.removeSeatButton}>
                                <Text style={styles.removeSeatText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPriceLabel}>Total Price</Text>
                        <Text style={styles.totalPrice}>$ {totalPrice}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Ticket • $ {totalPrice}</Text>
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
        paddingTop: spacing.md,
    },
    backButton: {
        marginRight: spacing.md,
        padding: spacing.sm,
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
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: spacing.xl,
    },
    screenContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    screenIndicator: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.sm,
    },
    screenText: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '500',
        color: colors.textSecondary,
        letterSpacing: 2,
    },
    screenCurve: {
        width: 200,
        height: 2,
        backgroundColor: colors.border,
        borderRadius: 2,
    },
    seatMapContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    seatMapLandscape: {
        transform: [{ scale: 0.8 }],
    },
    seatRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    rowNumber: {
        width: 25,
        fontFamily: typography.fontFamily,
        fontWeight: '500',
        color: colors.textSecondary,
        textAlign: 'center',
    },
    seatRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    seat: {
        borderRadius: 4,
    },
    legend: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    legendLandscape: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 2,
    },
    legendText: {
        fontSize: typography.sizes.xs,
        fontFamily: typography.fontFamily,
        fontWeight: '400',
        color: colors.textSecondary,
    },
    bottomSection: {
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    selectionSummary: {
        marginBottom: spacing.lg,
    },
    selectedSeatsScroll: {
        marginBottom: spacing.md,
    },
    selectedSeatTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        marginRight: spacing.sm,
    },
    selectedSeatText: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '500',
        color: colors.text,
        marginRight: spacing.sm,
    },
    removeSeatButton: {
        padding: spacing.xs,
    },
    removeSeatText: {
        fontSize: typography.sizes.sm,
        color: colors.error,
        fontWeight: '600',
    },
    totalPriceContainer: {
        alignItems: 'center',
    },
    totalPriceLabel: {
        fontSize: typography.sizes.sm,
        fontFamily: typography.fontFamily,
        fontWeight: '500',
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    totalPrice: {
        fontSize: typography.sizes.xl,
        fontFamily: typography.fontFamily,
        fontWeight: '700',
        color: colors.text,
    },
    buyButton: {
        width: '100%',
        backgroundColor: '#87CEEB',
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButtonText: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '600',
        color: colors.background,
    },
});