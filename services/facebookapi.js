
const URI = require('URIjs')

export class FacebookAPI{
  VERSION = 'v2.8';
  HOST = 'https://graph.facebook.com';
  ACCESSTOKEN = null
  // ACCESSTOKEN = 'EAAD9hsFskcUBALFvTlI8oZCyZAPp7clqt97sNOohR33QHybCV0aUiEGiiKsmTybrLjtFMCOIBUWAH2dojrJZBAnZBFoATx6pmMZAH0j5F2R1G7bsHIEH0lBZCyZAo88LRQ7isf93D3XCsorqeEu9A9GvuDScVKVnLZBEOe7fBKFyY8sVAnkdcPAq70faKmAjsOYZD';

  constructor(){

  }

  // https://graph.facebook.com/oauth/access_token?client_id=278755212562885%20&client_secret=49c1a79dc3f2d70703907ae979cd8cef&grant_type=client_credentials
  async getAccessToken(){
    if(this.ACCESSTOKEN){
      return false
    }

    basepath = "https://graph.facebook.com/oauth/access_token"
    uri = URI(basepath)
    uri.addSearch({client_id: '278755212562885', client_secret: '49c1a79dc3f2d70703907ae979cd8cef', grant_type: 'client_credentials'})

    try{
      let response = await fetch(uri.toString());
      let responseJson = await response.json();
      this.ACCESSTOKEN = responseJson.access_token
      return responseJson
    } catch(err){
      console.log(error)
    }
  }

  // https://graph.facebook.com/{version}/{pageId}/posts
  async getPagePosts(pageId, nextURL){
    await this.getAccessToken()

    if(nextURL){
      uri = URI(nextURL)
    } else{
      basepath = [this.HOST, this.VERSION, pageId, 'posts'].join('/')
      uri = URI(basepath)
      uri.addSearch({access_token: this.ACCESSTOKEN})
      uri.addSearch({fields: 'message, link, picture, full_picture'})
    }

    try{
      let response = await fetch(uri.toString());
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson
    } catch(err){
      console.log(error)
    }
  }

  async getPagePost(postId){
    let basepath = [this.HOST, this.VERSION, postId.toString()].join('/')
    uri = URI(basepath)
    uri.addSearch({access_token: this.ACCESSTOKEN})
    uri.addSearch({fields: 'message, link, picture, full_picture'})
    try{
      let response = await fetch(uri.toString())
      let responseJson = await response.json();
      return responseJson
    } catch(err){
      console.log(error)
    }
  }
}
// accessToken
// EAAD9hsFskcUBALFvTlI8oZCyZAPp7clqt97sNOohR33QHybCV0aUiEGiiKsmTybrLjtFMCOIBUWAH2dojrJZBAnZBFoATx6pmMZAH0j5F2R1G7bsHIEH0lBZCyZAo88LRQ7isf93D3XCsorqeEu9A9GvuDScVKVnLZBEOe7fBKFyY8sVAnkdcPAq70faKmAjsOYZD
// Page
// 108933492467002
