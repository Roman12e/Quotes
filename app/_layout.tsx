import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/storeRedux/store';


import SwipeTabs from './src/navigation/swipeNav';


export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <GestureHandlerRootView>
            <SwipeTabs />
          </GestureHandlerRootView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

