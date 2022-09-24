import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: ""};
    }
    render() {
        return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hello Screen1!</Text>
            <TextInput
                style={{height: 40, borderColor: "gray", borderWidth: 1}}
                onChangeText={name => this.setState({name})}
                value={this.state.text}
                placeholder="Type here..."
            />
            <Button
            title="Go to Screen 2"
            onPress={() => this.props.navigation.navigate('Screen2', {name:this.state.name})}
            />
        </View>
        );
    }
}