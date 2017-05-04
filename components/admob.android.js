import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import { AdMobRewarded, AdMobBanner, PublisherBanner} from 'react-native-admob';

const intervect_banner = 'ca-app-pub-2384745023579151/3689331027'
const small_banner = 'ca-app-pub-2384745023579151/2212597824'

export class AdMob extends Component {

  componentWillMount(){
    AdMobRewarded.setTestDeviceID('EMULATOR');
    AdMobRewarded.setAdUnitID(intervect_banner);
  }

  componentDidMount() {
    this.requestAd()
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd((error) => {
      if(error && error == "Ad is not ready."){
        setTimeout( ()=> this.showRewarded(), 300)
      }
    });
  }

  bannerError(error){
    console.log(error)
  }

  requestAd(){
    if(!this.props.showAd){
      return false
    }

    AdMobRewarded.requestAd((error) => {
      error && this.showRewarded()
    });
    this.showRewarded()
  }

  render() {
    return (
      <View style={styles.container}>
        <AdMobBanner
           bannerSize="banner"
           adUnitID="ca-app-pub-2384745023579151/2212597824"
           testDeviceID="EMULATOR"
           didFailToReceiveAdWithError={this.bannerError} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
