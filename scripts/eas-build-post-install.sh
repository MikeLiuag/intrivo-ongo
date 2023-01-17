#!/bin/sh
echo "Running post-instal-script..."
echo "$APP_ENV-$APP_VERSION"
mkdir -p tmp
echo -e "APP_ENV=$APP_ENV\nAPP_VERSION=$APP_VERSION\nAPP_VERSION_CODE=$APP_VERSION_CODE" > tmp/.env
# /usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $APP_VERSION" "./ios/OnGo/Info.plist"
# /usr/libexec/PlistBuddy -c "Set :EXUpdatesReleaseChannel $APP_ENV-$APP_VERSION" "./ios/OnGo/Supporting/Expo.plist"
echo "Done post-instal-script"
