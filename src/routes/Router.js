import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  Login,
  Register,
  ToDoTasks,
  DoneTasks,
  App,
  Task,
} from '../screens/Screens';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const TaskTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="To Do" component={ToDoTasks} />
      <Tab.Screen name="Done" component={DoneTasks} />
    </Tab.Navigator>
  );
};

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

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

      <Stack.Screen name={'Register'} component={Register} />
      <Stack.Screen name={'TaskList'} component={TaskTab} />
      <Stack.Screen name={'Task'} component={Task} />
    </Stack.Navigator>
  );
};

export default Routes;
