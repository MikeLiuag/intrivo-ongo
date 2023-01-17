//
//  ViewController.m
//  ZoomiOSSDKDemoInObjC
//
//  Created by Zoom Video Communications on 8/18/20.
//  Copyright © 2020 Zoom Video Communications. All rights reserved.
//

#import "VideoViewController.h"
#import <MobileRTC/MobileRTC.h>
#import "ZoomEventsIOS.h"
// #import "OnGo-Swift.h"

@interface VideoViewController ()

@end

@implementation VideoViewController

#pragma mark - LifeCycle

- (void)viewDidLoad {
    [super viewDidLoad];

    UINavigationController *navController = self.navigationController;

    // The Zoom SDK requires a UINavigationController to update the UI for us. Here we supplied the SDK with the ViewControllers navigationController.
    if (navController)
        [[MobileRTC sharedRTC] setMobileRTCRootController:navController];

    /// Notification that is used to start a meeting upon log in success.
    // [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(userLoggedIn) name:@"userLoggedIn" object:nil];



  [self joinMeeting:self.meetingNumber meetingPassword:self.password name: self.name];

}

#pragma mark - Zoom SDK Examples

- (void)joinMeeting:(NSString *)meetingNumber meetingPassword:(NSString *)meetingPassword name:(NSString *)name {
  NSLog(@"joining room with @s/@s with name @s", meetingNumber, meetingPassword, name);
    // Obtain the MobileRTCMeetingService from the Zoom SDK, this service can start meetings, join meetings, leave meetings, etc.
    MobileRTCMeetingService *meetService = [[MobileRTC sharedRTC] getMeetingService];

    if (meetService) {
        // Set the ViewController to be the MobileRTCMeetingServiceDelegate
        meetService.delegate = self;

        // Create a MobileRTCMeetingJoinParam to provide the MobileRTCMeetingService with the necessary info to join a meeting.
        // In this case, we will only need to provide a meeting number and password.
        MobileRTCMeetingJoinParam *joinParams = [[MobileRTCMeetingJoinParam alloc] init];
        joinParams.meetingNumber = meetingNumber;
        joinParams.password = meetingPassword;
        joinParams.userName = name;

        // Call the joinMeeting function in MobileRTCMeetingService. The Zoom SDK will handle the UI for you, unless told otherwise.
        // If the meeting number and meeting password are valid, the user will be put into the meeting. A waiting room UI will be presented or the meeting UI will be presented.
        [meetService joinMeetingWithJoinParam:joinParams];
    }
}


// - (void)logIn:(NSString *)email password:(NSString *)password {
//     // Obtain the MobileRTCAuthService from the Zoom SDK, this service can log in a Zoom user, log out a Zoom user, authorize the Zoom SDK etc.
//    MobileRTCAuthService *authService = [[MobileRTC sharedRTC] getAuthService];

//    if (authService)
//        // Call the login function in MobileRTCAuthService. This will attempt to log in the user.
//        [authService loginWithEmail:email password:password rememberMe:false];
// }


// - (void)startMeeting {
//     // Obtain the MobileRTCMeetingService from the Zoom SDK, this service can start meetings, join meetings, leave meetings, etc.
//    MobileRTCMeetingService *meetService = [[MobileRTC sharedRTC] getMeetingService];

//    if (meetService) {
//        // Set the ViewController to be the MobileRTCMeetingServiceDelegate
//        meetService.delegate = self;

//        // Create a MobileRTCMeetingStartParam to provide the MobileRTCMeetingService with the necessary info to start an instant meeting.
//        // In this case we will use MobileRTCMeetingStartParam4LoginlUser, since the user has logged into Zoom.
//        MobileRTCMeetingStartParam * startParams = [[MobileRTCMeetingStartParam4LoginlUser alloc] init];

//        // Call the startMeeting function in MobileRTCMeetingService. The Zoom SDK will handle the UI for you, unless told otherwise.
//        [meetService startMeetingWithStartParam:startParams];
//    }
// }

// #pragma mark - Internal

// /// Selector that is used to start a meeting upon log in success.
// - (void)userLoggedIn {
//     [self startMeeting];
// }


#pragma mark - MobileRTCMeetingServiceDelegate

// Conform ViewController to MobileRTCMeetingServiceDelegate.
// MobileRTCMeetingServiceDelegate listens to updates about meetings, such as meeting state changes, join attempt status, meeting errors, etc.


- (void)onMeetingError:(MobileRTCMeetError)error message:(NSString *)message {
    switch (error) {
        case MobileRTCMeetError_Success:
            NSLog(@"Successful meeting operation.");
        case MobileRTCMeetError_PasswordError:
            NSLog(@"Could not join or start meeting because the meeting password was incorrect.");
        default:
            NSLog(@"Could not join or start meeting with MobileRTCMeetError: %lu %@", error, message);
    }
}

// Is called when the user joins a meeting.
- (void)onJoinMeetingConfirmed {
    NSLog(@"Join meeting confirmed.");
}


// Is called upon meeting state changes.
- (void)onMeetingStateChange:(MobileRTCMeetingState)state {
    NSLog(@"Current meeting state: %lu", state);

    // ZoomEventsIOS * eventScript = [[ZoomEventsIOS alloc] init];
    ZoomEventsIOS * eventScript = [ZoomEventsIOS allocWithZone: nil];
    NSString *eventName = [NSString stringWithFormat:@"%lu", state];
    [eventScript sendEventWithName:@"onMeetingStatusChanged" body:@{@"name": eventName}];
    // eventScript.emitter.sendEventWithName(withName: @"onMeetingStatusChanged", body: @{@"name": eventName})

  if (state == MobileRTCMeetingState_Ended) {
    NSLog(@"meeting ended");
    [self dismissViewControllerAnimated:true completion:^{
          NSLog(@"ended");
    }];
  }
}

- (void)onMeetingEndedReason:(MobileRTCMeetingEndReason)reason {
    NSLog(@"Current end reason: %lu", reason);
    ZoomEventsIOS * eventScript = [ZoomEventsIOS allocWithZone: nil];
    NSString *eventName = [NSString stringWithFormat:@"%lu", reason];
    [eventScript sendEventWithName:@"onMeetingLeaveComplete" body:@{@"name": eventName}];
}

@end
