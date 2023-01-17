import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { colors } from '../theme';
import EventCardIcon from './Svg/eventCard';
import ArrowRight from './Svg/arrowRightIcon';

const EventCard = ({
    title,
    onPress,
    date,
    isPromoter,
}) => {

    return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.imageContainer}>
            <EventCardIcon host={isPromoter} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{date}</Text>
        </View>
        <ArrowRight color={'#000000'}/>
    </Pressable>
) }

export default EventCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: colors.statusOrange,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginRight: 24,
        borderRadius: 10
    },
    imageText: {
        color: '#fff',
        fontFamily: 'Museo_700',
        fontSize: 16,
        lineHeight: 19
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
    subtitle: {
        fontFamily: 'Museo_500',
        fontSize: 14,
        lineHeight: 16,
        color: colors.greyMed
    }
})