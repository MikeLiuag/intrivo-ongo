import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Modal, Pressable } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CloseSvg from '../../Svg/close';
import { colors } from '../../../theme';
import VideoOverview from '../components/videoOverview';
import FormattedText from '../components/formattedText';
import ContentsBlock from '../components/ContentsBlock';
import parseForVars from '../utils/parser';

const ContentWithImageV2 = ({ args, vars }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleCloseModal = () => setModalVisible(false);
  const handleOpenModal = () => setModalVisible(true);

  const onVideoLinkPress = (href) => {
    setVideoUrl(href);
    handleOpenModal();
  };

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.closeButton}>
              <Pressable
                hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
                onPress={handleCloseModal}
              >
                <CloseSvg width={wp('4%')} height={wp('4%')} />
              </Pressable>
            </View>
            <View style={styles.videoContainer}>
              <VideoOverview isMinor={false} />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        {args.subtitle ? (
          <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
        ) : null}
        {(args.images || []).map((image) => (
          <Image source={{ uri: parseForVars(image, vars) }} style={styles.image} key={image} />
        ))}
        <ContentsBlock contents={args.contents} vars={vars} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  image: {
    width: wp('60%'),
    height: wp('40%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  description: {
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    fontFamily: 'Museo_300',
    fontSize: 16,
    color: colors.greyDark,
    lineHeight: 25,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  videoContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexDirection: 'row',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 64,
    // paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 24,
    zIndex: 1,
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: '#B00020',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(176, 0, 32, 0.1)',
    marginTop: 35,
    marginHorizontal: wp('5%'),
  },
  warning: {
    color: '#B00020',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ContentWithImageV2;
