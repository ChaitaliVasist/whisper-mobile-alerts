
import { useEffect, useState } from 'react';
import { 
  PushNotifications, 
  PushNotificationSchema, 
  ActionPerformed,
  PushNotificationToken,
  DeliveredNotifications 
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export const useNotifications = () => {
  const [token, setToken] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([]);

  const initializeNotifications = async () => {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications not supported on web');
      return;
    }

    try {
      // Request permissions
      const permStatus = await PushNotifications.requestPermissions();
      
      if (permStatus.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
      }

      // Local notifications permission
      await LocalNotifications.requestPermissions();

    } catch (error) {
      console.error('Error initializing notifications:', error);
    }

    // Listen for registration events
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('Push registration success, token: ' + token.value);
      setToken(token.value);
      // Send token to your backend server
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Listen for push notifications
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received: ', notification);
        setNotifications(prev => [...prev, notification]);
      }
    );

    // Listen for notification actions
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push notification action performed', notification);
        
        // Handle deep linking
        if (notification.notification.data?.chatId) {
          handleDeepLink(notification.notification.data.chatId);
        }
      }
    );

    // Get any delivered notifications
    const deliveredNotifications = await PushNotifications.getDeliveredNotifications();
    console.log('Delivered notifications: ', deliveredNotifications);
  };

  const sendTestNotification = async (payload: NotificationPayload) => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Schedule a local notification for testing
        await LocalNotifications.schedule({
          notifications: [
            {
              title: payload.title,
              body: payload.body,
              id: Date.now(),
              schedule: { at: new Date(Date.now() + 1000) }, // 1 second delay
              sound: 'beep.wav',
              attachments: undefined,
              actionTypeId: '',
              extra: payload.data || {}
            }
          ]
        });
      } else {
        // Web notification fallback
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            new Notification(payload.title, {
              body: payload.body,
              icon: '/favicon.ico',
              data: payload.data
            });
          }
        }
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleDeepLink = (chatId: string) => {
    // Handle navigation to specific chat
    console.log('Deep linking to chat:', chatId);
    // You can use React Router or your navigation system here
    window.location.hash = `#/chat/${chatId}`;
  };

  const clearAllNotifications = async () => {
    try {
      await LocalNotifications.removeAllDeliveredNotifications();
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return {
    token,
    notifications,
    initializeNotifications,
    sendTestNotification,
    clearAllNotifications,
    handleDeepLink
  };
};
