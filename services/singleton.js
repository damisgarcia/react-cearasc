'use strict';
let instance = null;

export default class Singleton {
  static get instance() {
    if(!instance) {
        instance = new this;
    }
    return instance;
  }

  constructor() {
    if(!instance){
          instance = this;
    }
    return instance;
  }
}
