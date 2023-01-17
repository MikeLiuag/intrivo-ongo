#import <Foundation/Foundation.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <Expo/Expo.h>

#import <MobileRTC/MobileRTC.h>

@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate, MobileRTCAuthDelegate>
// TODO: change the following to use jwt signature
-(void)setupSDK:(NSString *)sdkKey sdkSecret:(NSString *)sdkSecret;
@end
