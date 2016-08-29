import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {Actions} from "react-native-router-flux";
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';
import Utility from './../utilities';
import Strings from './../strings';


var OTPLoginPage = React.createClass({

    getInitialState() {
        return {
            mobileInput: "",
            spinnerVisible: true
        }
    },

    async checkAuthenticationTokenExists() {
        try {
            const value = await AsyncStorage.getItem("login_details");
            this.setState({spinnerVisible: false});
            if (value !== null){
                value = JSON.parse(value);
                Actions.feedpage({'phone': value.phone, 'authentication_token': value.authentication_token});
            }
        } catch (error) {
            this.setState({spinnerVisible: false});
            console.log("Error "+error);
        }    
    },

    componentDidMount() {
        this.checkAuthenticationTokenExists();
    },

    validateMobileNumber() {

        if (!this.state.mobileInput) {
            Utility.showAlertWithOK(Strings.NO_MOBILE_INPUT, Strings.NO_MOBILE_INPUT_MSG);
            return false;
        }

        if ( !this.state.mobileInput.trim() ) {
            Utility.showAlertWithOK(Strings.NO_MOBILE_INPUT, Strings.NO_MOBILE_INPUT_MSG);
            return false; 
        }
        
        if (this.state.mobileInput.length != 10) {
            Utility.showAlertWithOK(Strings.MOBILE_INPUT_DIFFERENT_LENGTH, Strings.MOBILE_INPUT_DIFFERENT_LENGTH_MSG);
            return false; 
        }

        return true;
    },

    onLoginPress() {   

        if ( !this.validateMobileNumber() ) {
            return;
        }

        url = URL.API_URL.OTP_LOGIN_URL+"?phone="+this.state.mobileInput;

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({spinnerVisible: false});

            if (responseJson.status === "success") {
                Actions.otpverificationpage({mobileNumber: this.state.mobileInput});
            }
            else if (responseJson.status === "Unauthenticated") {
                Utility.showAlertWithOK(Strings.OTP_LOGIN_UNAUTHENTICATED, Strings.OTP_LOGIN_UNAUTHENTICATED_MSG);
            }

        })
        .catch((error) =>  {

            this.setState({spinnerVisible: false});
            Utility.showAlertWithOK(Strings.OTP_LOGIN_REQUEST_FAILED, Strings.OTP_LOGIN_REQUEST_FAILED_MSG);
            console.error(error)

        });
    },


    render(){

        return (
            <ScrollView style={styles.scrollcontainer}>

                <Spinner visible={this.state.spinnerVisible} />


                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>{Strings.APP_NAME}</Text>
                </View>


                <View style={styles.OTPLoginContainer}>
              
                    <Text style={styles.loginHeading}>{Strings.LOGIN}</Text>

                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="numeric"
                        underlineColorAndroid='rgba(67, 164, 229, 1)'
                        style={styles.mobileNumInput}
                        onChangeText={(text) => this.setState({mobileInput: text})}
                        value={this.state.mobileInput}/>
                  
                    <TouchableOpacity style={styles.loginButton} 
                        onPress={()=>this.onLoginPress()}>
                        <Text style={styles.loginButtonLabel}>{Strings.SEND_OTP}</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        )
    }
});



const styles = StyleSheet.create({
    scrollcontainer: {
        flex: 1,        
        backgroundColor: "white",
    },
    appNameContainer: {
        padding: 8,
        alignSelf: 'center',
        marginTop: 48
    },
    appName: {
        fontSize: 32,
        fontFamily: 'HelveticaNeueMed',
        color: 'rgba(67, 164, 229, 1)'
    },
    OTPLoginContainer: {
        flex:1,
        margin: 16, 
        marginTop: 16
    },
    loginHeading: {
        flex:1, 
        color:'black',
        fontFamily: 'HelveticaNeueMed', 
        alignSelf:'center',
        margin:8,
        marginBottom: 16
    },
    mobileNumInput: {
        flex:1,
        marginTop:16
    },
    loginButton: {
        flex:1, 
        backgroundColor:'rgba(67, 164, 229, 1)', 
        alignItems:'center',
        height: 16, 
        marginTop:16
    },
    loginButtonLabel: {
        flex:1, 
        color:'white', 
        fontFamily:'HelveticaNeueMed', 
        margin:8
    }
});

module.exports = OTPLoginPage