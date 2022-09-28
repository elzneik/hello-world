import React, { Component } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';


export default class Chat extends Component {
  render() {
   let name = this.props.route.params.name;
   this.props.navigation.setOptions({title:name});

    return (
      <View style={styles.container}>
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
    justifyContent: 'center', 
    alignItems: 'center'
  },
   chatButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
