import React from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
// use Gifte Chats ActionSheet component to add a buttton that lets user choose between several options
import CustomActions from './CustomActions';
import { Constants, MapView, Location, Permissions } from 'expo';
//import firebase from 'firebase';
//import firestore from 'firebase';
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {

    constructor () {
      super ();

      this.state = {
        messages: [],
        uid: 0,
        isConnected: false,
        image: null,
        user: {
          _id: '',
          avatar: '',
          name: '',
        },
      };

     // Your web app's Firebase configuration
     const firebaseConfig = {
        apiKey: "AIzaSyBnJhSsawgNApoW2ToDJhRXDe4FfEx5-FU",
        authDomain: "chatapp-bb63d.firebaseapp.com",
        projectId: "chatapp-bb63d",
        storageBucket: "chatapp-bb63d.appspot.com",
        messagingSenderId: "451484990502",
    };
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    // Refering to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }


     // temporarly storage of messages
    // another option for code: getMessages = async () => {
    // async getMessages() {
      getMessages = async () => {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    }

      // firebase storage
      saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }

      deleteMessages = async () => {
      try {
        await AsyncStorage.removeItem('messages');
        this.setState({
          messages: []
        })
      } catch (error) {
        console.log(error.message);
      }
    }

     componentDidMount() {
      // required for listing name in default message
      // used to display title/name at very top of page
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });
  
      // retrieves chat messages from asyncStorage instead of filling message state with static data
      this.getMessages();
  
      // reference to messages collection
      this.referenceChatMessages = firebase.firestore().collection("messages");
      // authentication listener
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
  
        // update user state
        this.setState({
          uid: user.uid,
          loggedInText: "You are logged in",
          user: {
            // anonymous user doesn't have _id attached to user object so the app breaks when trying to send a message
            // when you hit send message, the app doesn't know what _id stands for
            // thus, || user.uid was added because it is the only unique thing that can be used else
            _id: user._id || user.uid,
            name: name,
            avatar: "https://placeholder.com/140/140/any",
          },
        });
  
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      });
  
      // reference to active messages collection
      this.referenceMessagesUser = firebase
        .firestore()
        .collection("messages")
        .where("uid", "==", this.state.uid);
  
      // checks if user is online or not
      NetInfo.fetch().then((connection) => {
        if (connection.isConnected) {
          this.setState({ isConnected: true });
          console.log("online");
        } else {
          this.setState({ isConnected: false });
          console.log("offline");
        }
      });
    }


    componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
    }

    // Retrieve collection data & store in messages
    // onCollectionUpdte takes snapshot on collection update
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text || "",
          createdAt: data.createdAt.toDate(),
          // user: data.user,
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,},
          image: data.image || null,
          location: data.location || null,
        });
      });
      this.setState({
        messages,
      });
    };


      // checks networkstatus of user
    handleConnectivityChange = (state) => {
      const isConnected = state.isConnected;
      if (isConnected == true) {
        this.setState({
          isConnected: true,
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      } else {
        this.setState({
          isConnected: false,
        });
      }
    };

    // adds the message object to firestore, fired by onSend function 
    // safe messages into firebase database
    addMessages(message) {
      this.referenceChatMessages.add({
           uid: this.state.uid,
          _id: message._id,
          text: message.text || "",
          createdAt: message.createdAt,
          user: message.user,
          image: message.image || null,
          location: message.location || null,
      });
    };

     
     //define title in navigation bar
     static navigationOptions = ({ navigation }) => {
      return {
        title: `${navigation.state.params.userName}'s Chat`,
      };
    };

    // handles actions when user hits send-button
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.saveMessages();
        this.addMessages(this.state.messages[0]);
        this.deleteMessages();
      });
    }

    // allow bubble customization
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          // wrapperStyle={styles.bubble}
          wrapperStyle={{
            right: {
              backgroundColor: '#000'
            }
          }}
        />
      )
    }

    // Prevent Gifted Chat from rendering the InputToolbar so users can't compose new messages if offline
    /** 
    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return(
          <InputToolbar
          {...props}
          />
        );
      }
    }*/
    renderInputToolbar = (props) => {
      console.log("renderInputToolbar --> props", props.isConnected);
      if (props.isConnected === false) {
        return <InputToolbar {...props} />
      } else {
        return <InputToolbar {...props} />;
      }
    };

    // render action Button
    renderCustomActions = (props) => {
      return <CustomActions {...props} />;
    };

    //custom map view
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

    // render components
    render () {
      let { name, color } = this.props.route.params;
      // this.props.navigation.setOptions({ title: name });
      return (
        // fullscreen component
        <View style={[{ backgroundColor: color }, styles.container]}>
          
          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          isConnected={this.state.isConnected}
          onSend={messages => this.onSend(messages)}
          renderActions={this.renderCustomActions}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          user={{
            _id: this.state.user._id,
            //_id: this.state._uid,
            name: name,
          }}
          />
          {/*Prevent hidden input field on Android*/}
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>   
      );
    };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,     
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});


/*

      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
           },
        ],
      })
    };

    */