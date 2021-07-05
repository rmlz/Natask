import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {currentUser} from '../services/FirebaseApi';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loading} />
      </View>
    );
  }

  async componentDidMount() {
    let resetNavigation = CommonActions.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });

    try {
      const user = await currentUser();
      console.log('TEM USUARIO LOGADO AÍ?', user);
      if (user != null) {
        console.log('Bora ir pra lista de tarefas direto');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Lista de Tarefas'}],
          }),
        );
      } else {
        this.props.navigation.dispatch(resetNavigation);
      }
    } catch (err) {
      this.props.navigation.dispatch(resetNavigation);
    }
  }
}

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
    fontSize: 50,
  },
  smallRed: {
    color: 'red',
    fontSize: 20,
  },
});
