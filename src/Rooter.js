import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import Settings from './components/Settings';
import Onaylama from './components/Onaylama';
import LoginPage from './components/LoginPage';
import Friends from './components/Friends';
import UserDataUpdate from './components/UserDataUpdate';
import Register from './components/Register';

import {navigationRef} from './RooterNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: 'FRIENDS',
          tabBarIcon: () => (
            <Image
              style={{width: 40, height: 40}}
              source={require('../src/components/image/friends.png')}
            />
          ),
        }}
        name="Friends1"
        component={Friends}
      />
      <Tab.Screen
        options={{
          title: 'ADD',
          tabBarIcon: () => (
            <Image
              style={{width: 30, height: 30}}
              source={require('../src/components/image/plus.png')}
            />
          ),
        }}
        name="Settings"
        component={Settings}
      />
      <Tab.Screen
        options={{
          title: 'SETTİNGS',
          tabBarIcon: () => (
            <Image
              style={{width: 40, height: 40}}
              source={require('../src/components/image/friends.png')}
            />
          ),
        }}
        name="settings"
        component={UserDataUpdate}
      />
        <Tab.Screen
        options={{
          title: 'İstekler',
          tabBarIcon: () => (
            <Image
              style={{width: 40, height: 40}}
              source={require('../src/components/image/friends.png')}
            />
          ),
        }}
        name="onaylama"
        component={Onaylama}
      />
      
    </Tab.Navigator>
  );
}

const RooterComponent = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="a" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RooterComponent;

