import Singleton from './singleton.js';

const URI = require('URIjs')

export class YoutubeAPI extends Singleton{
  static key = "AIzaSyB38In02RL6c3r4JsiQ6DG5cbaX7PlYNTc";

  static channel_videos(channelId, params){
    let url_s = "https://www.googleapis.com/youtube/v3/search"
    let uri = URI(url_s)
    uri.addSearch({key: this.key, channelId: channelId})
    uri.addSearch(params)
    
    return fetch(uri.toString())
          .then((response) => response.json())
  };
}
