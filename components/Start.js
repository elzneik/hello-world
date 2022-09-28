import React from "react";
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
        <Text style={styles.textAppTitle}>Welcome to the "Hello World" chat</Text>
            
            <View style={styles.box}>

              {/* User Name Input */}
              <Text style={styles.textLabel}>Choose Background Color</Text>
              <TextInput
                style={styles.textInputField}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />

              {/* Color Choice Palette */}
              <View style={styles.colorBox}>
                <Text style={styles.colorText}>Choose a Color</Text>
                <View style={styles.colorChoicePalette}>
                  <TouchableOpacity style={[styles.color, styles.colorBlack]} onPress={() => this.setState({color: "#090C08"})} />
                  <TouchableOpacity style={[styles.color, styles.colorViolet]} onPress={() => this.setState({color: "#474056"})} />
                  <TouchableOpacity style={[styles.color, styles.colorGreyBlue]} onPress={() => this.setState({color: "#8A95A5"})} />
                  <TouchableOpacity style={[styles.color, styles.colorGreyGreen]} onPress={() => this.setState({color: "#B9C6AE"})} />
                </View>
              </View>

              {/* Button */}
                <Button
                  style={styles.chatButton}
                  title="Start Chatting"
                  onPress={() =>
                    this.props.navigation.navigate("Chat", { name: this.state.name, color: this.state.color })
                  }
                />
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
    fontWeight: 600,
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
