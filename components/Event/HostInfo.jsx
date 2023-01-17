import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme';
import GuestCard from './GuestCard';

export default function HostInfo({ data, onTextChanged, shareText }) {
  const { t } = useTranslation();
  const { members } = useSelector((state) => state.events) || {};

  const [activeTab, setActiveTab] = useState('info');
  const [text, setText] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={activeTab === 'info' ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab('info')}
        >
          <Text style={activeTab === 'info' ? styles.tabTextActive : styles.tabText}>
            {t('event.eventInfo.tabEventInfo')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'guests' ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab('guests')}
        >
          <Text style={activeTab === 'guests' ? styles.tabTextActive : styles.tabText}>
            {t('event.eventInfo.tabEventMembers')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {activeTab === 'info' ? (
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>{t('event.eventInfo.inviteTitle')}</Text>
            <TextInput
              defaultValue={shareText}
              onChangeText={(value) => {
                onTextChanged(value);
                setText(value);
              }}
              value={text}
              multiline
            />
          </View>
        ) : (
          <FlatList
            data={members[data.uuid]}
            ListEmptyComponent={
              <View style={styles.emptyGuestList}>
                <Text style={styles.guestText}>{t('event.share')}</Text>
              </View>
            }
            scrollEnabled={false}
            renderItem={({ item }) => <GuestCard guest={item} translationTitle='event.eventInfo' />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.primaryPavement,
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeTab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginTop: 26,
    width: '100%',
    height: hp('41%'),
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTextActive: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 20,
    color: colors.primaryBlue,
  },
  tabText: {
    fontFamily: 'Museo_700',
    fontSize: 14,
    lineHeight: 20,
    color: colors.greyGrey,
  },
  inputText: {
    color: colors.greyLight,
    fontFamily: 'Museo_500',
    fontSize: 12,
  },
  emptyGuestList: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestText: {
    fontFamily: 'Museo_700',
    fontSize: 18,
    lineHeight: 20,
    color: colors.greyGrey,
  },
});
