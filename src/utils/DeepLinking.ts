
export class DeepLinkingHandler {
  private static callbacks: Map<string, (data: any) => void> = new Map();

  static initialize() {
    // Listen for custom deep link events from native layer
    window.addEventListener('deeplink', (event: any) => {
      const { chatId } = event.detail;
      if (chatId) {
        this.handleChatDeepLink(chatId);
      }
    });

    // Handle URL-based deep links
    this.handleUrlDeepLinks();
  }

  static registerCallback(type: string, callback: (data: any) => void) {
    this.callbacks.set(type, callback);
  }

  static handleChatDeepLink(chatId: string) {
    const callback = this.callbacks.get('chat');
    if (callback) {
      callback({ chatId });
    } else {
      // Fallback: update URL hash
      window.location.hash = `#/chat/${chatId}`;
    }
  }

  private static handleUrlDeepLinks() {
    const hash = window.location.hash;
    if (hash.startsWith('#/chat/')) {
      const chatId = hash.replace('#/chat/', '');
      this.handleChatDeepLink(chatId);
    }
  }

  static createDeepLink(chatId: string): string {
    return `whatsappclone://chat/${chatId}`;
  }
}

// Initialize deep linking
DeepLinkingHandler.initialize();
