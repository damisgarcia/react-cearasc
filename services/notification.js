import {
  Platform
} from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export class Notification {
  constructor() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
        console.log(token)
        // store fcm token in your server
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        try{
          // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
          if(notif.local_notification){
            return;
          }
          if(notif.opened_from_tray){
            //app is open/resumed because user clicked banner
            return;
          }

          // if(notif.fcm){
          //   this.showLocalNotification(notif)
          // }

          if(Platform.OS ==='ios'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
          }
          console.log(notif)
          this.showLocalNotification(notif)
        } catch(e){
          console.log("Notification Debug:", e)
        }
    });
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        // fcm token may not be available on first load, catch it here
        console.log(token)
    });
  }

  showLocalNotification(notif) {
    FCM.presentLocalNotification({
      title: '',
      body: notif.body,
      priority: "high",
      icon: "ic_launcher",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true
    });
  }

  destroy() {
      // stop listening for events
      this.notificationListener.remove();
      this.refreshTokenListener.remove();
  }
}
