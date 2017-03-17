
const URI = require('URIjs')

export class FacebookAPI{
  VERSION = 'v2.8';
  HOST = 'https://graph.facebook.com';
  ACCESSTOKEN = 'EAAD9hsFskcUBALFvTlI8oZCyZAPp7clqt97sNOohR33QHybCV0aUiEGiiKsmTybrLjtFMCOIBUWAH2dojrJZBAnZBFoATx6pmMZAH0j5F2R1G7bsHIEH0lBZCyZAo88LRQ7isf93D3XCsorqeEu9A9GvuDScVKVnLZBEOe7fBKFyY8sVAnkdcPAq70faKmAjsOYZD';

  constructor(){

  }

  // https://graph.facebook.com/{version}/{pageId}/posts
  getPagePosts(pageId, nextURL){
    if(nextURL){
      uri = URI(nextURL)
    } else{
      basepath = [this.HOST, this.VERSION, pageId, 'posts'].join('/')
      uri = URI(basepath)
      uri.addSearch({access_token: this.ACCESSTOKEN})
      uri.addSearch({fields: 'message, link, picture, full_picture'})
    }
    return fetch(uri.toString())
          .then((response) => response.json())
  }

  getPagePost(postId){
    let basepath = [this.HOST, this.VERSION, postId.toString()].join('/')
    uri = URI(basepath)
    uri.addSearch({access_token: this.ACCESSTOKEN})
    uri.addSearch({fields: 'message, link, picture, full_picture'})

    console.log(uri.toString())

    return fetch(uri.toString())
          .then((response) => response.json())
  }
}
// accessToken
// EAAD9hsFskcUBALFvTlI8oZCyZAPp7clqt97sNOohR33QHybCV0aUiEGiiKsmTybrLjtFMCOIBUWAH2dojrJZBAnZBFoATx6pmMZAH0j5F2R1G7bsHIEH0lBZCyZAo88LRQ7isf93D3XCsorqeEu9A9GvuDScVKVnLZBEOe7fBKFyY8sVAnkdcPAq70faKmAjsOYZD
// Page
// 108933492467002
