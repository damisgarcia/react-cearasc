import Singleton from './singleton.js';

const URI = require('URIjs')

export class API extends Singleton{
  constructor(){
    super();
  }
  static post(id){
    let uri = URI("https://jsonplaceholder.typicode.com/posts/" + id)
    return uri.toString()
  }
  static posts(params){
    let uri = URI("https://jsonplaceholder.typicode.com/posts")
    params ? uri.addSearch(params) : false
    return uri.toString()
  }
}
