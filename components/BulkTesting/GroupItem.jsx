import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import GroupIcon from '../Svg/groupIcon'
const GroupItem = ({
    data,
    onPress
}) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <GroupIcon width={40} height={40} />
            <Text style={styles.title}>{data.name}</Text>
        </Pressable>
    )
};

export default GroupItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Museo_500',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 15,
    },
});