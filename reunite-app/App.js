import React from 'react';
import {StatusBar} from 'react-native';
import {RecoilRoot} from 'recoil';
import {Color} from './assets';
import Navigation from './src/navigation';
import {ChatPage} from './src/screen';

const App = () => {
  return (
    <>
      {/* <ChatPage /> */}
      <RecoilRoot>
        <StatusBar
          backgroundColor={Color.TRANSPARENT}
          barStyle={Color.STATUS_BAR_DARK}
          translucent={true}
        />
        <Navigation />
      </RecoilRoot>
    </>
  );
};

export default App;
