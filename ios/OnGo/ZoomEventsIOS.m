#import "ZoomEventsIOS.h"
@implementation ZoomEventsIOS

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static ZoomEventsIOS *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"onMeetingStatusChanged", @"onMeetingLeaveComplete"];
}

// - (void)sendNotificationToReactNative
// {
//     [self sendEventWithName:@"EventReminder" body:@{@"name": @"name"}];
// }
@end
