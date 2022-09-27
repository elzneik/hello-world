// install first 
// npm install react-native-gifted-chat --save

/*
// import Gifted Chat library into Chat.js
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { 
    View, 
    Platform, 
    KeyboardAvoidingView 
} from 'react-native';

// add set the state with a stetic message
export class Chat extends React.Component {
    constructor() {
      super();
      this.state = {
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
      };
    }
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

    // GiftedChat bubble color UI
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

    /*
    // Render the Chat interface
    render () { 
    // let name = this.props.route.params.name;
    // this.props.navigation.setOptions({title:name});
    return (
    <view style={{flex:1}}>
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
            _id: 1,
        }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
    </view>
    )
    }
}



/*
Try code out!!
*/