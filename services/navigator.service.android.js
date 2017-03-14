import React from 'react';
import Singleton from './singleton.js';

export class NavigatorService extends Singleton{
  constructor(){
    super();
    this.navigator = null
    this.screens = [
      { title: 'Posts',  index: 1 },
      { title: 'About', index: 2 },
      { title: 'Post Detail', index: 3 }
    ]
  }

  setNavigator(navigator){
    this.navigator = navigator
  }

  getNavigator(){
    return this.navigator
  }
}
