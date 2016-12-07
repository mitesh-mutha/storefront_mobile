import React, {Component} from 'react';
import {View, BackAndroid, Linking, AsyncStorage} from 'react-native';
import {Scene, Reducer, Router, Actions, Modal} from 'react-native-router-flux';

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

var PushNotification = require('react-native-push-notification');

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

/*
export default class Storefront extends React.Component {
    render() {
    
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root">
                    <Scene key="splashpage" component={SplashPage} hideNavBar={true} initial={true} />
                    <Scene key="tutorialpage" component={TutorialPage} hideNavBar={true} />
                    <Scene key="otploginpage" component={OTPLoginPage} hideNavBar={true} />
                    <Scene key="otpverificationpage" component={OTPVerificationPage} hideNavBar={true}/>
                    <Scene key="feedpage" component={FeedPage} hideNavBar={true} />
                    <Scene key="productpage" component={ProductPage} hideNavBar={true} panHandlers={null} />
                    <Scene key="searchpage" component={SearchPage} hideNavBar={true} />
                    <Scene key="followpage" component={FollowPage} hideNavBar={true} />
                    <Scene key="profilepage" component={ProfilePage} hideNavBar={true} />
                    <Scene key="vendorpage" component={VendorPage} hideNavBar={true} />
                    <Scene key="catalogpage" component={CatalogPage} hideNavBar={true} />
                    <Scene key="wishlistpage" component={WishlistPage} hideNavBar={true} />
                </Scene>
            </Scene>
        </Router>;
    }
}
*/

var Storefront = React.createClass({
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());

        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
                // Inform the server about the token for this device
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
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

            // ANDROID ONLY: (optional) GCM Sender ID.
            senderID: "1023864553038",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

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
            <Scene key="modal" component={Modal} >
                <Scene key="root">
                    <Scene key="splashpage" component={SplashPage} hideNavBar={true} initial={true} />
                    <Scene key="tutorialpage" component={TutorialPage} hideNavBar={true} />
                    <Scene key="otploginpage" component={OTPLoginPage} hideNavBar={true} />
                    <Scene key="otpverificationpage" component={OTPVerificationPage} hideNavBar={true}/>
                    <Scene key="feedpage" component={FeedPage} hideNavBar={true} />
                    <Scene key="productpage" component={ProductPage} hideNavBar={true} panHandlers={null} />
                    <Scene key="searchpage" component={SearchPage} hideNavBar={true} />
                    <Scene key="followpage" component={FollowPage} hideNavBar={true} />
                    <Scene key="profilepage" component={ProfilePage} hideNavBar={true} />
                    <Scene key="vendorpage" component={VendorPage} hideNavBar={true} />
                    <Scene key="catalogpage" component={CatalogPage} hideNavBar={true} />
                    <Scene key="wishlistpage" component={WishlistPage} hideNavBar={true} />
                </Scene>
            </Scene>
        </Router>;
    }
});

module.exports = Storefront;