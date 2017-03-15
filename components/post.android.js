import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, Card, Toolbar } from 'react-native-material-ui';

import { API } from '../services/api.js';
import { Routes } from '../services/routes.js';
import { Layout } from '../services/layout.service.android.js';
import { NavigatorService } from '../services/navigator.service.android.js';

export class Post extends Component {
  constructor(props){
    super(props);
  }

  _goPost(id){
    NavigatorService.instance.screens[Routes.POSTDETAIL].id = id
    try{
      NavigatorService.instance.getNavigator().jumpTo(NavigatorService.instance.screens[Routes.POSTDETAIL])
    } catch(e){
      NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[Routes.POSTDETAIL])
    }
  }

  render(){
    return(
      <Card style={{container: styles.container}} onPress={ ()=> this._goPost(this.props.data.id) }>
        <Text style={styles.title}>{ this.props.data.title }</Text>
        <Text style={styles.subtitle}>{ this.props.data.body }</Text>
      </Card>
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
      console.log(post)
      this.setState({title: post.title, body: post.body})
    })
  }

  getPost(){
    return fetch(API.post(this.props.data.id))
      .then((response) => response.json())
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor: Layout.backgroundColor}}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={this.goHome}
          centerElement={this.state.title}
        />
        <Card style={{container: styles.container}}>
          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.subtitle}>{this.state.body}</Text>
        </Card>
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
    padding: 16
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 20
  }
});

AppRegistry.registerComponent('Post', ()=> Post);
AppRegistry.registerComponent('PostShow', ()=> PostShow);
