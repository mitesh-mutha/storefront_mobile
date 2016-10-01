import React, {Component} from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
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
        } catch (error) {
            Utility.showAlertWithOK("Error", "Could not read the credentials");
        }    
    },

    checkStatus() {
        if (this.state.readyToMove == true) { 
            Actions.feedpage({'phone': value.phone, 'authentication_token': value.authentication_token, type: ActionConst.RESET}); 
        } 
        else if ( this.state.readyToMove == false) {
            Actions.otploginpage({type: ActionConst.RESET});
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