import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class HelloWorld extends Component {
  render() {
    return (
      <View style={styles.parentView}>
          <View style={styles.containerOne}></View>
          <View style={styles.containerTwo}></View>
          <View style={styles.containerThree}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex:1,
    //backgroundColor: "#ffff99",
    flexDirection: "column",
  },
  containerOne: {
    flex:100,
    backgroundColor: "#fa6d98",  
  },
  containerTwo: {
    flex:8,
    backgroundColor: "#fa6d98",   
  },
  containerThree: {
    flex:2,
    backgroundColor: "#fa6d98", 
  },
});



/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <Text style={styles.blue}>Hello World!</Text>
      <Text style={styles.bigRed}>How are you?</Text>
      <Text style={styles.bigRedBold}>I am feeling good!</Text>
      <Text style={[styles.blue, styles.bigRed]}>I'm feeling blue!</Text>
      <View style={styles.box}></View>
      <StatusBar style="auto" />
    </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#ffff99',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    color: '#0066ff',
    fontWeight: "600",
  },
  bigRed: {
    color: 'red',
    fontSize: 30,
  },
  bigRedBold: {
    color: 'red',
    fontSize: 30,
    fontWeight: '600',
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
  }
});
*/
