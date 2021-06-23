/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView testID='main' style={styles.container}>
        <View testID='first' style={styles.first}>
          <View style={styles.subView}></View>
          <View style={styles.subView}></View>
          <View style={styles.subView}></View>
        </View>
        <View testID='second' style={styles.second}>
          <View style={styles.subView}></View>
          <View style={styles.subView}></View>
          <View style={styles.subView}></View>
        </View>
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  first: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 40,
    borderColor: 'red',
    borderWidth: 2,
  },
  second: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    margin: 40,
    borderColor: 'green',
    borderWidth: 2,
  },
  subView: {
    height: 50,
    width: 50,
    backgroundColor: 'skyblue',
  },
  bigBlue: {
    color: 'blue',
    fontSize: 50
  },
  smallRed: {
    color:'red',
    fontSize: 20
  }
});

export default App;
