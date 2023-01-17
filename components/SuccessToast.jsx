import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { colors } from '../theme';
import SuccessIcon from './Svg/SuccessIcon';
import CloseSvg from './Svg/close';

const SuccessToas = ({
    onPress
}) => (
        <View style={styles.container}>
            <SuccessIcon />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Success!</Text>
                <Text style={styles.subtitle}>You have removed a event</Text>
            </View>
            <TouchableOpacity
                onPress={onPress}
            >
                <CloseSvg width={10} height={10} color='#323232'/>
            </TouchableOpacity>
        </View>
    )

export default SuccessToas;

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.statusGreen,
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        position: 'absolute',
        width: wp('89%'),
        top: 60,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    title: {
        fontFamily: 'Museo_700',
        fontSize: 14,
        lineHeight: 20
    },
    subtitle: {
        fontFamily: 'Museo_500',
        fontSize: 14,
        lineHeight: 20
    }
})