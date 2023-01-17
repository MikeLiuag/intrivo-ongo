import React, { createElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// components
import SelectorComponent from '../components/buttons/selectorComponent';
import { colors } from '../../../theme/index';
import { parseHtmlForTags } from '../utils/functions';
import { parse } from '../utils/parseModularTestLogic';
import { openLink } from '../../../utilis/link';
import { iso8601ToFormatted, formats } from '../../../utilis/dateTime';

const TestResultV1 = ({ props, global, onAction = () => null, resetStack = () => null }) => {
  const navigation = useNavigation();

  const [showLearnMore, setShowLearnMore] = useState(true);

  const users = useSelector((s) => s.user.users);
  const usersLookup = useSelector((s) => s.user.usersLookup);

  useEffect(() => {
    onAction();
  }, [onAction]);

  const tagStyleObj = {
    a: styles.link,
    orange: styles.orange,
    red: styles.red,
    green: styles.green,
  };

  const symptomsLogic = parse(props.symptoms);
  const symptoms = symptomsLogic({ global });

  const getListAction = (type, url, doShare) => {
    switch (type) {
      case 'link':
        return openLink(navigation, true, { url, useWebView: false });
      case 'webview': {
        let params = {};
        if (doShare) {
          const user = usersLookup[users[0]];
          params = {
            url: `${url}/${user.qrToken}?hideText=true`,
            viewshot: doShare,
            title: `${user.first_name} ${user.last_name} Health Passport`,
          };
        } else {
          params = {
            url,
            viewshot: doShare,
          };
        }
        return openLink(navigation, false, { ...params, useWebView: true });
      }
      case 'deeplink': {
        resetStack();
        return navigation.replace(url.substring(1));
      }
      default:
        return null;
    }
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.basicInfoContainer}>
            <View style={styles.rowFlexView}>
              <View style={styles.textNameView}>
                <Text style={styles.testName}>{props.test_result.test_name}</Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: props.test_result.color,
                    ...styles.statusBox,
                  }}
                >
                  <Text style={styles.statusText}>{props.test_result.result}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.patientName}>{props.test_result.user_name}</Text>
          </View>
          <View style={styles.infoContainer}>
            {props.details.map((details) => (
              <Text style={styles.resultDetailText}>
                {parseHtmlForTags(details, tagStyleObj).map((e) =>
                  createElement(Text, { style: e.style }, e.child)
                )}
              </Text>
            ))}
            {props.details_more &&
              props.details_more.length > 0 &&
              (showLearnMore ? (
                <Text style={styles.link} onPress={() => setShowLearnMore(false)}>
                  {'\n'}
                  {props.more_text}
                </Text>
              ) : (
                props.details_more.map((details) => (
                  <Text style={styles.resultDetailText}>
                    {'\n'}
                    {parseHtmlForTags(details, tagStyleObj).map((e) =>
                      createElement(Text, { style: e.style }, e.child)
                    )}
                  </Text>
                ))
              ))}
          </View>
          <View style={styles.btnsContainer}>
            <Text style={{ ...styles.blockTitle, marginBottom: 16 }}>{props.next_title}</Text>
            <FlatList
              data={props.next_links}
              renderItem={({ item }) => (
                <SelectorComponent
                  item={item}
                  onClick={() => {
                    getListAction(item.type, item.link, item.doShare);
                  }}
                />
              )}
            />
          </View>
          <View style={styles.symptomsContainer}>
            <Text style={styles.blockTitle}>{props.symptoms_title}</Text>
            <View style={styles.symptomsView}>
              {symptoms?.values?.length > 0 ? (
                symptoms?.values.map((s, index) => (
                  <Text key={s} style={styles.symp}>
                    {s.text}
                    {index !== symptoms.values.length - 1 ? ', ' : ''}
                  </Text>
                ))
              ) : (
                <Text style={styles.symp}>{props.empty_symptoms}</Text>
              )}
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.blockTitle}>{props.symptom_date}</Text>
            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {iso8601ToFormatted(new Date(), formats.longDateWithDayOfWeek)}
              </Text>
              <Text style={styles.dateText}>
                {new Date().toLocaleTimeString(undefined, {
                  timeZoneName: 'short',
                })}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  rowFlexView: { flexDirection: 'row', flexWrap: 'wrap' },
  textNameView: { flex: 1, minWidth: 200 },
  nextHandler: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 14,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  basicInfoText: {
    color: colors.greyMed,
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Museo_300',
  },
  infoContainer: {
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: colors.primaryPavement,
    borderRadius: 16,
  },
  titleStatus: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Museo_700',
  },
  resultHead: {
    height: 268,
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingBottom: 31,
    alignItems: 'center',
  },
  dateText: {
    color: colors.greyGrey,
    fontSize: 14,
    fontFamily: 'Museo_300',
  },
  dateContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btnsContainer: {
    paddingVertical: 23,
    paddingHorizontal: 24,
  },
  symptomsContainer: {
    // paddingVertical: 16,
    paddingBottom: 32,
    marginHorizontal: 24,
    borderBottomColor: colors.greyExtraLight,
    borderBottomWidth: 1,
  },
  symptomsView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 0,
  },
  blockTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Museo_700',
    marginBottom: 8,
  },
  symp: {
    color: colors.greyGrey,
    fontSize: 14,
    fontFamily: 'Museo_500',
    lineHeight: 24,
  },
  statusCircle: {
    width: 102,
    height: 102,
    borderRadius: 102,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicInfoContainer: {
    padding: 24,
  },
  testName: {
    color: colors.greyDark2,
    fontSize: 18,
    fontFamily: 'Museo_900',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  patientName: {
    color: colors.greyGrey,
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Museo_500',
  },
  statusBox: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  statusText: {
    color: 'white',
    fontFamily: 'Museo_500',
    fontSize: 14,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingLeft: 30,
    paddingTop: 24,
  },
  link: {
    color: '#2A4D9B',
    fontFamily: 'Museo_700',
    fontSize: 16,
  },
  orange: {
    fontFamily: 'Museo_700',
    color: colors.statusOrange,
  },
  red: {
    fontFamily: 'Museo_700',
    color: colors.statusRed,
  },
  green: {
    fontFamily: 'Museo_700',
    color: colors.statusGreen,
  },
  resultDetailText: {
    fontSize: 14,
    fontFamily: 'Museo_500',
    lineHeight: 22,
    color: colors.greyMed,
  },
});

export default TestResultV1;
