export const colors = {
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#F59E0B',
    secondaryLight: '#FBBF24',
    secondaryDark: '#D97706',

    background: '#F2F2F6',
    backgroundDark: '#2E2739',
    surface: '#F9FAFB',
    surfaceDark: '#374151',

    text: '#202C43',
    textSecondary: '#6B7280',
    textLight: '#827D88',
    textDark: '#FFFFFF',

    border: '#E5E7EB',
    borderDark: '#4B5563',

    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',

    seat: {
        available: '#E0E7FF',
        selected: '#FCD34D',
        occupied: '#9CA3AF',
        vip: '#8B5CF6',
    },

    gradient: {
        primary: ['#6366F1', '#8B5CF6'],
        secondary: ['#F59E0B', '#EF4444'],
        dark: ['#1F2937', '#374151'],
    }
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
};

export const typography = {
    fontFamily: 'Poppins-Regular',
    fontFamilyLight: 'Poppins-Light',
    fontFamilyRegular: 'Poppins-Regular',
    fontFamilyMedium: 'Poppins-Medium',
    fontFamilySemiBold: 'Poppins-SemiBold',
    fontFamilyBold: 'Poppins-Bold',
    fontFamilyExtraBold: 'Poppins-ExtraBold',
    fontFamilyBlack: 'Poppins-Black',
    fontFamilyThin: 'Poppins-Thin',
    fontFamilyExtraLight: 'Poppins-ExtraLight',
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
    },
    weights: {
        thin: '100',
        extraLight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
    },
};

export const shadows = {
    sm: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lg: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
}; 