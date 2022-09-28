import React from 'react';
import { View, Text, Button} from 'react-native';


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
