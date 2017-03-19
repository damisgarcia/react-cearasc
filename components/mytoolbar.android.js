import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Share,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Button, Toolbar, COLOR } from 'react-native-material-ui';

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
        Share.share({
          message: 'https://play.google.com/store/apps/details?id=br.com.ceara.soumais&hl=pt_BR',
          url: 'https://play.google.com/store/apps/details?id=br.com.ceara.soumais&hl=pt_BR',
          title: 'Compartilhar Ceará Esporte Fã'
        }, {
          dialogTitle: 'Compartilhar Ceará Esporte Fã',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ],
          tintColor: 'green'
        })
        break;
      case 1:
        NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[Routes.ABOUT])
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
            actions:['share'],
	          menu: {
              labels: ['Sobre']
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
