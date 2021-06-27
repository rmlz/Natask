import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Login, Register} from '../screens/Screens';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

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

  if (initializing) return null;

  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen name={'Register'} component={Register} />
    </Stack.Navigator>
  );
};

export default Routes;
