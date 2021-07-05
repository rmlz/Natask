import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  Login,
  Register,
  ToDoTasks,
  DoneTasks,
  App,
  Task,
} from '../screens/Screens';
import React, {useState, useEffect, Component} from 'react';
import auth from '@react-native-firebase/auth';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon} from 'react-native-elements';
import {signOut} from '../services/FirebaseApi';
import {Button} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const TaskTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="A fazer" component={ToDoTasks} />
      <Tab.Screen name="Feitas" component={DoneTasks} />
    </Tab.Navigator>
  );
};

class Routes extends Component {
  // Set an initializing state whilst Firebase connects
  state = {
    initializing: true,
    user: null,
  };
  subscriber;
  self = this;

  // Handle user state changes
  onAuthStateChanged(user, src) {
    src.setState({user: user});
    console.log('LOGUEI O SEU USUARIO', user);
  }

  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(user =>
      this.onAuthStateChanged(user, this.self),
    );
    console.log('SUBSCRIBAAAAAAAAAAAAAA', this);
    if (this.state.initializing) {
      return null;
    }
  }

  componentWillUnmount() {
    try {
      this.subscriber.unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.user == null) {
      return (
        <Stack.Navigator headerMode={'screen'}>
          <Stack.Screen
            name={'App'}
            component={App}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false}}
          />

          <Stack.Screen name={'Registrar'} component={Register} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator headerMode={'screen'}>
          <Stack.Screen
            name={'Lista de Tarefas'}
            component={TaskTab}
            options={{
              headerRight: () => {
                return (
                  <Button
                    color={'red'}
                    title={'SAIR'}
                    onPress={() => {
                      signOut();
                    }}
                  />
                );
              },
            }}
          />
          <Stack.Screen name={'Tarefa'} component={Task} />
        </Stack.Navigator>
      );
    }
  }
}

export default Routes;
