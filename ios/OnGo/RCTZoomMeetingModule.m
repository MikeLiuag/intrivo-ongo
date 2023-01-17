#import <Foundation/Foundation.h>

// RCTZoomMeetingModule.m
#import "RCTZoomMeetingModule.h"

#import <React/RCTLog.h>
#import "VideoViewController.h"

@implementation RCTZoomMeetingModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initZoom:(NSString *)jwt
                  resolve: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^(void) {
  
    MobileRTCSDKInitContext *context = [[MobileRTCSDKInitContext alloc] init];
    context.domain = @"zoom.us";
    context.enableLog = YES;
    context.locale = MobileRTC_ZoomLocale_Default;

    BOOL initializeSuc = [[MobileRTC sharedRTC] initialize:context];
    NSLog(@"initializeContextSuccessful======>%@",@(initializeSuc));
    NSLog(@"MobileRTC Version: %@", [[MobileRTC sharedRTC] mobileRTCVersion]);

    MobileRTCAuthService *authService = [[MobileRTC sharedRTC] getAuthService];
    
    if (authService == nil) {
      reject(@"ZOOM_SDK", @"No auth service", nil);
    }
    authService.delegate = self;
    authService.jwtToken = jwt;

    @try {
      [authService sdkAuth];
    } @catch (NSError *ex) {
      reject(@"ZOOM_SDK", @"Failed to initialize", ex);
    }
    
    RCTLogInfo(@"ZOOM SDK submitted login request succesfull");
    self.initializePromiseResolve = resolve;
    self.initializePromiseReject = reject;

  });
}

RCT_EXPORT_METHOD(
  joinMeeting:(NSString *)meetingNumber 
  password:(NSString *)password 
  name:(NSString *)name
  resolve: (RCTPromiseResolveBlock)resolve
  reject: (RCTPromiseRejectBlock)reject
  )
{
  RCTLogInfo(@"%@ joining meeting room %@ with password %@", meetingNumber, password, name);
  dispatch_async(dispatch_get_main_queue(), ^(void) {
    NSLog(@"joining meeting");
    // [self joinMeeting:meetingNumber meetingPassword:password name: name];
    VideoViewController *rootViewController = [VideoViewController new];

    rootViewController.meetingNumber = meetingNumber;
    rootViewController.password = password;
    rootViewController.name = name;
    UIView* baseView = [[UIView alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
    [baseView setBackgroundColor:[UIColor whiteColor]];
    baseView.userInteractionEnabled = YES;
    [rootViewController.view addSubview:baseView];

    [baseView setHidden:true];

    UINavigationController* base = [[UINavigationController alloc] initWithRootViewController:rootViewController];


    [[UIApplication sharedApplication].delegate.window.rootViewController dismissViewControllerAnimated:YES completion:nil];

    [base setModalPresentationStyle: UIModalPresentationFullScreen];
    [[UIApplication sharedApplication].delegate.window.rootViewController presentViewController:base animated:YES completion:nil];
  });
}

- (void)onMobileRTCAuthReturn:(MobileRTCAuthError)returnValue {
  dispatch_async(dispatch_get_main_queue(), ^(void) {
    switch (returnValue) {
        case MobileRTCAuthError_Success: {
            NSLog(@"SDK successfully initialized.");
            NSLog(@"SDK LOG - Auth was initialized succesfully");
            NSDictionary *resultDict;
            resultDict  =  @{@"initialized": @"true"};
            self.initializePromiseResolve(resultDict);
            break;
        }
        default: {
            NSLog(@"SDK auth failure. Error %lu", (unsigned long)returnValue);
            self.initializePromiseReject(@"ZOOM_SDK", @"Auth Call Returned Error",  nil);
            break;
        } 
    }
  });
}

// - (void)onInitMeetingView
// {
//   NSLog(@"onInitMeetingView");
// }

// - (void)onDestroyMeetingView {
//   NSLog(@"onDestroyMeetingView");
// }

// - (void)dealloc
// {
//   NSLog(@"dealloc");
//   self.selfView = nil;
// }

#pragma mark - Zoom SDK Examples

- (void)joinMeeting:(NSString *)meetingNumber meetingPassword:(NSString *)meetingPassword name:(NSString *)name {
    // Obtain the MobileRTCMeetingService from the Zoom SDK, this service can start meetings, join meetings, leave meetings, etc.
    MobileRTCMeetingService *meetService = [[MobileRTC sharedRTC] getMeetingService];

    if (meetService) {
      MobileRTCMeetingSettings *settings = [[MobileRTC sharedRTC] getMeetingSettings];
      settings.enableCustomMeeting = YES;
      settings.meetingInviteHidden = YES;
      meetService.customizedUImeetingDelegate = self;
      meetService.delegate = self;

      MobileRTCMeetingJoinParam *joinParams = [[MobileRTCMeetingJoinParam alloc] init];
      joinParams.meetingNumber = meetingNumber;
      joinParams.password = meetingPassword;
      joinParams.userName = name;

      [meetService joinMeetingWithJoinParam:joinParams];
      NSLog(@"joining meeting finished");
    }
}


// #pragma mark - MobileRTCMeetingServiceDelegate

// - (void)onMeetingError:(MobileRTCMeetError)error message:(NSString *)message {
//     switch (error) {
//         case MobileRTCMeetError_Success:
//             NSLog(@"Successful meeting operation.");
//         case MobileRTCMeetError_PasswordError:
//             NSLog(@"Could not join or start meeting because the meeting password was incorrect.");
//         default:
//             NSLog(@"Could not join or start meeting with MobileRTCMeetError: %lu %@", error, message);
//     }
// }

// // Is called when the user joins a meeting.
// - (void)onJoinMeetingConfirmed {
//     NSLog(@"Join meeting confirmed.");
// }

// // Is called upon meeting state changes.
// - (void)onMeetingStateChange:(MobileRTCMeetingState)state {
//   NSLog(@"Current meeting state: %lu", state);

//   if (state == MobileRTCMeetingState_Ended) {
//     NSLog(@"meeting ended");
//   } else if (state == MobileRTCMeetingState_InMeeting) {
//     self.selfView = [[MobileRTCVideoView alloc] initWithFrame:CGRectMake(50, 50, 200, 200)];
//     MobileRTCMeetingService *meetService = [[MobileRTC sharedRTC] getMeetingService];
//     [self.selfView showAttendeeVideoWithUserID:[meetService myselfUserID]];
//     [self.selfView setVideoAspect:MobileRTCVideoAspect_PanAndScan];
//     [self.selfView setUserInteractionEnabled:YES];

//     UIPanGestureRecognizer *panGesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePanGesture:)];
//     panGesture.maximumNumberOfTouches = 1;
//     panGesture.minimumNumberOfTouches = 1;

//     [self.selfView addGestureRecognizer: panGesture];

//     [meetService muteMyVideo:NO];
//     [meetService muteMyAudio:NO];

//     [[UIApplication sharedApplication].delegate.window.rootViewController.view addSubview:self.selfView];
//   }
// }

// - (void)handlePanGesture:(UIPanGestureRecognizer *)recognizer {
//     if (recognizer.state == UIGestureRecognizerStateBegan) {
//         NSLog(@"PanGesture start.");
//     } else if (recognizer.state == UIGestureRecognizerStateChanged) {
//         CGPoint location = [recognizer locationInView:self.selfView];
//         if (location.y < 0 || location.y > self.selfView.bounds.size.height) {
//             return;
//         }
//         CGPoint translation = [recognizer translationInView:self.selfView];

//         recognizer.view.center = CGPointMake(recognizer.view.center.x + translation.x,recognizer.view.center.y + translation.y);

//         [recognizer setTranslation:CGPointZero inView:self.selfView];

//     } else if (recognizer.state == UIGestureRecognizerStateEnded || recognizer.state == UIGestureRecognizerStateCancelled) {
//         NSLog(@"PanGesture ended.");
//     }
// }

// RCT_EXPORT_METHOD(leaveMeeting)
// {
//   NSLog(@"leaving");
//   dispatch_async(dispatch_get_main_queue(), ^(void) {
//     MobileRTCMeetingService *meetService = [[MobileRTC sharedRTC] getMeetingService];
//     [meetService leaveMeetingWithCmd: LeaveMeetingCmd_Leave];
//     // [self.selfView removeFromSuperview];
//     // self.selfView = nil;
//   });
// }

@end
