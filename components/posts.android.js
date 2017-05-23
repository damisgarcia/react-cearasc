import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  ToolbarAndroid,
  RefreshControl,
  ListView,
  View
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';

import { COLOR } from 'react-native-material-ui';

import { API } from '../services/api.js';
import { Post } from './post.android.js';

import { FacebookAPI } from '../services/facebookapi.js';

let ds = null;
let posts = [];

// FacebookAPI
const fbPageId = "108933492467002"
let fbNextURL = null

export class Posts extends Component {

  constructor(props){
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.FacebookAPI = new FacebookAPI()

    this.state = {
      loading: false,
      refreshing: false,
      dataSource: ds.cloneWithRows(posts)
    };
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts = async ()=>{
    this._getPosts().then((response) => {
      fbNextURL = response.paging.next
      posts = posts.concat(response.data)
      this.setState({dataSource: ds.cloneWithRows(posts)})
      this.setState({loading: false})
    })
    .catch((error) => {
      ToastAndroid.show("Não foi possível carregar conteúdo. Verifique sua conexão", ToastAndroid.BOTTOM);
      // Request Timeout
      setTimeout(
        () => {
          this.setState({loading: false})
        },
        3000
      );
    });
  }

  async _getPosts(){
    this.setState({loading: true})
    return this.FacebookAPI.getPagePosts(fbPageId, fbNextURL);
  }

  onRefresh(){
    this.setState({refreshing: true});
    this._getPosts().then((response) => {
      if(response.length){
        fbNextURL = response.paging.next
      }
      posts = posts.concat(response.data)
      this.setState({dataSource: ds.cloneWithRows(posts)})
      this.setState({loading: false})
      this.setState({refreshing: false})
    })
    .catch((error) => {
      ToastAndroid.show("Não foi possível carregar conteúdo. Verifique sua conexão", ToastAndroid.BOTTOM);
      // Request Timeout
      setTimeout(
        () => {
          this.setState({loading: false})
        },
        3000
      );
    });
  }

  renderActivityIndicator(){
    return <ActivityIndicator animating={this.state.loading} style={styles.centering} color={COLOR.purple500} size="large"/>
  }

  render(){
    return (
      <View>
        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=> this.onRefresh()}
            />
          }
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          renderFooter={ ()=> this.renderActivityIndicator() }
          dataSource={this.state.dataSource}
          renderRow={(post) => <Post data={post}/>}
          canLoadMore={!this.state.loading}
          onLoadMoreAsync={this.getPosts}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 80
  }
});


AppRegistry.registerComponent('Posts', ()=> Posts)
