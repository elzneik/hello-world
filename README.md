# Hello-World Chat App

## Overview
The chat app "Hello-World" is an application which offers the user the possibility to chat with each other, whenever the want. 
The app is build with React Native, a framework for building Android and iOS apps that only requires one codebase.
The app is a JavaScript mobile development and besied React Native, Expo and Google Firestone Database were used.
The app will be optimized for both Android and iOS devices.
Expo is used to develop the app and Google Firestore to store the chat messages.

## Features and Requirements
### User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface

### Key Features
* A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

### Technical Requirements
* The app must be written in React Native.
* The app must be developed using Expo.
* The app must be styled according to the given screen design.
* Chat conversations must be stored in Google Firestore Database.
* The app must authenticate users anonymously via Google Firebase authentication.
* Chat conversations must be stored locally.
* The app must let users pick and send images from the phone’s image library.
* The app must let users take pictures with the device’s camera app, and send them.
* The app must store images in Firebase Cloud Storage.
* The app must be able to read the user’s location data.
* Location data must be sent via the chat in a map view.
* The chat interface and functionality must be created using the Gifted Chat library.
* The app’s codebase must contain comments.

## Design and Specifications
### Screen Design
![hello-world Welcome Screen](https://github.com/elzneik/hello-world/blob/master/picture/AppDesign.PNG)
### Specifications
* Vertical and horizontal spacing: evenly distributed
* App title: font size 45, font weight 600, font color #FFFFFF
* “Your name”: font size 16, font weight 300, font color #757083, 50% opacity
* “Choose background color”: font size 16, font weight 300, font color #757083, 100% opacity
* Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
* Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

## Development Process
### Setup Expo as Development Environment
1. Install Expo CLI
```
npm insatll expo-cli --location=global
```
2. Create a new expo project
```
expo init [projectname]
```
3. Navigate to the project
```
cd [projectname]
```
4. Start expo project
```
npm start or expo start
```
### Install React Navigation library to navigate between screens
1. Navigate to project folder and run
```
npm install react-navigation
```
2. Install necessary dependencies
```
npm install @react-navigation/native @react-navigation/stack
```

expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
