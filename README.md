# ToDo app

This is a React Native application built using Expo. It is designed to provide a seamless and responsive experience across both iOS and Android platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Expo CLI**: Install Expo CLI by running `npm i expo`.
- **XCode Studio**: If you want to run it on iOS simulator, install XCODE using `npm install -g expo-cli`.
- **Watchman**: Watchman is a tool for watching changes in the filesystem. Installing it will result in better performance. You can install it with: `brew update && brew install watchman`.
- **Git**: Version control system to clone the repository. You can download it from mac App Store.

## Installation

1. **Clone the Repository**
2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running the App

To run the app in development mode:

1. **Install expo requirements**:

   ```bash
     npx expo install expo-dev-client
   ```

2. **Start the Expo Development Server**:

   ```bash
   npm start
   ```

3. **Open the App**:
   - Use the Expo Go app on your Android or iOS device to scan the QR code from the terminal or the Expo DevTools in your browser.
   - Alternatively, you can run the app on an emulator:
     - For iOS: Press `i` to start the app in an iOS simulator (Mac only).
     - For Android: Press `a` to start the app in an Android emulator.

## Building the App

To create production builds of your app:

1. **Build for Android**:

   ```bash
   expo build:android
   ```

2. **Build for iOS**:
   ```bash
   expo build:ios
   ```

## After starting app

## Starting local server

To start local server, you can use the `npm run start:server` command.

### Logging in

For logging in you can use a static user I've created for testing purpose,  
`username: gentrit`  
`password: test123`
