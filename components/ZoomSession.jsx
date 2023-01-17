import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setZoomSession, sendZoomEvents, setGlobalErrors } from '../store/app/slice';
import CompletedScreen from './CompletedScreen';

// const ANALYTICS = [
//   'clicked_join_meeting',
//   'showed_call_ended',
//   'received_meeting_started',
//   'received_meeting_ended', // provider end meeting
//   'left_meeting', // user left meeting
// ];

const ANDROID_MEET_STATE = {
  MEETING_STATUS_CONNECTING: 'MEETING_STATUS_CONNECTING',
  MEETING_STATUS_WAITINGFORHOST: 'MEETING_STATUS_WAITINGFORHOST',
  MEETING_STATUS_DISCONNECTING: 'MEETING_STATUS_DISCONNECTING',
  MEETING_STATUS_IDLE: 'MEETING_STATUS_IDLE',
  MEETING_STATUS_IN_WAITING_ROOM: 'MEETING_STATUS_IN_WAITING_ROOM',
  MEETING_STATUS_RECONNECTING: 'MEETING_STATUS_RECONNECTING',
  MEETING_STATUS_INMEETING: 'MEETING_STATUS_INMEETING',
  MEETING_STATUS_FAILED: 'MEETING_STATUS_FAILED',
};

const IOS_END_REASON = {
  MobileRTCMeetingEndReason_SelfLeave: 'MobileRTCMeetingEndReason_SelfLeave', // User leaves meeting.
  MobileRTCMeetingEndReason_RemovedByHost: 'MobileRTCMeetingEndReason_RemovedByHost', // The user is removed from meeting by the host.
  MobileRTCMeetingEndReason_EndByHost: 'MobileRTCMeetingEndReason_EndByHost', // Host ends the meeting.
  MobileRTCMeetingEndReason_JBHTimeout: 'MobileRTCMeetingEndReason_JBHTimeout', // Join the meeting before host (JBH) timeout.
  MobileRTCMeetingEndReason_FreeMeetingTimeout: 'MobileRTCMeetingEndReason_FreeMeetingTimeout', // Meeting ends when the free service is over.
  MobileRTCMeetingEndReason_NoAteendee: 'MobileRTCMeetingEndReason_NoAteendee', // No ateendee
  MobileRTCMeetingEndReason_HostEndForAnotherMeeting:
    'MobileRTCMeetingEndReason_HostEndForAnotherMeeting', // Meeting ends by the host for he will start another meeting.
  MobileRTCMeetingEndReason_ConnectBroken: 'MobileRTCMeetingEndReason_ConnectBroken', // Meeting ends for SDK disconnects, such as network issue.
};

const ANDROID_END_REASON = {
  END_BY_SELF: 'END_BY_SELF',
  KICK_BY_HOST: 'KICK_BY_HOST',
  END_BY_HOST: 'END_BY_HOST',
  END_FOR_JBHTIMEOUT: 'END_FOR_JBHTIMEOUT',
  END_FOR_FREEMEET_TIMEOUT: 'END_FOR_FREEMEET_TIMEOUT',
  END_FOR_NOATEENDEE: 'END_FOR_NOATEENDEE',
  END_BY_HOST_START_ANOTHERMEETING: 'END_BY_HOST_START_ANOTHERMEETING',
  END_BY_SDK_CONNECTION_BROKEN: 'END_BY_SDK_CONNECTION_BROKEN',
};

const IOS_MEET_STATE = {
  MobileRTCMeetingState_Idle: 'MobileRTCMeetingState_Idle', /// <No meeting is running.
  MobileRTCMeetingState_Connecting: 'MobileRTCMeetingState_Connecting', /// <Connect to the meeting server status.
  MobileRTCMeetingState_WaitingForHost: 'MobileRTCMeetingState_WaitingForHost', /// <Waiting for the host to start the meeting.
  MobileRTCMeetingState_InMeeting: 'MobileRTCMeetingState_InMeeting', /// <Meeting is ready, in meeting status.
  MobileRTCMeetingState_Disconnecting: 'MobileRTCMeetingState_Disconnecting', /// <Disconnect the meeting server, leave meeting status.
  MobileRTCMeetingState_Reconnecting: 'MobileRTCMeetingState_Reconnecting', /// <Reconnecting meeting server status.
  MobileRTCMeetingState_Failed: 'MobileRTCMeetingState_Failed', /// <Failed to connect the meeting server.
  MobileRTCMeetingState_Ended: 'MobileRTCMeetingState_Ended', /// <Meeting ends.
  MobileRTCMeetingState_Unknow: 'MobileRTCMeetingState_Unknow', /// <Unknown status.
  MobileRTCMeetingState_Locked: 'MobileRTCMeetingState_Locked', /// <Meeting is locked to prevent the further participants to join the meeting.
  MobileRTCMeetingState_Unlocked: 'MobileRTCMeetingState_Unlocked', /// <Meeting is open and participants can join the meeting.
  MobileRTCMeetingState_InWaitingRoom: 'MobileRTCMeetingState_InWaitingRoom', /// <Participants who join the meeting before the start are in the waiting room.
  MobileRTCMeetingState_WebinarPromote: 'MobileRTCMeetingState_WebinarPromote', /// <Upgrade the attendees to panelist in webinar.
  MobileRTCMeetingState_WebinarDePromote: 'MobileRTCMeetingState_WebinarDePromote', /// <Downgrade the attendees from the panelist.
  MobileRTCMeetingState_JoinBO: 'MobileRTCMeetingState_JoinBO', /// <Join the breakout room.
  MobileRTCMeetingState_LeaveBO: 'MobileRTCMeetingState_LeaveBO', /// <Leave the breakout room.
  MobileRTCMeetingState_WaitingExternalSessionKey:
    'MobileRTCMeetingState_WaitingExternalSessionKey', /// <Waiting for the additional secret key.
};

const { ZoomMeetingModule, ZoomAndroidModule, ZoomEventsIOS } = NativeModules;

const ZoomSession = ({ navRef }) => {
  const [meetingState, setMeetingState] = useState({
    currentState: null,
    wasInMeeging: false,
    reason: null,
    error: null,
  });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { zoomSession } = useSelector((state) => state.app);
  const { meetingId, password, jwt, userName, appointmentId, purpose } = zoomSession || {};

  useEffect(() => {
    // if (
    //   [
    //     ANDROID_MEET_STATE.MEETING_STATUS_CONNECTING,
    //     IOS_MEET_STATE.MobileRTCMeetingState_Connecting,
    //   ].includes(meetingState.currentState)
    // ) {
    //   dispatch(sendZoomEvents('clicked_join_meeting'));
    // }
    if (
      [
        ANDROID_MEET_STATE.MEETING_STATUS_IN_WAITING_ROOM,
        IOS_MEET_STATE.MobileRTCMeetingState_InWaitingRoom,
        ANDROID_MEET_STATE.MEETING_STATUS_INMEETING,
        IOS_MEET_STATE.MobileRTCMeetingState_InMeeting,
      ].includes(meetingState.currentState)
    ) {
      dispatch(sendZoomEvents({ event: 'received_meeting_started', appointmentId }));
    }
    if (
      [ANDROID_MEET_STATE.MEETING_STATUS_IDLE, IOS_MEET_STATE.MobileRTCMeetingState_Ended].includes(
        meetingState.currentState
      ) &&
      [ANDROID_END_REASON.END_BY_HOST, IOS_END_REASON.MobileRTCMeetingEndReason_EndByHost].includes(
        meetingState.reason
      )
    ) {
      dispatch(sendZoomEvents({ event: 'received_meeting_ended', appointmentId }));
    }
    if (
      [ANDROID_MEET_STATE.MEETING_STATUS_IDLE, IOS_MEET_STATE.MobileRTCMeetingState_Ended].includes(
        meetingState.currentState
      ) &&
      [ANDROID_END_REASON.END_BY_SELF, IOS_END_REASON.MobileRTCMeetingEndReason_SelfLeave].includes(
        meetingState.reason
      )
    ) {
      dispatch(sendZoomEvents({ event: 'left_meeting', appointmentId }));
    }
  }, [appointmentId, dispatch, meetingState.currentState, meetingState.reason]);

  useEffect(() => {
    if (meetingState.error) {
      dispatch(
        setGlobalErrors({
          message: 'Meeting error',
          subtitle: 'Something went wrong',
        })
      );
    }
  }, [dispatch, meetingState.error]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter();
      const endReasonListener = eventEmitter.addListener('onMeetingLeaveComplete', (event) => {
        console.log(Object.values(ANDROID_END_REASON)[event.meetingEndReason]);
        setMeetingState({
          ...meetingState,
          reason: Object.values(ANDROID_END_REASON)[event.meetingEndReason],
        });
      });
      const eventListener = eventEmitter.addListener('onMeetingStatusChanged', (event) => {
        console.log(event.meetingStatus); // "someValue"
        if (meetingState.currentState !== event.meetingStatus)
          setMeetingState({
            ...meetingState,
            wasInMeeging:
              meetingState.wasInMeeging ||
              event.meetingStatus === ANDROID_MEET_STATE.MEETING_STATUS_INMEETING,
            currentState: event.meetingStatus,
            error: event.meetingStatus === ANDROID_MEET_STATE.MEETING_STATUS_FAILED,
          });
      });
      return () => {
        eventListener.remove();
        endReasonListener.remove();
      };
    }
    if (Platform.OS === 'ios') {
      const eventEmitter = new NativeEventEmitter(ZoomEventsIOS);
      const endReasonListener = eventEmitter.addListener('onMeetingLeaveComplete', (event) => {
        console.log(Object.values(IOS_END_REASON)[event.name], 'END REASON');
        setMeetingState({ ...meetingState, reason: Object.values(IOS_END_REASON)[event.name] });
      });
      const eventListener = eventEmitter.addListener('onMeetingStatusChanged', (event) => {
        console.log(Object.values(IOS_MEET_STATE)[event.name]);
        if (meetingState.currentState !== Object.values(IOS_MEET_STATE)[event.name])
          setMeetingState({
            ...meetingState,
            wasInMeeging:
              meetingState.wasInMeeging ||
              Object.values(IOS_MEET_STATE)[event.name] ===
                IOS_MEET_STATE.MobileRTCMeetingState_InMeeting,
            currentState: Object.values(IOS_MEET_STATE)[event.name],
            error:
              Object.values(IOS_MEET_STATE)[event.name] ===
              IOS_MEET_STATE.MobileRTCMeetingState_Failed,
          });
      });
      return () => {
        eventListener.remove();
        endReasonListener.remove();
      };
    }
    return () => {};
  });

  useEffect(() => {
    const zoomJoin = async () => {
      try {
        if (Platform.OS === 'ios') {
          await ZoomMeetingModule.initZoom(jwt);

          ZoomMeetingModule.joinMeeting(meetingId, password, userName);
        }
        if (Platform.OS === 'android') {
          await ZoomAndroidModule.initZoom(jwt);

          ZoomAndroidModule.joinMeeting(userName, meetingId, password);
        }
        dispatch(sendZoomEvents({ event: 'clicked_join_meeting', appointmentId }));
        dispatch(setZoomSession({ ...zoomSession, status: 'joined' }));
      } catch (e) {
        console.error(`${e} ZOOM SDK ERROR`);
      }
    };
    if (zoomSession && !zoomSession.status) zoomJoin();
  }, [appointmentId, dispatch, jwt, meetingId, password, userName, zoomSession]);

  const onRequestClose = () => {
    setMeetingState({
      reason: null,
      wasInMeeging: false,
      currentState: null,
    });
    dispatch(sendZoomEvents({ event: 'showed_call_ended', appointmentId }));
    dispatch(setZoomSession(null));
    if (navRef.current) {
      navRef.current.navigate('CarePlan', {
        from: 'zoomViewer',
        purpose: purpose?.includes('sniffles') ? 'sniffles' : 'long_covid',
      });
    }
  };

  return (
    <>
      {meetingState.wasInMeeging &&
        meetingState.currentState !==
          (Platform.OS === 'ios'
            ? IOS_MEET_STATE.MobileRTCMeetingState_InMeeting
            : ANDROID_MEET_STATE.MEETING_STATUS_INMEETING) && (
          <CompletedScreen
            title={t('screens.telehealth.zoom.endedTitle')}
            descr={t('screens.telehealth.zoom.endedDescription')}
            animated
            result={2}
            onClose={onRequestClose}
          />
        )}
    </>
  );
};

export default ZoomSession;
