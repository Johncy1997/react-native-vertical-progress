**React native animated progress bar**

It's a simple progress bar using **React Native Animated API**. I created this for improving one step forward me into writing libraries.

**DEMO**

![Progress](/assets/progress.gif)

![Increase](/assets/increase.gif)

Install this by running command in your project directory `npm install --save animateprogress`

```import React, { Fragment } from 'react';
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
```

Currently this library supports two types of progress bar. 
* Increase
* Progress

In next version of release we will add more features and one more type:
* Decrease

Please fork my repository if you want any other features or raise ideas to improve this library on *issues* tab.
