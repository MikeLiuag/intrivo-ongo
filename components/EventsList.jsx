import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../theme';
import EventCard from './EventCard';
import { fonts } from '../theme/fonts';
import { formats, iso8601ToFormatted } from '../utilis/dateTime';

const EventsList = ({ data, onEventPress, renderCreateOrJoinCTA }) => {
  const { t } = useTranslation();
  const hostEvents = () => data.filter((item) => item.is_promoter);
  const guestEvents = () => data.filter((item) => !item.is_promoter);

  return (
    <View style={styles.container}>
      {renderCreateOrJoinCTA?.()}
      {hostEvents().length > 0 && (
        <View style={styles.hostContainer}>
          <Text style={styles.title}>{t('event.eventsList.host')}</Text>
          <FlatList
            data={hostEvents()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                title={item.description}
                date={iso8601ToFormatted(item.start_time, formats.fullLongDate)}
                isPromoter={item.is_promoter}
                onPress={() => onEventPress(item)}
              />
            )}
          />
        </View>
      )}
      {guestEvents().length > 0 && (
        <View>
          <Text style={styles.title}>{t('event.eventsList.guest')}</Text>
          <FlatList
            data={guestEvents()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                title={item.description}
                date={iso8601ToFormatted(item.start_time, formats.fullLongDate)}
                isPromoter={item.is_promoter}
                onPress={() => onEventPress(item)}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hostContainer: {
    flex: 1,
    marginTop: 5,
  },
  guestContainer: {
    flex: 1,
  },
  title: {
    color: colors.greyGrey,
    fontFamily: fonts.familyBold,
    fontSize: 12,
    lineHeight: 24,
    marginTop: 33,
  },
});
