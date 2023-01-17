import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text, StyleSheet, Image} from 'react-native';
import { LogEvent } from '../analytics';
import { colors } from '../theme';
import { BlueButton } from './Buttons/BlueButton';

const careCard = require('../assets/HomeScreen/careCard.png')

const CareCard = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const handleButton = () => {
        navigation.navigate('CareList');
        LogEvent('Home_click_CareSolutionsSupport')
    }
    return (
        <View style={styles.container}>
            <Image 
                source={careCard}
                resizeMode='contain'
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t('screens.careCard.title')}</Text>
                <Text style={styles.subtitle}>{t('screens.careCard.subtitle')}</Text>
            </View>
            <BlueButton 
                title={t('screens.careCard.button')} 
                styleText={styles.buttonText}
                action={handleButton}
            />
        </View>
    )
}

export default CareCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'white',
        marginTop: 16,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 3.3,
    },
    title: {
        fontFamily: 'Museo_700',
        fontSize: 16,
        color: colors.greyDark2,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Museo_500',
        color: colors.greyMed,
    },
    textContainer: {
        marginVertical: 16
    },
    buttonText: {
        fontFamily: 'Museo_700',
        fontSize: 16,
        lineHeight: 19,
        color: '#fff'
    }
})