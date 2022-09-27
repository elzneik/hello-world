// install first 
// npm install react-native-gifted-chat --save

/*
// import Gifted Chat library
import { GiftedChat } from 'react-native-gifted-chat'

// add set the state with a stetic message
export class Chat extends React.Component {
    constructor() {
      super();
      this.state = {
        messages: [],
      }
}

// 
componentDidMount() {
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
     ],
   })
 }

// custom function - called when user sends a message
onSend(messages = []) {
   this.setState(previousState => ({
     messages: GiftedChat.append(previousState.messages, messages),
   }))
 }

// Render the Chat interface
<GiftedChat
  messages={this.state.messages}
  onSend={messages => this.onSend(messages)}
  user={{
    _id: 1,
  }}
/>

*/