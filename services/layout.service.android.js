import React from 'react';

import {
  Dimensions
} from 'react-native';

import Singleton from './singleton.js';


export class Layout extends Singleton{
  constructor(){
    super();
  }

  static getScreenWidth(){
    return Dimensions.get('window').width;
  }
}
