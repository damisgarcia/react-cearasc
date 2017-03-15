import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Linking,
  TouchableHighlight,
  Text,
  Image,
  WebView,
  View
} from 'react-native';

import Sound from 'react-native-sound';

import { Layout } from '../services/layout.service.android.js';
import { Routes } from '../services/routes.js';
import { NavigatorService } from '../services/navigator.service.android.js';

import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR, Toolbar } from 'react-native-material-ui';

const hine = null

export class About extends Component {
  _toHome(){
    return NavigatorService.instance.getNavigator().pop()
  }

  componentDidMount(){
    hine = new Sound('hine.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + hine.getDuration() + 'number of channels: ' + hine.getNumberOfChannels());

      hine.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    hine.setVolume(0.5);
  }

  componentWillUnmount(){
    hine.release()
  }

  render(){
    let pic = {
      uri: "http://img.futbox.com/v1/1fe/c4d/35e/dcd/99db42629fa4eabd67d7_zoom.png"
    };

    return(
      <View style={{flex:1, backgroundColor: "black"}}>
        <Toolbar
          style={{container: { backgroundColor: "black" }}}
          centerElement='' leftElement="arrow-back" onLeftElementPress={this._toHome}
        />
        <View style={[styles.container, {flex: 1}]}>
          <Image source={pic} style={{width: 100, height: 100, marginTop: 100}}/>
          <Text style={styles.subtitle}>Um aplicativo feito por alvinegros para alvinegros.</Text>
        </View>
      </View>
    );
  }
}

const uri = 'https://esporte.uol.com.br/futebol/times/ceara/proximos-jogos/'

export class Calendar extends Component{
  onNavigationStateChange(event){
    if (event.url !== uri) {
      this.webview.stopLoading();
    }
  }

  render(){
    return(
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{uri: uri}}
        javaScriptEnabled={false}
        onNavigationStateChange={ (event)=> this.onNavigationStateChange(event) } />
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

AppRegistry.registerComponent('About', ()=> About)
AppRegistry.registerComponent('Calendar', ()=> Calendar)
