package com.storefront;

import android.content.Intent; // Added by MM for react-native-push-notification

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Storefront";
    }

    /**
    * Added by MM for react-native-push-notification
    */
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        ((MainApplication) getApplication()).onNewIntent(intent);
    }
}
