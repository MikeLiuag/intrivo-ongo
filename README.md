## Environment Setup

1. Install a nodejs version manager like [nvm](https://github.com/nvm-sh/nvm)
2. Run `nvm use`, it should point nodejs version based on `.nvmrc`
3. Install expo cli `npm install -g expo-cli`
4. Install yarn `npm install --global yarn`
5. Install eas `npm install -g eas-cli`
6. (Optional) Install [fastlane](https://docs.fastlane.tools/getting-started/ios/setup/) if you want to run eas local build for ios
7. (Optional) Install [android studio or android sdk](https://developer.android.com/studio) if you want to run eas local build for android

# Styles

1.  Copy the pre-commit script into git hooks `cp scripts/pre-commit .git/hooks/pre-commit`
2.  Make sure the script is execuable `chmod +x .git/hooks/pre-commit`
3.  Make sure required package is installed (`yarn install`) before committing your changes.

## Credentials

1. Setup expo token as environment variable. See [official guide](https://docs.expo.dev/accounts/programmatic-access/#personal-account-personal-access-tokens)
2. Use `eas login` to sync with
3. Use `eas credentials` to download/upload ios certificates or android keystores

## Run on local devices/simulators/emulators

1. Use `yarn android` or `yarn ios`
2. If you have some issues, please try to clean node module and reinstall all dependencies `yarn scrub && yarn install`
3. To clear native build folders, run `yarn clean`, do this while facing issue when building the native code.
4. App version and build number in `eas.json` are NOT included when running locally. Please pass in the parameter if you want to change them. For example, `APP_VERSION=2.33 APP_VERSION_CODE=450 yarn android`. Save it in local environment variables, so you don't have to update it everytime.
5. The build script will modify some project templates. Do NOT commit these local changes in `ios` and `android` folder unless it's intended.

## Create a build (environment `dev` as an example)

1. Check build version and build number in `eas.json`, update if necessary
2. Run `yarn eas:android --profile dev` for android apk, or replace android with ios `yarn eas:ios --profile dev` for ios build. `--profile dev` is used to specify environment, one of `dev`, `qa`, `prod` is available. `dev` and `qa` are generating apps bundled with react native code. `prod` is used for release, please check with @wuhao-ouyang if you want to use it.

# WARNING

Do not use `expo prebuild`, please check the details from [expo](https://docs.expo.dev/workflow/customizing/)
