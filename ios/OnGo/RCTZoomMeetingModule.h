#ifndef RCTZoomMeetingModule_h
#define RCTZoomMeetingModule_h

#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <MobileRTC/MobileRTC.h>
#import "AppDelegate.h"

// , MobileRTCMeetingServiceDelegate, MobileRTCCustomizedUIMeetingDelegate
@interface RCTZoomMeetingModule : NSObject <RCTBridgeModule, MobileRTCMeetingServiceDelegate>

@property (nonatomic, copy) RCTPromiseResolveBlock initializePromiseResolve;
@property (nonatomic, copy) RCTPromiseRejectBlock initializePromiseReject;

- (void)joinMeeting:(nonnull NSString *)meetingNumber meetingPassword:(nonnull NSString*)meetingPassword  name:(nonnull NSString*)name;

@end

#endif /* RCTZoomMeetingModule_h */
