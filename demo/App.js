import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text
} from 'react-native';
import AnimatableProgressBar from 'animateprogress';

const App = () => {
  console.disableYellowBox = true;
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'grey', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <AnimatableProgressBar
          current={100}
          maximum={150}
          width={300}
          borderColor='white'
          height={50}
          borderRadius={30}
          borderWidth={2}
          minimum={20}
          backgroundColor='red'
          type="progress"
          lineBackgroundColor='white'
          textColor='white'
          interval={500}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
