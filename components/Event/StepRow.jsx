import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../theme';

const StepRow = ({
    step,
    text
}) => (
    <View style={styles.container}>
        <View style={styles.stepContainer}>
            <Text style={styles.stepText}>{step}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
    </View>
)

export default StepRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8, 
        alignItems: 'center',
    },
    stepContainer: {
        backgroundColor: colors.primaryYellow,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 16
    },
    stepText: {
        fontFamily: 'Museo_700',
        fontSize: 16,
        lineHeight: 19,
        color: colors.primaryBlue
    },
    text: {
        fontFamily: 'Museo_700',
        fontSize: 14,
        lineHeight: 22,
        color: colors.greyMed,
        maxWidth: '80%',
        flexWrap: 'wrap',
        flexShrink: 1
    }
})