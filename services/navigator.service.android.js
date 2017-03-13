import React from 'react';
import Singleton from './singleton.js';

export class NavigatorService extends Singleton{
  constructor(){
    super();
    this.navigator = null
    this.screens = [
      { title: 'Home Page',  index: 1 },
      { title: 'About', index: 2 }
    ]
  }

  setNavigator(navigator){
    this.navigator = navigator
  }

  getNavigator(){
    return this.navigator
  }
}
