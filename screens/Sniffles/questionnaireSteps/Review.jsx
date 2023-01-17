import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from '../../../components/Buttons/BlueButton';
import ReviewDetails from '../../../components/ReviewDetails';
import Timeslot from '../../../components/Timeslot';
import { setGlobalErrors } from '../../../store/app/slice';
import { snifflesFieldNames } from '../../../store/sniffles/slice';
import { colors } from '../../../theme';
import { fonts } from '../../../theme/fonts';
import { formats, iso8601ToFormatted } from '../../../utilis/dateTime';

const translationPath = 'screens.sniffles.review';

const Review = ({
  userId,
  soreThroat,
  // paymentRecord,
  selectedDate,
  contactInfo: { email, phoneNumber },
  userLocation: { address_1: address1, address_2: address2, city, state_id: stateId, zipcode },
  onChangeState,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { usersLookup } = useSelector(({ user }) => user);
  const { freeDates: timeslots } = useSelector(({ sniffles }) => sniffles);

  // timeslots stuff
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(timeslots[0] || null);
  const [selectedTime, setSelectedTime] = useState(null);

  const { fullName, dob } = userId && usersLookup[userId];

  const data = [
    {
      title: t(`${translationPath}.section1.title`),
      data: [
        { label: t(`${translationPath}.section1.name`), value: fullName },
        {
          label: t(`${translationPath}.section1.birthday`),
          value: iso8601ToFormatted(dob, formats.longDateWithFullMonth),
        },
      ],
    },
    {
      title: t(`${translationPath}.section2.title`),
      data: [
        { label: t(`${translationPath}.section2.phone`), value: phoneNumber },
        { label: t(`${translationPath}.section2.email`), value: email },
      ],
    },
    {
      title: t(`${translationPath}.section3.title`),
      data: [
        { label: '', value: `${address1} ${address2 ? `, ${address2}` : ''}` },
        { label: '', value: `${city}, ${stateId}, ${zipcode}` },
      ],
    },
    {
      title: t(`${translationPath}.section4.title`),
      data: [
        {
          label: '',
          value: iso8601ToFormatted(selectedDate?.date, formats.longDateWithFullMonth),
        },
        { label: '', value: iso8601ToFormatted(selectedDate?.date, formats.time12Hour) },
      ],
    },
    ...(soreThroat
      ? [
          {
            title: t(`${translationPath}.section5.title`),
            data: [{ label: '', value: [t(`${translationPath}.section5.value`)] }],
          },
        ]
      : []),
    // {
    //   title: t(`${translationPath}.section6.title`),
    //   data: [
    //     {
    //       label: '',
    //       value: t(`${translationPath}.section6.value`, {
    //         price: `$${paymentRecord?.price ?? 'XX'}`,
    //       }),
    //     },
    //   ],
    // },
  ];

  // useEffect(() => {
  //   dispatch(
  //     getFreeDates({
  //       userId,
  //     })
  //   )
  //     .unwrap()
  //     .finally(() => setLoading(false));
  // }, [dispatch, userId]);

  const onPressSubmit = () => {
    const isTimeFree = !!timeslots.find((item) => item.datetime === selectedDate.date);
    if (isTimeFree) {
      onChangeState(null, null, true);
    } else {
      dispatch(
        setGlobalErrors({
          message: 'Sorry, time no longer available',
          subtitle: 'Please select a new day or time',
        })
      );
      setShowTimepicker(true);
    }
  };

  // logic for timeslots
  const onDayPress = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const onTimePress = (time) => {
    setSelectedTime(time);
  };

  const onNextPress = () => {
    const { id } = timeslots.find((item) => item.datetime === selectedTime);
    onChangeState({ date: selectedTime, id }, snifflesFieldNames.SELECTED_DATE, false);
    setShowTimepicker(false);
  };

  // if (showTimepicker) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Timeslot
  //         timeslots={timeslots}
  //         isLoading={loading}
  //         location={zipcode}
  //         selectedDay={selectedDay}
  //         selectedTime={selectedTime}
  //         onDayPress={onDayPress}
  //         onTimePress={onTimePress}
  //       />
  //       <BlueButton
  //         title='Next'
  //         disabled={!selectedDay || !selectedTime}
  //         action={onNextPress}
  //         style={{ marginTop: 16 }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{t(`${translationPath}.title`)}</Text>
        <ReviewDetails
          data={data}
          onPressButton={onPressSubmit}
          buttonTitle={t(`${translationPath}.button`)}
        />
      </View>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontFamily: fonts.familyBold,
    fontSize: 24,
    lineHeight: 36,
  },
  content: {
    flex: 1,
  },
  header: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: fonts.sizeLarge,
    fontFamily: fonts.familyBold,
    color: colors.greyDark2,
  },
});
