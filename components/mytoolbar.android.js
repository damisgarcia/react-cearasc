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

  _onActionSelected(response) {
    if(response.action === 'menu') {
      switch (response.index) {
        case 0:
          NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[Routes.ABOUT])
        break;
        default:
      }
    }

    switch (response.action) {
      case 'share':
        Share.share({
          message: 'https://play.google.com/store/apps/details?id=br.com.givapp404.cearaesportefan',
          url: 'https://play.google.com/store/apps/details?id=br.com.givapp404.cearaesportefan',
          title: 'Compartilhar Ceará Esporte Fan'
        }, {
          dialogTitle: 'Compartilhar Ceará Esporte Fan',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ],
          tintColor: 'green'
        })
        break;
      default:
    }
  }

  render(){
    return (
      <View style={styles.toolbar}>
         <Toolbar
          centerElement="Ceará Esporte Fan"
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
