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

    RNIap.initConnection().then(() => {
      // we make sure that "ghost" pending payment are removed
      // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)

      let purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          // yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
          //   .then(async (deliveryResult) => {
          //     if (isSuccess(deliveryResult)) {
          //       // Tell the store that you have delivered what has been paid for.
          //       // Failure to do this will result in the purchase being refunded on Android and
          //       // the purchase event will reappear on every relaunch of the app until you succeed
          //       // in doing the below. It will also be impossible for the user to purchase consumables
          //       // again until you do this.
          //       if (Platform.OS === 'ios') {
          //         await RNIap.finishTransactionIOS(purchase.transactionId);
          //       } else if (Platform.OS === 'android') {
          //         // If consumable (can be purchased again)
          //         await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
          //         // If not consumable
          //         await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          //       }

          //       // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
          //       // If consumable (can be purchased again)
          //       await RNIap.finishTransaction(purchase, true);
          //       // If not consumable
          //       await RNIap.finishTransaction(purchase, false);
          //     } else {
          //       // Retry / conclude the purchase is fraudulent, etc...
          //     }
          //   });
        }
      });

      let purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
        console.warn('purchaseErrorListener', error);
      })
    })

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