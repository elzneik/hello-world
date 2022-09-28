import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from "react-native";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
            source={require('../picture/BackgroundImage.png')} 
            style={styles.image}>
          <Text style={styles.appTitle}>Hello World Chat</Text>
          <View style={styles.nameBox}> 
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />
            <Button
              style={styles.chatButton}
              title="Start Chatting"
              onPress={() =>
                this.props.navigation.navigate("Chat", { name: this.state.name })
              }
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#090C08",
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    //opacity: 100%,
  },
  image: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    width: '100%', 
    height: '100%',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  nameBox: { 
    height: 40,
    width: 80, 
    borderColor: "#fff", 
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  nameInput: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    // opacity: 50%,
  },
  chatButton: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
  },
});
