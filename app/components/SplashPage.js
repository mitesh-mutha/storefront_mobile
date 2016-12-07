import React, {Component} from 'react';
import {View, StyleSheet, Image, AsyncStorage, Linking} from 'react-native';
import {Actions, ActionConst} from "react-native-router-flux";
import TimerMixin from 'react-timer-mixin';
import Utility from './../utilities';
import Strings from './../strings';

var value;

var SplashPage = React.createClass({
    
    mixins: [TimerMixin],

    getInitialState() {
        return {
            readyToMove: null
        }
    },

    async checkAuthenticationTokenExists() {
        try {
            value = await AsyncStorage.getItem("login_details");
            if (value !== null){
                value = JSON.parse(value);
                this.setState({readyToMove: true})
            }
            else {
                this.setState({readyToMove: false});    
            }            
        } catch (error) {
            Utility.showAlertWithOK(Strings.ERROR, Strings.NO_LOGIN_DETAILS_MSG);
            this.setState({readyToMove: false});
        }    
    },

    checkStatus() {
        if (this.state.readyToMove == true) { 

            var url = Linking.getInitialURL().then((url) => {
                if (url) {
                    console.log('Initial url is: ' + url);
                    
                    var productsRegex = /http:\/\/storefrontindia\.com\/product\/(\d\d*).*/gi
                    var match = productsRegex.exec(url);
                    if (match && match[1]) {
                        Actions.productpage({
                            'product_id': parseInt(match[1]),
                            'phone': value.phone, 
                            'authentication_token': value.authentication_token, 
                            type: ActionConst.RESET
                        });    
                        return;
                    }

                    var sellersRegex = /http:\/\/storefrontindia\.com\/seller\/(\d\d*).*/gi
                    var match = sellersRegex.exec(url);
                    if (match && match[1]) {
                        Actions.vendorpage({
                            'seller_id': parseInt(match[1]),
                            'phone': value.phone, 
                            'authentication_token': value.authentication_token, 
                            type: ActionConst.RESET
                        });    
                        return;
                    }

                    var followedRegex = /http:\/\/storefrontindia\.com\/followed[\/]*.*/gi
                    var match = followedRegex.exec(url);
                    if (match) {
                        Actions.followpage({
                            'phone': value.phone, 
                            'authentication_token': value.authentication_token, 
                            type: ActionConst.RESET
                        });    
                        return;
                    }

                    Actions.feedpage({
                        'phone': value.phone, 
                        'authentication_token': value.authentication_token, 
                        type: ActionConst.RESET
                    });    
                        
                }
                else {
                    Actions.feedpage({
                        'phone': value.phone, 
                        'authentication_token': value.authentication_token, 
                        type: ActionConst.RESET
                    }); 
                }
            }).catch(err => console.error('An error occurred', err));
            /*
            Actions.feedpage({
                'phone': value.phone, 
                'authentication_token': value.authentication_token, 
                type: ActionConst.RESET
            }); 
            */

        } 
        else if ( this.state.readyToMove == false) {
            Actions.otploginpage({
                type: ActionConst.RESET
            });
        }
        else {
            this.setTimeout(
                () => { this.checkStatus(); },
                500
            );
        }
    },

    componentDidMount() {

        this.checkAuthenticationTokenExists();

        this.setTimeout(
            () => { this.checkStatus(); },
            2000
        );
    },

    render(){
        return (
            <View style={styles.container} keyboardShouldPersistTaps={true}>
                <Image source={require('../images/splash.png')} />
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = SplashPage;