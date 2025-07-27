import React from 'react';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: keyof typeof spacing;
    backgroundColor?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    style,
    padding = 'md',
    backgroundColor = colors.background,
}) => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor,
        paddingHorizontal: isLandscape ? spacing.xl : spacing[padding],
        paddingTop: insets.top,
        paddingBottom: spacing[padding],
        ...style,
    };

    return <View style={containerStyle}>{children}</View>;
}; 