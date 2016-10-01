package com.storefront;

import com.rnfs.RNFSPackage; // Added by MM for react-native-fs
import cl.json.RNSharePackage; // Added by MM for react-native-share(mm)

import android.content.Intent; // Added by MM for react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // Added by MM for react-native-push-notification

import com.centaurwarchief.smslistener.SmsListenerPackage; // Added by MM for react-native-android-sms-listener

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private ReactNativePushNotificationPackage mReactNativePushNotificationPackage; // Added by MM for react-native-push-notification

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(); // Added by MM for react-native-push-notification

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage(),  // Added by MM for react-native-fs
          new RNSharePackage(), // Added by MM for react-native-share(mm)
          new SmsListenerPackage(), // Added by MM for react-native-android-sms-listener
          mReactNativePushNotificationPackage // Added by MM for react-native-push-notification
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  // Add onNewIntent
  public void onNewIntent(Intent intent) {
    if ( mReactNativePushNotificationPackage != null ) {
        mReactNativePushNotificationPackage.newIntent(intent);
    }
  }
}
