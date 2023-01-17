import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { colors } from '../theme';
import Icon from './Icon';

const CareRow = ({
    image,
    renderSvg,
    text
}) => (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            {image ? (
                <Icon
                    type='url'
                    url={image }
                    size={22}
                    isGradient
                /> 
            ): (
                <Icon
                    localIcon={renderSvg()}
                    size={22}
                    isGradient
                /> 
            )}
        </View>
        <Text style={styles.text}>{text}</Text>
    </View>
)

export default CareRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 14,
    },
    iconContainer: {
        padding: 10,
        backgroundColor: colors.primaryPavement,
        alignItems: 'center',
        borderRadius: 8
    },
    image: {
        width: 20,
        height: 24,
    },
    text: {
        marginLeft: 10,
        fontFamily: 'Museo_500',
        fontSize: 16,
        color: colors.greyDark,
        flexShrink: 1
    }
})