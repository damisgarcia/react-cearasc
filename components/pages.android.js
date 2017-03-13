import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';

import { NavigatorService } from '../services/navigator.service.android.js';

import Icon from 'react-native-vector-icons/Ionicons';

export class About extends Component {
  _toHome(){
    return NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[0])
  }

  render(){
    let pic = {
      uri: "http://img.futbox.com/v1/1fe/c4d/35e/dcd/99db42629fa4eabd67d7_zoom.png"
    };

    return(
      <View style={{flex:1, backgroundColor: '#333333'}}>
        <View style={styles.icon_container}>
          <TouchableHighlight onPress={this._toHome}>
            <Icon name="md-arrow-back" color="white" size={30}/>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
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
    color:'white',
    alignItems: 'center'
  }
})
