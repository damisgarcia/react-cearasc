import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Linking,
  View
} from 'react-native';

import { COLOR, Card } from 'react-native-material-ui';

export class Youtube extends Component{
  openVideo(videoId){
    let url = "https://www.youtube.com/watch?v=" + videoId
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } 
    });
  }
  parseDate(date){
    let options = {
      year:    'numeric',
      month:   'numeric',
      day:     'numeric',
      hour:    'numeric',
      minute:  'numeric',
      second:  'numeric'
    }
    let d = new Date(date)
    return d.toLocaleDateString("pt-BR", options)
  }
  render(){
    return(
      <Card style={{container: styles.row}} onPress={()=> this.openVideo(this.props.data.id.videoId)}>
        <Image style={styles.thumbnail} source={{uri: this.props.data.snippet.thumbnails.default.url}} />
        <View style={styles.column}>
          <Text style={styles.title}>{this.props.data.snippet.title}</Text>
          <Text style={styles.caption}>{this.parseDate(this.props.data.snippet.publishedAt)}</Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  row:{
    flex:1,
    flexDirection: 'row',
    padding: 16,
    marginLeft: 4,
    marginRight: 4
  },
  column:{
    flex:1,
    flexDirection: 'column'
  },
  thumbnail:{
    width: 120,
    height: 90,
    marginRight: 8
  },
  title:{
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.grey900
  },
  caption:{
    fontSize: 12,
    color: COLOR.grey500
  }
})
