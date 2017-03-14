import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from 'react-native-material-ui';

import { API } from '../services/api.js';
import { NavigatorService } from '../services/navigator.service.android.js';

const HOME = 0
const POSTDETAIL = 2

export class Post extends Component {
  constructor(props){
    super(props);
  }

  _goPost(id){
    NavigatorService.instance.screens[POSTDETAIL].id = id
    try{
      NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[POSTDETAIL])
    } catch(e){
      NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[POSTDETAIL])
    }
  }

  render(){
    return(
      <TouchableHighlight onPress={()=>{ this._goPost(this.props.data.id) }}>
        <View style={styles.container}>
          <Text style={styles.title}>{ this.props.data.title }</Text>
          <Text style={styles.subtitle}>{ this.props.data.body }</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

export class PostShow extends Component {
  state = {
    title: '',
    body: ''
  }

  constructor(props){
    super(props);
    this.props = props;
  }

  goHome(){
    NavigatorService.instance.getNavigator().pop()
  }

  componentDidMount(){
    this.getPost().then((post)=>{
      this.setState({title: post.title, body: post.body})
    })
  }

  getPost(){
    return fetch(API.post(this.props.data.id))
      .then((response) => response.json())
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor: "#f4f4f4"}}>
        <TouchableHighlight onPress={this.goHome}>
          <Icon name="md-close" color={COLOR.grey500} size={30} style={{margin: 16}}/>
        </TouchableHighlight>
        <View style={styles.container}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.body}>{this.state.body}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 18
  }
});

AppRegistry.registerComponent('Post', ()=> Post);
AppRegistry.registerComponent('PostShow', ()=> PostShow);
