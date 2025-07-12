
interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
  targetToken?: string;
}

class BackendSimulation {
  private static instance: BackendSimulation;
  private fcmServerKey = 'AIzaSyArRv25XyWlVnqITJicgKVlwr6k-ICmZUc'; // Replace with your FCM server key
  private registeredTokens: string[] = [];

  static getInstance(): BackendSimulation {
    if (!BackendSimulation.instance) {
      BackendSimulation.instance = new BackendSimulation();
    }
    return BackendSimulation.instance;
  }

  registerToken(token: string) {
    if (!this.registeredTokens.includes(token)) {
      this.registeredTokens.push(token);
      console.log('Token registered:', token);
    }
  }

  async sendNotification(payload: NotificationPayload): Promise<boolean> {
    try {
      // Simulate sending FCM notification
      const fcmPayload = {
        to: payload.targetToken || this.registeredTokens[0],
        notification: {
          title: payload.title,
          body: payload.body,
          icon: '/favicon.ico',
          click_action: 'FCM_PLUGIN_ACTIVITY'
        },
        data: payload.data || {}
      };

      // In a real implementation, you would send this to FCM
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Authorization': `key=${this.fcmServerKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fcmPayload)
      });

      if (response.ok) {
        console.log('Notification sent successfully');
        return true;
      } else {
        console.error('Failed to send notification:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  // Simulate incoming messages
  simulateIncomingMessage(chatId: string, senderName: string, message: string) {
    setTimeout(() => {
      this.sendNotification({
        title: senderName,
        body: message,
        data: {
          chatId: chatId,
          type: 'message'
        }
      });
    }, Math.random() * 5000 + 1000); // Random delay between 1-6 seconds
  }

  // Simulate call notifications
  simulateIncomingCall(chatId: string, callerName: string, callType: 'voice' | 'video') {
    this.sendNotification({
      title: `${callType === 'voice' ? '📞' : '📹'} ${callerName}`,
      body: `Incoming ${callType} call`,
      data: {
        chatId: chatId,
        type: 'call',
        callType: callType
      }
    });
  }
}

export default BackendSimulation;
