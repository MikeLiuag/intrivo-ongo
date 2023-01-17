package com.ongo.live;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import us.zoom.sdk.ChatMessageDeleteType;
import us.zoom.sdk.FreeMeetingNeedUpgradeType;
import us.zoom.sdk.InMeetingAudioController;
import us.zoom.sdk.InMeetingChatController;
import us.zoom.sdk.InMeetingChatMessage;
import us.zoom.sdk.JoinMeetingOptions;
import us.zoom.sdk.JoinMeetingParams;
import us.zoom.sdk.MeetingError;
import us.zoom.sdk.MeetingParameter;
import us.zoom.sdk.MeetingService;
import us.zoom.sdk.InMeetingService;
import us.zoom.sdk.MeetingServiceListener;
import us.zoom.sdk.InMeetingServiceListener;
import us.zoom.sdk.MeetingStatus;
import us.zoom.sdk.MeetingEndReason;
import us.zoom.sdk.InMeetingEventHandler;
import us.zoom.sdk.StartMeetingOptions;
import us.zoom.sdk.StartMeetingParamsWithoutLogin;
import us.zoom.sdk.VideoQuality;
import us.zoom.sdk.ZoomError;
import us.zoom.sdk.ZoomSDK;
import us.zoom.sdk.ZoomSDKInitParams;
import us.zoom.sdk.ZoomSDKInitializeListener;

// import android.widget.Toast;
import android.content.Context;
import android.os.Handler;
import android.util.Log;

public class ZoomModule extends ReactContextBaseJavaModule implements Constants, MeetingServiceListener, InMeetingServiceListener {
    private final static String TAG = "ZoomSDK";
    private final ReactApplicationContext reactContext;

    ZoomModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void initZoom(String jwt, Promise promise) {
        Log.d(TAG, "INIT zoom");

        runOnUiThread(() -> {
            ZoomSDK zoomSDK = ZoomSDK.getInstance();

            ZoomSDKInitializeListener initializeListener = new ZoomSDKInitializeListener() {
                @Override
                public void onZoomSDKInitializeResult(int errorCode, int internalErrorCode) {
                    Log.d(TAG, "onZoomSDKInitializeResult, errorCode=" + errorCode + ", internalErrorCode=" + internalErrorCode);

                    if (errorCode != ZoomError.ZOOM_ERROR_SUCCESS) {
                        Log.d(TAG, "Failed to initialize Zoom SDK. Error: " + errorCode + ", internalErrorCode=" + internalErrorCode);
                        if (promise != null) {
                            promise.reject("ERR_ZOOM_START", "Failed to initialize Zoom SDK. Error: " + errorCode + ", internalErrorCode=" + internalErrorCode);
                        }
                    } else {
                        Log.d(TAG, "Initialize Zoom SDK successfully.");
                        if (promise != null) {
                            promise.resolve(true);
                        }

                        registerMeetingServiceListener();
                        registerInMeetingServiceListener();
                    }
                }

                @Override
                public void onZoomAuthIdentityExpired() {

                }
            };

            if (!zoomSDK.isInitialized()) {
                ZoomSDKInitParams initParams = new ZoomSDKInitParams();
                initParams.appKey = "ajxBy5uNCWUpCVpiehiykVM8TJ5rlvbDgkpF";
                initParams.jwtToken = jwt;
                initParams.enableLog = BuildConfig.DEBUG;
                zoomSDK.initialize(reactContext.getCurrentActivity(), initializeListener, initParams);
            }

            if (zoomSDK.isInitialized()) {
                registerMeetingServiceListener();
                registerInMeetingServiceListener();
                promise.resolve(true);
            }
        });
    }

    @ReactMethod
    public void joinMeeting(String displayName, String meetingNum, String password, Promise promise) {
        Log.d(TAG, "JOIN MEETING" + meetingNum + ":" + password);

        runOnUiThread(() -> {
            ZoomSDK zoomSDK = ZoomSDK.getInstance();

            if (!zoomSDK.isInitialized()) {
                promise.reject("ERR_ZOOM_START", "Zoom sdk not initialized");
                return;
            }

            MeetingService meetingService = zoomSDK.getMeetingService();
            if (meetingService == null) {
                promise.reject("ERR_ZOOM_START", "Zoom meeting service not init");
                return;
            }

            JoinMeetingOptions opts = new JoinMeetingOptions();
            opts.no_invite = true;
            opts.no_driving_mode = true;
            opts.no_dial_in_via_phone = true;
            opts.no_dial_out_to_phone = true;

            JoinMeetingParams params = new JoinMeetingParams();

            params.displayName = displayName;
            params.meetingNo = meetingNum;
            params.password = password;

            try {
                int joinMeetingRes = meetingService.joinMeetingWithParams(reactContext.getCurrentActivity(), params, opts);
                Log.d(TAG, "joinMeeting, res" + joinMeetingRes);
                if (joinMeetingRes != MeetingError.MEETING_ERROR_SUCCESS) {
                    promise.reject("ERROR_ZOOM_JOIN", "join meeting err" + joinMeetingRes);
                }
            } catch (Exception e) {
                promise.reject("JoinMeetingExc", e);
            }
        });


    }

    @Override
    public String getName() {
        return "ZoomAndroidModule";
    }

    private void registerMeetingServiceListener() {
        ZoomSDK zoomSDK = ZoomSDK.getInstance();
        MeetingService meetingService = zoomSDK.getMeetingService();
        if (meetingService != null) {
            meetingService.addListener(this);
        }
    }

    private void registerInMeetingServiceListener() {
        ZoomSDK zoomSDK = ZoomSDK.getInstance();
        InMeetingService inMeetingService = zoomSDK.getInMeetingService();
        if (inMeetingService != null) {
            inMeetingService.addListener(this);
        }
    }

    @Override
    public void onMeetingParameterNotification(MeetingParameter meetingParameter) {

    }

    @Override
    public void onMeetingStatusChanged(MeetingStatus meetingStatus, int errorCode, int internalErrorCode) {
        WritableMap params = Arguments.createMap();
        params.putString("meetingStatus", meetingStatus.toString());
        sendEvent(reactContext, "onMeetingStatusChanged", params);

        if (meetingStatus == meetingStatus.MEETING_STATUS_FAILED && errorCode == MeetingError.MEETING_ERROR_CLIENT_INCOMPATIBLE) {
            // Toast.makeText(this, "Version of ZoomSDK is too low!", Toast.LENGTH_LONG).show();
        }
        if (meetingStatus == MeetingStatus.MEETING_STATUS_IDLE || meetingStatus == MeetingStatus.MEETING_STATUS_FAILED) {
            // selectTab(TAB_WELCOME);
        }
    }

    @Override
    public void onMeetingLeaveComplete(long var1) {
        Log.d(TAG, "LEAVE MEETING" + var1);

        WritableMap params = Arguments.createMap();
        params.putString("meetingEndReason", Long.toString(var1));
        sendEvent(reactContext, "onMeetingLeaveComplete", params);
    }

    @Override
    public void onMeetingUserJoin(List<Long> list) {

    }

    @Override
    public void onMeetingUserLeave(List<Long> list) {

    }

    @Override
    public void onMeetingUserUpdated(long l) {

    }

    @Override
    public void onMeetingHostChanged(long l) {

    }

    @Override
    public void onMeetingCoHostChanged(long l) {

    }

    @Override
    public void onMeetingCoHostChange(long l, boolean b) {

    }

    @Override
    public void onActiveVideoUserChanged(long l) {

    }

    @Override
    public void onActiveSpeakerVideoUserChanged(long l) {

    }

    @Override
    public void onHostVideoOrderUpdated(List<Long> list) {

    }

    @Override
    public void onFollowHostVideoOrderChanged(boolean b) {

    }

    @Override
    public void onSpotlightVideoChanged(boolean b) {

    }

    @Override
    public void onSpotlightVideoChanged(List<Long> list) {

    }

    @Override
    public void onUserVideoStatusChanged(long l, VideoStatus videoStatus) {

    }

    @Override
    public void onUserNetworkQualityChanged(long l) {

    }

    @Override
    public void onSinkMeetingVideoQualityChanged(VideoQuality videoQuality, long l) {

    }

    @Override
    public void onMicrophoneStatusError(InMeetingAudioController.MobileRTCMicrophoneError mobileRTCMicrophoneError) {

    }

    @Override
    public void onUserAudioStatusChanged(long l, AudioStatus audioStatus) {

    }

    @Override
    public void onHostAskUnMute(long l) {

    }

    @Override
    public void onHostAskStartVideo(long l) {

    }

    @Override
    public void onUserAudioTypeChanged(long l) {

    }

    @Override
    public void onMyAudioSourceTypeChanged(int i) {

    }

    @Override
    public void onLowOrRaiseHandStatusChanged(long l, boolean b) {

    }

    @Override
    public void onChatMessageReceived(InMeetingChatMessage inMeetingChatMessage) {

    }

    @Override
    public void onChatMsgDeleteNotification(String s, ChatMessageDeleteType chatMessageDeleteType) {

    }

    @Override
    public void onSilentModeChanged(boolean b) {

    }

    @Override
    public void onFreeMeetingReminder(boolean b, boolean b1, boolean b2) {

    }

    @Override
    public void onMeetingActiveVideo(long l) {

    }

    @Override
    public void onSinkAttendeeChatPriviledgeChanged(int i) {

    }

    @Override
    public void onSinkAllowAttendeeChatNotification(int i) {

    }

    @Override
    public void onSinkPanelistChatPrivilegeChanged(InMeetingChatController.MobileRTCWebinarPanelistChatPrivilege mobileRTCWebinarPanelistChatPrivilege) {

    }

    @Override
    public void onUserNameChanged(long l, String s) {

    }

    @Override
    public void onUserNamesChanged(List<Long> list) {

    }

    @Override
    public void onFreeMeetingNeedToUpgrade(FreeMeetingNeedUpgradeType freeMeetingNeedUpgradeType, String s) {

    }

    @Override
    public void onFreeMeetingUpgradeToGiftFreeTrialStart() {

    }

    @Override
    public void onFreeMeetingUpgradeToGiftFreeTrialStop() {

    }

    @Override
    public void onFreeMeetingUpgradeToProMeeting() {

    }

    @Override
    public void onClosedCaptionReceived(String s, long l) {

    }

    @Override
    public void onRecordingStatus(RecordingStatus recordingStatus) {

    }

    @Override
    public void onLocalRecordingStatus(long l, RecordingStatus recordingStatus) {

    }

    @Override
    public void onInvalidReclaimHostkey() {

    }

    @Override
    public void onPermissionRequested(String[] strings) {

    }

    @Override
    public void onAllHandsLowered() {

    }

    @Override
    public void onLocalVideoOrderUpdated(List<Long> list) {

    }

    @Override
    public void onMeetingNeedPasswordOrDisplayName(boolean needPassword, boolean needDisplayName, InMeetingEventHandler handler) {
        
    }

    @Override
    public void onWebinarNeedRegister(String s) {
        
    }

    @Override
    public void onJoinWebinarNeedUserNameAndEmail(InMeetingEventHandler inMeetingEventHandler) {

    }

    @Override
    public void onMeetingNeedCloseOtherMeeting(InMeetingEventHandler inMeetingEventHandler) {

    }

    @Override
    public void onMeetingFail(int i, int i1) {

    }


}