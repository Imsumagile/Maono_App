import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const globalStyles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollView: {
        flex: 1,
    },

    // Spacing
    px6: {
        paddingHorizontal: 24,
    },
    py4: {
        paddingVertical: 16,
    },
    pt8: {
        paddingTop: 32,
    },
    pb4: {
        paddingBottom: 16,
    },
    mb4: {
        marginBottom: 16,
    },
    mb6: {
        marginBottom: 24,
    },
    mb8: {
        marginBottom: 32,
    },
    mt8: {
        marginTop: 32,
    },
    mr4: {
        marginRight: 16,
    },
    ml3: {
        marginLeft: 12,
    },

    // Flex
    flexRow: {
        flexDirection: 'row',
    },
    itemsCenter: {
        alignItems: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    flex1: {
        flex: 1,
    },

    // Text
    textPrimary: {
        color: Colors.textPrimary,
    },
    textSecondary: {
        color: Colors.textSecondary,
    },
    textDisabled: {
        color: Colors.textDisabled,
    },
    textWhite: {
        color: '#FFFFFF',
    },
    textBold: {
        fontWeight: 'bold',
    },
    textSemibold: {
        fontWeight: '600',
    },
    text2xl: {
        fontSize: 24,
    },
    textLg: {
        fontSize: 18,
    },
    textBase: {
        fontSize: 16,
    },
    textSm: {
        fontSize: 14,
    },
    textXs: {
        fontSize: 12,
    },

    // Backgrounds
    bgWhite: {
        backgroundColor: '#FFFFFF',
    },
    bgMuted: {
        backgroundColor: Colors.backgroundMuted,
    },
    bgPrimary: {
        backgroundColor: Colors.primary,
    },

    // Borders
    rounded2xl: {
        borderRadius: 16,
    },
    roundedXl: {
        borderRadius: 12,
    },
    roundedFull: {
        borderRadius: 9999,
    },
    borderGray: {
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    // Shadows
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },

    // Cards
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },

    // Buttons
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Input
    input: {
        backgroundColor: Colors.backgroundMuted,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
});
