import React from 'react';
import { View, Text, Button} from 'react-native';


export default class Screen2 extends Component {
  render() {
   // let name = this.props.route.params.name;
   //  this.props.navigation.setOptions({title:name});

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Screen2!</Text>
        < Button
            title="Go to Screen1"
            onPress={() => this.props.navigation.navigate("Screen1")}
        />
      </View>
    );
  }
}