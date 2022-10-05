import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity} from 'react-native';
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

export default class Chat extends Component {

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
      }
    
    // constructor for firebase
    // firebase adding credential in order to connect to firebase
    // option to write code: if (!firebase.apps.length) {
    // option to write code: firebase.initializeApp({   add code from apiKey to MessageSenderId     }); }
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

      this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    


     // temporarly storage of messages
    // another option for code: getMessages = async () => {
    async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };

      // firebase storage
    async saveMessages() {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    };

    async deleteMessages() {
      try {
        await AsyncStorage.removeItem('messages');
        this.setState({
          messages: []
        })
      } catch (error) {
        console.log(error.message);
      }
    };


     componentDidMount() {
      this.getMessages();

      // check if user is online or offline
      NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
          this.setState({
            isConnected: true,
          });
            console.log('online');
       

      // Display Username
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });

      // User authentification
      this.referenceChatMessages = firebase.firestore().collection("messages");

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: name,
        },
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
        this.saveMessages();
      });
    }
    //If the user is offline: Load and display the messages from asyncStorage.
    else {
        this.setState ({
          isConnected: false,
        })
        console.log('offline');
        this.getMessages();
      }
    })
}

    /** 
    componentDidMount() {
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }

        this.setState({
          uid: user.uid,
          messages: []
        });

        this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
      });
    }
    */

    componentWillUnmount() {
      if (this.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
      }
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
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,
        },
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
          renderInputToolbar={this.renderInputToolbar}
          user={{
            // _id: this.state.user._id,
            _id: this.state._uid,
            // name: name,
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