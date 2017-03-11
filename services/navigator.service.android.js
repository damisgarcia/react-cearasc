import React from 'react';
import Singleton from './singleton.js';

export class NavigatorService extends Singleton{
  constructor(){
    super();
    this.navigator = null
    this.screens = [
      { title: 'First Scene',  index: 1 },
      { title: 'Second Scene', index: 2 }
    ]
  }

  setNavigator(navigator){
    this.navigator = navigator
  }

  getNavigator(){
    return this.navigator
  }
}
