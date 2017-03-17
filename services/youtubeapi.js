import Singleton from './singleton.js';

const URI = require('URIjs')

export class YoutubeAPI extends Singleton{
  static get key(){ return "AIzaSyB38In02RL6c3r4JsiQ6DG5cbaX7PlYNTc"; }

  static async getVideos(channelId, params){
    let url_s = "https://www.googleapis.com/youtube/v3/search"
    let uri = URI(url_s)
    uri.addSearch({key: this.key, channelId: channelId})
    uri.addSearch(params)

    try{
      let response = await fetch(uri.toString())
      let responseJson = await response.json()
      return responseJson
    } catch(error){
      console.log(error)
    }
  }
}
