import React, { FC } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

// const { Navigator, Screen } = createStackNavigator();
const { Navigator, Screen } = createDrawerNavigator();

import { Home, Form, Search, Artist, Music, Video } from "./screens";

import { theme } from "./theme";

const ScreenOptions = () => ({
  cardStyle: {
    backgroundColor: theme.colors.background,
  },
  headerShown: true,
});

const Routes: FC = () => (
  <Navigator initialRouteName="Music" screenOptions={ScreenOptions}>
    <Screen name="Home" component={Home} />
    <Screen name="Form" component={Form} />
    <Screen name="Search" component={Search} />
    <Screen name="Artist" component={Artist} />
    <Screen name="Music" component={Music} />
    <Screen name="Video" component={Video} />
  </Navigator>
);

export default Routes;
