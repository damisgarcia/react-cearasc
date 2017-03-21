import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import { AdMobRewarded, AdMobBanner, PublisherBanner} from 'react-native-admob';

export class AdMob extends Component {

  componentWillMount(){
    AdMobRewarded.setTestDeviceID('EMULATOR');
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
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
           adUnitID="ca-app-pub-3940256099942544/6300978111"
           testDeviceID="EMULATOR"
           didFailToReceiveAdWithError={this.bannerError} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
    flex: 1,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
