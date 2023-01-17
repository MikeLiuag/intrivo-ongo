import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
// components
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CheckmarkSvg from '../../Svg/checkMarkExtraThinSvg';
import { colors } from '../../../theme/index';
import FormattedText from '../components/formattedText';
import parseForVars from '../utils/parser';
import ContentsBlock from '../components/ContentsBlock';

const TestResultV2 = ({ args, vars, onAction = () => null }) => {
  const props = {};
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      onAction();
      setIsFirstRender(false);
    }
  }, [onAction, isFirstRender]);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <FormattedText style={styles.subtitle}>{parseForVars(args.subtitle, vars)}</FormattedText>
          <ContentsBlock contents={args.contents} vars={vars} />
          <View style={[styles.statusContainer, { backgroundColor: args.color }]}>
            <View style={styles.statusDetails}>
              <Text style={[styles.statusText]}>{parseForVars(args.status, vars)}</Text>
              <View style={styles.ring}>
                <View style={[styles.innerRing, { backgroundColor: args.color }]} />
              </View>
            </View>
          </View>
          <View style={styles.cdcContainer}>
            <Text style={styles.cdcTitle}>{args.cdc_title}</Text>
            <FlatList
              style={{ width: '100%' }}
              data={args.cdc_contents}
              renderItem={({ item }) => (
                <View style={styles.cdcItem}>
                  <View style={styles.cdcIcon}>
                    <CheckmarkSvg
                      width={Number(wp('5%'))}
                      height={Number(wp('3%'))}
                      color={args.color}
                    />
                  </View>
                  <Text style={styles.cdcText}>{item}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  subtitle: {
    marginHorizontal: wp('5%'),
    fontFamily: 'Museo_700',
    fontSize: 26,
    color: colors.black,
    marginTop: 25,
    marginBottom: 15,
  },
  description: {
    marginHorizontal: wp('5%'),
    fontFamily: 'Museo_500',
    fontSize: 16,
    color: colors.greyGrey,
    lineHeight: 25,
    marginTop: 10,
  },
  warningContainer: {
    borderWidth: 1,
    borderColor: '#B00020',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(176, 0, 32, 0.1)',
    marginTop: 15,
    marginHorizontal: wp('5%'),
  },
  warning: {
    color: '#B00020',
    fontFamily: 'Museo_500',
    fontSize: 16,
    lineHeight: 24,
  },
  statusContainer: {
    marginHorizontal: wp('5%'),
    borderRadius: Number(wp('3%')),
    borderWidth: 2,
    borderColor: '#EFEFEF',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusDetails: {
    borderTopRightRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
    marginLeft: wp('3%'),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyWhite,
  },
  statusText: {
    flex: 1,
    fontFamily: 'Museo_700',
    fontSize: 18,
    marginVertical: 20,
    marginLeft: 30,
  },
  leftBorder: {
    height: '98%',
    width: 10,
    borderTopLeftRadius: Number(wp('2.4%')),
    borderBottomLeftRadius: Number(wp('2.4%')),
    marginVertical: 1,
  },
  ring: {
    width: Number(wp('10%')),
    height: Number(wp('10%')),
    margin: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: Number(wp('100%')),
  },
  innerRing: {
    width: Number(wp('8%')),
    height: Number(wp('8%')),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    shadowRadius: 2.22,
    shadowOpacity: 0.22,
    borderRadius: Number(wp('100%')),
  },
  cdcContainer: {
    width: '90%',
    borderRadius: Number(wp('3%')),
    borderWidth: 2,
    borderColor: '#EFEFEF',
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.greyWhite,
  },
  cdcTitle: {
    fontFamily: 'Museo_700',
    fontSize: 17,
    color: colors.black,
    marginBottom: 10,
  },
  cdcItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  cdcIcon: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  cdcText: {
    flex: 1,
    fontFamily: 'Museo_500',
    fontSize: 17,
    color: colors.greyDark2,
    lineHeight: 22,
  },
});

export default TestResultV2;
