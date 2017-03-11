/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import {
  Navigation
} from './components/navigation.android.js';

export default class react_cearasc extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation></Navigation>
      </View>
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
