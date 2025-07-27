import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { colors, spacing, typography } from '../constants/theme';

export default function PaymentRoute() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const handlePayment = () => {
        router.push('/(tabs)');
    };

    return (
        <Container>
            <View style={styles.container}>
                <Text style={styles.title}>Payment</Text>
                <Text style={styles.subtitle}>Complete your booking</Text>

                <View style={styles.summary}>
                    <Text style={styles.summaryTitle}>Booking Summary</Text>
                    <Text style={styles.summaryText}>Movie: {params.movieTitle}</Text>
                    <Text style={styles.summaryText}>Total: ${params.totalPrice}</Text>
                </View>

                <Button
                    title="Complete Payment"
                    onPress={handlePayment}
                    style={styles.paymentButton}
                />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: typography.sizes.xxl,
        fontFamily: typography.fontFamily,
        fontWeight: '700' as const,
        color: colors.text,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '400' as const,
        color: colors.textSecondary,
        marginBottom: 32,
    },
    summary: {
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 12,
        marginBottom: 32,
        width: '100%',
    },
    summaryTitle: {
        fontSize: typography.sizes.lg,
        fontFamily: typography.fontFamily,
        fontWeight: '600' as const,
        color: colors.text,
        marginBottom: 16,
    },
    summaryText: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamily,
        fontWeight: '400' as const,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    paymentButton: {
        width: '100%',
    },
}); 