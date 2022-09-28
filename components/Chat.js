import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';


export default class Chat extends Component {
  render() {
   let name = this.props.route.params.name;
   this.props.navigation.setOptions({title:name});

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to the Chat</Text>
        < Button
            style={styles.chatButton}
            title="Go to Start"
            onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    width: '100%', 
    height: '100%',
  },

  textAppTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // Box contains:
  // 1. Background Box
  box: {
    height: "44%",
    width: "88%", 
    backgroundColor: "#fff", 
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  // 2. TextInput Name
  inputField: {
    width: "88%",
    height: 50,
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: "50%",
  },
  textInputField: { 
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    textAlign: "center",
  },
  // 3. Color palette
  colorBox: {
    width: "88%",
    height: "60%",
    marginLeft: "6%",
    justifyContent: "center",
  },
  colorChoicePalette: {
    flexDirection: "row",
    alignItems: "Center",
    cursor: "pointer",
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorBlack: {
    backgroundColor: '#090C08',
  },
  colorViolet: {
    backgroundColor: '#474056',
  },
  colorGreyBlue: {
    backgroundColor: '#8A95A5',
  },
  colorGreyGreen: {
    backgroundColor: '#B9C6AE',
  },
  colorText: {
    fontSize: 45,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  textLabel: { 
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    textAlign: "left",
  },


   // 4. Button to chat feature
   chatButton: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
  },

});
