
package com.whatsappclone;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Handle deep linking from notifications
        handleNotificationIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleNotificationIntent(intent);
    }

    private void handleNotificationIntent(Intent intent) {
        if (intent != null && intent.hasExtra("chatId")) {
            String chatId = intent.getStringExtra("chatId");
            
            // Send the chatId to the web layer
            getBridge().getWebView().evaluateJavascript(
                "window.dispatchEvent(new CustomEvent('deeplink', { detail: { chatId: '" + chatId + "' } }));",
                null
            );
        }
    }
}
