import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  ListView,
  Text,
  Image,
  WebView,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  TabViewAnimated,
  TabBar
} from 'react-native-tab-view';

import { COLOR } from 'react-native-material-ui';

import { About, Calendar } from './pages.android.js';
import { Posts } from './posts.android.js';
import { PostShow } from './post.android.js';
import { MyToolbar } from './mytoolbar.android.js';
import { Routes } from '../services/routes.js';
import { Layout } from '../services/layout.service.android.js';
import { YoutubeAPI } from '../services/youtubeapi.js';
import { NavigatorService } from '../services/navigator.service.android.js';

let playlist = []
let playlist_ds = null
let channelId = 'UC3e0_k_Ux7WCIaQXNctzeeg';

export class Navigation extends Component {
  constructor(props){
    super(props);
    playlist_ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      index: 1,
      playlist: playlist_ds.cloneWithRows(playlist),
      routes: [
        { key: '1', title: 'TV' },
        { key: '2', title: 'Agora' },
        { key: '3', title: 'Partidas' }
      ]
    }

    YoutubeAPI.channel_videos(channelId, {part: 'snippet', order: 'date', maxResults: 8}).then((responseJson) => {
      playlist = playlist.concat(responseJson.items);
      this.setState({playlist: playlist_ds.cloneWithRows(playlist)});
      console.log(this.state.playlist)
    })
  }


  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar style={styles.bar} pressColor="#333" labelStyle={styles.tablabel} indicatorStyle={styles.indicator} {...props} />;
  };

  _transformURI = (videoId) => {
    return "https://www.youtube.com/embed/"+ videoId
  };

  _renderScene = (route, navigator)=>{
    NavigatorService.instance.setNavigator(navigator)

    if(route.index){
      switch (route.index) {
      case 1:
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor={COLOR.grey900} barStyle="light-content"/>
            <MyToolbar/>
            <TabViewAnimated
              style={styles.container}
              navigationState={this.state}
              renderScene={this._renderTabScene}
              renderHeader={this._renderHeader}
              onRequestChangeTab={this._handleChangeTab}
            />
          </View>
        );
      case 2:
        return <About/>
      case 3:
        return <PostShow data={route}/>
      default:
        return null;
      }
    }
  }

  _renderTabScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <ListView
        enableEmptySections={true}
        automaticallyAdjustContentInsets={true}
        dataSource={this.state.playlist}
        renderRow={(video) => <WebView style={styles.youtube} source={{uri: this._transformURI(video.id.videoId) }} /> }
        />
      );
    case '2':
      return <Posts style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
    case '3':
      return <Calendar style={styles.page} />;
    default:
      return null;
    }
  };


  // renderRow={(video) => <WebView javaScriptEnabled={true} source={{uri:this._transformURI(video.id.videoId)}} /> }

  render(){
    return (
      <View style={styles.container}>
        <Navigator initialRoute={NavigatorService.instance.screens[Routes.HOME]} renderScene={this._renderScene}/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar:{
    backgroundColor: '#37474F'
  },
  tablabel:{
    color: '#ECEFF1'
  },
  indicator:{
    backgroundColor: '#ECEFF1'
  },
  youtube_container:{
    flex: 1,
    justifyContent: 'space-around'
  },
  youtube:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginTop: 8,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 8,
    backgroundColor: COLOR.grey500
  }
})

AppRegistry.registerComponent('Navigation', ()=> Navigation)
