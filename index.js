import {AppRegistry, SafeAreaView} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Router';

const wrappedRoutes = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => wrappedRoutes);
