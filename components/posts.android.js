import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ToolbarAndroid,
  ListView,
  View
} from 'react-native';

import { Post } from './post.android.js'

export class Posts extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let posts = [];

    getPosts().then((responseJson) => {
      posts = posts.concat(responseJson)
      this.setState({dataSource: ds.cloneWithRows(posts)})
      return true;
    })
    .catch((error) => {
      console.error(error);
    });

    this.state = {
      dataSource: ds.cloneWithRows(posts)
    };
  }

  render(){
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(post) => <Post data={post}/>}
        />
      </View>
    );
  }
}

// API
const getPosts = ()=>{
  return fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
}


AppRegistry.registerComponent('Posts', ()=> Posts)
