import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  TabViewAnimated,
  TabBar
} from 'react-native-tab-view';


import {
  Posts
} from './posts.android.js';

let self = null

export class Navigation extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Notícias' },
      { key: '2', title: 'Últimas Partidas' }
    ],
    screens: [
      { title: 'First Scene',  index: 1 },
      { title: 'Second Scene', index: 2 }
    ]
  }

  constructor(props){
    super(props);
    self = this
  }

  _onActionSelected(position) {
    console.log(self, self.navigator)
    switch (position) {
      case 0:
        self.navigator.jumpTo(self.state.screens[0])
        break;
      case 1:
        try{
          self.navigator.jumpTo(self.state.screens[1])
        } catch(e){
          self.navigator.push(self.state.screens[1])
        }
        break;
      default:

    }
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar style={styles.bar} pressColor="#333" labelStyle={styles.tablabel} indicatorStyle={styles.indicator} {...props} />;
  };

  _renderScene = (route, navigator)=>{
    this.navigator = navigator

    if (route.index){
      switch (route.index) {
      case 1:
        return (
          <View style={styles.container}>
            <TabViewAnimated
              style={styles.container}
              navigationState={this.state}
              renderScene={this._renderTabScene}
              renderHeader={this._renderHeader}
              onRequestChangeTab={this._handleChangeTab}
            />
          </View>
        );
        break;
      case 2:
        return <Text style={styles.container}>Lorem 1</Text>
      default:
        return null;
      }
    }
  }

  _renderTabScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <Posts style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    case '3':
      return <View style={[ styles.page, { backgroundColor: '#683ab7' } ]} />;
    default:
      return null;
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title="Ceará Esporte Fã"
          titleColor="white"
          actions={[
            { title: 'Início', show: 'never' },
            { title: 'Sobre', show: 'never' }
          ]}
          onActionSelected={this._onActionSelected}
        />
        <Navigator initialRoute={this.state.screens[0]} renderScene={this._renderScene}/>
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
  toolbar:{
    flex:1,
    color: '#ECEFF1',
    backgroundColor: '#37474F',
    maxHeight: 50,
    paddingLeft: 30
  },
  bar:{
    backgroundColor: '#37474F'
  },
  tablabel:{
    color: '#ECEFF1'
  },
  indicator:{
    backgroundColor: '#ECEFF1'
  }
})

AppRegistry.registerComponent('Navigation', ()=> Navigation)
