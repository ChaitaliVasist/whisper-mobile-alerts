
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyArRv25XyWlVnqITJicgKVlwr6k-ICmZUc",
  authDomain: "whisper-mobile-alerts.firebaseapp.com",
  projectId: "whisper-mobile-alerts",
  storageBucket: "whisper-mobile-alerts.firebasestorage.app",
  messagingSenderId: "206482303576",
  appId: "1:206482303576:web:fb578324ce80a9d25a782d",
  measurementId: "G-5EVY78L7RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      
      // Get registration token
      const token = await getToken(messaging, {
        vapidKey: 'BLgUSyTYU1rUdgKkUHxTIqC67uLlaEWFB-SsTQ_hWs11CFvmMLtSEWRjz6qAYBkuhBIQpBzh2i8wCitc-wqoPQA' // VAPID key
      });
      
      console.log('Registration token:', token);
      return token;
    } else {
      console.log('Unable to get permission to notify.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      resolve(payload);
    });
  });

export { messaging };
