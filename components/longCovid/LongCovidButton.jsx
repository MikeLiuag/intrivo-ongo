import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import longCovidStyles from './styles';

const arrow = require('../../assets/arrowRight.png');

const LongCovidButton = ({ data, onPress }) => {
  const content = data.questionnaire_conclusion.content[0];
  const image = content?.image?.url || null;
  console.log(data);
  return (
    <TouchableOpacity
      style={[longCovidStyles.container, longCovidStyles.buttonContainer]}
      onPress={() => onPress(content.url)}
    >
      <View style={longCovidStyles.imageContainer}>
        {image ? <Image source={{ uri: image }} style={longCovidStyles.image} /> : <View />}
      </View>
      <View style={{ flex: 5, justifyContent: 'center', marginLeft: 16 }}>
        <Text style={longCovidStyles.buttonText}>{content.title}</Text>
        {content?.description && (
          <Text style={longCovidStyles.description}>{content.description}</Text>
        )}
      </View>
      <Image source={arrow} style={longCovidStyles.image} />
    </TouchableOpacity>
  );
};

export default LongCovidButton;
