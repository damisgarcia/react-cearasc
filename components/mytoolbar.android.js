import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Toolbar, COLOR } from 'react-native-material-ui';

import { NavigatorService } from '../services/navigator.service.android.js';
import { Routes } from '../services/routes.js';

export class MyToolbar extends Component {
  state = { modes: Routes.HOME }

  constructor(props){
    super(props);
  }

  _onActionSelected(action) {
    switch (action.index) {
      case 0:
        NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[Routes.HOME])
        break;
      case 1:
        try{
          NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[Routes.ABOUT])
        } catch(e){
          NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[Routes.ABOUT])
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
          onRightElementPress={this._onActionSelected}
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
    maxHeight: 50,
    paddingLeft: 0
  }
})

AppRegistry.registerComponent('MyToolbar', ()=> MyToolbar)
