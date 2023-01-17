import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Sun from './Svg/vitaminIcon/Sun';

const image = require('../assets/VitaminD.png');

const VitaminDBackground = () => {
    return (
        <View style={styles.container}>
            <Image
                source={image}
                style={{height: '100%', width: '100%', position: 'absolute'}}
                resizeMode='cover'
            />
            <View style={styles.backgroundContainer}/>
            <View style={styles.iconContainer}>
                <Sun big/>
            </View>
        </View>
    )
}

export default VitaminDBackground;


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'rgba(125, 203, 242, 0.9)'
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    iconContainer: {
        zIndex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 22,
        padding: 26,
    }
})