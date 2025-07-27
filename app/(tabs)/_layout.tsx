import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../constants/theme';
import { dashboard, media, more, watch } from '@/assets/images';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: colors.textLight,
        headerShown: false,
        tabBarBackground: () => (
          <View style={{
            flex: 1,
            backgroundColor: colors.backgroundDark,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }} />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 10,
          borderTopColor: colors.borderDark,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <View style={styles.gridIcon}>
                <Image source={dashboard} tintColor={focused ? 'white' : colors.textLight} style={{ width: 16, height: 16 }} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="watch"
        options={{
          title: 'Watch',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <View style={styles.gridIcon}>
                <Image source={watch} tintColor={color} style={{ width: 16, height: 16 }} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Media Library',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <View style={styles.gridIcon}>
                <Image source={media} tintColor={color} style={{ width: 16, height: 16 }} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <View style={styles.gridIcon}>
                <Image source={more} tintColor={color} style={{ width: 16, height: 16 }} />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
  },
});
