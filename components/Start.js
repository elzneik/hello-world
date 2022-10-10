import React, { Component }from "react";
import { 
  View, 
  Text, 
  Button, 
  TextInput, 
  StyleSheet, 
  ImageBackground,
  TouchableOpacity
} from "react-native";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
            source={require('../picture/BackgroundImage.png')} 
            style={styles.image}>
        <Text style={styles.textAppTitle}>Chat App</Text>
            
            <View style={styles.box}>
              {/* User Name Input */}
              
              <TextInput
                style={[styles.textInputField, styles.inputField]}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
              {/* Color Choice Palette */}
              <View style={styles.colorBox}>
                <Text style={styles.colorText}>Background Color</Text>
                <View style={styles.colorChoicePalette}>
                  <TouchableOpacity style={[styles.color, styles.colorBlack]} onPress={() => this.setState({color: "#090C08"})} />
                  <TouchableOpacity style={[styles.color, styles.colorViolet]} onPress={() => this.setState({color: "#474056"})} />
                  <TouchableOpacity style={[styles.color, styles.colorGreyBlue]} onPress={() => this.setState({color: "#8A95A5"})} />
                  <TouchableOpacity style={[styles.color, styles.colorGreyGreen]} onPress={() => this.setState({color: "#B9C6AE"})} />
                </View>
              </View>

              <View>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
                    <Text style={styles.buttonText}>Start Chatting</Text>
                  </TouchableOpacity>
              </View>
            </View> 
        </ImageBackground>
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
    marginBottom: 100,
  },

  // Box contains:
  // 1. Background Box
  box: {
    height: "44%",
    width: "88%", 
    backgroundColor: "#fff", 
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  // 2. TextInput Name
  inputField: {
    width: "88%",
    height: 50,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },
  textInputField: { 
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "center",
  },
  textLabel: { 
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
    
  },

  // 3. Color palette
  colorBox: {
    width: "88%",
    height: "60%",
    justifyContent: "center",
  },
  colorChoicePalette: {
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    justifyContent: "space-between",
    //borderColor: 'gray',
    //borderWidth: 2,
    //borderRadius: 10,
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
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "center",
    marginBottom: 10,
    
  },
  


   // 4. Button to chat feature
   chatButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },

  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },

  buttonText: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
