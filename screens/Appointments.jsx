import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import LoaderComp from '../components/LoaderComp';
import { setShowReviewScreen } from '../store/app/slice';
import { checkAppointmentStatus } from '../store/user/slice';
import { logException } from '../utilis/helpers';
import { resetToDashboard } from '../utilis/navigationHelper';

const Appointments = () => {
  const navigation = useNavigation();

  const {
    params: { appointmentId = '' },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointmentStatus = async () => {
      try {
        const response = await dispatch(checkAppointmentStatus());
        const appointment = response.payload
          .reduce((acc, curr) => [...acc, ...curr.appointments], [])
          .find((appt) => appt.id === appointmentId);
        if (
          appointment?.purpose === 'sniffles_observation' &&
          appointment?.status === 'completed'
        ) {
          dispatch(setShowReviewScreen('snifflesPoc'));
        }
      } catch (e) {
        logException(e);
      }
      resetToDashboard(navigation);
    };

    getAppointmentStatus();
  }, [dispatch, navigation, appointmentId]);

  return (
    <View>
      <LoaderComp />
    </View>
  );
};
export default Appointments;
