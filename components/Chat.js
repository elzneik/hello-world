import React, { Component } from 'react';
import { 
  View, 
  Platform, 
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {

    constructor () {
      super ();
      this.state = {
        messages: [],
        uid: 0,
        user: {
          _id: '',
          avatar: '',
          name: '',
      },
        isConnected: false,
      };
    
    // constructor for firebase
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

    //Retrieve collection data & store in messages
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,
        },
        });
      });
      this.setState({
        messages,
      });
    };

     componentDidMount() {
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
          user {
            _id: user.uid,
            name: name,
        },
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      });
    }
    

    componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();

    }

    // Add new message to the previous
    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
        this.addMessages(this.state.messages[0]);
      });
    }

    // safe messages into firebase database
    addMessages(message) {
      this.referenceChatMessages.add({
           uid: this.state.uid,
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          user: message.user,
      });
    }

    // allow bubble customization
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#000'
            }
          }}
        />
      )
    }

    render () {
      let { name, color } = this.props.route.params;
      // this.props.navigation.setOptions({ title: name });
      return (
        <View style={[{ backgroundColor: color }, styles.container]}>
          <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._uid,
            name: name,          
          }}
          />
          {/*Prevent hidden input field on Android*/}
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
          }
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