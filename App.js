import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Sidebar from './src/components/Sidebar';
import {navigationName} from './src/configs/config';
import {Provider} from './src/redux/provider';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Action from './src/screens/Action';
import Detail from './src/screens/Detail';
import Camera from './src/screens/Camera';
import Profile from './src/screens/Profile';
import Splash from './src/screens/Splash';
import Privacy from './src/screens/Privacy';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = function () {
  return (
    <Drawer.Navigator
      initialRouteName={navigationName.home}
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '80%'},
      }}>
      <Drawer.Screen name={navigationName.home} component={Home} />
      <Drawer.Screen name={navigationName.profile} component={Profile} />
      <Drawer.Screen name={navigationName.privacy} component={Privacy} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={navigationName.splash}
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name={navigationName.splash} component={Splash} />
          <Stack.Screen name={navigationName.login} component={Login} />
          <Stack.Screen name={navigationName.detail} component={Detail} />
          <Stack.Screen name={navigationName.action} component={Action} />
          <Stack.Screen name={navigationName.camera} component={Camera} />
          <Stack.Screen name={navigationName.root} component={Root} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
