
# Whispr

A full-featured WhatsApp-like messaging application built with React, Capacitor, and Firebase Cloud Messaging for real-time push notifications.

## Features

✅ **WhatsApp-like UI with Dark Theme**
- Modern chat interface similar to WhatsApp
- Dark theme for better user experience
- Responsive design for mobile and desktop

✅ **Real-time Push Notifications**
- Firebase Cloud Messaging (FCM) integration
- Background and foreground notifications
- Custom notification sounds and icons

✅ **Native Android Integration**
- Custom Java/Kotlin modules for enhanced notifications
- Native notification channels for Android 8.0+
- Vibration patterns and LED notifications

✅ **Deep Linking Support**
- Click notifications to open specific chats
- URL-based deep linking
- Custom scheme support (whatsappclone://)

✅ **Additional Features**
- Local notification storage
- Badge counts
- Backend simulation for testing
- Offline message queuing

## Setup Instructions

### 1. Initial Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd whatsapp-clone

# Install dependencies
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Firebase Cloud Messaging
3. Get your Firebase config and replace the placeholder in `src/firebase/config.ts`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

4. Get your VAPID key from Firebase Console and update it in the config
5. Update the FCM server key in `src/services/BackendSimulation.ts`

### 3. Capacitor Setup

```bash
# Initialize Capacitor (if not already done)
npx cap init

# Add Android platform
npx cap add android

# Add iOS platform (optional)
npx cap add ios
```

### 4. Android Setup

1. **Update Firebase Configuration:**
   - Download `google-services.json` from Firebase Console
   - Place it in `android/app/` directory

2. **Update Android Dependencies:**
   Add to `android/app/build.gradle`:
   ```gradle
   dependencies {
       implementation 'com.google.firebase:firebase-messaging:23.0.0'
       implementation 'com.google.firebase:firebase-analytics:21.0.0'
   }
   ```

3. **Add Firebase Plugin:**
   Add to `android/build.gradle`:
   ```gradle
   dependencies {
       classpath 'com.google.gms:google-services:4.3.13'
   }
   ```

   Add to `android/app/build.gradle`:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

### 5. Build and Run

```bash
# Build the project
npm run build

# Sync with Capacitor
npx cap sync

# Run on Android
npx cap run android

# Run on iOS (Mac only)
npx cap run ios

# For development with live reload
npm run dev
```

### 6. Testing Push Notifications

1. **Web Testing:**
   - Open the app in your browser
   - Allow notification permissions
   - Use the built-in test notification feature

2. **Mobile Testing:**
   - Install the app on your device
   - Send test notifications using the backend simulation
   - Test deep linking by clicking on notifications

## Project Structure

```
src/
├── components/           # UI Components
│   ├── Header.tsx       # App header with search
│   ├── ChatList.tsx     # Chat list sidebar
│   └── ChatWindow.tsx   # Main chat interface
├── hooks/               # Custom React hooks
│   ├── useNotifications.ts  # Notification management
│   └── useMobile.ts     # Mobile detection
├── services/            # Business logic
│   └── BackendSimulation.ts # Mock backend for testing
├── firebase/            # Firebase configuration
│   └── config.ts       # FCM setup
├── utils/               # Utility functions
│   └── DeepLinking.ts  # Deep link handling
└── pages/               # Route components
    └── Index.tsx       # Main application page

android/
├── app/src/main/java/com/whatsappclone/
│   ├── MainActivity.java      # Main Android activity
│   ├── NotificationService.java # FCM service
│   └── AndroidManifest.xml   # Android configuration
```

## Key Technologies

- **Frontend:** React + TypeScript + Tailwind CSS
- **Mobile:** Capacitor for native mobile features
- **Notifications:** Firebase Cloud Messaging (FCM)
- **State Management:** React Hooks + TanStack Query
- **Icons:** Lucide React
- **Build Tool:** Vite

## Notification Flow

1. **Registration:** App registers with FCM and gets a token
2. **Token Storage:** Token is sent to your backend server
3. **Message Sending:** Backend sends notification via FCM API
4. **Delivery:** FCM delivers to device
5. **Handling:** Native service processes and displays notification
6. **Deep Linking:** User clicks notification → opens specific chat

## Development Tips

- Use `npm run dev` for web development with hot reload
- Use `npx cap run android --livereload` for mobile development
- Check browser console for FCM tokens and errors
- Test notifications on actual devices for best results
- Use Android Studio logcat for debugging native modules

## Troubleshooting

### Common Issues:

1. **Notifications not working:**
   - Check Firebase configuration
   - Verify FCM server key
   - Ensure app has notification permissions

2. **Deep linking not working:**
   - Check AndroidManifest.xml configuration
   - Verify intent filters
   - Test with `adb` commands

3. **Build errors:**
   - Clean and rebuild: `npx cap sync android`
   - Check Android SDK and build tools versions
   - Verify Firebase plugin configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both web and mobile
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development.
