import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import EmployeeIcon from '../Svg/employeeIcon';
import Warning from '../Svg/Warning';
const EmployeeItem = ({
    data,
    onPress
}) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.imageContainer}>
                <EmployeeIcon />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.first_name + ' ' + data.last_name}</Text>
                <Text style={styles.subtitle}>
                    <Text style={[styles.status, data.status.includes('failed') && {color: 'red'}]}>
                        {data.status}
                    </Text>{data.date}
                </Text>
            </View>
            {data.showWarning && <Warning/>}
        </Pressable>
    )
};

export default EmployeeItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 16,
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: colors.primaryPavement,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 10
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: 'Museo_700',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 5
    },
    status: {
        fontFamily: 'Museo_700',
        fontSize: 14,
        lineHeight: 16,
        color: colors.greyMed
    },
    subtitle: {
        fontFamily: 'Museo_500',
        fontSize: 14,
        lineHeight: 16,
        color: colors.greyMed
    }
});