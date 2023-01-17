import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchCareList } from '../../store/app/slice';
import { colors } from '../../theme/index';

import RoundButton from '../../components/Buttons/RoundButton';
import IconButton from '../../components/IconButton';
import TabbarSpacer from '../../components/TabbarSpacer';
import LeftArrow from '../../components/Svg/arrowLeft';

const { width } = Dimensions.get('window');

const CareList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const route = useRoute();
  const { showBack } = route.params;

  useEffect(() => {
    dispatch(fetchCareList());
  }, [dispatch]);

  const solutionData = useSelector((s) => s.app.careList);

  const renderBrowseCondition = () => {
    const buttons = solutionData?.tags?.filter((item) => item.category === 'condition');
    return (
      <View style={styles.conditionContainer}>
        <Text style={styles.categoryHeader}>{t('careSolutions.list.browseByCondition')}</Text>
        <View style={styles.row}>
          {buttons &&
            buttons.map((item, index) => (
              <RoundButton
                key={item.id}
                style={{
                  marginRight: index < buttons.length - 1 ? 5 : 0,
                  marginBottom: 10,
                }}
                title={item.title}
                action={() => onClickButton(item)}
              />
            ))}
        </View>
      </View>
    );
  };

  const onClickButton = (selected) => {
    const subdata = solutionData?.data?.filter((item) => item.tags.includes(selected.id));
    const others = solutionData?.tags?.filter(
      (item) => item.category === selected.category && item.id !== selected.id
    );

    navigation.navigate('CareItem', {
      title: selected.title,
      subdata,
      others,
      onClickOtherService: onClickButton,
    });
  };

  const renderBrowseService = () => {
    const buttons = solutionData?.tags?.filter((item) => item.category === 'service');
    return (
      <View style={styles.browseContainer}>
        <Text style={styles.categoryHeader}>{t('careSolutions.list.browseByService')}</Text>
        <View style={styles.row}>
          {buttons &&
            buttons.map((item, index) => (
              <IconButton
                key={item.id}
                style={{
                  marginRight: index < buttons.length - 1 ? 16 : 0,
                  width: (width - 100) / 3,
                  marginBottom: 18,
                }}
                iconStyle={{ borderRadius: 8 }}
                title={item.title}
                icon={<Image source={{ uri: item.icon }} style={{ width: 24, height: 24 }} />}
                onClick={() => onClickButton(item)}
              />
            ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['right', 'top', 'left']}
      style={{ flex: 1, backgroundColor: colors.greyWhite }}
    >
      <View style={styles.cotnainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {showBack ? (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              style={styles.backButton}
              onPress={goBack}
            >
              <LeftArrow color='#323232' />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>{t('careSolutions.list.title')}</Text>
        </View>
        {renderBrowseCondition()}
        {renderBrowseService()}
      </View>
      <TabbarSpacer />
    </SafeAreaView>
  );
};

export default CareList;

const styles = StyleSheet.create({
  cotnainer: {
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Museo_700',
    fontSize: 28,
    lineHeight: 30,
    color: colors.greyDark2,
  },
  conditionContainer: {
    marginTop: 18,
  },
  browseContainer: {
    marginTop: 24,
  },
  row: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryHeader: {
    fontFamily: 'Museo_700',
    fontSize: 16,
    lineHeight: 19,
    color: colors.greyMed,
  },
  backButton: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
