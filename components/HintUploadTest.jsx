import React from 'react';
import { useTranslation } from 'react-i18next';
import {Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setShowHintUploadTestToFalse } from '../store/app/slice';
import { colors } from '../theme';
import CloseSvg from './Svg/close'
import Polygon from './Svg/Polygon';

const HintUploadTest = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const showHint = useSelector(state => state.app.showHintUploadTest);
    const { observations } = useSelector(state => state.user);

    const onPress = () => {
        dispatch(setShowHintUploadTestToFalse());
    }

    return (
        <Modal transparent visible={showHint && observations.length > 0}>
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onPress}>
                <Polygon style={styles.polygon}/>
                <View style={styles.popup}>
                    <TouchableOpacity style={styles.closeContainer} onPress={onPress}>
                        <CloseSvg width={14} height={14}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('screens.sendTest.popup.title')}</Text>
                    <Text style={styles.subtitle}>{t('screens.sendTest.popup.subtitle')}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default HintUploadTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(41, 41, 41, 0.4)',
    },
    polygon: {
        position: 'absolute',
        top: 125,
        right: 30,
    },
    popup: {
        position: 'absolute',
        top: 140,
        right: 15,
        padding: 26,
        backgroundColor: '#fff',
        borderRadius: 14,
        width: '55%',
        zIndex: 3
    },
    title: {
        fontFamily: 'Museo_700',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'Museo_500',
        fontSize: 13,
        lineHeight: 16,
        textAlign: 'center',
        color: colors.greyMed
    },
    closeContainer: {
        alignItems: 'flex-end',
        marginBottom: 5,
    }
})