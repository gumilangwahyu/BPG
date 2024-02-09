// import * as React from 'react';
import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, TouchableOpacity, Avatar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from './MessageList';
import GamesScreen from './Games';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import NotificationScreen from './Notification';
import ExploreScreen from './Explore';
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs({ route, navigation }) {
  const user = route.params.user_id;
  const signOutNow = () => {
    signOut(auth).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }).catch((error) => { });
  }

  useLayoutEffect(() => {
    navigation.setOptions({

      headerRight: () => (
        <TouchableOpacity style={{
          marginRight: 10
        }}
          onPress={signOutNow}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      )
    })

  }, [navigation]);
  return (
    <Tab.Navigator initialRouteName='ExploreScreen'
      screenOptions={{
        tabBarActiveTintColor: '#DE1914',
        tabBarStyle: {
          backgroundColor: '#3D3D3D',
          padding: 1
        },

      }}

    >
      <Tab.Screen name="ExploreScreen" component={ExploreScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
        })} />
      <Tab.Screen name="MessageScreen" component={MessageScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" color={color} size={size} />
          ),
        })} />
      <Tab.Screen name="GamesScreen" component={GamesScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Games',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gamepad" size={size} color={color} />
          ),
        })} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} initialParams={{ user_id: user }}
        options={() => ({
          headerBackVisible: false,
          headerShown: false,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        })} />

    </Tab.Navigator>
  );
}