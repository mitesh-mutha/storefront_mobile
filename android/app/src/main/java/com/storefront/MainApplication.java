package com.storefront;

import com.rnfs.RNFSPackage; // Added by MM for react-native-fs
import cl.json.RNSharePackage; // Added by MM for react-native-share(mm)

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

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage(),  // Added by MM for react-native-fs
          new RNSharePackage(), // Added by MM for react-native-share(mm)
          new SmsListenerPackage() // Added by MM for react-native-android-sms-listener
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
