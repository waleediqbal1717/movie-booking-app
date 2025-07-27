import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/common/Container';
import { colors, typography } from '../../constants/theme';

export default function MoreScreen() {
    return (
        <Container>
            <View style={styles.container}>
                <Text style={styles.title}>More Options</Text>
                <Text style={styles.subtitle}>Settings and additional features will be available here</Text>
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
        textAlign: 'center',
    },
}); 