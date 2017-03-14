import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  ToolbarAndroid,
  ListView,
  View
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

import InfiniteScrollView from 'react-native-infinite-scroll-view';

import { COLOR } from 'react-native-material-ui';

import { API } from '../services/api.js';
import { Post } from './post.android.js';

let ds = null;
let posts = [];

export class Posts extends Component {
  mixins = [TimerMixin]

  constructor(props){
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      page: 1,
      perPage: 15,
      loading: false,
      dataSource: ds.cloneWithRows(posts)
    };
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts = async ()=>{
    this._getPosts().then((responseJson) => {
      if(responseJson.length){
        this.state.page++
        this.setState({page: this.state.page})
      }
      posts = posts.concat(responseJson)
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

    return fetch(API.posts({_page: this.state.page, _limit: this.state.perPage}))
          .then((response) => response.json())
  }

  renderActivityIndicator(){
    return <ActivityIndicator animating={this.state.loading} style={styles.centering} color={COLOR.purple500} size="large"/>
  }

  render(){
    return (
      <View>
        <ListView
          enableEmptySections={true}
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
