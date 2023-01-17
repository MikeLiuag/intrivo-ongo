import { CommonActions } from '@react-navigation/native';

const resetTimeline = (navigation) => {
  navigation.dispatch({
    ...CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
          state: {
            index: 0,
            routes: [
              {
                name: 'Timeline',
              },
            ],
          },
        },
      ],
    }),
  });
};

const resetToDashboard = (navigation) => {
  navigation.dispatch({
    ...CommonActions.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    }),
  });
};

const resetToCarePlan = (navigation, params) => {
  navigation.dispatch({
    ...CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        {
          name: 'CarePlan',
          params,
        },
      ],
    }),
  });
};

const resetWebShop = (navigation) => {
  navigation.dispatch({
    ...CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Dashboard' },
        {
          name: 'WebViewHandler',
          params: {
            url: 'https://shop.letsongo.com/pages/covid',
          },
        },
      ],
    }),
  });
};

export { resetTimeline as default, resetTimeline, resetToCarePlan, resetToDashboard, resetWebShop };
