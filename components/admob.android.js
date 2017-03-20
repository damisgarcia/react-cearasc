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
  componentDidMount() {
    AdMobRewarded.setTestDeviceID('EMULATOR');
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    setTimeout(
      ()=> this.showRewarded()
    )

    AdMobRewarded.requestAd((error) => error && console.log(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd((error) => error && console.log(error));
  }

  bannerError(error){
    console.log(error)
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
