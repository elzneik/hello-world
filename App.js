import React, { Component } from "react";
import "react-native-gesture-handler";
import Chat from "./components/Chat";
import Start from "./components/Start";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Create the navigator
const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


  export default class App extends Component {
 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}