/**
 * @format
 */

import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import CameraScreen from './src/screens/CameraScreen'; // Import CameraScreen component
import { name as appName } from './app.json';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraScreen />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => App);
