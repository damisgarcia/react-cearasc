import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  Share,
  ScrollView,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, Card, Toolbar } from 'react-native-material-ui';

import { FacebookAPI } from '../services/facebookapi.js';
import { Routes } from '../services/routes.js';
import { Layout } from '../services/layout.service.android.js';
import { NavigatorService } from '../services/navigator.service.android.js';

export class Post extends Component {
  constructor(props){
    super(props);
  }

  _goPost(id){
    NavigatorService.instance.screens[Routes.POSTDETAIL].id = id
    NavigatorService.instance.getNavigator().push(NavigatorService.instance.screens[Routes.POSTDETAIL])
  }

  render(){
    let pic = null

    if(this.props.data.picture){
      pic = <View style={{flex: 1}}><Image style={styles.media} resizeMode='cover' source={{uri: this.props.data.full_picture}}/></View>
    }

    return(
      <Card style={{container: styles.container}} onPress={ ()=> this._goPost(this.props.data.id)}>
        {pic}
        <View style={styles.card_content}>
          <Text style={styles.message}>{ this.props.data.message }</Text>
        </View>
      </Card>
    );
  }
};

export class PostShow extends Component {
  state = {
    message: '',
    picture: '',
    full_picture: '',
    link: ''
  }

  constructor(props){
    super(props);
    this.props = props;
  }

  goHome(){
    NavigatorService.instance.getNavigator().pop()
  }

  sharePost(){
    Share.share({
      message: this.state.link,
      url: this.state.link,
      title: this.state.message
    }, {
      dialogTitle: 'Compartilhar Post Ceará Esporte Fan',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
  }

  componentDidMount(){
    this.getPost().then((post)=>{
      this.setState({message: post.message, picture: post.picture, full_picture: post.full_picture, link: post.link})
    })
  }

  getPost(){
    return new FacebookAPI().getPagePost(this.props.data.id)
  }

  render(){
    let pic = null

    if(this.state.picture){
      pic = <View style={{flex: 1}}><Image style={styles.media_lg} resizeMode='cover' source={{uri: this.state.full_picture}}/></View>
    }

    return(
      <View style={{flex:1, backgroundColor: Layout.backgroundColor}}>
        <Toolbar
          leftElement="arrow-back"
          rightElement="share"
          onLeftElementPress={this.goHome}
          onRightElementPress={()=> this.sharePost()}
          centerElement={this.state.message}
        />
        <ScrollView>
          <Card style={{container: styles.container}}>
            {pic}
            <View style={styles.card_content}>
              <Text style={styles.message}>{ this.state.message }</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 16,
    marginTop: 8,
    marginBottom: 8
  },
  card_content:{
    padding: 16
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 20
  },
  media:{
    flex: 1,
    height: Layout.getScreenHeight() * 0.40
  },
  media_lg:{
    flex: 1,
    height: Layout.getScreenHeight() * 0.60
  }
});

AppRegistry.registerComponent('Post', ()=> Post);
AppRegistry.registerComponent('PostShow', ()=> PostShow);
