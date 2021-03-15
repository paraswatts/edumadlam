import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CustomToastView, LoaderHOC } from './src/components';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import RootNavigator from './src/navigator';
import Orientation from 'react-native-orientation-locker';
import { isTablet } from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'
import * as RNIap from 'react-native-iap';

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
    !isTablet() && Orientation.lockToPortrait()



    async function fetchMyAPI() {
      await RNIap.initConnection()
    }
    fetchMyAPI()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{ flex: 1 }}>
          <LoaderHOC>
            <RootNavigator />
            <FlashMessage
              position="bottom"
              autoHide
              MessageComponent={CustomToastView}
              floating
              duration={5000}
            />
          </LoaderHOC>
        </View>
      </PersistGate>
    </Provider>
  );
}

export default App;