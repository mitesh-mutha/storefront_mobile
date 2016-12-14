import React, {Component} from 'react';
import {View, BackAndroid, Linking, AsyncStorage} from 'react-native';
import {Scene, Reducer, Router, Actions, Modal} from 'react-native-router-flux';
import {GoogleAnalyticsTracker, GoogleAnalyticsSettings} from 'react-native-google-analytics-bridge';

import FeedPage from './app/components/FeedPage';
import ProductPage from './app/components/ProductPage';
import SearchPage from './app/components/SearchPage';
import FollowPage from './app/components/FollowPage';
import ProfilePage from './app/components/ProfilePage';
import VendorPage from './app/components/VendorPage';
import CatalogPage from './app/components/CatalogPage';
import WishlistPage from './app/components/WishlistPage';
import OTPLoginPage from './app/components/OTPLoginPage';
import OTPVerificationPage from './app/components/OTPVerificationPage';
import SplashPage from './app/components/SplashPage';
import TutorialPage from './app/components/TutorialPage';

const GANALYTICS_TRACKER_DEV = 'UA-88748793-1';
const GANALYTICS_TRACKER_PROD = 'UA-88748793-2';

var PushNotification = require('react-native-push-notification');

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

var Storefront = React.createClass({
    getInitialState() {
        //if (__DEV__) {
            return {
                tracker: new GoogleAnalyticsTracker(GANALYTICS_TRACKER_DEV)
            };
        //}
        //else {
        //    return {
        //        tracker: new GoogleAnalyticsTracker(GANALYTICS_TRACKER_PROD)
        //    };   
        //}        
    },
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

        PushNotification.configure({
            onRegister: function(token) { // (optional) Called when Token is generated (iOS and Android)
                console.log( 'TOKEN:', token );
                // Inform the server about the token for this device
            },
            onNotification: function(notification) { // (required) Called when a remote or local notification is opened or received
                console.log( 'NOTIFICATION:', notification );
                PushNotification.localNotification({
                    autoCancel: true, // (optional) default: true
                    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    title: notification.title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                    message: notification.body, // (required)
                    playSound: true, // (optional) default: true
                    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                });                
            },
            senderID: "1023864553038", // ANDROID ONLY: (optional) GCM Sender ID.
            permissions: { // IOS ONLY (optional): default: all - Permissions to register.
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true, // Should the initial notification be popped automatically default: true
            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
    },

    render() {
        

        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal}  >
                <Scene key="root">
                    <Scene key="splashpage" component={SplashPage} hideNavBar={true} initial={true} tracker={this.state.tracker} />
                    <Scene key="tutorialpage" component={TutorialPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="otploginpage" component={OTPLoginPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="otpverificationpage" component={OTPVerificationPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="feedpage" component={FeedPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="productpage" component={ProductPage} hideNavBar={true} panHandlers={null} tracker={this.state.tracker}/>
                    <Scene key="searchpage" component={SearchPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="followpage" component={FollowPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="profilepage" component={ProfilePage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="vendorpage" component={VendorPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="catalogpage" component={CatalogPage} hideNavBar={true} tracker={this.state.tracker}/>
                    <Scene key="wishlistpage" component={WishlistPage} hideNavBar={true} tracker={this.state.tracker}/>
                </Scene>
            </Scene>
        </Router>;
    }
});

module.exports = Storefront;