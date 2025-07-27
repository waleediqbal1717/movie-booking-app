import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const buttonStyle = [
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
    ];

    const textStyleArray = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textDark} />
            ) : (
                <Text style={textStyleArray}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },

    small: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    medium: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    large: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },

    disabled: {
        backgroundColor: colors.border,
        borderColor: colors.border,
    },

    text: {
        fontFamily: typography.fontFamily,
        fontWeight: '600' as const,
    },

    primaryText: {
        color: colors.textDark,
    },
    secondaryText: {
        color: colors.textDark,
    },
    outlineText: {
        color: colors.primary,
    },

    smallText: {
        fontSize: typography.sizes.sm,
    },
    mediumText: {
        fontSize: typography.sizes.md,
    },
    largeText: {
        fontSize: typography.sizes.lg,
    },

    disabledText: {
        color: colors.textLight,
    },
}); 