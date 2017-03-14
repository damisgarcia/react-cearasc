import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';

import { Layout } from '../services/layout.service.android.js';
import { NavigatorService } from '../services/navigator.service.android.js';

import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from 'react-native-material-ui';

export class About extends Component {
  _toHome(){
    return NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[0])
  }

  render(){
    let pic = {
      uri: "http://img.futbox.com/v1/1fe/c4d/35e/dcd/99db42629fa4eabd67d7_zoom.png"
    };

    return(
      <View style={{flex:1, backgroundColor: "black"}}>
        <View style={styles.icon_container}>
          <TouchableHighlight onPress={this._toHome}>
            <Icon name="md-arrow-back" color="white" size={30}/>
          </TouchableHighlight>
        </View>
        <View style={[styles.container, {flex: 2}]}>
          <Image source={pic} style={{width: 100, height: 100}}/>
          <Text style={styles.subtitle}>Um aplicativo feito por alvinegros para alvinegros.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon_container:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 8,
    marginTop: 8,
    marginLeft: 8
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    flex: 1,
    width: Layout.getScreenWidth() * 0.5,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: Layout.getScreenWidth() * 0.05,
    color:COLOR.blueGrey50
  }
})
