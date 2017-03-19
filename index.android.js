/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Notification } from './services/notification';

import {
  Navigation
} from './components/navigation.android.js';


export default class react_cearasc extends Component {
  constructor(){
    super();
    this.notification = null
  }

  componentDidMount(){
    this.notification = new Notification()
  }

  componentWillUnmount(){
    this.notification.destroy()
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Navigation></Navigation>
      </ThemeProvider>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'home':
        return (<Posts navigator={navigator} route={route} title="Notícias"/>);
      case 'second':
        return (<Second navigator={navigator} title="second" />);
    }
  }
}

const uiTheme = {
  palette: {
      primaryColor: COLOR.blueGrey800,
  },
  toolbar: {
    container: {
      height: 50
    }
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f4f4f4'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
});

AppRegistry.registerComponent('react_cearasc', () => react_cearasc);
