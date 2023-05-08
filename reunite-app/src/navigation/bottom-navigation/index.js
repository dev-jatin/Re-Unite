import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Color, Routes, Svg} from '../../../assets';
import {HomePage, ProfilePage} from '../../screen';
import {SvgCss} from 'react-native-svg';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={'Home'}
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <SvgCss height={20} xml={Svg.HOME_ICON_ENABLED} />
            ) : (
              <SvgCss height={20} xml={Svg.HOME_ICON} />
            );
          },
          tabBarActiveTintColor: Color.SECONDARY,
          tabBarLabelStyle: {
            height: 18,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <SvgCss height={20} xml={Svg.PROFILE_ICON_ENABLED} />
            ) : (
              <SvgCss height={20} xml={Svg.PROFILE_ICON} />
            );
          },
          tabBarActiveTintColor: Color.SECONDARY,
          tabBarLabelStyle: {
            height: 18,
          },
        }}
      />
    </Tab.Navigator>
  );
};
