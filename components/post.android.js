import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class Post extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.data.title}</Text>
        <Text style={styles.subtitle}>{this.props.data.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
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
})

AppRegistry.registerComponent('Post', ()=> Post)
