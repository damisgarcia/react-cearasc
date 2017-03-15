import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  Text,
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
import { NavigatorService } from '../services/navigator.service.android.js';

export class Navigation extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Notícias' },
      { key: '2', title: 'Últimas Partidas' }
    ]
  }

  constructor(props){
    super(props);
  }


  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar style={styles.bar} pressColor="#333" labelStyle={styles.tablabel} indicatorStyle={styles.indicator} {...props} />;
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
      return <Posts style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
    case '2':
      return <Calendar style={styles.page} />;
    default:
      return null;
    }
  };

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
  }
})

AppRegistry.registerComponent('Navigation', ()=> Navigation)
