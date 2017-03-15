import React from 'react';

import {
  Dimensions
} from 'react-native';

import Singleton from './singleton.js';


export class Layout extends Singleton{
  constructor(){
    super();
  }

  static backgroundColor = '#f4f4f4'

  static getScreenWidth(){
    return Dimensions.get('window').width;
  }
}
