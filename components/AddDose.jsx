import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import Icon from '../components/Icon';

const AddDose = ({onPress}) => (
    <TouchableOpacity 
        style={styles.doseContainer}
        onPress={onPress}
    >
      <View style={styles.plusButton}>
        <Icon
          type={'MaterialIcons'}
          name={'add'}
          size={24}
          isGradient={true}
        />
      </View>
      <View style={styles.doseTextContainer}>
        <Text style={styles.doseText}>Add dose information</Text>
      </View>
    </TouchableOpacity>
  );

export default AddDose;

const styles = StyleSheet.create({
    doseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginHorizontal: 25,
        padding: 16,
        borderRadius: 16,
        marginVertical: 8
      },
      plusButton: {
        width: 50,
        height: 50,
        backgroundColor: colors.primaryPavement,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
      },
      doseTextContainer: {
        flex: 1,
        marginLeft: 16,
      },
      plusText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Museo_500'
      },
      doseText: {
        fontFamily: 'Museo_500',
        fontSize: 18
      }
})
