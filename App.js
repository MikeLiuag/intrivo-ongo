import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View, useWindowDimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { enableScreens } from 'react-native-screens';
// // import { StripeProvider } from '@stripe/stripe-react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { currentVersion } from './utilis/constants';

import LoaderComp from './components/LoaderComp';
import TabBar from './components/tabBar';
import TopNavBar from './components/TopNavBar';
import Notifications from './notification/Notifications';
// // ErrorBoundary
import ErrorBoundary from './components/ErrorBoundary';
// // screens
import LoginScreen from './screens/LoginScreen';
import ForgetScreenPassword from './screens/ForgetPassword/ForgetScreenPassword';
import ForgotEnterCode from './screens/ForgetPassword/EnterCode';
import EnterNewPassword from './screens/ForgetPassword/EnterNewPassword';
import StartedScreen from './screens/StartedScreen';
// import LandingScreen from './screens/LandingScreen';
import IntroSteps from './screens/IntroSteps';
import SignUpSteps from './screens/SignUpSteps';
import PhoneVerificationScreen from './screens/2fa';
import TokenCheckScreen from './screens/TokenCheckScreen';
import SaveTest from './screens/TestScreens/SaveTest';
import Feedback from './screens/Feedback';

// vitamin
import { VitaminPopup, Vitamin, VitaminDQuiz, QuizResult } from './screens/Vitamin';

import Home from './screens/HomeScreen';
import Timeline from './screens/TestScreens/Timeline';
import Shop from './screens/Shop';
import ProfileList from './screens/Profile/ProfileList';
import BasicInfo from './screens/Profile/BasicInfo';
import HealthInfo from './screens/Profile/HealthInfo';
import FilePicker from './screens/VaccineCard/FilePicker';
import ChangePassword from './screens/Profile/ChangePassword';
import DependentsList from './screens/Dependents/DependentsList';
import DependentInfo from './screens/Dependents/DependentInfo';
import DependentEdit from './screens/Dependents/DependentEdit';
import OrganizationList from './screens/Organization/OrganizationList';
import Organization from './screens/Organization/Organization';
import Routines from './screens/Profile/RoutinesList';
import RoutineDetails from './screens/Profile/RoutineDetails';
import TestResultScreen from './screens/TestResult';
import WebViewHandler from './screens/WebViewHandler';
import WebModularFlow from './screens/WebModularFlow';
import ZoomWebView from './screens/ZoomWebView';
import ScanBarCode from './screens/ScanBarCode';
import TakePhoto from './components/Scanner/index';
import AccSettingsScreen from './screens/AccSettingsScreen';
import UpdateScreen from './screens/UpdateScreen'; // use this screen to force update
import VaccineEdit from './screens/VaccineCard/VaccineEdit';
import FilePreview from './screens/VaccineCard/FilePreview';
import AddDoseInfo from './screens/VaccineCard/AddDoseInfo';
import ValidationBox from './components/ValidationBox';
import TestingDetails from './screens/TestingDetails';
import Interstitial from './screens/Interstitial';

// Events
import HomeEvents from './screens/Events/HomeEvents';
import EventInfo from './screens/Events/EventInfo';
import CreateEvent from './screens/Events/CreateEvent';
import EventCode from './screens/Events/EventCode';
import TestQuantity from './screens/Events/TestQuantity';
import EventPayment from './screens/Events/EventPayment';
import EventMoreInfo from './screens/Events/EventMoreInfo';

// Bulk Testing
import EmployeeDetail from './screens/BulkTesting/EmployeeDetail';
import SelectTestResult from './screens/BulkTesting/SelectTestResult';

// import TeleHealth from './screens/ProctoringScreens'; //archived
// import FirstQuestion from './screens/Questions/First';
// import SecondQuestion from './screens/Questions/Second';
import CareList from './screens/CareNavigator/CareList';
import CarePopup from './screens/CareNavigator/CarePopup';
import CareItem from './screens/CareNavigator/CareItem';

// bulk testing
import Employees from './screens/BulkTesting/Employees';
import AddEmployee from './screens/BulkTesting/AddEmployee';
import Groups from './screens/BulkTesting/Groups';
import OrganizationDetails from './screens/BulkTesting/OrganizationDetails';

import DeleteAccount from './screens/DeleteAccount';

import ProductInfo from './screens/Store/ProductInfo';
import Cart from './screens/Store/Cart';
import OrderHistory from './screens/Order/OrderHistory';
import BrowseList from './screens/Store/BrowseList';
import CheckoutShipping from './screens/Store/CheckoutShipping';
import CheckoutPayment from './screens/Store/CheckoutPayment';
import CheckoutReview from './screens/Store/CheckoutReview';
import CheckoutConfirmation from './screens/Store/CheckoutConfirmation';
import OrderDetail from './screens/Order/OrderDetail';

import PretestChecklist from './screens/PretestChecklist';

import ModularTestFlow from './components/modularTestFlow';

import PrivacyPolicy from './screens/PrivacyPolicy';

// paxlovid
import PaxlovidIntro from './screens/Paxlovid/Intro';
import EligibilityFormUserInfo from './screens/Paxlovid/EligibilityFormUserInfo';
import EligibilityFormIdentify from './screens/Paxlovid/EligibilityFormIdentify';
import EligibilityVaccinationStatus from './screens/Paxlovid/VaccinationStatus';
import EligibilityBoosterStatus from './screens/Paxlovid/BoosterStatus';
import EligibilityMedicationStatus from './screens/Paxlovid/MedicationStatus';
import EligibilityRiskFactorStatus from './screens/Paxlovid/RiskFactorStatus';
import EligibilityFormMedicationSelect from './screens/Paxlovid/EligibilityFormMedicationSelect';
import EligibilityFormTermsConsent from './screens/Paxlovid/TermsConsent';
import EligibilityFormReview from './screens/Paxlovid/EligibilityFormReview';
import PharmacySelection from './screens/Paxlovid/PharmacySelection';
import SymptomSelection from './screens/Paxlovid/SymptomSelection';
import EligibilityFormSex from './screens/Paxlovid/EligibilityFormSex';
import EligibilityFormBreastFeeding from './screens/Paxlovid/EligibilityFormBreastFeeding';
import EligibilityFormAllergy from './screens/Paxlovid/EligibilityFormAllergy';
import EligibilityFormAllergySelect from './screens/Paxlovid/EligibilityFormAllergySelect';
import EliminationQuestion from './screens/Paxlovid/EliminationQuestion';

// Long Covid
import LongCovidInfo from './screens/LongCovid/LongCovidInfo';
import LongCovidResult from './screens/LongCovid/LongCovidResult';
import LongCovidList from './screens/LongCovid/LongCovidList';
import LongCovidCS from './screens/LongCovid/LongCovidCS';
// telehealth
import TelehealthInfo from './screens/Telehealth/TelehealthInfo';
import CarePlan from './screens/CarePlan/CarePlan';
import CarePlanSelector from './screens/CarePlan/CarePlanSelector';
import PastConsultations from './screens/CarePlan/PastConsultations';
import TelehealthQuestionnaire from './screens/Telehealth/TelehealthQuestionnaire';
import TelehealthReview from './screens/Telehealth/TelehealthReview';
import Insurance from './screens/Insurance';
import Appointments from './screens/Appointments';
import TreatmentEvalutions from './screens/CarePlan/TreatmentEvaluations';
import PastEvaluations from './screens/CarePlan/PastEvaluations';

// Sniffles
import SnifflesIntro from './screens/Sniffles/Intro';
import SnifflesQuestionnaire from './screens/Sniffles/SnifflesQuestionnaire';
import AppointmentDetails from './screens/Sniffles/AppointmentDetails';
import AssessmentInfoVA from './screens/Sniffles/AssessmentInfoVA';
import AssessmentInfoVB from './screens/Sniffles/AssessmentInfoVB';
import SnifflesSolutions from './screens/Sniffles/SnifflesSolutions';
import SnifflesResult from './screens/Sniffles/SnifflesResult';
import VaccineLanding from './screens/Sniffles/VaccineLanding';
import RescheduleAppointment from './screens/Sniffles/RescheduleAppointment';
import SnifflesBox from './screens/Sniffles/SnifflesBox';
import TestRulingOut from './screens/Sniffles/TestRulingOut/TestRulingOut';
import SnifflesAssessmentQuestionnaire from './screens/Sniffles/Assessment/SnifflesAssessmentQuestionnaire';
import IntroToSolutions from './screens/Sniffles/Assessment/IntroToSolutions';
import IntroToSolutionsV2 from './screens/Sniffles/Assessment/IntroToSolutionsV2';
import IntroToSolutionsOptionB from './screens/Sniffles/Assessment/IntroToSolutionsOptionB';

// Medication Flow
import MedicationIntro from './screens/Medication/Intro';
import MedicationQuestionnaire from './screens/Medication/MedicationQuestionnaire';
import MedicationReview from './screens/Medication/MedicationReview';
import PrescriptionList from './screens/PrescriptionList';
import ScheduleDelivery from './screens/ScheduleDelivery';

import SnifflesTelehealthIntro from './screens/Sniffles/Telehealth/Intro';
import SnifflesTelehealthQuestionnaire from './screens/Sniffles/Telehealth/Questionnaire';
import ReviewSnifflesTelehealthDetails from './screens/Sniffles/Telehealth/questionnaireSteps/ReviewDetails';
import DeliveryStatus from './screens/DeliveryStatus';
import CareOptionsContainer from './components/CareOptionsContainer';
import CheckAvailability from './screens/Sniffles/CheckAvailability';
import NotificationsScreen from './screens/Notifications';

// Stripe
import { STRIPE_KEY_DEV, STRIPE_KEY_LIVE, MERCHANT_ID } from './utilis/stripeConfig';

// Store
import store from './store';

// // Localization
import exec from './utilis/i18n';
// is full app
// import { IS_FULL_APP } from './helpers/globalScope';
import Intrivo from './screens/Intrivo';
import { clearGlobalErrors } from './store/app/slice';
import StripeProvider from './CustomStripeProvider';
import { hideToast } from './store/events/slice';
import { IS_DEV, UNIVERSALLINK_PREFIX, DEEPLINK_SCHEME } from './utilis/axios';
import PushNotification from './components/PushNotification';
import AppVersionCheck from './screens/AppVersionCheck';
import DeepLinks from './components/DeepLinks';
import NIHStack from './screens/NIHReporting';
import CustomRate from './components/CustomRate';
import AppModal from './components/Modals/AppModal';
import ZoomSession from './components/ZoomSession';
import FeedbackModal from './components/Modals/FeedbackModal';
import { compareVersion } from './utilis/helpers';
import BannerModal from './components/BannerModal';

// fonts
const Museo100 = require('./assets/fonts/MuseoSans_100.ttf');
const Museo300 = require('./assets/fonts/MuseoSans_300.ttf');
const Museo500 = require('./assets/fonts/MuseoSans_500.ttf');
const Museo700 = require('./assets/fonts/MuseoSans_700.ttf');
const Museo900 = require('./assets/fonts/MuseoSans_900.ttf');
const Museo300Italic = require('./assets/fonts/MuseoSans_300_Italic.ttf');
const Museo500Italic = require('./assets/fonts/MuseoSans_500_Italic.ttf');

i18n.locale = Localization.locale;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

enableScreens(false);
const prefix = Linking.createURL(`${DEEPLINK_SCHEME}:///`);

const App = () => {
  const [isOpen, onOpen] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const isMobile =
    /iPhone|iPad|iPod|Android/i.test(Constants.platform?.web?.ua) || windowWidth < 1000;

  const [fontLoaded] = useFonts({
    Museo_100: Museo100,
    Museo_300: Museo300,
    Museo_500: Museo500,
    Museo_700: Museo700,
    Museo_900: Museo900,
    Museo_300_Italic: Museo300Italic,
    Museo_500_Italic: Museo500Italic,
  });

  const [translationLoaded, setTranslationLoaded] = useState(false);
  const [deepLink, setDeepLink] = useState(null);

  const navRef = useRef();
  const routeNameRef = useRef();
  const isReadyRef = useRef();

  const linking = {
    prefixes: [prefix, UNIVERSALLINK_PREFIX],
    subscribe(listener) {
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        listener(url);
        setDeepLink(url);
      });

      return () => {
        if (linkingSubscription) linkingSubscription.remove();
      };
    },
    config: {
      screens: {
        Anthem: 'anthem',
      },
    },
  };

  // load translation
  useEffect(() => {
    exec().then(() => setTranslationLoaded(true));
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  // check the auth token in the redux store which can be 3 values:
  //  null (default): app just started and tokencheckscreen is testing for auth token validity
  //  false: auth token is not available or not valid
  //  [string]: valid auth token
  const isAuthed = useSelector((state) => state.app?.isAuthed) ?? null;
  const minimumVersion = useSelector((state) => state.app?.minimumVersion);
  const globalError = useSelector((state) => state.app.globalError) ?? null;
  const savedEmail = useSelector((state) => state.app.savedEmail);

  const dispatch = useDispatch();

  const needsUpgrade = minimumVersion && compareVersion(minimumVersion, currentVersion) > 0;

  const homeStack = () => (
    <Stack.Navigator
      initialRouteName={Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        key='Home'
        name='Home'
        component={Home}
        initialParams={{
          containerStyle: styles.mainContainer,
          headerFont: styles.mainHeaderFont,
          headerStyle: styles.mainHeader,
        }}
      />
      <Stack.Screen key='Employees' name='Employees' component={Employees} />
    </Stack.Navigator>
  );

  const botNavScreens = {
    Home: homeStack,
    Timeline,
    CareList,
  };

  const mainStack = () => (
    <Tab.Navigator
      tabBar={({ state, navigation }) =>
        Platform.OS !== 'web' ? <TabBar state={state} navigation={navigation} /> : null
      }
      initialRouteName={Home}
    >
      {Object.entries(botNavScreens).map(([name, comp]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={comp}
          initialParams={{
            containerStyle: styles.mainContainer,
            headerFont: styles.mainHeaderFont,
            headerStyle: styles.mainHeader,
          }}
        />
      ))}
    </Tab.Navigator>
  );

  const preAuthScreens = {
    // LandingScreen,
    StartedScreen,
    LoginScreen,
    SignUpSteps,
    ForgetScreenPassword,
    ForgotEnterCode,
    EnterNewPassword,
    PhoneVerificationScreen,
  };

  const postAuthScreens = {
    IntroSteps,
    // Dashboard: mainStack,
    ...(Platform.OS !== 'web' ? { Dashboard: mainStack } : { Dashboard: Home, Timeline, CareList }),
    DependentInfo,
    DependentsList,
    Anthem: {
      component: DependentsList,
      params: {
        slideFromBottom: true,
        navigateTo: 'Intrivo',
        header: '',
        includeSelf: true,
        addsOptions: {
          barCodeCheck: true,
        },
      },
    },
    Routines,
    RoutineDetails,
    OrganizationList,
    Organization,
    DependentEdit,
    Timeline,
    ProfileList,
    Intrivo: {
      component: Intrivo,
      params: {
        slideFromBottom: true,
      },
    },
    BasicInfo,
    HealthInfo,
    FilePicker,
    ChangePassword,
    Shop,
    TestResultScreen,
    WebViewHandler,
    WebModularFlow,
    ZoomWebView,
    ScanBarCode,
    TakePhoto,
    AccSettingsScreen,
    ForgetScreenPassword,
    ForgotEnterCode,
    EnterNewPassword,
    VaccineEdit,
    FilePreview,
    AddDoseInfo,
    PhoneVerificationScreen,
    TestingDetails,
    EventInfo,
    CreateEvent,
    EventCode,
    TestQuantity,
    EventPayment,
    EventMoreInfo,
    CareList,
    CarePopup,
    CareItem,
    AddEmployee,
    Groups,
    EmployeeDetail,
    OrganizationDetails,
    SelectTestResult,
    DeleteAccount,
    ModularTestFlow,
    VitaminPopup,
    Vitamin,
    VitaminDQuiz,
    ProductInfo,
    Cart,
    OrderHistory,
    QuizResult,
    BrowseList,
    CheckoutShipping,
    CheckoutPayment,
    CheckoutReview,
    CheckoutConfirmation,
    OrderDetail,
    NIHStack,
    PretestChecklist,
    SaveTest,
    Feedback,
    PaxlovidIntro,
    EligibilityFormUserInfo,
    EligibilityVaccinationStatus,
    EligibilityFormIdentify,
    EligibilityBoosterStatus,
    EligibilityMedicationStatus,
    EligibilityRiskFactorStatus,
    EligibilityFormMedicationSelect,
    EligibilityFormTermsConsent,
    EligibilityFormReview,
    EligibilityFormSex,
    EligibilityFormBreastFeeding,
    EligibilityFormAllergy,
    EligibilityFormAllergySelect,
    EliminationQuestion,
    PharmacySelection,
    ScheduleDelivery,
    DeliveryStatus,
    SymptomSelection,
    LongCovidInfo,
    LongCovidResult,
    LongCovidList,
    LongCovidCS,
    SnifflesIntro,
    SnifflesQuestionnaire,
    AppointmentDetails,
    TelehealthInfo,
    PrivacyPolicy,
    TelehealthQuestionnaire,
    TelehealthReview,
    CarePlan,
    CarePlanSelector,
    PastConsultations,
    Insurance,
    Appointments,
    Interstitial,
    AssessmentInfoVA,
    AssessmentInfoVB,
    SnifflesSolutions,
    SnifflesResult,
    VaccineLanding,
    RescheduleAppointment,
    MedicationIntro,
    MedicationQuestionnaire,
    SnifflesTelehealthIntro,
    SnifflesTelehealthQuestionnaire,
    ReviewSnifflesTelehealthDetails,
    SnifflesBox,
    TestRulingOut,
    MedicationReview,
    PrescriptionList,
    SnifflesAssessmentQuestionnaire,
    IntroToSolutions,
    IntroToSolutionsV2,
    IntroToSolutionsOptionB,
    CareOptionsContainer,
    TreatmentEvalutions,
    PastEvaluations,
    CheckAvailability,
    NotificationsScreen,
    HomeEvents,
  };

  if (!fontLoaded || !translationLoaded) {
    Linking.getInitialURL().then((url) => {
      setDeepLink(url);
    });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoaderComp />
      </View>
    );
  }

  if (Platform.OS !== 'web' && !minimumVersion) return <AppVersionCheck />;
  if (isAuthed === null) return <TokenCheckScreen />;
  if (Platform.OS !== 'web' && needsUpgrade) return <UpdateScreen />;

  const initialRouteName = savedEmail ? 'LoginScreen' : 'StartedScreen';

  return (
    <NavigationContainer
      linking={linking}
      fallback={<LoaderComp />}
      ref={navRef}
      onReady={() => {
        routeNameRef.current = navRef.current.getCurrentRoute().name;
        isReadyRef.current = true;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navRef.current.getCurrentRoute().name;

        if (
          previousRouteName !== currentRouteName &&
          previousRouteName !== 'EnterNewPassword' &&
          currentRouteName !== 'ForgotEnterCode' &&
          currentRouteName !== 'LoginScreen'
        ) {
          dispatch(clearGlobalErrors());
          dispatch(hideToast());
          // SetCurrentScreen(currentRouteName); sometimes may overwrite other events in debug mode
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <AppModal />
      <BannerModal />
      <FeedbackModal navRef={navRef} />
      {globalError ? (
        <ValidationBox error={globalError} subtitle='' hideX={false} isMobile={isMobile} />
      ) : null}
      {Platform.OS !== 'web' && <PushNotification replaceDeepLink={setDeepLink} />}
      <DeepLinks
        deepLink={deepLink}
        botNavScreens={botNavScreens}
        replaceDeepLink={setDeepLink}
        navRef={navRef}
        navReady={isReadyRef.current}
      />
      <ZoomSession navRef={navRef} />
      {Platform.OS !== 'web' && <Notifications />}
      {Platform.OS !== 'web' && <CustomRate navRef={navRef} />}
      <Stack.Navigator optimizationsEnabled initialRouteName={initialRouteName}>
        {Object.entries(!isAuthed ? preAuthScreens : postAuthScreens).map(([name, component]) => {
          const comp = typeof component === 'object' ? component.component : component;
          const options = ({ route }) => ({
            ...(route.params?.slideFromBottom ? TransitionPresets.ModalTransition : {}),
            headerShown: false,
            gestureEnabled: false,
            ...(component?.options ?? {}),
          });
          if (Platform.OS === 'web') {
            return (
              <Stack.Screen
                key={name}
                name={name}
                options={options}
                initialParams={component?.params}
              >
                {(props) => (
                  <TopNavBar
                    isMobile={isMobile}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    route={{
                      params: {
                        containerStyle: styles.mainContainer,
                        headerFont: styles.mainHeaderFont,
                        headerStyle: styles.mainHeader,
                        ...component?.params,
                      },
                    }}
                    screen={isReadyRef.current ? routeNameRef.current : null}
                  >
                    {comp}
                  </TopNavBar>
                )}
              </Stack.Screen>
            );
          }
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={comp}
              options={options}
              initialParams={
                component?.params || {
                  containerStyle: styles.mainContainer,
                  headerFont: styles.mainHeaderFont,
                  headerStyle: styles.mainHeader,
                }
              }
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <StripeProvider
        publishableKey={IS_DEV ? STRIPE_KEY_DEV : STRIPE_KEY_LIVE}
        urlScheme={DEEPLINK_SCHEME}
        merchantIdentifier={MERCHANT_ID}
      >
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
          <App />
        </SafeAreaProvider>
      </StripeProvider>
    </Provider>
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  mainHeader: {
    marginTop: 36,
    paddingHorizontal: 24,
  },
  mainHeaderFont: {
    fontFamily: 'Museo_500',
    fontSize: 32,
  },
});

export default AppWrapper;
