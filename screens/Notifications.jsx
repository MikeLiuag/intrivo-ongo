import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CloseIcon from '../components/Svg/close';
import { colors } from '../theme';
import { fonts } from '../theme/fonts';

const translationPath = 'screens.notifications';

const Notifications = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const {
    notifications: { newNotificationsCount: newCount, notificationsList: list },
  } = useSelector(({ app }) => app);

  const onPressClose = () => goBack();

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{t(`${translationPath}.title`)}</Text>
        <TouchableOpacity onPress={onPressClose}>
          <CloseIcon width={14} height={14} />
        </TouchableOpacity>
      </View>
      <Text style={styles.newNotificationsText}>
        {t(`${translationPath}.newNotifications`, { count: newCount })}
      </Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>{t(`${translationPath}.emtyStateText`)}</Text>
    </View>
  );

  const renderList = () => (
    <FlatList
      data={list}
      ListEmptyComponent={renderEmptyList}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderList()}
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fonts.familyBold,
    fontSize: 28,
  },
  newNotificationsText: {
    marginTop: 5,
    fontFamily: fonts.familyLight,
    fontSize: fonts.sizeLarge,
    color: colors.greyDark,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: fonts.familyBold,
    fontSize: 12,
    color: colors.greyLight,
    textTransform: 'uppercase',
  },
});
