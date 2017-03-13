import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Toolbar } from 'react-native-material-ui';

import { NavigatorService } from '../services/navigator.service.android.js';

const HOME = 0
const ABOUT = 1

export class MyToolbar extends Component {
  state = { modes: HOME }

  constructor(props){
    super(props);
  }

  _onActionSelected(position) {
    switch (position) {
      case 0:
        NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[HOME])
        break;
      case 1:
        try{
          NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[ABOUT])
        } catch(e){
          NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[ABOUT])
        }
        break;
      default:
    }
  }

  render(){
    return (
      <View style={styles.toolbar}>
         <Toolbar
          centerElement="Ceará Esporte Fã"
          onRightElementPress={(e) => console.error(e)}
          rightElement={{
	          menu: {
              labels: ['Início', 'Sobre']
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar:{
    flex:1,
    color: 'white',
    backgroundColor: '#37474F',
    maxHeight: 50,
    paddingLeft: 0
  }
})

AppRegistry.registerComponent('MyToolbar', ()=> MyToolbar)
