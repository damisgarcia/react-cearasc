import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorService } from '../services/navigator.service.android.js';

const HOME = 0
const ABOUT = 1

export class Toolbar extends Component {
  constructor(props){
    super(props);
  }

  _onActionSelected(position) {
    switch (position) {
      case 0:
        NavigatorService.instance.getNavigator().replace(NavigatorService.instance.screens[HOME])
        break;
      case 1:
        NavigatorService.instance.getNavigator().replace(NavigatorService.instance.screens[ABOUT])
        break;
      default:
    }
  }

  render(){
    return (
      <Icon.ToolbarAndroid
        style={styles.toolbar}
        title="Ceará Esporte Fã"
        titleColor="white"
        actions={[
          { title: 'Início', show: 'never' },
          { title: 'Sobre', show: 'never' }
        ]}
        onActionSelected={this._onActionSelected}
      />
    );
  }
}

const styles = StyleSheet.create({
  toolbar:{
    flex:1,
    color: '#ECEFF1',
    backgroundColor: '#37474F',
    maxHeight: 50,
    paddingLeft: 30
  }
})

AppRegistry.registerComponent('Toolbar', ()=> Toolbar)
