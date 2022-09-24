import React, { Component } from 'react';
//import { StyleSheet, View, TextInput, Text, Button, Alert, ScrollView  } from 'react-native';
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import 'react-native-gesture-handler';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class HelloWorld extends React.Component {

  //constructor (props) {
  //  super(props);
  //   this.state = { text: " "};
  // }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen1"
        >
          <Stack.Screen
            name="Screen1"
            component={Screen1}
          />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  }

  /*


  alertMyText (input =[]) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box1}></View>
        <ScrollView>
          <Text style={{fontSize:110}}>
            This text is so big! And so long! You have to scroll!
          </Text>
        </ScrollView>
        <View style={styles.box2}></View>
        <View style={{flex:10, justifyContent: "center"}}>
          <TextInput
            style={{height: 50, borderColor: "gray", borderWidth: 1}}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
            placeholder="Type here..."
          />
          <Text>You wrote: {this.state.text}</Text>
        <Button
          onProgress={() => {
            this.alertMyText({text: this.state.text});
          }}
          title="Press Me"
          />
        <View style={styles.box3}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "yellow"
  },
  box1: {
    //flex:10,
    width:50,
    height: 50,
    backgroundColor: 'blue'
  },
  box2: {
    flex:20,
    backgroundColor: 'red'
  },
  box3: {
    flex:10,
    backgroundColor: 'green'
  }
});
*/



/*
My code does not work?! Why? 
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
    flexDirection: "row",
  },
  containerOne: {
    flex:100,
    backgroundColor: "#fa6d98",  
  },
  containerTwo: {
    flex:50,
    backgroundColor: "#fa6d98",   
  },
  containerThree: {
    flex:40,
    backgroundColor: "#fa6d98", 
  },
});
*/
    //backgroundColor: "#ffff99",


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
